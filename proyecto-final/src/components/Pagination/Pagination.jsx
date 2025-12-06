import React from 'react';
import { Button, ButtonGroup } from 'react-bootstrap';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import styles from "./Pagination.module.css"

const Pagination = ({ 
    currentPage, 
    totalPages, 
    onPageChange, 
    onNext, 
    onPrev,
    totalItems,
    itemsPerPage 
}) => {

    // genero los numeros de las paginas
    const getPageNumbers = () => {
        const pages = [];
        const maxVisiblePages = 5;
        
        if (totalPages <= maxVisiblePages) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            if (currentPage <= 3) {
                pages.push(1, 2, 3, 4, '...', totalPages);
            } else if (currentPage >= totalPages - 2) {
                pages.push(1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
            } else {
                pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
            }
        }
        return pages;
    };

    if (totalPages <= 1) return null;

    return (
        <div className={`${styles.container}`}>
            <div className={`${styles.actualPage}`}>
                Mostrando {(currentPage - 1) * itemsPerPage + 1} - {Math.min(currentPage * itemsPerPage, totalItems)} de {totalItems} productos
            </div>
            
            <ButtonGroup className={`${styles.buttonGroup}`}>
                <Button variant="outline-danger" onClick={onPrev} disabled={currentPage === 1} className={`${styles.button}`}
                    aria-label="Dirigirse a la pagina anterior">
                    <ChevronLeft size={16} />
                </Button>

                {getPageNumbers().map((page, index) => (
                    <Button
                        key={index}
                        variant={page === currentPage ? "danger" : "outline-danger"}
                        onClick={() => typeof page === 'number' && onPageChange(page)}
                        disabled={page === '...'}
                        className={`${styles.paginationButton} ${page === currentPage ? styles.active : styles.inactive}`}
                        aria-label={page === currentPage ? `Página actual, página ${page}` : `Ir a la página ${page}`}
                        >
                        {page}
                    </Button>
                ))}

                <Button variant="outline-danger" onClick={onNext} disabled={currentPage === totalPages} 
                    className={`${styles.button}`}
                    aria-label="Dirigirse a la pagina siguiente">
                    <ChevronRight size={16} />
                </Button>
            </ButtonGroup>
        </div>
    );
};

export default Pagination;