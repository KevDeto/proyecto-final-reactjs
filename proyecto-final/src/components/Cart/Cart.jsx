import React, { useState} from 'react';
import { Container, Row, Col, Card, Button, CardText } from 'react-bootstrap';
import { NavLink, useLocation } from 'react-router-dom';
import { useCart } from '../../hooks/useCart';
import { TextAlignJustify } from 'lucide-react';
import { toast } from 'react-toastify';
import { Helmet } from 'react-helmet';
import Sidebar from "../Sidebar/Sidebar.jsx";
import styles from "./Cart.module.css"
import stylesHome from "../Homepage/Homepage.module.css";
import Logo from "../../assets/logo-mostaza.png"

function Cart() {
    const location = useLocation();

    const { cartItems, removeFromCart, getCartTotal, getCartItemsCount, getCountSameItems, clearCart} = useCart();
        
    const [showOffcanvas, setShowOffcanvas] = useState(false);
    
    const handleOpen = () => setShowOffcanvas(true);
    const handleClose = () => setShowOffcanvas(false);

    const handleConfirmPurchase = () => {
        if (cartItems.length === 0) return;
        
        // notificacion de compra exitosa
        toast.success(`🎉 ¡Compra realizada! Gracias por tu pedido`, {
            position: "top-right",
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
        });
        
        clearCart();
    };

    return (
    <Container fluid className={`${styles.container}`}>
        <div>
            <Helmet key={location.pathname}>
                <title>Mostaza - Carrito</title>
                <meta name="description" content="Carrito de compras con tus productos elegidos." />
            </Helmet>
        </div>
        <div>
            <Button className={`${stylesHome.btnTextAlignJustify} rounded-5`} onClick={handleOpen} >
                <TextAlignJustify size={20} strokeWidth={4}/>
            </Button>
            <NavLink to="/">
                <img src={Logo} alt="Mostaza" className={`${stylesHome.logo}`}/>
            </NavLink>
            <Sidebar showOffcanvas={showOffcanvas} handleClose={handleClose}/>
        </div>
        <Row className={`${styles.row}`} lg={12} xl={6}>
            <Col className={`${styles.colOne} mb-2`} xs={12} lg={8} xl={9}>
                {cartItems.length === 0 ? (
                <Card className={`${styles.card}`}>
                    <Card.Body>
                        <CardText>Tu carrito esta vacio</CardText>
                    </Card.Body>
                </Card>
                ) : (
                <div>
                    {cartItems.map((item) => (
                        <Card.Body className={`${styles.rowData} py-3`}>
                            <Row className='py-3'>
                                <Col xs={2} className={`${styles.dataColumn}`}>
                                    <Card.Img src={item.image} className={`w-100`}/>
                                </Col>
                                <Col xs={4} md={5} className={`${styles.dataColumn} flex-column align-items-start`}>
                                    <h6 className='text-truncate w-100'>{item.name}</h6>
                                    <Button 
                                        variant='link text-white text-decoration-none p-0' 
                                        onClick={() => removeFromCart(item.id)}
                                        aria-label={`Eliminar ${item.name} del carrito`}>
                                        Eliminar
                                    </Button>
                                </Col>
                                <Col xs={2} className={`${styles.dataColumn}`}>
                                    <h6>{getCountSameItems(item.id)}</h6>
                                </Col>
                                <Col xs={4} md={3} className={`${styles.dataColumn} justify-content-end`}>
                                    <span className='mx-3'>
                                        ${item.price ? item.price.toFixed(2) : '0.00'}
                                    </span>
                                </Col>
                            </Row>
                        </Card.Body>
                    ))}   
                </div>
                )}
            </Col>
            <Col className={`${styles.colTwo}`}>
                <Card className={`${styles.colTwoCard}`}>
                    <Card.Body>
                        <Card.Title>Resumen de compra</Card.Title>
                        <Card.Text>Productos ({getCartItemsCount()})</Card.Text>
                    </Card.Body>
                    <div className="d-flex justify-content-between mx-3 mb-4">
                        <span>Total</span>
                        <span>{getCartTotal().toFixed(2)}</span>
                    </div>
                    <Card.Footer>
                        <Button 
                            className={`${styles.button} w-100`}
                            disabled={cartItems.length === 0}
                            onClick={handleConfirmPurchase}
                            aria-label='Completar y pagar pedido'>
                            Confirmar Comprar
                        </Button>
                    </Card.Footer>
                </Card>
            </Col>
        </Row>
    </Container>
    );
}

export default Cart;