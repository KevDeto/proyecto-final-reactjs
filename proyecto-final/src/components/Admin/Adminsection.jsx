import React, { useState} from "react";
import { Button } from "react-bootstrap";
import { NavLink, useLocation  } from "react-router-dom";
import { Search, TextAlignJustify, Plus } from "lucide-react";
import { Helmet } from 'react-helmet';
import { useMenu } from "../../hooks/useMenu.jsx";
import { useNavigate } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar.jsx";
import Adminproduct from "./Adminproduct.jsx";
import Logo from "../../assets/logo-mostaza.png"
import styles from "../Menusection/Menusection.module.css";
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

    const navigate = useNavigate();

    const handleCreateNew = () => {
        navigate('/admin/product/new');
    };

    return(
        <div className={`d-flex align-items-center ${styles.container}`}>
            <div>
                <Helmet key={location.pathname}>
                    <title>Mostaza - Administracion de productos</title>
                    <meta name="description" content="Administracion de productos de la tienda. Puedes crear, editar y eliminar cualquier producto." />
                </Helmet>
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
                    aria-label="Buscar productos"
                />
            </div>
            <Button 
                variant="success" 
                className="ms-3"
                onClick={handleCreateNew}
                aria-label="Crear nuevo producto"
                >
                <Plus size={20} className="me-2" />
                Nuevo Producto
            </Button>
            <NavLink to="/">
                <img src={Logo} alt="Mostaza" className={`${stylesHome.logo}`}/>
            </NavLink>
            <Sidebar showOffcanvas={showOffcanvas} handleClose={handleClose}/>
            <Adminproduct/>
        </div>
    );
}

export default Menusection;