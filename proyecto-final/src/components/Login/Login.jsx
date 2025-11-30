import React, { useState} from "react";
import { Card, Container, Form, Button, Alert, Spinner } from "react-bootstrap";
import { useLocation, useNavigate, NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { TextAlignJustify } from "lucide-react";
import { Helmet } from 'react-helmet';
import Sidebar from "../Sidebar/Sidebar.jsx";
import styles from "./Login.module.css"
import stylesHome from "../Homepage/Homepage.module.css";
import Logo from "../../assets/logo-mostaza.png"


const Login = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [showOffcanvas, setShowOffcanvas] = useState(false);
    const handleOpen = () => setShowOffcanvas(true);
    const handleClose = () => setShowOffcanvas(false);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [formErrors, setFormErrors] = useState({});
    const { login, loading } = useAuth();

    const location = useLocation();
    const navigate = useNavigate();

    // guarda la ruta desde la que se redirigió al login
    const from = location.state?.from?.pathname || '/';

    const validateForm = () => {
        const errors = {};
        
        if (!email) {
            errors.email = 'El email es requerido';
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            errors.email = 'Email inválido';
        }
        
        if (!password) {
            errors.password = 'La contraseña es requerida';
        } else if (password.length < 6) {
            errors.password = 'La contraseña debe tener al menos 6 caracteres';
        }
        
        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) return;

        const result = await login({ email, password });
        
        if (result.success) {
            navigate(from, { replace: true });
        } else {
            setFormErrors({ general: result.error });
        }
    };

    return (
        <Container className={`${styles.container}`}>
            <div>
                <div>
                    <Helmet>
                        <title>Mostaza - Login</title>
                        <meta name="description" content="Inicio de sesion para disfrutar de una mejor experiencia" />
                    </Helmet>
                </div>
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
            <Card className={`${styles.card}`}>
                <Card.Body className="p-4">
                    <Card.Title as="h2" className="text-center mb-4">
                        Iniciar Sesión
                    </Card.Title>

                    {formErrors.general && (
                        <Alert variant="danger" className="mb-3">
                            {formErrors.general}
                        </Alert>
                    )}

                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label >Email</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="tu@email.com"
                                className={`${styles.formControl}`}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                isInvalid={!!formErrors.email}
                                disabled={loading}
                            />
                            <Form.Control.Feedback type="invalid">
                                {formErrors.email}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-4">
                            <Form.Label>Contraseña</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Tu contraseña"
                                className={`${styles.formControl}`}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                isInvalid={!!formErrors.password}
                                disabled={loading}
                            />
                            <Form.Control.Feedback type="invalid">
                                {formErrors.password}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Button type="submit" className={`${styles.button} w-100`} disabled={loading}>
                            {loading ? (
                                <div>
                                    <Spinner
                                        as="span"
                                        animation="border"
                                        size="sm"
                                        role="status"
                                        aria-hidden="true"
                                        className="me-2"
                                    />
                                    Iniciando sesión...
                                </div>
                            ) : (
                                'Iniciar Sesion'
                            )}
                        </Button>
                    </Form>
                    <Alert variant="info" className={`${styles.info} mt-4 small`}>
                        <strong>Para acceder:</strong> Cualquier email valido y contraseña de 6+ caracteres funciona.
                    </Alert>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default Login;