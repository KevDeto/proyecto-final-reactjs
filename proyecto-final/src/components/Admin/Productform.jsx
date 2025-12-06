import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Card, Row, Col } from 'react-bootstrap';
import { Save, Trash2, TextAlignJustify } from 'lucide-react';
import { useNavigate, useParams, NavLink, useLocation } from 'react-router-dom';
import { useMenu } from '../../hooks/useMenu';
import { toast } from 'react-toastify';
import { Helmet } from 'react-helmet';
import Sidebar from '../Sidebar/Sidebar';
import Logo from "../../assets/logo-mostaza.png"
import styles from "./Productform.module.css"
import stylesHome from "../Homepage/Homepage.module.css"

const ProductForm = () => {
    const location = useLocation();

    const { id } = useParams();    
    const navigate = useNavigate();
    const { createProduct, updateProduct, deleteProduct, getProductById, loading } = useMenu();
    
    const isEditMode = id !== 'new';
    //console.log('✅ isEditMode final:', isEditMode);

    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        image: '',
        category: ''
    });
    
    const [errors, setErrors] = useState({});

        const [showOffcanvas, setShowOffcanvas] = useState(false);
        
        const handleOpen = () => setShowOffcanvas(true);
        const handleClose = () => setShowOffcanvas(false);

    // cargo los datos del producto si estoy editando
    useEffect(() => {
        if (isEditMode) {
            loadProductData();
        }
    }, [id]);

    const loadProductData = async () => {
        try {
            const product = await getProductById(id);
            setFormData({
                name: product.name || '',
                description: product.description || '',
                price: product.price || '',
                image: product.image || '',
                category: product.category || ''
            });
        } catch (err) {
            toast.error('Error al cargar el producto');
            navigate('/admin/products');
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // limpio el error del campo modificado si es que existe
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const validateForm = () => {
        const newErrors = {};
        
        if (!formData.name.trim()) newErrors.name = 'El nombre es requerido';
        if (!formData.description.trim()) newErrors.description = 'La descripción es requerida';
        if (!formData.price || parseFloat(formData.price) <= 0) newErrors.price = 'El precio debe ser mayor a 0';
        if (!formData.image.trim()) newErrors.image = 'La URL de la imagen es requerida';
        if (!formData.category.trim()) newErrors.category = 'La categoría es requerida';
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) return;
        
        try {
            const productData = {
                ...formData,
                price: parseFloat(formData.price)
            };
            
            if (isEditMode) {
                await updateProduct(id, productData);
                toast.success('Producto actualizado exitosamente');
            } else {
                await createProduct(productData);
                toast.success('Producto creado exitosamente');
            }
            
            navigate('/admin/products');
        } catch (err) {
            toast.error(`Error al ${isEditMode ? 'actualizar' : 'crear'} el producto`);
        }
    };

    const handleDelete = async () => {
        if (!isEditMode) return;
        
        const toastId = toast.info(
            <div className="text-white">
                <h6 className="mb-2">¿Eliminar producto?</h6>
                <p className="mb-3">Esta acción no se puede deshacer</p>
                <div className="d-flex gap-2">
                    <button 
                        className="btn btn-sm btn-danger flex-fill"
                        onClick={() => {
                            toast.dismiss(toastId);
                            confirmDelete();
                        }}
                    >
                        Sí, eliminar
                    </button>
                    <button 
                        className="btn btn-sm btn-secondary flex-fill"
                        onClick={() => toast.dismiss(toastId)}
                    >
                        Cancelar
                    </button>
                </div>
            </div>,
            {
            position: "top-center",
            autoClose: false,
            closeOnClick: false,
            draggable: false,
            closeButton: false,
            className: 'bg-dark border border-danger'
            }
        );
    };

    const confirmDelete = async () => {
        try {
            await deleteProduct(id);
            toast.success('✅ Producto eliminado exitosamente');
            navigate('/admin/products');
        } catch (err) {
            toast.error('❌ Error al eliminar el producto');
        }
    };

    const handleCancel = () => {
        navigate('/admin/products');
    };

    return (
        <Container fluid className={`${styles.container}`}>
            <div>
                <Helmet key={location.pathname}>
                    <title>Mostaza - Formulario de producto</title>
                    <meta name="description" content="Formulario de datos del producto de la tienda previamente seleccionado para su edicion/creacion y posible eliminacion." />
                </Helmet>
            </div>
            <div>
                <Button className={`${stylesHome.btnTextAlignJustify} rounded-5`} onClick={handleOpen} >
                    <TextAlignJustify size={20} strokeWidth={4}/>
                </Button>
                <NavLink to="/">
                    <img src={Logo} alt="Mostaza" className={`${stylesHome.logo}`}/>
                </NavLink>
                <Sidebar showOffcanvas={showOffcanvas} handleClose={handleClose}/>
            </div>
            <Row className="g-3">
                <Col>
                    <Card className={`${styles.card}`}>
                        <Card.Body >
                            <Form onSubmit={handleSubmit} className={`${styles.form}`}>
                                <Row >
                                    <Col md={6} >
                                        <Form.Group className="mb-3">
                                            <Form.Label>Nombre del Producto *</Form.Label>
                                            <Form.Control
                                                className={`${styles.formControl}`}
                                                type="text"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                isInvalid={!!errors.name}
                                                placeholder="Ej: Hamburguesa Clásica"
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {errors.name}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    </Col>
                                    <Col md={6}>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Precio *</Form.Label>
                                            <Form.Control
                                                className={`${styles.formControl}`}
                                                type="number"
                                                step="0.01"
                                                name="price"
                                                value={formData.price}
                                                onChange={handleChange}
                                                isInvalid={!!errors.price}
                                                placeholder="Ej: 12.99"
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {errors.price}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Form.Group className="mb-3">
                                    <Form.Label>Descripción *</Form.Label>
                                    <Form.Control
                                        className={`${styles.formControl} `}
                                        as="textarea"
                                        rows={4}
                                        name="description"
                                        value={formData.description}
                                        onChange={handleChange}
                                        isInvalid={!!errors.description}
                                        placeholder="Describe el producto..."
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.description}
                                    </Form.Control.Feedback>
                                </Form.Group>
                        
                                <Row>
                                    <Col md={8}>
                                        <Form.Group className="mb-3">
                                            <Form.Label>URL de la Imagen *</Form.Label>
                                            <Form.Control
                                                className={`${styles.formControl}`}
                                                type="url"
                                                name="image"
                                                value={formData.image}
                                                onChange={handleChange}
                                                isInvalid={!!errors.image}
                                                placeholder="https://ejemplo.com/imagen.jpg"
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {errors.image}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    </Col>
                                    <Col md={4}>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Categoría *</Form.Label>
                                            <Form.Control
                                                className={`${styles.formControl}`}
                                                type="text"
                                                name="category"
                                                value={formData.category}
                                                onChange={handleChange}
                                                isInvalid={!!errors.category}
                                                placeholder="Ej: Hamburguesas"
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {errors.category}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    </Col>
                                </Row>
                        
                                <div className={`${styles.buttonContainer}`}>
                                    <Button 
                                        variant="primary" 
                                        type="submit" 
                                        disabled={loading}
                                        className={`${styles.formButton} ${styles.saveButton}`}
                                        aria-label={isEditMode ? "Actualizar producto" : "Crear nuevo producto"}
                                    >
                                        <Save size={18} className="me-2" />
                                        {loading ? 'Guardando...' : isEditMode ? 'Actualizar Producto' : 'Crear Producto'}
                                    </Button>
                            
                                    {isEditMode && (
                                        <Button 
                                            variant="danger" 
                                            onClick={handleDelete}
                                            disabled={loading}
                                            className={`${styles.formButton} ${styles.deleteButton}`}
                                            aria-label="Eliminar producto"
                                        >
                                            <Trash2 size={18} className="me-2" />
                                            Eliminar Producto
                                        </Button>
                                    )}
                            
                                    <Button 
                                        variant="secondary" 
                                        onClick={handleCancel}
                                        className={`${styles.formButton} ${styles.cancelButton}`}
                                        aria-label="Cancelar y volver al listado de productos"
                                    >
                                        Cancelar
                                    </Button>
                                </div>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default ProductForm;