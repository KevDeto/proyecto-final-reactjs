import React, {useState} from "react";
import { Container, Row, Col, Button, Nav, Offcanvas } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { Hamburger, TextAlignJustify, X, Facebook, Twitter, Instagram, Youtube, Linkedin } from 'lucide-react';

import Logo from "../../assets/Logo-mostaza.png";
import styles from "./Homepage.module.css";

function Homepage(){
    const [showOffcanvas, setShowOffcanvas] = useState(false);

    const handleOpen = () => setShowOffcanvas(true);
    const handleClose = () => setShowOffcanvas(false);

    return(
        <div className={`d-flex align-items-center ${styles.container}`}>
            <Container className="text-center">
                <Button className={`${styles.btnTextAlignJustify} rounded-5`} onClick={handleOpen}>
                    <TextAlignJustify size={20} strokeWidth={4}/>
                </Button>
                <div>
                    <NavLink to="/hamburguer">
                        <Button className={`${styles.btnHamburger}`}>
                            <Hamburger size={80} strokeWidth={1.3}/>
                        </Button>
                    </NavLink>
                    <p className="m-3 lh-1 fw-semibold fs-6 text-white">
                        VER
                        <br/>
                        MENÚ
                    </p>
                </div>
                <NavLink to="/">
                    <img src={Logo} alt="Mostaza" className={`${styles.logo}`}/>
                </NavLink>
            </Container>
            <Offcanvas placement="start" show={showOffcanvas} onHide={handleClose} className={`${styles.offcanvas}`}>
                <Offcanvas.Header className={`${styles.offcanvasHeader} mt-4`}>
                    <Offcanvas.Title className={`lh-1 fs-2 ms-1`}>Mostaza</Offcanvas.Title>
                    <Button onClick={handleClose} className={`${styles.btnClose}`}>
                        <X size={18} strokeWidth={3}/>
                    </Button>
                </Offcanvas.Header>
                <Offcanvas.Body className={`${styles.offcanvasBody}`}>
                    <Nav className={`${styles.nav1} flex-column w-100 fw-bold`}>
                        <Nav.Link as={NavLink} to="/Iniciar Sesión">Iniciar Sesión</Nav.Link>
                        <Nav.Link as={NavLink} to="/Menú">Menú</Nav.Link>
                        <Nav.Link as={NavLink} to="/Sucursales">Sucursales</Nav.Link>
                        <Nav.Link as={NavLink} to="/Contacto">Contacto</Nav.Link>
                    </Nav>
                    <Nav className={`${styles.nav2}`}>
                        <Nav.Link as={NavLink} to="https://www.facebook.com/MostazaOk" target="_blank"><Facebook size={25}/></Nav.Link>
                        <Nav.Link as={NavLink} to="https://x.com/Mostaza_ok" target="_blank"><Twitter size={25}/></Nav.Link>
                        <Nav.Link as={NavLink} to="https://www.instagram.com/mostazaok" target="_blank"><Instagram size={25}/></Nav.Link>
                        <Nav.Link as={NavLink} to="https://www.youtube.com/@MostazaOk" target="_blank"><Youtube size={25}/></Nav.Link>
                        <Nav.Link as={NavLink} to="https://www.linkedin.com/company/mostazaok" target="_blank"><Linkedin size={25}/></Nav.Link>
                    </Nav>
                </Offcanvas.Body>
            </Offcanvas>
        </div>
    );
}

export default Homepage;