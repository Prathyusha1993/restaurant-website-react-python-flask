import React, { useEffect, useState } from "react";
import { Container, Row, Col, Accordion, Button, Badge, Image, ButtonGroup } from "react-bootstrap";
import { IoMdRadioButtonOn } from "react-icons/io";
import { FaPepperHot } from "react-icons/fa";
import Footer from "./Footer";
import { BASE_URL } from "../App";

// const menuData = {
//   Biryani: [
//     {
//       name: "Hyderabadi Chicken Biryani",
//       price: "$12.99",
//       veg: false,
//       spicy: true,
//       img: "/images/biryani1.jpg",
//     },
//     {
//       name: "Veg Dum Biryani",
//       price: "$10.99",
//       veg: true,
//       spicy: false,
//       img: "/images/biryani2.jpg",
//     },
//   ],
//   Shawarma: [
//     {
//       name: "Chicken Shawarma Wrap",
//       price: "$8.99",
//       veg: false,
//       spicy: false,
//       img: "/images/shawarma1.jpg",
//     },
//     {
//       name: "Paneer Shawarma",
//       price: "$9.99",
//       veg: true,
//       spicy: true,
//       img: "/images/shawarma2.jpg",
//     },
//   ],
//   Starters: [
//     {
//       name: "Chicken Shawarma Wrap",
//       price: "$8.99",
//       veg: false,
//       spicy: false,
//       img: "/images/shawarma1.jpg",
//     },
//     {
//       name: "Paneer Shawarma",
//       price: "$9.99",
//       veg: true,
//       spicy: true,
//       img: "/images/shawarma2.jpg",
//     },
//   ],
//   Tandooris: [
//     {
//       name: "Chicken Shawarma Wrap",
//       price: "$8.99",
//       veg: false,
//       spicy: false,
//       img: "/images/shawarma1.jpg",
//     },
//     {
//       name: "Paneer Shawarma",
//       price: "$9.99",
//       veg: true,
//       spicy: true,
//       img: "/images/shawarma2.jpg",
//     },
//   ],
//   Desserts: [
//     {
//       name: "Chicken Shawarma Wrap",
//       price: "$8.99",
//       veg: false,
//       spicy: false,
//       img: "/images/shawarma1.jpg",
//     },
//     {
//       name: "Paneer Shawarma",
//       price: "$9.99",
//       veg: true,
//       spicy: true,
//       img: "/images/shawarma2.jpg",
//     },
//   ],
// };

function Menu() {
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [menuData, setMenuData] = useState([])
    const [loading, setLoading] = useState(true)

    const getFilteredMenu = () => {
        if (selectedCategory === 'All') return menuData;
        return { [selectedCategory]: menuData[selectedCategory]}
    };

    const groupByCategory = (items) => {
        return items.reduce((acc, item) => {
            const category = item.category.charAt(0).toUpperCase() + item.category.slice(1);
            if (!acc[category]) acc[category] = [];
            acc[category].push(item);
            return acc;
        }, {});
    };

    useEffect(() => {
        const getMenu = async () => {
            try{
                const res = await fetch(BASE_URL+'menu')
                const data = await res.json()
                console.log(data)

                if (!res.ok){
                    throw new Error(data.error || 'Somethig went wrong')
                }
                const groupedData = groupByCategory(data)
                setMenuData(groupedData)
            }
            catch(err){
                console.log(err)
            }
            finally{
                setLoading(false)
            }
        }
        getMenu()
    }, [])

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
              "Starters",
              "Tandooris",
              "Biryani",
              "Shawarma",
              "Desserts",
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

        <Accordion defaultActiveKey="0">
            {Object.entries(getFilteredMenu()).map(([category, items], index) => (
                <Accordion.Item eventKey={index.toString()} key={category}>
                <Accordion.Header>{category}</Accordion.Header>
                <Accordion.Body>
                  <Row>
                    {items.map((item, idx) => (
                        <Col md={6} className="mb-4" key={idx}>
                            <div className="d-flex">
                                <Image
                                    src={item.img}
                                    width={80}
                                    height={80}
                                    className="me-3 rounded"
                                    alt={item.name}
                                    style={{ objectFit: "cover" }}
                                 />
                                 <div>
                                    <h5 className="mb-1">
                                        {item.name}{" "}
                                        {item.veg !== null && (item.veg ? 
                                        (<Badge bg='light' className="ms-1">
                                            <span style={{border:'1px solid green', padding:'0px 2px 2px 2px'}}>
                                                <IoMdRadioButtonOn style={{color:'green' }}/>
                                            </span>
                                        </Badge>) : (
                                        <Badge bg='light' className="ms-1">
                                            <span style={{border:'1px solid red', padding:'0px 2px 2px 2px'}}>
                                                <IoMdRadioButtonOn style={{color:'red'}}/>
                                            </span>
                                        </Badge>
                                        )
                                        )}
                                        {item.spicy && <Badge bg='light' className="ms-2"><FaPepperHot style={{color:'red'}} /></Badge>}
                                    </h5>
                                    <p className="mb-2">{item.price}</p>
                                    <Button size='sm' variant='outline-primary'>Order Now</Button>
                                 </div>
                            </div>
                        </Col>
                    ))}
                  </Row>
                </Accordion.Body>
              </Accordion.Item>
            ))}
        </Accordion>
        <div className="text-center mt-5">
            <a href='/downloads/menu.pdf' download className="btn btn-outline-secondary">Download Full Menu(PDF)</a>
        </div>
      </Container>
      <Footer />
    </>
  );
}

export default Menu;