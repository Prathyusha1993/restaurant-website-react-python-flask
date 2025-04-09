import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function Header() {
  return (
    <>
    {/* <div style={{ backgroundColor: "#03384b", color: "white", padding: "20px" }}> */}
      <Navbar bg="light" data-bs-theme="light">
        <Container>
          <Navbar.Brand href="#home">Aha Biryani's</Navbar.Brand>
          <Nav className="me-auto justify-content-end flex-grow-1 pe-3">
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-success">Search</Button>
          </Form>
            <Nav.Link href="#home">About US</Nav.Link>
            <Nav.Link href="#features">Our Menu</Nav.Link>
            <Nav.Link href="#pricing">Catering</Nav.Link>
            <Nav.Link href="#pricing">Contact</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      {/* </div> */}
    </>
  );
}

export default Header;
