import React, { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { useNavigate } from "react-router";
import { BASE_URL } from "../App";

const AdminLogin = () => {
    const [loginData, setLoginData] = useState({username:'', password:''});
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setLoginData((prev) => ({...prev, [e.target.name]: e.target.value}));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log(loginData);
        try {
            const response = await fetch(BASE_URL + 'admin-login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body:JSON.stringify(loginData),
            })
            const data = await response.json();
            if(response.ok && data.isAdmin) {
                localStorage.setItem('isAdmin', 'true');
                navigate('/menu');
            }
        } catch(err) {
            setError(data.message || 'Invalid username and password');
        }
    }

  return (
    <Container style={{marginTop:'50px', justifyContent:'center', width:'400px'}}>
      <Form onSubmit={handleSubmit} >
        <h4 className="mb-3">Admin Login</h4>
        {error && <p className="text-danger">{error}</p>}
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Username</Form.Label>
          <Form.Control type="text" placeholder="Enter Username" name='username' value={loginData.username} onChange={handleChange} />
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
