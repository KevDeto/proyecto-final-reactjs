import React, { useState} from "react";
import { Button } from "react-bootstrap";
import { NavLink, useLocation } from "react-router-dom";
import { Search, TextAlignJustify } from "lucide-react";
import { Helmet } from 'react-helmet';
import { useMenu } from "../../hooks/useMenu.jsx";
import Sidebar from "../Sidebar/Sidebar.jsx";
import ProductCard from "../ProductCard/ProductCard.jsx";
import Logo from "../../assets/logo-mostaza.png"
import styles from "./Menusection.module.css";
import stylesHome from "../Homepage/Homepage.module.css";

function Menusection() {
    const location = useLocation();

    const { searchProducts, clearSearch, searchTerm } = useMenu();    
    const [showOffcanvas, setShowOffcanvas] = useState(false);

    const handleOpen = () => setShowOffcanvas(true);
    const handleClose = () => setShowOffcanvas(false);

    const handleSearchChange = (e) => {
        const value = e.target.value;
        searchProducts(value);
    };

    const handleClearSearch = () => {
        clearSearch();
    };

    return(
        <div className={`d-flex align-items-center ${styles.container}`}>
            <div>
                <div>
                    <Helmet key={location.pathname}>
                        <title>Mostaza - Menú</title>
                        <meta name="description" content="Todos nuestros productos disponibles" />
                    </Helmet>
                </div>
            </div>
            <Button className={`${stylesHome.btnTextAlignJustify} rounded-5`} onClick={handleOpen} >
                <TextAlignJustify size={20} strokeWidth={4}/>
            </Button>
            <div className="position-relative mb-5 mt-5">
                <Search size={24} className={`${styles.lupa}`}/>
                <input className={`${styles.searchBar}`}
                    type="text" 
                    placeholder="Buscar hamburguesas, helados, ensaladas..." 
                    value={searchTerm}
                    onChange={handleSearchChange}
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