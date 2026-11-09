import { Navbar, Nav, Container, Form, InputGroup, Button } from 'react-bootstrap';
import type { FormEvent } from 'react';
import { useBusqueda } from '../../context/BusquedaContext';
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext';
import { useCarrito } from '../../context/CarritoContext';

function Header() {
  const { filtro, setFiltro } = useBusqueda(); 
  const navigate = useNavigate()

  const { usuario, logout, tieneRol } = useAuth();
  const { libros } = useCarrito();

  const buscar = (e: FormEvent) => {
    e.preventDefault();
    navigate('/catalogo');
  };

  const manejarSesion = () => {
    if (usuario) {
      logout()
      navigate('/')
    } else {
      navigate('/login')
    }
  }

  return (
    <Navbar expand="lg" data-bs-theme="dark" className="custom-navbar">
      <Container>
        <Navbar.Brand>📚 Libros del Subsuelo</Navbar.Brand>

        <Navbar.Toggle aria-controls="navbar-nav" />

        <Navbar.Collapse id="navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/catalogo">Catálogo</Nav.Link>
            {tieneRol('ADMIN') && <Nav.Link as={Link} to="/libros/nuevo">Nuevo libro</Nav.Link>}

            <Form onSubmit={buscar} className="ms-lg-3" style={{ maxWidth: '18rem' }}>
              <InputGroup>
                <Form.Control
                  type="search"
                  placeholder="Buscar por título o autor…"
                  value={filtro}
                  onChange={(e) => setFiltro(e.target.value)}
                />
                <Button type="submit" variant="outline-secondary" aria-label="Buscar">
                  🔍
                </Button>
              </InputGroup>
            </Form>

            {usuario && <Navbar.Text className="ms-lg-3">Hola, {usuario.nombre}</Navbar.Text>}
            <button className="btn-login ms-lg-3 mt-2 mt-lg-0" onClick={manejarSesion}>
              {usuario ? 'Salir' : 'Ingresar'}
            </button>
            <Nav.Link
              as={Link}
              to="/carrito"
              className="ms-lg-3"
              aria-label={`Carrito, ${libros.length} libros`}
            >
              <span aria-hidden="true">🛒</span> <span className="badge bg-light text-dark">{libros.length}</span>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Header