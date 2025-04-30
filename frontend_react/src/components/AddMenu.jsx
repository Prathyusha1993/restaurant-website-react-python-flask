import React, { useEffect, useState } from "react";
import { Button, Container, Row, Col, Form, Modal } from "react-bootstrap";
import { BASE_URL } from "../App";

const AddMenu = ({ onMenuUpdated, mode='add', existingData=null, onHide, show }) => {

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

  const validateForm = () => {
    const newErrors = {};

    if (!menuFormData.name.trim()) newErrors.name = "Name is required";
    if (!String(menuFormData.price).trim()) newErrors.price = "Price is required";
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

  useEffect(() => {
    if (mode === 'edit' && existingData) {
        setMenuFormData({
            name: existingData.name || '',
            price: existingData.price?.toString() || '',
            description: existingData.description || '',
            img_url: existingData.imgUrl || '',
            veg: Boolean(Number(existingData.veg)),
            spicy: Boolean(Number(existingData.spicy)),
            category: existingData.category || '',
        });
    }
  }, [mode, existingData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = validateForm();
    if (!isValid) return;
  
    // const formattedData = {
    //   ...menuFormData,
    //   price: parseFloat(menuFormData.price),
    //   veg: menuFormData.veg === true ? 1 : 0,
    //   spicy: menuFormData.spicy === true ? 1 : 0,
    // };

    const formData = new FormData();
    formData.append("name", menuFormData.name);
    formData.append("price", parseFloat(menuFormData.price));
    formData.append("description", menuFormData.description);
    formData.append("veg", menuFormData.veg ? 1 : 0);
    formData.append("spicy", menuFormData.spicy ? 1 : 0);
    formData.append("category", menuFormData.category);
    if(menuFormData.img_url instanceof File){
      formData.append("img_url", menuFormData.img_url);
    } 
    // formData.append("img_url", menuFormData.img_url);
  
    setLoading(true);
    try {
      const response = await fetch(BASE_URL + (mode === 'edit' ? `menu/${existingData.id}` : 'menu'), {
        method: mode === 'edit' ? 'PATCH' : 'POST',
        // headers: {
        //   "Content-Type": "application/json",
        // },
        // body: JSON.stringify(formattedData),
        body: formData,
      });

      // console.log('Response status:', response.status);
      // console.log('Response body:', await response.text());

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }
  
      const data = await response.json();
      alert(mode === 'edit' ? 'Menu item updated succesfully' : 'Menu item has been added successfully');
      setMenuFormData({
        name: "",
        price: "",
        description: "",
        img_url: "",
        veg: null,
        spicy: null,
        category: "",
      });

      if(onMenuUpdated){
        onMenuUpdated();
      }
      if (onHide) {
        onHide();
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
      <Container>
        <Modal show={show} onHide={onHide}>
          <Modal.Header closeButton>
            <Modal.Title>
              {mode === "edit" ? "Edit Menu Item" : "Add New Menu Item"}
            </Modal.Title>
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

              {menuFormData.img_url &&
                typeof menuFormData.img_url === "string" && (
                  <div className="mb-2">
                    <img
                      src={`${BASE_URL}${menuFormData.img_url}`}
                      alt="Preview"
                      width="100"
                    />
                  </div>
                )}
              <Form.Group className="mb-3" controlId="formImage">
                <Form.Label>Image URL:</Form.Label>
                <Form.Control
                  type="file"
                  name="img_url"
                  //   value={menuFormData.img_url}
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      setMenuFormData((prev) => ({
                        ...prev,
                        img_url: file,
                      }));
                    }
                    }}
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
                  onChange={(e) =>
                    setMenuFormData((prev) => ({
                      ...prev,
                      veg: e.target.value === "true",
                    }))
                  }
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
                  name="spicy"
                  value={menuFormData.spicy}
                  onChange={(e) =>
                    setMenuFormData((prev) => ({
                      ...prev,
                      spicy: e.target.value === "true",
                    }))
                  }
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

              {/* <Form.Group className="mb-3" controlId="formCategory">
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
              </Form.Group> */}

              <Form.Group className="mb-3" controlId="formCategory">
                <Form.Label>Category:</Form.Label>
                <Form.Select
                  type="text"
                  name="category"
                  value={menuFormData.category}
                  onChange={handleChange}
                  isInvalid={!!errors.category}
                >
                  <option value="">Select</option>
                  <option value="biryanis">biryanis</option>
                  <option value="soups & salads">soups & salads</option>
                  <option value="starters">starters</option>
                  <option value="tandooris">tandooris</option>
                  <option value="main course">main course</option>
                  <option value="breads">breads</option>
                  <option value="rice & noodles">rice & noodles</option>
                  <option value="shawarmas">shawarmas</option>
                  <option value="accompaniments">accompaniments</option>
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {errors.category}
                </Form.Control.Feedback>
              </Form.Group>

              <Button variant="primary" type="submit" disabled={loading}>
                {loading
                  ? mode === "edit"
                    ? "Updating..."
                    : "Submitting..."
                  : mode === "edit"
                  ? "Update"
                  : "Submit"}
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
      </Container>
    </>
  );
};

export default AddMenu;
