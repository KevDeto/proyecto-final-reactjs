import React, { useState } from "react";
import { Container, Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { Hamburger, TextAlignJustify, X, Facebook, Twitter, Instagram, Youtube, Linkedin } from 'lucide-react';
import Sidebar from "../Sidebar/Sidebar.jsx"
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
                    <NavLink to="/menu">
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
            <Sidebar showOffcanvas={showOffcanvas} handleClose={handleClose}/>
        </div>
    );
}

export default Homepage;