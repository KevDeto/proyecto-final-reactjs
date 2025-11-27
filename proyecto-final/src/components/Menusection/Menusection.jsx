import React, { useState} from "react";
import { Container, Row, Col, Navbar, Nav, Button, Offcanvas } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { Search, TextAlignJustify } from "lucide-react";
import Sidebar from "../Sidebar/Sidebar.jsx";
import styles from "./Menusection.module.css";
import stylesHome from "../Homepage/Homepage.module.css";
import Logo from "../../assets/logo-mostaza.png"
import ProductCard from "../ProductCard/ProductCard.jsx";

function Menusection() {
    const [searchTerm, setSearchTerm] = useState('');

    const [showOffcanvas, setShowOffcanvas] = useState(false);

    const handleOpen = () => setShowOffcanvas(true);
    const handleClose = () => setShowOffcanvas(false);

    return(
        <div className={`d-flex align-items-center ${styles.container}`}>
            <Button className={`${stylesHome.btnTextAlignJustify} rounded-5`} onClick={handleOpen} >
                <TextAlignJustify size={20} strokeWidth={4}/>
            </Button>
            <div className="position-relative mb-5 mt-5">
                <Search size={24} className={`${styles.lupa}`}/>
                <input className={`${styles.searchBar}`}
                    type="text" 
                    placeholder="Buscar hamburguesas, helados, ensaladas..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            <NavLink to="/">
                <img src={Logo} alt="Mostaza" className={`${stylesHome.logo}`}/>
            </NavLink>
            <Sidebar showOffcanvas={showOffcanvas} handleClose={handleClose}/>
            <ProductCard/>
        </div>
    );
}

export default Menusection;