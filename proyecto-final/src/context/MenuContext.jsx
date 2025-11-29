import React, { createContext, useState, useEffect } from "react";
import apiClient from "../services/ApiClient";

const API_URL = "https://68e16bd68943bf6bb3c42d9c.mockapi.io/api/v1/menu";
const MenuContext = createContext();

export function MenuProvider({children}){
    const [filteredMenu, setFilteredMenu] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [menu, setMenu] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // GET - Obtener todos los productos
    const fetchMenu = async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await apiClient.get(API_URL);
            setMenu(data);
            setFilteredMenu(data);
        } catch (err) {
            setError(err.message);
            console.error("Error fetching menu:", err);
        } finally {
            setLoading(false);
        }
    };

    // Función para buscar productos
    const searchProducts = (term) => {
        setSearchTerm(term);
        
        if (!term.trim()) {
            setFilteredMenu(menu); // Si no hay término, mostrar todos
            return;
        }

        const filtered = menu.filter(item => 
            item.name.toLowerCase().includes(term.toLowerCase()) ||
            (item.description && item.description.toLowerCase().includes(term.toLowerCase())) ||
            (item.category && item.category.toLowerCase().includes(term.toLowerCase()))
        );
        
        setFilteredMenu(filtered);
    };

    // Limpiar búsqueda
    const clearSearch = () => {
        setSearchTerm('');
        setFilteredMenu(menu);
    };

    // Limpiar errores
    const clearError = () => {
        setError(null);
    };

    // Cargar menu al iniciar
    useEffect(() => {
        fetchMenu();
    }, []);

    const value = {
        // Estado
        menu,
        filteredMenu,
        searchTerm,
        loading,
        error,
    
        // Acciones
        fetchMenu,
        searchProducts,
        clearSearch,
        clearError,
    };

    return (
        <MenuContext.Provider value={value}>
        {children}
        </MenuContext.Provider>
    );
}

export { MenuContext };