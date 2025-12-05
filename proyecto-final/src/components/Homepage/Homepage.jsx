import React, { useState } from "react";
import { Container, Button } from "react-bootstrap";
import { NavLink, useLocation } from "react-router-dom";
import { Hamburger, TextAlignJustify } from 'lucide-react';
import { Helmet } from 'react-helmet';
import Sidebar from "../Sidebar/Sidebar.jsx"
import Logo from "../../assets/Logo-mostaza.png";
import styles from "./Homepage.module.css";

function Homepage(){
    const location = useLocation();

    const [showOffcanvas, setShowOffcanvas] = useState(false);

    const handleOpen = () => setShowOffcanvas(true);
    const handleClose = () => setShowOffcanvas(false);

    return(
        <div className={`d-flex align-items-center ${styles.container}`}>
            <div>
                <Helmet key={location.pathname}>
                    <title>Mostaza</title>
                    <meta name="description" content="Mostaza, cada vez más grandes. Cuenta con más de 140 sucursales en todo el país y 20 años de trayectoria." />
                </Helmet>
            </div>
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