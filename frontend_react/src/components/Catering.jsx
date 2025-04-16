import React from 'react'
import {Carousel, Container, Row, Col, Card, Form, Button, Accordion} from 'react-bootstrap'

function Catering() {
    const cateringImages = [
        "/images/catering-pic1.jpg",
        "/images/catering-pic2.jpeg",
        "/images/catering-pic3.webp",
        "/images/catering-pic4.jpg",
        "/images/catering-pic5.jpg",
        "/images/catering-pic6.jpg",
    ]
  return (
    <>
    <Container fluid className='px-0'>
    <Carousel fade className='mb-4 catering-carousel'>
        {cateringImages.map((image, index) => (
            <Carousel.Item key={index}>
            <img src={image}
            className='d-block w-100 catering-carousel-img'
            alt={`catering slide ${index+1}`} />
            <Carousel.Caption className='catering-caption'>
              <h3>Catering for All Occasions</h3>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
    </Carousel>

    {/* what we offer */}
    <Container className='mb-5'>
        <h2 className='text-center mb-4'>What We Offer</h2>
        <Row>
            <Col md={4}>
                <Card>
                    <Card.Img variant='top' src='https://images.unsplash.com/photo-1680359870819-22556317ce22?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'/>
                        <Card.Body>
                            <Card.Title>Delicious Items</Card.Title>
                            <Card.Text>
                                Our catering menu includes a variety of biryanis, shawarmas, tandooris and desserts.
                            </Card.Text>
                        </Card.Body>
                </Card>
            </Col>
            <Col md={4}>
            <Card>
                <Card.Img variant='top' src='https://plus.unsplash.com/premium_photo-1680291971376-ccc54aacb22b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'/>
                <Card.Body>
                <Card.Title>Professional Chefs</Card.Title>
                <Card.Text>
                  Experienced chefs who deliver quality and taste consistently for any size of event.
                </Card.Text>
              </Card.Body>
            </Card>
            </Col>
            <Col md={4}>
            <Card>
              <Card.Img variant="top" src="https://images.unsplash.com/photo-1504674900247-0877df9cc836" />
              <Card.Body>
                <Card.Title>Custom Packages</Card.Title>
                <Card.Text>
                  We offer packages that suit your needs and budget for weddings, birthdays, or corporate events.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
    </Container>

    {/* Menu Highlights */}
    <Container className='mb-5'>
        <h2 className='text-center mb-4'>Menu Highlights</h2>
        <Row>
        {["Chicken Biryani", "Paneer Shawarma", "Tandoori Platter"].map((item, idx) => (
          <Col md={4} key={idx} className="mb-4">
            <Card>
              <Card.Img
                variant="top"
                src={`https://dummyimage.com/400x250/cccccc/000000.png&text=${encodeURIComponent(item)}`}
              />
              <Card.Body>
                <Card.Title>{item}</Card.Title>
                <Card.Text>
                  Perfect for all kinds of gatherings and loved by everyone.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
        </Row>
    </Container>

    {/* Booking form and order online */}
    <Container className='mb-5'>
        <Row>
            <Col md={6} className='text-center d-flex flex-column justify-content-center'>
            <h3>Want to plan an event</h3>
            <Button variant='primary' size='lg' className='mt-3'>Order Online</Button>
            </Col>
            <Col md={6}>
            <h3 className='mb-3'>Booking Form</h3>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" placeholder="Enter your name" />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder="Enter email" />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Phone</Form.Label>
                <Form.Control type="text" placeholder="Phone number" />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Event Date</Form.Label>
                <Form.Control type="date" />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Number of Guests</Form.Label>
                <Form.Control type="number" />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Message</Form.Label>
                <Form.Control as="textarea" rows={3} placeholder="Tell us more about your event" />
              </Form.Group>
              <Button variant="success" type="submit">Submit</Button>
            </Form>
            </Col>
        </Row>
    </Container>
    </Container>
    </>
  )
}

export default Catering