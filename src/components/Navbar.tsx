import {
    Col,
    Container,
    Nav,
    Navbar as NavbarBs,
    NavbarBrand,
    Offcanvas,
    Stack
} from 'react-bootstrap';
import {NavLink} from "react-router-dom";
import Form from "react-bootstrap/Form";
import {useEffect, useState} from "react";
import {FaShoppingCart} from "react-icons/fa";
import {IoIosSearch} from "react-icons/io";
import {useShoppingCart} from "../context/ShoppingCartContext.tsx";
import storeItems from "../data/items.json";
import {StoreItem} from "./StoreItem.tsx";



export function Navbar() {

    const { cartQuantity, openCart } = useShoppingCart()

    const [searchShow, setSearchShow] = useState(false);
    const handleClose = () => setSearchShow(false);
    const handleSearchShow = () => {
        if (location.pathname !== '/store') {
            setSearchShow(true);
        }
    };


    const {
        searchTerm,
        setSearchTerm,
        filteredItems,
        setFilteredItems,
    } = useShoppingCart();

    useEffect(() => {

        const lowerCaseSearchTerm = searchTerm.toLowerCase();
        const filtered = storeItems.filter(item =>
            item.name.toLowerCase().includes(lowerCaseSearchTerm)
        );

        setSearchTerm(searchTerm);
        setFilteredItems(filtered);

    }, [searchTerm])






    return (
        <>
            <NavbarBs sticky="top" bg="light shadow mb-4" expand="lg">
                <Container>
                    <NavbarBrand as={NavLink} to="/">
                        <img className="mb-4" src="/images/logoo.png" alt="Logo" height="80px" width="160px"/>
                    </NavbarBrand>
                    <NavbarBs.Toggle aria-controls="navbar-nav"/>
                    <NavbarBs.Collapse id="navbar-nav">
                        <Nav className="d-flex justify-content-center fs-2 align-items-center w-100">
                            <Nav.Link to="/" as={NavLink} className="mx-3">Home</Nav.Link>
                            <Nav.Link to="/contacts" as={NavLink} className="mx-3">Contacts</Nav.Link>
                            <Nav.Link to="/about" as={NavLink} className="mx-3">About</Nav.Link>
                            <Nav.Link to="/store" as={NavLink} className="mx-3">Store</Nav.Link>


                            <>


                            </>


                        </Nav>
                    </NavbarBs.Collapse>


                    <Form className="d-flex mt-4 position-relative" style={{ position: 'absolute', right: '10px', top: '10px' }}>
                        <div className="position-absolute top-0 start-0 translate-middle" style={{ marginTop: '5.8%', marginLeft: '5.8%', color: 'darkred' }}>
                            <IoIosSearch size="25px" />
                        </div>
                        <Form.Control
                            className="mb-4"
                            style={{ width: '300px', paddingLeft: '40px'}}
                            placeholder="What are you looking for?"
                            type="text"
                            value={searchTerm}
                            onClick={handleSearchShow}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </Form>

                    <Offcanvas show={searchShow} onHide={handleClose} placement='end'>
                        <Offcanvas.Header closeButton>
                            <Offcanvas.Title>Search</Offcanvas.Title>
                            <Offcanvas.Body>
                                <Stack gap={3}>
                                    {filteredItems.map(item => (
                                        <Col key={item.id}>
                                            <Form className="d-flex mt-4 position-relative" style={{ position: 'absolute', right: '10px', top: '10px' }}>
                                                <div className="position-absolute top-0 start-0 translate-middle" style={{ marginTop: '5.8%', marginLeft: '5.8%', color: 'darkred' }}>
                                                    <IoIosSearch size="25px" />
                                                </div>
                                                <Form.Control
                                                    className="mb-4"
                                                    style={{ width: '300px', paddingLeft: '40px'}}
                                                    placeholder="What are you looking for?"
                                                    type="text"
                                                    value={searchTerm}
                                                    onClick={handleSearchShow}
                                                    onChange={(e) => setSearchTerm(e.target.value)}
                                                />
                                            </Form>

                                            <StoreItem price={0} imgUrl={''} {...item} />
                                        </Col>
                                    ))}
                                </Stack>
                                <div className='fw-bold fs-4'></div>
                            </Offcanvas.Body>
                        </Offcanvas.Header>
                    </Offcanvas>



                    {cartQuantity >= 0 && (

                    <>
                        <button
                            style={{border: 'none', background: 'none', cursor: 'pointer'}}
                        >

                            <FaShoppingCart

                                color="darkred"
                                onClick={openCart}
                            />

                        </button>

                        <span style={{fontSize: '1rem', fontWeight: 'bold', marginLeft: '-2px', marginTop: '-10px'}}>
                    {cartQuantity}
                </span>

                    </>

            )}
                </Container>

            </NavbarBs>


            <img className="mb-4" src="/images/largePic.webp" alt="Large Pic"
                 style={{width: '100%', height: 'auto', maxHeight: '300px', objectFit: 'cover'}}/>

        </>

    );
}


