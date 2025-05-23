import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useLocation, useNavigate } from "react-router";

function Header() {
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const location = useLocation();     //detects the route change
  const navigate = useNavigate();

  useEffect(() => {
    const checkAdmin = localStorage.getItem('isAdmin') === 'true';
    setIsAdminLoggedIn(checkAdmin);
  }, [location]);    //runs every time route changes

  const handleLogout = () => {
    localStorage.removeItem('isAdmin');
    setIsAdminLoggedIn(false);
    navigate('/')
  }

  return (
    <>
    {/*  <div style={{ backgroundColor: "#03384b", color: "white", padding: "20px" }}> */}
      <Navbar  bg="light" data-bs-theme="light">
        <Container>
          <Navbar.Brand href="/">Aha Biryani's</Navbar.Brand>
          <Nav className="me-auto justify-content-end flex-grow-1 pe-3">
          {/* <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-success">Search</Button>
          </Form> */}
            <Nav.Link href="/">About US</Nav.Link>
            <Nav.Link href="/menu">Our Menu</Nav.Link>
            <Nav.Link href="/catering">Catering</Nav.Link>
            <Nav.Link href="/contact">Contact</Nav.Link>
          </Nav>
          <Nav>
            {isAdminLoggedIn ? (
              // <Button variant="outline-danger" onClick={handleLogout}>Logout</Button>
              <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
            ) : (
              <Nav.Link href="/admin-login">Admin Login</Nav.Link>
            )}
          </Nav>
        </Container>
      </Navbar>
      {/* </div> */}
    </>
  );
}

export default Header;
