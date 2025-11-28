import React, { createContext, useState, useContext, useCallback } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);

    const login = useCallback(async (credentials) => {
        setLoading(true);
        try {
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            if (credentials.email && credentials.password) {
                setIsAuthenticated(true);
                setUser({
                    email: credentials.email,
                    name: credentials.email.split('@')[0]
                });
                return { success: true };
            } else {
                throw new Error('Credenciales inválidas');
            }
        } catch (error) {
            setIsAuthenticated(false);
            setUser(null);
            return { 
                success: false, 
                error: error.message 
            };
        } finally {
            setLoading(false);
        }
    }, []);

    const logout = useCallback(() => {
        setIsAuthenticated(false);
        setUser(null);
        localStorage.removeItem('authToken');
    }, []);

    // Funcion para verificar sesion existente (util al recargar la pagina)
    const checkAuth = useCallback(() => {
        // verifico si existe algun token en localStorage
        const token = localStorage.getItem('authToken');
        if (token) {
            setIsAuthenticated(true);
        }
    }, []);

    const value = {
        isAuthenticated,
        user,
        loading,
        login,
        logout,
        checkAuth
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    
    if (!context) {
        throw new Error('useAuth debe ser usado dentro de un AuthProvider');
    }
    
    return context;
}