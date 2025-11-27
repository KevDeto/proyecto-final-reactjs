import React, {useContext} from "react";
import { Col, Container, Row, Card as BootstrapCard, Button, Card} from "react-bootstrap";
import { useMenu } from "../../hooks/useMenu";
import { useCart } from "../../hooks/useCart"
import styles from "./ProductCard.module.css"

function ProductCard(){
  const { menu, loading, error } = useMenu();
  const { addToCart } = useCart();

  const handleAddToCart = (product) => {
    addToCart(product);
    // Opcional: puedes agregar un toast o feedback aquí
    console.log('🛒 Producto agregado:', product.name);
  };

  return(
    <Container fluid>
      <Row className="g-3">
        {menu.map((product) => (
          <Col xs={12} sm={6} md={6} lg={4} xl={4} xxl={3} key={product.id}>
            <Card className={`${styles.card} h-100`} onClick={() => handleAddToCart(product)}>
              <Card.Img src={product.image} className="cursor-pointer"/>
              <div className={`${styles.cardOverlay}`}>
                <div className={`${styles.plusIcon}`}>+</div>
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
        ))}
      </Row>
    </Container>
    );
} 

export default ProductCard;