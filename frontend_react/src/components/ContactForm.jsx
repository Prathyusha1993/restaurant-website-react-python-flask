import React, { useState } from 'react'
import { Container, Button, Form } from 'react-bootstrap'

function ContactForm() {
    const [contactForm, setContactForm] = useState({
        name:'',
        email:'',
        phone:'',
        message:''
    })
    const [loading, setLoading] = useState(false)
    const [errors, setErrors] = useState({})

    const handleChange = (e) => {
        const {name, value} = e.target;
        setContactForm((prev) => ({
            ...prev,
            [name]: value
        }))
        setErrors(prev => ({...prev, [name]:'' }));;
    }

    const validateForm = () => {
        const newErrors = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if(!contactForm.name.trim()) newErrors.name = 'Name is required';
        if(!emailRegex.test(contactForm.email)) newErrors.email = 'Valid email is required';
        if(!contactForm.phone.trim()) newErrors.phone = 'Phone number is required';
        if(!contactForm.message.trim()) newErrors.message = 'Message is required';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }

    const handleContactSubmitForm = async (e) => {
        e.preventDefault();

        const isValid = validateForm();
        if(!isValid) return;
    }

  return (
    <>
        <div style={{backgroundImage: `url('/images/contact-us-banner2.jpg')` }} className='contact-us-banner'>
            <h2>Contact Us</h2>
            <p>We'd love to hear from you</p>
        </div>

        {/* contact form */}
        <Container className='mb-5'>
            <h2>Get In Touch</h2>
            <p>For general inquires, please send us a message using the form below and we'll get back to you as quickly as possible.</p>
            {/* <p>get back to you as quickly as possible.</p> */}
            <Form noValidate onSubmit={handleContactSubmitForm}>
                <Form.Group className='mb-3' controlId='contactName'>
                    <Form.Label>Name:</Form.Label>
                    <Form.Control 
                    type='text'
                    name='name'
                    value={contactForm.name}
                    onChange={handleChange}
                    isInvalid={!!errors.name}
                    placeholder='Enter Your Full Name' />
                    <Form.Control.Feedback type='invalid'>{errors.name}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group className='mb-3' controlId='contactName'>
                    <Form.Label>Email:</Form.Label>
                    <Form.Control 
                    type='email'
                    name='email'
                    value={contactForm.email}
                    onChange={handleChange}
                    isInvalid={!!errors.email}
                    placeholder='Enter Your Email Address' />
                    <Form.Control.Feedback type='invalid'>{errors.email}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group className='mb-3' controlId='contactName'>
                    <Form.Label>Phone:</Form.Label>
                    <Form.Control 
                    type='tel'
                    name='phone'
                    value={contactForm.phone}
                    onChange={handleChange}
                    isInvalid={!!errors.phone}
                    placeholder='Enter Your Phone Number' />
                    <Form.Control.Feedback type='invalid'>{errors.phone}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group className='mb-3' controlId='contactName'>
                    <Form.Label>Message:</Form.Label>
                    <Form.Control 
                    as='textarea'
                    name='message'
                    value={contactForm.message}
                    onChange={handleChange}
                    isInvalid={!!errors.message}
                    placeholder='Enter Your Message' />
                    <Form.Control.Feedback type='invalid'>{errors.message}</Form.Control.Feedback>
                </Form.Group>

                <Button variant='primary' type='submit' disabled={loading}>{loading ? 'Submitting' : 'Submit'}</Button>
            </Form>
        </Container>
    </>
  )
}

export default ContactForm