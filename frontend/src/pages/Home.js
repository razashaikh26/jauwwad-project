import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Badge } from 'react-bootstrap';
import { 
  FaMobile, 
  FaLaptop, 
  FaHeadphones, 
  FaGamepad, 
  FaCamera,
  FaTabletAlt,
  FaStar,
  FaShippingFast,
  FaShieldAlt,
  FaHeadset
} from 'react-icons/fa';

const Home = () => {
  const categories = [
    { 
      id: 1, 
      name: 'Smartphones', 
      icon: <FaMobile size={40} className="text-white" />,
      description: 'Latest flagship smartphones',
      color: '#667eea'
    },
    { 
      id: 2, 
      name: 'Laptops', 
      icon: <FaLaptop size={40} className="text-white" />,
      description: 'High-performance laptops',
      color: '#764ba2'
    },
    { 
      id: 3, 
      name: 'Headphones', 
      icon: <FaHeadphones size={40} className="text-white" />,
      description: 'Premium audio devices',
      color: '#f093fb'
    },
    { 
      id: 4, 
      name: 'Gaming', 
      icon: <FaGamepad size={40} className="text-white" />,
      description: 'Gaming consoles & accessories',
      color: '#f5576c'
    },
    { 
      id: 5, 
      name: 'Cameras', 
      icon: <FaCamera size={40} className="text-white" />,
      description: 'Professional cameras',
      color: '#4facfe'
    },
    { 
      id: 6, 
      name: 'Tablets', 
      icon: <FaTabletAlt size={40} className="text-white" />,
      description: 'Tablets & e-readers',
      color: '#43e97b'
    }
  ];

  const features = [
    {
      icon: <FaShippingFast size={40} className="text-primary" />,
      title: 'Free Shipping',
      description: 'Free delivery on orders above ₹500'
    },
    {
      icon: <FaShieldAlt size={40} className="text-primary" />,
      title: 'Secure Payments',
      description: '100% secure payment protection'
    },
    {
      icon: <FaHeadset size={40} className="text-primary" />,
      title: '24/7 Support',
      description: 'Round the clock customer support'
    }
  ];

  const featuredProducts = [
    {
      id: 1,
      name: 'iPhone 15 Pro Max',
      price: 134900,
      originalPrice: 149900,
      discount: 10,
      rating: 4.8,
      reviews: 156,
      image: 'https://via.placeholder.com/300x250/667eea/ffffff?text=iPhone+15+Pro',
      badge: 'Bestseller'
    },
    {
      id: 2,
      name: 'MacBook Pro M3',
      price: 199900,
      originalPrice: 219900,
      discount: 9,
      rating: 4.9,
      reviews: 89,
      image: 'https://via.placeholder.com/300x250/764ba2/ffffff?text=MacBook+Pro',
      badge: 'New'
    },
    {
      id: 3,
      name: 'Sony WH-1000XM5',
      price: 29990,
      originalPrice: 34990,
      discount: 14,
      rating: 4.6,
      reviews: 341,
      image: 'https://via.placeholder.com/300x250/f093fb/ffffff?text=Sony+Headphones',
      badge: 'Popular'
    }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="hero-modern text-white">
        <Container>
          <Row className="align-items-center min-vh-75">
            <Col lg={6} className="hero-content fade-in">
              <Badge bg="light" text="dark" className="mb-3 px-3 py-2">
                🚀 New Arrivals Weekly
              </Badge>
              <h1 className="hero-title">
                Discover Amazing
                <br />
                <span className="text-gradient">Electronics</span>
              </h1>
              <p className="hero-subtitle">
                Shop the latest technology with unbeatable prices, 
                fast delivery, and exceptional customer service.
              </p>
              <div className="d-flex flex-wrap gap-3">
                <Button as={Link} to="/products" variant="light" size="lg" className="px-4">
                  Shop Now
                </Button>
                <Button variant="outline-light" size="lg" className="px-4">
                  View Deals
                </Button>
              </div>
              
              {/* Stats */}
              <Row className="mt-5 text-center">
                <Col xs={4}>
                  <div className="h3 fw-bold mb-1">50K+</div>
                  <small className="opacity-75">Happy Customers</small>
                </Col>
                <Col xs={4}>
                  <div className="h3 fw-bold mb-1">1000+</div>
                  <small className="opacity-75">Products</small>
                </Col>
                <Col xs={4}>
                  <div className="h3 fw-bold mb-1">4.9★</div>
                  <small className="opacity-75">Rating</small>
                </Col>
              </Row>
            </Col>
            <Col lg={6} className="text-center">
              <div className="position-relative">
                <img 
                  src="https://via.placeholder.com/500x400/ffffff/667eea?text=Premium+Electronics" 
                  alt="Electronics" 
                  className="img-fluid rounded-3 shadow-2xl"
                />
                <div className="position-absolute top-0 end-0 m-3">
                  <Badge bg="warning" className="px-3 py-2">
                    Up to 70% OFF
                  </Badge>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Features Section */}
      <section className="py-5 bg-white">
        <Container>
          <Row>
            {features.map((feature, index) => (
              <Col md={4} key={index} className="text-center mb-4">
                <Card className="border-0 h-100">
                  <Card.Body className="p-4">
                    <div className="mb-3">
                      {feature.icon}
                    </div>
                    <h5 className="fw-bold">{feature.title}</h5>
                    <p className="text-muted mb-0">{feature.description}</p>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Categories Section */}
      <section className="py-5">
        <Container>
          <div className="text-center mb-5 slide-up">
            <h2 className="display-5 fw-bold mb-3">Shop by Category</h2>
            <p className="lead text-muted">Discover our wide range of electronic products</p>
          </div>
          
          <Row>
            {categories.map((category, index) => (
              <Col lg={4} md={6} key={category.id} className="mb-4">
                <Card className="category-card-modern card-hover h-100">
                  <Card.Body>
                    <div 
                      className="category-icon mb-3"
                      style={{ background: `linear-gradient(135deg, ${category.color}, ${category.color}dd)` }}
                    >
                      {category.icon}
                    </div>
                    <h4 className="fw-bold mb-2">{category.name}</h4>
                    <p className="text-muted mb-3">{category.description}</p>
                    <Link 
                      to={`/products?category=${category.id}`} 
                      className="btn btn-outline-primary btn-sm"
                    >
                      Explore {category.name} →
                    </Link>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Featured Products */}
      <section className="py-5 bg-light">
        <Container>
          <div className="text-center mb-5">
            <h2 className="display-5 fw-bold mb-3">Featured Products</h2>
            <p className="lead text-muted">Hand-picked products just for you</p>
          </div>
          
          <Row>
            {featuredProducts.map((product) => (
              <Col lg={4} md={6} key={product.id} className="mb-4">
                <Card className="card-product h-100">
                  <div className="position-relative">
                    <Card.Img variant="top" src={product.image} />
                    <Badge 
                      bg={product.badge === 'New' ? 'success' : product.badge === 'Bestseller' ? 'warning' : 'info'} 
                      className="position-absolute top-0 start-0 m-3"
                    >
                      {product.badge}
                    </Badge>
                    <div className="position-absolute top-0 end-0 m-3">
                      <Badge bg="danger" className="price-discount">
                        {product.discount}% OFF
                      </Badge>
                    </div>
                  </div>
                  <Card.Body>
                    <Card.Title className="h5 mb-2">{product.name}</Card.Title>
                    
                    <div className="rating-display mb-2">
                      <div className="rating-stars">
                        {[...Array(5)].map((_, i) => (
                          <FaStar key={i} className={i < Math.floor(product.rating) ? '' : 'text-muted'} />
                        ))}
                      </div>
                      <span className="rating-count">({product.reviews})</span>
                    </div>
                    
                    <div className="price-display mb-3">
                      <span className="price-current">₹{product.price.toLocaleString()}</span>
                      <span className="price-original">₹{product.originalPrice.toLocaleString()}</span>
                    </div>
                    
                    <div className="d-grid">
                      <Button variant="primary">
                        Add to Cart
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
          
          <div className="text-center mt-4">
            <Button as={Link} to="/products" variant="outline-primary" size="lg">
              View All Products
            </Button>
          </div>
        </Container>
      </section>

      {/* Newsletter Section */}
      <section className="py-5 bg-primary text-white">
        <Container>
          <Row className="align-items-center">
            <Col lg={6}>
              <h3 className="fw-bold mb-2">Stay Updated</h3>
              <p className="mb-0">Get the latest deals and product launches delivered to your inbox.</p>
            </Col>
            <Col lg={6}>
              <div className="d-flex gap-2">
                <input 
                  type="email" 
                  className="form-control" 
                  placeholder="Enter your email"
                  style={{ borderRadius: '25px' }}
                />
                <Button variant="light" style={{ borderRadius: '25px', minWidth: '120px' }}>
                  Subscribe
                </Button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
};

export default Home;
