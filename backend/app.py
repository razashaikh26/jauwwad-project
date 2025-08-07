from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS, cross_origin
import psycopg2
import psycopg2.extras
import os
import bcrypt
import jwt
from datetime import datetime, timedelta
from functools import wraps
import json
from dotenv import load_dotenv
from werkzeug.utils import secure_filename
from PIL import Image
import uuid

load_dotenv()

app = Flask(__name__)

# Enhanced CORS Configuration
CORS(app, resources={
    r"/api/*": {
        "origins": ["http://localhost:3000", "http://127.0.0.1:3000"],
        "methods": ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        "allow_headers": ["Content-Type", "Authorization"],
        "supports_credentials": True
    }
})

# Configuration
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY')
app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET_KEY')
app.config['UPLOAD_FOLDER'] = os.getenv('UPLOAD_FOLDER', 'uploads')
app.config['MAX_CONTENT_LENGTH'] = int(os.getenv('MAX_CONTENT_LENGTH', 16777216))

DATABASE_URL = os.getenv('DATABASE_URL')

# Add this decorator to handle OPTIONS requests
@app.before_request
def handle_preflight():
    if request.method == "OPTIONS":
        response = jsonify()
        response.headers.add("Access-Control-Allow-Origin", "http://localhost:3000")
        response.headers.add('Access-Control-Allow-Headers', "Content-Type,Authorization")
        response.headers.add('Access-Control-Allow-Methods', "GET,POST,PUT,DELETE,OPTIONS")
        response.headers.add('Access-Control-Allow-Credentials', "true")
        return response

# Ensure upload directory exists
os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)
os.makedirs(os.path.join(app.config['UPLOAD_FOLDER'], 'products'), exist_ok=True)
os.makedirs(os.path.join(app.config['UPLOAD_FOLDER'], 'categories'), exist_ok=True)
os.makedirs(os.path.join(app.config['UPLOAD_FOLDER'], 'brands'), exist_ok=True)

ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif', 'webp'}

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def get_db_connection():
    """Get database connection"""
    try:
        conn = psycopg2.connect(DATABASE_URL)
        return conn
    except Exception as e:
        print(f"Database connection error: {e}")
        return None

def token_required(f):
    """Decorator for JWT token verification"""
    @wraps(f)
    def decorated(*args, **kwargs):
        token = request.headers.get('Authorization')
        if not token:
            return jsonify({'message': 'Token is missing'}), 401
        
        try:
            token = token.split(' ')[1]  # Remove 'Bearer ' prefix
            data = jwt.decode(token, app.config['JWT_SECRET_KEY'], algorithms=['HS256'])
            current_user_id = data['user_id']
        except jwt.ExpiredSignatureError:
            return jsonify({'message': 'Token has expired'}), 401
        except jwt.InvalidTokenError:
            return jsonify({'message': 'Token is invalid'}), 401
        
        return f(current_user_id, *args, **kwargs)
    return decorated

# Cart Routes with explicit OPTIONS handling
@app.route('/api/cart', methods=['GET', 'POST', 'OPTIONS'])
@cross_origin()
def handle_cart():
    if request.method == 'OPTIONS':
        response = jsonify()
        response.headers.add("Access-Control-Allow-Origin", "http://localhost:3000")
        response.headers.add('Access-Control-Allow-Headers', "Content-Type,Authorization")
        response.headers.add('Access-Control-Allow-Methods', "GET,POST,OPTIONS")
        return response
    
    # Get current user from token
    token = request.headers.get('Authorization')
    if not token:
        return jsonify({'message': 'Token is missing'}), 401
    
    try:
        token = token.split(' ')[1]
        data = jwt.decode(token, app.config['JWT_SECRET_KEY'], algorithms=['HS256'])
        user_id = data['user_id']
    except:
        return jsonify({'message': 'Token is invalid'}), 401
    
    if request.method == 'GET':
        return get_cart(user_id)
    elif request.method == 'POST':
        return add_to_cart(user_id)

def get_cart(user_id):
    """Get user's cart items"""
    conn = get_db_connection()
    if not conn:
        return jsonify({'error': 'Database connection failed'}), 500
    
    cur = conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)
    
    try:
        cur.execute("""
            SELECT ci.*, p.name, p.price, p.images, p.stock_quantity, p.thumbnail_url
            FROM cart_items ci
            JOIN products p ON ci.product_id = p.id
            WHERE ci.user_id = %s
        """, (user_id,))
        
        cart_items = cur.fetchall()
        
        return jsonify({'cart_items': cart_items})
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    finally:
        cur.close()
        conn.close()

def add_to_cart(user_id):
    """Add item to cart"""
    data = request.get_json()
    
    if not data or 'product_id' not in product:
        return jsonify({'error': 'Product ID is required'}), 400
    
    product_id = data['product_id']
    quantity = data.get('quantity', 1)
    
    conn = get_db_connection()
    if not conn:
        return jsonify({'error': 'Database connection failed'}), 500
    
    cur = conn.cursor()
    
    try:
        # Check if product exists and has stock
        cur.execute("SELECT stock_quantity FROM products WHERE id = %s", (product_id,))
        product = cur.fetchone()
        
        if not product:
            return jsonify({'error': 'Product not found'}), 404
        
        if product[0] < quantity:
            return jsonify({'error': 'Insufficient stock'}), 400
        
        # Add or update cart item
        cur.execute("""
            INSERT INTO cart_items (user_id, product_id, quantity)
            VALUES (%s, %s, %s)
            ON CONFLICT (user_id, product_id)
            DO UPDATE SET quantity = cart_items.quantity + %s
        """, (user_id, product_id, quantity, quantity))
        
        conn.commit()
        return jsonify({'message': 'Item added to cart successfully'}), 201
        
    except Exception as e:
        conn.rollback()
        return jsonify({'error': str(e)}), 500
    finally:
        cur.close()
        conn.close()

@app.route('/api/cart/<int:item_id>', methods=['DELETE', 'OPTIONS'])
@cross_origin()
def remove_from_cart(item_id):
    if request.method == 'OPTIONS':
        response = jsonify()
        response.headers.add("Access-Control-Allow-Origin", "http://localhost:3000")
        response.headers.add('Access-Control-Allow-Headers', "Content-Type,Authorization")
        response.headers.add('Access-Control-Allow-Methods', "DELETE,OPTIONS")
        return response
    
    # Get current user from token
    token = request.headers.get('Authorization')
    if not token:
        return jsonify({'message': 'Token is missing'}), 401
    
    try:
        token = token.split(' ')[1]
        data = jwt.decode(token, app.config['JWT_SECRET_KEY'], algorithms=['HS256'])
        user_id = data['user_id']
    except:
        return jsonify({'message': 'Token is invalid'}), 401
    
    conn = get_db_connection()
    if not conn:
        return jsonify({'error': 'Database connection failed'}), 500
    
    cur = conn.cursor()
    
    try:
        cur.execute("DELETE FROM cart_items WHERE id = %s AND user_id = %s", (item_id, user_id))
        conn.commit()
        
        if cur.rowcount == 0:
            return jsonify({'error': 'Cart item not found'}), 404
        
        return jsonify({'message': 'Item removed from cart'})
        
    except Exception as e:
        conn.rollback()
        return jsonify({'error': str(e)}), 500
    finally:
        cur.close()
        conn.close()

# Health check route
@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({
        'status': 'healthy',
        'timestamp': datetime.utcnow().isoformat(),
        'version': '1.0.0'
    })

# Add other routes here (login, register, products, etc.)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5124, debug=True)
