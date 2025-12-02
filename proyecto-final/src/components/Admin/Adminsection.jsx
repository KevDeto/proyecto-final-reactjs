import React, { useState} from "react";
import { Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { Search, TextAlignJustify, Plus } from "lucide-react";
import { Helmet } from 'react-helmet';
import { useMenu } from "../../hooks/useMenu.jsx";
import { useNavigate } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar.jsx";
import Logo from "../../assets/logo-mostaza.png"
import Adminproduct from "./Adminproduct.jsx";
import styles from "../Menusection/Menusection.module.css";
import stylesHome from "../Homepage/Homepage.module.css";

function Menusection() {
    const { searchProducts, clearSearch, searchTerm } = useMenu();    
    const [showOffcanvas, setShowOffcanvas] = useState(false);

    const handleOpen = () => setShowOffcanvas(true);
    const handleClose = () => setShowOffcanvas(false);

    const handleSearchChange = (e) => {
        const value = e.target.value;
        searchProducts(value); // ← Llamar a la función del contexto
    };

    const handleClearSearch = () => {
        clearSearch(); // ← Limpiar la búsqueda
    };

    const navigate = useNavigate();

    const handleCreateNew = () => {
        navigate('/admin/product/new');
    };

    return(
        <div className={`d-flex align-items-center ${styles.container}`}>
            <div>
                <div>
                    <Helmet>
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
            <Button 
                variant="success" 
                className="ms-3"
                onClick={handleCreateNew}
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