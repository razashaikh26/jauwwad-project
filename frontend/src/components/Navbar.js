import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';
import { Navbar, Nav, Container, Dropdown, Form, InputGroup } from 'react-bootstrap';
import { 
  FaShoppingCart, 
  FaUser, 
  FaSearch, 
  FaHeart,
  FaBell,
  FaHome,
  FaLaptop
} from 'react-icons/fa';

const NavigationBar = () => {
  const { isAuthenticated, logout, user } = useAuth();
  const { getCartItemCount } = useCart();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      setScrolled(isScrolled);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <Navbar 
      expand="lg" 
      className={`navbar-modern sticky-top ${scrolled ? 'shadow-lg' : ''}`}
      variant="light"
    >
      <Container>
        <Navbar.Brand as={Link} to="/" className="navbar-brand me-4">
          <FaLaptop className="me-2" />
          ElectroMart
        </Navbar.Brand>
        
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          {/* Search Bar */}
          <Form className="d-flex mx-auto" style={{ maxWidth: '400px', width: '100%' }}>
            <InputGroup>
              <Form.Control
                type="search"
                placeholder="Search for products, brands and more..."
                className="border-end-0"
                style={{ borderRadius: '25px 0 0 25px' }}
              />
              <InputGroup.Text 
                className="bg-primary text-white border-start-0" 
                style={{ borderRadius: '0 25px 25px 0', cursor: 'pointer' }}
              >
                <FaSearch />
              </InputGroup.Text>
            </InputGroup>
          </Form>

          <Nav className="ms-auto align-items-center">
            <Nav.Link as={Link} to="/" className="nav-link me-3">
              <FaHome className="me-1" />
              <span className="d-none d-lg-inline">Home</span>
            </Nav.Link>
            
            <Nav.Link as={Link} to="/products" className="nav-link me-3">
              Products
            </Nav.Link>
            
            {isAuthenticated ? (
              <>
                <Nav.Link as={Link} to="/wishlist" className="nav-link me-3">
                  <FaHeart className="text-danger" />
                </Nav.Link>
                
                <Nav.Link as={Link} to="/cart" className="nav-link me-3 position-relative">
                  <FaShoppingCart size={20} />
                  {getCartItemCount() > 0 && (
                    <span className="cart-badge-modern">
                      {getCartItemCount()}
                    </span>
                  )}
                </Nav.Link>
                
                <Dropdown align="end">
                  <Dropdown.Toggle 
                    variant="link" 
                    className="nav-link text-decoration-none border-0 shadow-none"
                    id="user-dropdown"
                  >
                    <div className="d-flex align-items-center">
                      <div 
                        className="rounded-circle bg-primary text-white d-flex align-items-center justify-center me-2"
                        style={{ width: '35px', height: '35px', fontSize: '0.875rem' }}
                      >
                        {user?.first_name?.charAt(0) || 'U'}
                      </div>
                      <span className="d-none d-md-inline fw-medium">
                        {user?.first_name || 'Account'}
                      </span>
                    </div>
                  </Dropdown.Toggle>

                  <Dropdown.Menu className="shadow-lg border-0" style={{ minWidth: '200px' }}>
                    <Dropdown.Header className="bg-light">
                      <strong>{user?.first_name} {user?.last_name}</strong>
                      <div className="small text-muted">{user?.email}</div>
                    </Dropdown.Header>
                    <Dropdown.Divider />
                    <Dropdown.Item as={Link} to="/profile" className="py-2">
                      <FaUser className="me-2" />
                      My Profile
                    </Dropdown.Item>
                    <Dropdown.Item as={Link} to="/orders" className="py-2">
                      <FaShoppingCart className="me-2" />
                      My Orders
                    </Dropdown.Item>
                    <Dropdown.Item as={Link} to="/wishlist" className="py-2">
                      <FaHeart className="me-2" />
                      Wishlist
                    </Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item onClick={handleLogout} className="py-2 text-danger">
                      Logout
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/login" className="nav-link me-2">
                  Login
                </Nav.Link>
                <Link to="/register" className="btn btn-primary btn-sm">
                  Sign Up
                </Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
