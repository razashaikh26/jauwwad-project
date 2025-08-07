import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Button, Badge } from 'react-bootstrap';
import { FaStar, FaHeart, FaShoppingCart, FaEye } from 'react-icons/fa';
import { useCart } from '../contexts/CartContext';
import toast from 'react-hot-toast';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product.id);
    toast.success('Added to cart! 🛒');
  };

  const handleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toast.success('Added to wishlist! ❤️');
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <FaStar
        key={i}
        className={i < Math.floor(rating) ? 'text-warning' : 'text-muted'}
        size={12}
      />
    ));
  };

  return (
    <Card className="product-card h-100 border-0 shadow-sm position-relative overflow-hidden">
      {/* Product Badges */}
      <div className="position-absolute top-0 start-0 p-2 z-index-1">
        {product.featured && (
          <Badge bg="warning" text="dark" className="mb-1 d-block">
            Featured
          </Badge>
        )}
        {product.discount_percentage > 0 && (
          <Badge bg="danger" className="mb-1 d-block">
            {product.discount_percentage}% OFF
          </Badge>
        )}
      </div>

      {/* Wishlist Button */}
      <Button
        variant="link"
        className="position-absolute top-0 end-0 p-2 text-muted z-index-1"
        onClick={handleWishlist}
        style={{ background: 'rgba(255,255,255,0.9)', borderRadius: '50%', width: '40px', height: '40px' }}
      >
        <FaHeart />
      </Button>

      {/* Product Image */}
      <div className="position-relative overflow-hidden">
        <Card.Img
          variant="top"
          src={product.thumbnail_url || product.images?.[0] || 'https://via.placeholder.com/300x250/f8f9fa/6c757d?text=No+Image'}
          alt={product.name}
          className="product-image"
          style={{ height: '250px', objectFit: 'cover', transition: 'transform 0.3s ease' }}
        />
        
        {/* Quick Action Overlay */}
        <div 
          className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center opacity-0"
          style={{ 
            background: 'rgba(0,0,0,0.7)',
            transition: 'opacity 0.3s ease'
          }}
        >
          <div className="d-flex gap-2">
            <Button
              as={Link}
              to={`/products/${product.id}`}
              variant="light"
              size="sm"
              className="rounded-circle"
              style={{ width: '40px', height: '40px' }}
            >
              <FaEye />
            </Button>
            <Button
              variant="primary"
              size="sm"
              className="rounded-circle"
              style={{ width: '40px', height: '40px' }}
              onClick={handleAddToCart}
            >
              <FaShoppingCart />
            </Button>
          </div>
        </div>
      </div>

      <Card.Body className="d-flex flex-column">
        {/* Brand */}
        <div className="text-muted small mb-1">{product.brand_name}</div>
        
        {/* Product Name */}
        <Card.Title className="h6 mb-2 flex-grow-1">
          <Link
            to={`/products/${product.id}`}
            className="text-decoration-none text-dark"
          >
            {product.name}
          </Link>
        </Card.Title>

        {/* Rating */}
        <div className="d-flex align-items-center mb-2">
          <div className="me-2">
            {renderStars(product.rating)}
          </div>
          <span className="text-muted small">
            ({product.review_count || 0})
          </span>
        </div>

        {/* Price */}
        <div className="d-flex align-items-center mb-3">
          <span className="h5 text-success fw-bold mb-0 me-2">
            ₹{product.price?.toLocaleString()}
          </span>
          {product.original_price && product.original_price > product.price && (
            <span className="text-muted text-decoration-line-through small">
              ₹{product.original_price.toLocaleString()}
            </span>
          )}
        </div>

        {/* Stock Status */}
        <div className="mb-3">
          {product.stock_quantity > 0 ? (
            <Badge bg="success" className="small">
              In Stock ({product.stock_quantity})
            </Badge>
          ) : (
            <Badge bg="danger" className="small">
              Out of Stock
            </Badge>
          )}
        </div>

        {/* Add to Cart Button */}
        <Button
          variant="primary"
          className="w-100 fw-semibold"
          onClick={handleAddToCart}
          disabled={product.stock_quantity === 0}
        >
          {product.stock_quantity === 0 ? 'Out of Stock' : 'Add to Cart'}
        </Button>
      </Card.Body>

      <style jsx>{`
        .product-card:hover .product-image {
          transform: scale(1.05);
        }
        
        .product-card:hover .position-absolute.top-0.start-0.w-100.h-100 {
          opacity: 1 !important;
        }
      `}</style>
    </Card>
  );
};

export default ProductCard;
