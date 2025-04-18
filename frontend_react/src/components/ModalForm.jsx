import React, { useState } from 'react'
import { Button, Row, Col, Container, Modal, Form } from 'react-bootstrap'
import { BASE_URL } from '../App';

function ModalForm() {
    const [showModal, setShowModal] = useState(false);
    const [inquireFormData, setInquireFormData] = useState({
        name: '',
        email:'',
        phone: '',
        date: '',
        time: '',
        number_of_guests: '',
        message:''
    })
    const [loading, setLoading] = useState(false)
    const [errors, setErrors] = useState({})

    const handleChange = (e) => {
        const {name, value} = e.target;
        setInquireFormData((prev) => ({
            ...prev,
            [name]: value
        }))
        setErrors(prev => ({...prev, [name]: '' }));
    };

    const validateForm = () => {
        const newErrors = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if(!inquireFormData.name.trim()) newErrors.name = 'Name is required';
        if(!emailRegex.test(inquireFormData.email)) newErrors.email = 'Valid email is required';
        if(!inquireFormData.phone.trim()) newErrors.phone = 'Phone number is required';
        if(!inquireFormData.date) newErrors.date = 'Event Date is required';
        if(!inquireFormData.time) newErrors.time = 'Event Time is required';
        if(!inquireFormData.number_of_guests || inquireFormData.number_of_guests < 1) newErrors.number_of_guests = 'Number of guests is required';
        if(!inquireFormData.message.trim()) newErrors.message = 'Message is required';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const isValid = validateForm();
        if(!isValid) return;

        setLoading(true);
        try {
            const response = await fetch(BASE_URL + 'inquire', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(inquireFormData),
            });
            if (!response.ok){
                throw new Error(`Error: ${response.status} ${response.statusText}`);
            }

            const data = await response.json();
            setInquireFormData(data)
            alert('Your form has been submitted successfully!');
            setInquireFormData({name:'', email:'', phone:'', date:'', time:'', number_of_guests:'', message:''});
            setShowModal(false);
        }
        catch(error){
            console.error('Error submitting form:', error);
            alert('Submission failed. Please try again later.');
        }
        finally{
            setLoading(false);
        }
    }

  return (
    <>
      <Container className="mb-5 text-center d-flex flex-column justify-content-center">
        <Row>
        <h3>Want to plan an event</h3>
          <Col
            md={6}
            className='text-center d-flex flex-column justify-content-center'
          >
            <Button variant="light" href='/menu' style={{backgroundColor:'GrayText', color:'white'}}>
              ORDER ONLINE
            </Button>
          </Col>
          <Col md={6} className='text-center d-flex flex-column justify-content-center'>
          <Button variant="light" style={{backgroundColor:'GrayText', color:'white'}} onClick={() => setShowModal(true)}>INQUIRE NOW</Button>
          </Col>
        </Row>

        <Container>
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Book Catering</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form noValidate onSubmit={handleSubmit}>
                        <Form.Group className='mb-3' controlId='formName'>
                            <Form.Label>Name:</Form.Label>
                            <Form.Control 
                            type='text' 
                            placeholder='Enter your name'
                            name='name'
                            value={inquireFormData.name}
                            onChange={handleChange}
                            isInvalid={!!errors.name} />
                            <Form.Control.Feedback type='invalid'>{errors.name}</Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className='mb-3' controlId='formEmail'>
                            <Form.Label>Email:</Form.Label>
                            <Form.Control 
                            type='email' 
                            placeholder='Enter email'
                            name='email'
                            value={inquireFormData.email}
                            onChange={handleChange}
                            isInvalid={!!errors.email} />
                            <Form.Control.Feedback type='invalid'>{errors.email}</Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className='mb-3' controlId='formPhone'>
                            <Form.Label>Phone:</Form.Label>
                            <Form.Control 
                            type='tel' 
                            placeholder='Phone Number'
                            name = 'phone'
                            value={inquireFormData.phone}
                            onChange={handleChange}
                            isInvalid={!!errors.phone} />
                            <Form.Control.Feedback type='invalid'>{errors.phone}</Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className='mb-3' controlId='formDate'>
                            <Form.Label>Event Date:</Form.Label>
                            <Form.Control 
                            type='date'
                            name='date'
                            value={inquireFormData.date}
                            onChange={handleChange}
                            isInvalid={!!errors.date} />
                            <Form.Control.Feedback type='invalid'>{errors.date}</Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className='mb-3' controlId='formTime'>
                            <Form.Label>Event Time:</Form.Label>
                            <Form.Control 
                            type='time'
                            name='time'
                            value={inquireFormData.time}
                            onChange={handleChange}
                            isInvalid={!!errors.time} />
                            <Form.Control.Feedback type='invalid'>{errors.time}</Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className='mb-3' controlId='formGuests'>
                            <Form.Label>Number of Guests:</Form.Label>
                            <Form.Control 
                            type='number' min='1'
                            name='number_of_guests'
                            value={inquireFormData.number_of_guests}
                            onChange={handleChange}
                            isInvalid={!!errors.number_of_guests} />
                            <Form.Control.Feedback type='invalid'>{errors.number_of_guests}</Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className='mb-3' controlId='formMessage'>
                            <Form.Label>Message:</Form.Label>
                            <Form.Control as='textarea' rows={3}
                            name='message'
                            value={inquireFormData.message}
                            onChange={handleChange} 
                            isInvalid={!!errors.message}/>
                            <Form.Control.Feedback type='invalid'>{errors.message}</Form.Control.Feedback>
                        </Form.Group>

                        <Button variant='primary' type='submit' disabled={loading}>{loading ? 'Submitting...': 'Submit'}</Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </Container>
      </Container>
    </>
  );
}

export default ModalForm