import React, { createContext, useState, useEffect } from "react";
import apiClient from "../services/ApiClient";

const API_URL = "https://68e16bd68943bf6bb3c42d9c.mockapi.io/api/v1/menu";
export const MenuContext = createContext();

export function MenuProvider({children}){
    const [menu, setMenu] = useState([]);
    const [filteredMenu, setFilteredMenu] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(12);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // GET
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

    // POST
    const createProduct = async (productData) => {
        try {
            setError(null);
            const newProduct = await apiClient.post(API_URL, productData);
            
            // con esto actualizo el estado local
            setMenu(prev => [...prev, newProduct]);
            setFilteredMenu(prev => [...prev, newProduct]);
            
            return newProduct;
        } catch (err) {
            setError(err.message);
            console.error("Error creating product:", err);
            throw err;
        }
    };

    // PUT
    const updateProduct = async (id, productData) => {
        try {
            setError(null);
            const updatedProduct = await apiClient.put(`${API_URL}/${id}`, productData);
            
            // con esto actualizo el estado local
            setMenu(prev => prev.map(item => 
                item.id === id ? updatedProduct : item
            ));
            setFilteredMenu(prev => prev.map(item => 
                item.id === id ? updatedProduct : item
            ));
            
            return updatedProduct;
        } catch (err) {
            setError(err.message);
            console.error("Error updating product:", err);
            throw err;
        }
    };

    // DELETE
    const deleteProduct = async (id) => {
        try {
            setError(null);
            await apiClient.delete(`${API_URL}/${id}`);
            
            // con esto actualizo el estado local
            setMenu(prev => prev.filter(item => item.id !== id));
            setFilteredMenu(prev => prev.filter(item => item.id !== id));
            
            return true;
        } catch (err) {
            setError(err.message);
            console.error("Error deleting product:", err);
            throw err;
        }
    };

    // GET ID
    const getProductById = async (id) => {
        try {
            setError(null);
            const product = await apiClient.get(`${API_URL}/${id}`);
            return product;
        } catch (err) {
            setError(err.message);
            console.error("Error fetching product:", err);
            throw err;
        }
    };

    // Para buscar productos con el search
    const searchProducts = (term) => {
        setSearchTerm(term);
        setCurrentPage(1);

        if (!term.trim()) {
            setFilteredMenu(menu); // si no existe term, muestro todos
            return;
        }

        const filtered = menu.filter(item => 
            item.name.toLowerCase().includes(term.toLowerCase()) ||
            (item.description && item.description.toLowerCase().includes(term.toLowerCase())) ||
            (item.category && item.category.toLowerCase().includes(term.toLowerCase()))
        );
        
        setFilteredMenu(filtered);
    };

    const changeItemsPerPage = (newItemsPerPage) => {
        setItemsPerPage(newItemsPerPage);
        setCurrentPage(1); // reseteo a la primera pagina
    };

    // calculo productos para la pagina actual
    const getCurrentPageItems = () => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return filteredMenu.slice(startIndex, endIndex);
    };

    // calculo el total de paginas
    const getTotalPages = () => {
        return Math.ceil(filteredMenu.length / itemsPerPage);
    };

    // cambio de pagina
    const goToPage = (pageNumber) => {
        if (pageNumber >= 1 && pageNumber <= getTotalPages()) {
            setCurrentPage(pageNumber);
        }
    };

    // voy a la siguiente pagina
    const nextPage = () => {
        if (currentPage < getTotalPages()) {
            setCurrentPage(currentPage + 1);
        }
    };

    // voy a la pagina anterior
    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    // limpio la busqueda
    const clearSearch = () => {
        setSearchTerm('');
        setFilteredMenu(menu);
    };

    const clearError = () => {
        setError(null);
    };

    useEffect(() => {
        fetchMenu();
    }, []);

    const value = {
        // estados
        menu,
        filteredMenu,
        currentPageItems: getCurrentPageItems(),
        currentPage,
        itemsPerPage,
        totalPages: getTotalPages(),
        totalItems: filteredMenu.length,
        searchTerm,
        loading,
        error,
    
        // CRUD
        fetchMenu,
        createProduct,
        updateProduct,
        deleteProduct,
        getProductById,

        //paginacion y search
        searchProducts,
        clearSearch,
        clearError,
        goToPage,
        nextPage,
        prevPage,
        changeItemsPerPage,
    };

    return (
        <MenuContext.Provider value={value}>
            {children}
        </MenuContext.Provider>
    );
}