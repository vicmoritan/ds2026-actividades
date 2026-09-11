import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Container from 'react-bootstrap/Container'
import { Link, useNavigate } from 'react-router-dom'
import { obtenerToken, borrarToken } from '../../services/sesion'

function Header() {
  const navigate = useNavigate()
  const estaLogueado = !!obtenerToken()

  const manejarSesion = () => {
    if (estaLogueado) {
      borrarToken()
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
            <Nav.Link as={Link} to="/libros/nuevo">Agregar libro</Nav.Link>

            <button className="btn-login ms-lg-3 mt-2 mt-lg-0" onClick={manejarSesion}>
              {estaLogueado ? 'Salir' : 'Ingresar'}
            </button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Header