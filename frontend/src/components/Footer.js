import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { 
  FaFacebookF, 
  FaTwitter, 
  FaInstagram, 
  FaLinkedin, 
  FaYoutube,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaCreditCard,
  FaShieldAlt
} from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer-modern">
      <Container>
        {/* Main Footer Content */}
        <Row className="py-5">
          {/* Brand Column */}
          <Col lg={4} md={6} className="mb-4">
            <div className="mb-3">
              <h3 className="fw-bold text-white mb-3">ElectroMart</h3>
              <p className="text-light opacity-75 mb-3">
                Your trusted destination for cutting-edge electronics and technology. 
                We deliver quality products with exceptional service.
              </p>
            </div>
            
            {/* Social Links */}
            <div className="d-flex gap-3 mb-4">
              {[
                { icon: FaFacebookF, href: '#', color: '#1877f2' },
                { icon: FaTwitter, href: '#', color: '#1da1f2' },
                { icon: FaInstagram, href: '#', color: '#e4405f' },
                { icon: FaLinkedin, href: '#', color: '#0077b5' },
                { icon: FaYoutube, href: '#', color: '#ff0000' }
              ].map((social, index) => (
                <Button
                  key={index}
                  href={social.href}
                  variant="outline-light"
                  size="sm"
                  className="rounded-circle d-flex align-items-center justify-content-center"
                  style={{ width: '40px', height: '40px', borderColor: social.color }}
                >
                  <social.icon />
                </Button>
              ))}
            </div>

            {/* Trust Badges */}
            <div className="d-flex gap-3">
              <div className="d-flex align-items-center gap-2 text-light opacity-75">
                <FaShieldAlt />
                <small>Secure Shopping</small>
              </div>
              <div className="d-flex align-items-center gap-2 text-light opacity-75">
                <FaCreditCard />
                <small>Safe Payments</small>
              </div>
            </div>
          </Col>

          {/* Quick Links */}
          <Col lg={2} md={6} className="mb-4">
            <h5 className="fw-bold text-white mb-3">Quick Links</h5>
            <ul className="list-unstyled">
              {[
                { text: 'Home', link: '/' },
                { text: 'Products', link: '/products' },
                { text: 'Categories', link: '/categories' },
                { text: 'Deals', link: '/deals' },
                { text: 'About Us', link: '/about' },
                { text: 'Contact', link: '/contact' }
              ].map((item, index) => (
                <li key={index} className="mb-2">
                  <Link to={item.link} className="text-decoration-none">
                    {item.text}
                  </Link>
                </li>
              ))}
            </ul>
          </Col>

          {/* Categories */}
          <Col lg={2} md={6} className="mb-4">
            <h5 className="fw-bold text-white mb-3">Categories</h5>
            <ul className="list-unstyled">
              {[
                'Smartphones',
                'Laptops',
                'Headphones',
                'Gaming',
                'Cameras',
                'Accessories'
              ].map((category, index) => (
                <li key={index} className="mb-2">
                  <Link to={`/products?category=${index + 1}`} className="text-decoration-none">
                    {category}
                  </Link>
                </li>
              ))}
            </ul>
          </Col>

          {/* Customer Service */}
          <Col lg={2} md={6} className="mb-4">
            <h5 className="fw-bold text-white mb-3">Support</h5>
            <ul className="list-unstyled">
              {[
                { text: 'Help Center', link: '/help' },
                { text: 'Returns', link: '/returns' },
                { text: 'Shipping Info', link: '/shipping' },
                { text: 'Size Guide', link: '/size-guide' },
                { text: 'Track Order', link: '/track-order' },
                { text: 'FAQ', link: '/faq' }
              ].map((item, index) => (
                <li key={index} className="mb-2">
                  <Link to={item.link} className="text-decoration-none">
                    {item.text}
                  </Link>
                </li>
              ))}
            </ul>
          </Col>

          {/* Contact Info */}
          <Col lg={2} md={6} className="mb-4">
            <h5 className="fw-bold text-white mb-3">Contact</h5>
            <ul className="list-unstyled">
              <li className="mb-3 d-flex align-items-start gap-2">
                <FaMapMarkerAlt className="mt-1 text-primary" />
                <div>
                  <div className="text-light opacity-75 small">
                    123 Tech Street<br />
                    Mumbai, MH 400001<br />
                    India
                  </div>
                </div>
              </li>
              <li className="mb-3 d-flex align-items-center gap-2">
                <FaPhone className="text-primary" />
                <a href="tel:+911234567890" className="text-decoration-none">
                  +91 12345 67890
                </a>
              </li>
              <li className="mb-3 d-flex align-items-center gap-2">
                <FaEnvelope className="text-primary" />
                <a href="mailto:support@electromart.com" className="text-decoration-none">
                  support@electromart.com
                </a>
              </li>
            </ul>
          </Col>
        </Row>

        {/* Newsletter Subscription */}
        <Row className="py-4 border-top border-secondary">
          <Col lg={8}>
            <h5 className="fw-bold text-white mb-2">Stay Updated</h5>
            <p className="text-light opacity-75 mb-3">
              Subscribe to get special offers, free giveaways, and exclusive deals.
            </p>
          </Col>
          <Col lg={4}>
            <div className="d-flex gap-2">
              <input
                type="email"
                className="form-control"
                placeholder="Enter your email"
                style={{ borderRadius: '25px', border: 'none' }}
              />
              <Button
                variant="primary"
                className="px-4"
                style={{ borderRadius: '25px', minWidth: '100px' }}
              >
                Subscribe
              </Button>
            </div>
          </Col>
        </Row>

        {/* Bottom Footer */}
        <Row className="py-3 border-top border-secondary align-items-center">
          <Col md={6} className="text-center text-md-start">
            <p className="mb-0 text-light opacity-75">
              © {currentYear} ElectroMart. All rights reserved.
            </p>
          </Col>
          <Col md={6} className="text-center text-md-end">
            <div className="d-flex justify-content-center justify-content-md-end gap-3">
              <Link to="/privacy" className="text-decoration-none small">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-decoration-none small">
                Terms of Service
              </Link>
              <Link to="/cookies" className="text-decoration-none small">
                Cookie Policy
              </Link>
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
