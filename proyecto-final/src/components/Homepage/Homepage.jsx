import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import {Link } from "react-router-dom";
import { Hamburger  } from 'lucide-react';

import styles from "./Homepage.module.css";

function Homepage(){
    return(
        <div className={`d-flex align-items-center ${styles.container}`}>
            <Container className="text-center">
                <Button className={`${styles.btnHamburger }`}>
                    <Hamburger size={80} strokeWidth={1.3}/>
                </Button>
                <p className="m-3 lh-1 fw-semibold fs-6">
                    VER
                    <br/>
                    MENÚ
                </p>
            </Container>
        </div>
    );
}

export default Homepage;