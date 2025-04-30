import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Accordion,
  Button,
  Badge,
  Image,
  ButtonGroup,
  Modal,
} from "react-bootstrap";
import { IoMdRadioButtonOn } from "react-icons/io";
import { FaPepperHot } from "react-icons/fa";
import Footer from "./Footer";
import { BASE_URL } from "../App";
import { SiZomato } from "react-icons/si";
import AddMenu from "./AddMenu";
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";

function Menu() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [menuData, setMenuData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [showAddEditModal, setShowAddEditModal] = useState(false);
  const isAdmin = localStorage.getItem("isAdmin") === "true";

  const categoryOrderDisplay = [
    "biryanis",
    "soups & salads",
    "starters",
    "tandooris",
    "main course",
    "breads",
    "rice & noodles",
    "shawarmas",
    "accompaniments",
  ];

  const getFilteredMenu = () => {
    // if (selectedCategory === "All") return menuData;
    // return { [selectedCategory]: menuData[selectedCategory] };
    if (!Array.isArray(menuData)) return {};
    let filtered =
      selectedCategory === "All"
        ? menuData
        : menuData.filter(
            (item) =>
              item.category.toLowerCase() === selectedCategory.toLowerCase()
          );

    const grouped = filtered.reduce((acc, item) => {
      const category = item.category;
      if (!acc[category]) acc[category] = [];
      acc[category].push(item);
      return acc;
    }, {});
    return grouped;
  };

  const getMenuItems = async () => {
    try {
      const res = await fetch(BASE_URL + "menu");
      const data = await res.json();
      console.log(data);

      if (!res.ok) {
        throw new Error(data.error || "Somethig went wrong");
      }
      setMenuData(data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getMenuItems();
  }, []);

  const handleDeleteMenuItem = async (id) => {
    try {
      const response = await fetch(BASE_URL+  `menu/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete menu item');
      }
      alert('Are you sure you want to delete this menu item?');
      const data = await response.json();
      alert(`Menu Item deleted successfully:\n${JSON.stringify(data)}`);
      setMenuData(prevItems => prevItems.filter(item => item.id !== id));
    } catch(error) {
      console.error('Error deleting menu item:', error);
    } 
  }

  if (loading) return <p className="text-center my-5">Loading Menu...</p>;
  if (!menuData.length)
    return <p className="text-center my-5">No menu items found.</p>;

  return (
    <>
      <Container fluid>
        {/* {Hero section} */}
        <div className="position-relative">
          <img
            src="/images/menu-page-header-image.jpg"
            className="w-100"
            style={{
              height: "400px",
              objectFit: "cover",
              filter: "brightness(60%)",
            }}
            alt="menu banner"
          />
          <div className="position-absolute top-50 start-50 translate-middle text-white text-center">
            <h1 className="display-4 fw-bold">Our Menu</h1>
            <p className="lead"> Deliciously crafted, passionately served.</p>
          </div>
        </div>

        {/* filter buttons */}
        <div className="text-center mb-4" style={{ marginTop: "30px" }}>
          <ButtonGroup>
            {[
              "All",
              "soups & salads",
              "starters",
              "tandooris",
              "biryanis",
              "main course",
              "breads",
              "rice & noodles",
              "shawarmas",
              "accompaniments",
            ].map((category, index) => (
              <Button
                key={index}
                variant={
                  selectedCategory === category ? "dark" : "outline-dark"
                }
                className="mx-1"
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Button>
            ))}
          </ButtonGroup>
        </div>

        <Container className="mb-5 text-center d-flex flex-column justify-content-center">
          <Row>
            <Col>
              {isAdmin && (
                <Button
                  className="mb-3"
                  onClick={() => {
                    setEditingItem(null);
                    setShowAddEditModal(true);
                  }}
                >
                  Add Menu item
                </Button>
              )}
            </Col>
          </Row>
        </Container>
        {showAddEditModal && (
          <AddMenu
            show = {showAddEditModal}
            onHide = {() => setShowAddEditModal(false)}
            mode={editingItem ? "edit" : "add"}
            existingData={editingItem}
            onMenuUpdated={getMenuItems}
          />
        )}

        <Accordion
          defaultActiveKey={["0", "1", "2", "3", "4", "5", "6", "7", "8"]}
        >
          {/* {Object.entries(getFilteredMenu()).map(([category, items], index) => ( */}
          {categoryOrderDisplay
            .filter((category) => getFilteredMenu()[category])
            .map((category, index) => {
              const items = getFilteredMenu()[category];
              return (
                <Accordion.Item eventKey={index.toString()} key={category}>
                  <Accordion.Header>{category}</Accordion.Header>
                  <Accordion.Body>
                    <Row>
                      {items.map((item, idx) => (
                        <Col md={4} className="mb-4" key={idx}>
                          <div className="d-flex">
                            <Image
                              // src={item.imgUrl}
                              src={item.imgUrl ? `${BASE_URL}${item.imgUrl}` : '/placeholder.jpg'}
                              width={50}
                              height={50}
                              className="me-3 rounded"
                              alt={item.name}
                              style={{ objectFit: "cover" }}
                            />
                            <div>
                              <h5 className="mb-1" style={{ fontSize: "15px" }}>
                                {item.name}{" "}
                                {item.veg !== null &&
                                  (item.veg ? (
                                    <Badge bg="light" className="ms-1">
                                      <span
                                        style={{
                                          border: "1px solid green",
                                          padding: "0px 2px 2px 2px",
                                        }}
                                      >
                                        <IoMdRadioButtonOn
                                          style={{ color: "green" }}
                                        />
                                      </span>
                                    </Badge>
                                  ) : (
                                    <Badge bg="light" className="ms-1">
                                      <span
                                        style={{
                                          border: "1px solid red",
                                          padding: "0px 2px 2px 2px",
                                        }}
                                      >
                                        <IoMdRadioButtonOn
                                          style={{ color: "red" }}
                                        />
                                      </span>
                                    </Badge>
                                  ))}
                                {item.spicy && (
                                  <Badge bg="light" className="ms-2">
                                    <FaPepperHot style={{ color: "red" }} />
                                  </Badge>
                                )}
                              </h5>
                              <p className="mb-2" style={{ fontSize: "13px" }}>
                                {item.price}
                              </p>
                              <Button
                                size="sm"
                                variant="outline-primary"
                                onClick={() => setShowOrderModal(true)}
                                style={{ fontSize: "12px" }}
                              >
                                Order Now
                              </Button>
                              {isAdmin && (
                                <div>
                                  <Button
                                    style={{
                                      border: "none",
                                      marginLeft: "8px",
                                    }}
                                    size="sm"
                                    variant="outline-primary"
                                    onClick={() => {
                                      setEditingItem(item);
                                      setShowAddEditModal(true);
                                    }}
                                  >
                                    <FaEdit style={{ color: "black" }} />
                                  </Button>
                                  <Button
                                    style={{
                                      border: "none",
                                      marginLeft: "8px",
                                    }}
                                    size="sm"
                                    variant="outline-primary"
                                    onClick={() => handleDeleteMenuItem(item.id)}
                                  >
                                    <MdDeleteForever style={{ color: "red" }} />
                                  </Button>
                                </div>
                              )}
                            </div>
                          </div>
                        </Col>
                      ))}

                      <Modal
                        show={showOrderModal}
                        backdrop="true"
                        className="modal-backdrop.show"
                        onHide={() => setShowOrderModal(false)}
                        centered
                      >
                        <Modal.Header closeButton>
                          <Modal.Title>Continue With</Modal.Title>
                        </Modal.Header>
                        <Modal.Body className="text-center">
                          <Button
                            variant="outline-primary"
                            style={{
                              outline: "none",
                              boxShadow: "none",
                              border: "none",
                              padding: 0,
                              backgroundColor: "transparent",
                            }}
                            className="m-2"
                            href="https://www.zomato.com/bangalore/aha-biriyani-btm-bangalore/order"
                            target="_blank"
                          >
                            <SiZomato
                              size={70}
                              style={{
                                backgroundColor: "red",
                                color: "white",
                                borderRadius: "10px",
                                padding: "5px",
                              }}
                            />
                          </Button>

                          {/* <Button 
                                variant="outline-primary"
                                className="m-2"
                                href="https://www.zomato.com/bangalore/aha-biriyani-btm-bangalore/order"
                                target="_blank">
                                  <SiZomato style={{backgroundColor:'red', color:'white'}} />
                                </Button> */}
                        </Modal.Body>
                      </Modal>
                    </Row>
                  </Accordion.Body>
                </Accordion.Item>
              );
            })}
        </Accordion>
        <div className="text-center mt-5">
          <a
            href="http://127.0.0.1:5000/static/downloads/menu.pdf"
            target="_blank"
            rel="noopener noreferrer"
            download
            className="btn btn-outline-secondary"
          >
            Download Full Menu(PDF)
          </a>
        </div>
      </Container>
      <Footer />
    </>
  );
}

export default Menu;
