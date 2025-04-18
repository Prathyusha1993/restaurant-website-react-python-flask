import React from 'react'
import { Container, Row, Col } from 'react-bootstrap';

function Footer() {
  return (
    <footer className="bg-light text-black py-4" style={{ marginTop:'70px',  bottom: 0, width: "100%" }}>
      <Container>
        <Row>
          <Col md={4}>
            <h5>About Us</h5>
            <p>
              Welcome to our restaurant! We serve delicious food with the best quality ingredients. Visit us for an unforgettable dining experience.
            </p>
          </Col>
          <Col md={4}>
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li><a href="/" className="text-black text-decoration-none">About Us</a></li>
              <li><a href="/menu" className="text-black text-decoration-none">Our Menu</a></li>
              <li><a href="/catering" className="text-black text-decoration-none">Catering</a></li>
              <li><a href="/contact" className="text-black text-decoration-none">Contact</a></li>
            </ul>
          </Col>
          <Col md={4}>
            <h5>Contact Us</h5>
            <p>
              Address: 7th Main Road Mico Layout, NS Palya, BTM 2nd Stage, Benagluru, Karnataka 560076, India<br />
              Phone: +1 234 567 890<br />
              Email: info@restaurant.com
            </p>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col className="text-center">
            <p className="mb-0">&copy; {new Date().getFullYear()} Aha Biryani's. All rights reserved.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  )
}

export default Footer