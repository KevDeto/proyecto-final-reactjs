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

    // POST - Crear nuevo producto
    const createProduct = async (productData) => {
        try {
            setError(null);
            const newProduct = await apiClient.post(API_URL, productData);
            
            // Actualizar el estado local
            setMenu(prev => [...prev, newProduct]);
            setFilteredMenu(prev => [...prev, newProduct]);
            
            return newProduct;
        } catch (err) {
            setError(err.message);
            console.error("Error creating product:", err);
            throw err;
        }
    };

    // PUT - Actualizar producto existente
    const updateProduct = async (id, productData) => {
        try {
            setError(null);
            const updatedProduct = await apiClient.put(`${API_URL}/${id}`, productData);
            
            // Actualizar el estado local
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

    // DELETE - Eliminar producto
    const deleteProduct = async (id) => {
        try {
            setError(null);
            await apiClient.delete(`${API_URL}/${id}`);
            
            // Actualizar el estado local
            setMenu(prev => prev.filter(item => item.id !== id));
            setFilteredMenu(prev => prev.filter(item => item.id !== id));
            
            return true;
        } catch (err) {
            setError(err.message);
            console.error("Error deleting product:", err);
            throw err;
        }
    };

    // GET - Obtener un producto por ID
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

    // Función para buscar productos
    const searchProducts = (term) => {
        setSearchTerm(term);
        setCurrentPage(1);

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

    const changeItemsPerPage = (newItemsPerPage) => {
        setItemsPerPage(newItemsPerPage);
        setCurrentPage(1); // Resetear a primera página
    };

    // Calcular productos para la página actual
    const getCurrentPageItems = () => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return filteredMenu.slice(startIndex, endIndex);
    };

    // Calcular total de páginas
    const getTotalPages = () => {
        return Math.ceil(filteredMenu.length / itemsPerPage);
    };

    // Cambiar página
    const goToPage = (pageNumber) => {
        if (pageNumber >= 1 && pageNumber <= getTotalPages()) {
            setCurrentPage(pageNumber);
        }
    };

    // Ir a página siguiente
    const nextPage = () => {
        if (currentPage < getTotalPages()) {
            setCurrentPage(currentPage + 1);
        }
    };

    // Ir a página anterior
    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
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
        currentPageItems: getCurrentPageItems(),
        currentPage,
        itemsPerPage,
        totalPages: getTotalPages(),
        totalItems: filteredMenu.length,
        searchTerm,
        loading,
        error,
    
        // Acciones CRUD
        fetchMenu,
        createProduct,
        updateProduct,
        deleteProduct,
        getProductById,

        //otras acciones
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