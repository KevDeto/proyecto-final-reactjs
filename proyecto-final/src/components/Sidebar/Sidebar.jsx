import React from "react";
import { Button, Offcanvas, Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { X, Facebook, Twitter, Instagram, Youtube, Linkedin } from 'lucide-react';
import CartBadge from "../Cart/Cartbadge"

import styles from "./Sidebar.module.css";

function Sidebar({ showOffcanvas, handleClose }){

    return(
        <Offcanvas placement="start" show={showOffcanvas} onHide={handleClose} className={`${styles.offcanvas}`}>
            <Offcanvas.Header className={`${styles.offcanvasHeader} mt-4`}>
                <Offcanvas.Title className={`lh-1 fs-2 ms-1`}>Mostaza</Offcanvas.Title>
                <Button onClick={handleClose} className={`${styles.btnClose}`}>
                    <X size={18} strokeWidth={3}/>
                </Button>
            </Offcanvas.Header>
            <Offcanvas.Body className={`${styles.offcanvasBody}`}>
                <Nav className={`${styles.nav1} flex-column w-100 fw-bold`}>
                    <Nav.Link as={NavLink} to="/iniciar-sesion">Iniciar Sesión</Nav.Link>
                    <Nav.Link as={NavLink} to="/menu">Menú</Nav.Link>
                    <Nav.Link as={NavLink} to="/carrito">
                        <div className="d-flex justify-content-between">
                            Carrito
                            <CartBadge/>
                        </div>
                    </Nav.Link>
                    <Nav.Link as={NavLink} to="/sucursales">Sucursales</Nav.Link>
                    <Nav.Link as={NavLink} to="/contacto">Contacto</Nav.Link>
                </Nav>
                <Nav className={`${styles.nav2}`}>
                    <Nav.Link as="a" href="https://www.facebook.com/MostazaOk" target="_blank"><Facebook size={25}/></Nav.Link>
                    <Nav.Link as="a" href="https://x.com/Mostaza_ok" target="_blank"><Twitter size={25}/></Nav.Link>
                    <Nav.Link as="a" href="https://www.instagram.com/mostazaok" target="_blank"><Instagram size={25}/></Nav.Link>
                    <Nav.Link as="a" href="https://www.youtube.com/@MostazaOk" target="_blank"><Youtube size={25}/></Nav.Link>
                    <Nav.Link as="a" href="https://www.linkedin.com/company/mostazaok" target="_blank"><Linkedin size={25}/></Nav.Link>
                </Nav>
            </Offcanvas.Body>
        </Offcanvas>
    );
}

export default Sidebar;