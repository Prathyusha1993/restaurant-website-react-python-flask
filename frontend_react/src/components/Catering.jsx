import React from 'react'
import {Carousel, Container, Row, Col, Card, Form, Button, Accordion} from 'react-bootstrap'
import ModalForm from './ModalForm'
import Footer from './Footer'

function Catering() {
    const cateringImages = [
        "/images/catering-pic1.jpg",
        "/images/catering-pic2.jpeg",
        "/images/catering-pic3.webp",
        "/images/catering-pic4.jpg",
        "/images/catering-pic5.jpg",
        "/images/catering-pic6.jpg",
    ]

    const menuHighlights = [
        {
            title: 'Chicken Biryani',
            img: '/images/Chicken-Biryani-menu-highlight.jpg',
        },
        {
            title: 'Paneer Shawarma',
            img: '/images/paneer-shawarma-menu-highlight.jpg',
        },
        {
            title: 'Tandoori Platter',
            img: '/images/tandoori_platter-menu-highlight.avif',
        }
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
        {menuHighlights.map((item, idx) => (
          <Col md={4} key={idx} className="mb-4">
            <Card>
              <Card.Img
                variant="top"
                src={item.img}
                style={{ height: '350px', objectFit: 'cover' }}
              />
              <Card.Body>
                <Card.Title>{item.title}</Card.Title>
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
    <ModalForm />

    {/* catering menu pdf download */}
    <div className='text-center mb-5'>
        <a href='http://127.0.0.1:5000/static/downloads/menu.pdf' 
        download
        target='_blank'
        rel='noopener noreferrer'
        className='btn btn-outline-secondary'>
            Download Full Catering Menu (PDF)
        </a>
    </div>

    {/* FAQ's */}
    <Container className='mb-5'>
        <h2 className='text-center mb-4'>
            <Accordion>
                <Accordion.Item eventKey="0">
                    <Accordion.Header>Do you offer vegetarian options?</Accordion.Header>
                    <Accordion.Body style={{fontSize:'16px'}}>
                        Yes, we have a wide variety of vegetarian dishes like Veg Birayni, Paneer Shawarma, and Tandoori Veg Platters. 
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
            <Accordion.Header>How early should I book catering for my event?</Accordion.Header>
            <Accordion.Body style={{fontSize:'16px'}}>
              We recommend booking at least 2 weeks in advance to ensure availability and proper planning.
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="2">
            <Accordion.Header>Do you deliver and set up at the event location?</Accordion.Header>
            <Accordion.Body style={{fontSize:'16px'}}>
              Yes, we provide full delivery and setup services for all catering bookings.
            </Accordion.Body>
          </Accordion.Item>
            </Accordion>
        </h2>
    </Container>
    </Container>
    <Footer />
    </>
  )
}

export default Catering