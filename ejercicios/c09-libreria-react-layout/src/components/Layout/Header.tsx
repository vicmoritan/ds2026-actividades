import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Container from 'react-bootstrap/Container'

function Header() {
    return (
        <Navbar expand="lg" data-bs-theme="dark" className="custom-navbar">
            <Container>
                <Navbar.Brand>
                    📚 Libros del Subsuelo
                </Navbar.Brand>

                <Navbar.Toggle aria-controls="navbar-nav" />

                <Navbar.Collapse id="navbar-nav">
                    <Nav className="ms-auto">
                        <Nav.Link active>Home</Nav.Link>
                        <Nav.Link>Catálogo</Nav.Link>
                        <Nav.Link>Contacto</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Header