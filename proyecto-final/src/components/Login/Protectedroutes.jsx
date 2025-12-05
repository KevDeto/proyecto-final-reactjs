import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';


const Protectedroutes = ({ 
    children, 
    isAuthenticated, 
    redirectPath = '/login' 
}) => {
    const location = useLocation();

    // si no estas autenticado, te redirige al login guardando la ubicacion actual
    if (!isAuthenticated) {
        return (
            <Navigate to={redirectPath} replace state={{ from: location }}/>
        );
    }

    return children;
};

export default Protectedroutes;