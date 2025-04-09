import React from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
import Footer from "./Footer";

function Aboutus() {
  const galleryImages = [
    "gallery-chicken-shawarma.jpg",
    "gallery-Mutton-Biryani.webp",
    "gallery-starter-chicken.jpg",
    "gallery-tandoori-paneer.jpg",
  ];

  return (
    <>
      <Container className="p-0 w-100" style={{marginTop:'10px'}}>
        {/* Hero Section */}
        <Row className="g-0 w-100">
          <Col className="p-0 w-100">
            <div
              className="position-relative w-100"
              style={{ overflow: "hidden" }}
            >
              <img
                src="/images/About-us-page.jpg"
                className="w-100"
                style={{
                  height: "400px",
                  objectFit: "cover",
                  filter: "brightness(60%)",
                  margin: 0,
                  width: "100%",
                }}
                alt="aboutus page"
              />
              <div className="position-absolute top-50 start-50 translate-middle">
                <h1 className="display-4 fw-bold">About Us</h1>
                <p className="lead">Serving passion on a plate since 2025</p>
              </div>
            </div>
          </Col>
        </Row>

        {/* Our Story */}
        <Row className="align-items-center mb-5">
          <Col md={6}>
            <Image
              src="/images/about-us-story.jpeg"
              alt="about us story"
              style={{ marginTop: "30px", width: "100%", objectFit: "cover" }}
              fluid
              rounded
            />
          </Col>
          <Col md={6}>
            <h2>Our Story</h2>
            <p>
              At Aha Biryani's, we blend tradition and innovation to bring you
              the best of Biryani, Shawarma, and Tandoori delicacies. Our chefs
              use fresh, locally sourced ingredients to craft dishes full of
              flavor and warmth.
            </p>
            <p>
              Aha Biryani's was born out of weekend gatherings where biryani
              simmered slowly, shawarma was grilled to perfection, and laughter
              filled the air. What started in a small home kitchen quickly grew
              into a full-fledged dream when friends and neighbors insisted we
              share our recipes with the world.
            </p>
            <p>
              Every dish tells a story — from the hand-ground spices in our
              biryani to the secret garlic sauce on our shawarma wraps. We
              believe food isn’t just about taste — it’s about connection,
              celebration, and culture. At SAha Biryani's, we invite you to pull
              up a chair, savor every bite, and become part of our flavorful
              story.
            </p>
          </Col>
        </Row>

        {/* Meet Our Chef */}
        {/* <Row className="align-items-center">
        <Col md={6} className="order-md-2">
          <Image 
            src="https://source.unsplash.com/600x400/?chef,portrait" 
            fluid 
            rounded 
          />
        </Col>
        <Col md={6} className="order-md-1">
          <h2>Meet Our Chef</h2>
          <p>
            Chef Aamir brings over 15 years of culinary experience from the kitchens of Hyderabad to your plate. He leads a passionate team dedicated to delivering mouth-watering flavors in every bite.
          </p>
        </Col>
      </Row> */}

        {/* Gallery */}
        <Row className="text-center">
          <Col>
            <h2 className="mb-4">Gallery</h2>
          </Col>
        </Row>
        <Row className="g-3">
          {galleryImages.map((img, index) => (
            <Col md={3} key={index}>
              <Image
                src={`/images/${img}`}
                style={{ height: "250px", objectFit: "cover", width: "100%" }}
                fluid
                rounded
                alt={`Gallery image ${index + 1}`}
              />
            </Col>
          ))}
        </Row>
      </Container>
      <Footer />
    </>
  );
}

export default Aboutus;
