import React, { useState } from "react";
import { Button, Container, Row, Col, Form, Modal } from "react-bootstrap";
import { BASE_URL } from "../App";

const AddMenu = ({onMenuAdded}) => {
  const [showModal, setShowModal] = useState(false);
  const [menuFormData, setMenuFormData] = useState({
    name: "",
    price: "",
    description: "",
    img_url: "",
    veg: null,
    spicy: null,
    category: "",
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const isAdmin = localStorage.getItem("isAdmin") === "true";

  const validateForm = () => {
    const newErrors = {};

    if (!menuFormData.name.trim()) newErrors.name = "Name is required";
    if (!menuFormData.price.trim()) newErrors.price = "Price is required";
    if (!menuFormData.description.trim())
      newErrors.description = "Description is required";
    if (!menuFormData.img_url) newErrors.img_url = "Image URL is required";
    if (menuFormData.veg === null) newErrors.veg = "Veg Selection is required";
    if (menuFormData.spicy === null) newErrors.spicy = "Spicy selection is required";
    if (!menuFormData.category.trim())
      newErrors.category = "Category is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setMenuFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = validateForm();
    if (!isValid) return;
  
    const formattedData = {
      ...menuFormData,
      price: parseFloat(menuFormData.price),
      veg: menuFormData.veg === true ? 1 : 0,
      spicy: menuFormData.spicy === true ? 1 : 0,
    };
  
    setLoading(true);
    try {
      const response = await fetch(BASE_URL + "menu", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formattedData),
      });

    //   console.log('Response status:', response.status);
    //   console.log('Response body:', await response.text());

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }
  
      const data = await response.json();
      alert("Menu item has been added successfully");
      setMenuFormData({
        name: "",
        price: "",
        description: "",
        img_url: "",
        veg: null,
        spicy: null,
        category: "",
      });
      setShowModal(false);

      if(onMenuAdded){
        onMenuAdded();
      }
    } catch (error) {
      console.log("Error submitting form", error);
      alert("Submission failed. Please try again");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* <Container className="mb-5 text-center d-flex flex-column justify-content-center">
        <Row>
          <Col>
            {isAdmin && (
              <Button
                variant="outline-primary"
                onClick={() => setShowModal(true)}
              >
                Add Menu Item
              </Button>
            )}
          </Col>
        </Row>
      </Container> */}

      <Container>
        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Add New Menu Item</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form noValidate onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formName">
                <Form.Label>Name:</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter menu name"
                  name="name"
                  value={menuFormData.name}
                  onChange={handleChange}
                  isInvalid={!!errors.name}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.name}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formPrice">
                <Form.Label>Price:</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter price"
                  name="price"
                  value={menuFormData.price}
                  onChange={handleChange}
                  isInvalid={!!errors.price}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.price}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formDescription">
                <Form.Label>Description:</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Description"
                  name="description"
                  value={menuFormData.description}
                  onChange={handleChange}
                  isInvalid={!!errors.description}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.description}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formImage">
                <Form.Label>Image URL:</Form.Label>
                <Form.Control
                  type="text"
                  name="img_url"
                  value={menuFormData.img_url}
                  onChange={handleChange}
                  isInvalid={!!errors.img_url}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.img_url}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formVeg">
                <Form.Label>Veg</Form.Label>
                <Form.Select
                  name="veg"
                  value={menuFormData.veg}
                  onChange={(e) => setMenuFormData((prev) => ({
                    ...prev,
                    veg: e.target.value === 'true',
                  }))}
                  isInvalid={!!errors.veg}
                >
                  <option value="">Select</option>
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {errors.veg}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formSpicy">
                <Form.Label>Spicy</Form.Label>
                <Form.Select 
                    name='spicy'
                    value={menuFormData.spicy}
                    onChange={(e) => setMenuFormData((prev) => ({
                        ...prev,
                        spicy: e.target.value === 'true',
                    }))}
                    isInvalid={!!errors.spicy}
                >
                    <option value="">Select</option>
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {errors.spicy}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formCategory">
                <Form.Label>Category:</Form.Label>
                <Form.Control
                  type="text"
                  name="category"
                  value={menuFormData.category}
                  onChange={handleChange}
                  isInvalid={!!errors.category}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.category}
                </Form.Control.Feedback>
              </Form.Group>

              <Button variant="primary" type="submit" disabled={loading}>
                {loading ? "Submitting..." : "Submit"}
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
      </Container>
    </>
  );
};

export default AddMenu;
