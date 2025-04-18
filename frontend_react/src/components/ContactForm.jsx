import React, { useState } from "react";
import { Container, Button, Form, Row, Col } from "react-bootstrap";
import Footer from "./Footer";
import { BASE_URL } from "../App";

function ContactForm() {
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContactForm((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!contactForm.name.trim()) newErrors.name = "Name is required";
    if (!emailRegex.test(contactForm.email))
      newErrors.email = "Valid email is required";
    if (!contactForm.phone.trim()) newErrors.phone = "Phone number is required";
    if (!contactForm.message.trim()) newErrors.message = "Message is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleContactSubmitForm = async (e) => {
    e.preventDefault();

    const isValid = validateForm();
    if (!isValid) return;

    setLoading(true);
    try{
        const response = await fetch(BASE_URL + 'contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body:JSON.stringify(contactForm),
        })
        if(!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        setContactForm(data)
        alert("Message sent successfully");
        setContactForm({name:'', email:'', phone:'', message:''})
    }
    catch(error){
        console.error('Error submitting form:', error);
        alert('Error submitting form. Please try again later.');
    }
    finally {
        setLoading(false);
    }
  };

  return (
    <>
      <div
        style={{ backgroundImage: `url('/images/contact-us-banner2.jpg')` }}
        className="contact-us-banner"
      >
        <h2>Contact Us</h2>
        <p style={{ fontSize: "26px" }}>We'd love to hear from you</p>
      </div>

      {/* contact form */}
      <Container className="mb-5" style={{ marginTop: "40px" }}>
        <h2 className="text-center mb-3">Get In Touch</h2>
        <p className="text-center mb-3">
          For general inquires, please send us a message using the form below
          and we'll get back to you as quickly as possible.
        </p>
        {/* <p>get back to you as quickly as possible.</p> */}
        <Row className="justify-content-center">
          <Col md={6}>
            <Form noValidate onSubmit={handleContactSubmitForm}>
              <Form.Group className="mb-3" controlId="contactName">
                <Form.Label>Name:</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={contactForm.name}
                  onChange={handleChange}
                  isInvalid={!!errors.name}
                  placeholder="Enter Your Full Name"
                />
                <Form.Control.Feedback type="invalid">
                  {errors.name}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3" controlId="contactEmail">
                <Form.Label>Email:</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={contactForm.email}
                  onChange={handleChange}
                  isInvalid={!!errors.email}
                  placeholder="Enter Your Email Address"
                />
                <Form.Control.Feedback type="invalid">
                  {errors.email}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3" controlId="contactPhone">
                <Form.Label>Phone:</Form.Label>
                <Form.Control
                  type="tel"
                  name="phone"
                  value={contactForm.phone}
                  onChange={handleChange}
                  isInvalid={!!errors.phone}
                  placeholder="Enter Your Phone Number"
                />
                <Form.Control.Feedback type="invalid">
                  {errors.phone}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3" controlId="contactMessage">
                <Form.Label>Message:</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={4}
                  name="message"
                  value={contactForm.message}
                  onChange={handleChange}
                  isInvalid={!!errors.message}
                  placeholder="Enter Your Message"
                />
                <Form.Control.Feedback type="invalid">
                  {errors.message}
                </Form.Control.Feedback>
              </Form.Group>
              {/* <div className='d-grid'> */}
              <Button variant="primary" type="submit" disabled={loading}>
                {loading ? "Submitting" : "Send Message"}
              </Button>
              {/* </div> */}
            </Form>
          </Col>
        </Row>
      </Container>

      {/* contact info and google maps */}
      <Container>
        <Row className="mt-5">
          <Col md={6}>
            <h5>Our Location</h5>
            <p>7th Main Road Mico Layout, NS Palya, BTM 2nd Stage,</p>
            <p> Benagluru, Karnataka 560076, India</p>
            <p>Email: hello@ahabiryanis.com</p>
            <p>Phone: +91-9876543210</p>
          </Col>
          <Col md={6}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3889.0115483909603!2d77.60131329678956!3d12.906978800000003!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae15007a02d3b5%3A0xc17c7a9e696dda61!2sGowdru%20Naati%20Mane!5e0!3m2!1sen!2sus!4v1744951540717!5m2!1sen!2sus"
              width="100%"
              height="300"
              style={{ border: 0 }}
              allowfullscreen=""
              loading="lazy"
              // referrerpolicy="no-referrer-when-downgrade"
            ></iframe>
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
}

export default ContactForm;
