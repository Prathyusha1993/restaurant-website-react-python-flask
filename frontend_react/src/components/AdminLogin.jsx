import React, { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";

const AdminLogin = () => {
    const [loginData, setLoginData] = useState({username:'', password:''});

    const handleChange = (e) => {
        setLoginData((prev) => ({...prev, [e.target.name]: e.target.value}));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(loginData);
    }
  return (
    <Container style={{marginTop:'50px', justifyContent:'center', width:'400px'}}>
      <Form onSubmit={handleSubmit} >
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Username</Form.Label>
          <Form.Control type="email" placeholder="Enter Username" name='username' value={loginData.username} onChange={handleChange} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" name='password' value={loginData.password} onChange={handleChange} />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  );
};

export default AdminLogin;
