import React from "react";
import { Col, Container, Row, Card} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { SquarePen } from 'lucide-react';
import { useMenu } from "../../hooks/useMenu";
import Pagination from "../Pagination/Pagination";
import styles from "../ProductCard/ProductCard.module.css"

function Adminproduct(){
  const {
    loading, 
    error, 
    currentPageItems, 
    currentPage,
    totalPages,
    totalItems,
    itemsPerPage,
    goToPage,
    nextPage,
    prevPage 
  } = useMenu();

  const navigate = useNavigate();

  const handleEditClick = (productId) => {
    navigate(`/admin/product/${productId}`);
  };

  if (loading) {
    return (
      <Container fluid>
        <div className="text-center text-white py-4">Cargando productos...</div>
      </Container>
    );
  }

  if (error) {
    return (
      <Container fluid>
        <div className="text-center text-white py-4">Error: {error}</div>
      </Container>
    );
  }

  return(
    <Container fluid>
      <Row className="g-3">
        {currentPageItems.length === 0 ? (
          <Col xs={12}>
            <div className="text-center text-white py-5">
              <h5>No se encontraron productos</h5>
              <p>Intenta con otros términos de búsqueda</p>
            </div>
          </Col>
        ) : (
        currentPageItems.map((product) => (
          <Col xs={12} sm={6} md={6} lg={4} xl={4} xxl={3} key={product.id}>
            <Card className={`${styles.card} h-100`} onClick={() => handleEditClick(product.id)}>
              <Card.Img src={product.image} className="cursor-pointer"/>
              <div className={`${styles.cardOverlay}`}>
                <SquarePen size={30} strokeWidth={3} color="white"/>
              </div>
              <Card.Body className={`${styles.cardBody} fw-bold`}>
                <Card.Title >
                  {product.name}
                </Card.Title>
                <Card.Text className={`${styles.cardText}`}>
                  {product.description}
                </Card.Text>
                <Card.Footer className={`${styles.cardFooter}`}>
                  {product.price}
                </Card.Footer>
              </Card.Body>
            </Card>
          </Col>
        ))
      )}
      </Row>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={totalItems}
        itemsPerPage={itemsPerPage}
        onPageChange={goToPage}
        onNext={nextPage}
        onPrev={prevPage}
      />
    </Container>
    );
} 

export default Adminproduct;