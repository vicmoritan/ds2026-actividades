import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import NavbarLibreria from './components/NavbarLibreria'
import Hero from './components/Hero'
import LibroCard from './components/LibroCard'
import Footer from './components/Footer'
import './App.css'

function App() {

    return (
        <>
            <NavbarLibreria />

            <Hero />
            
            <Container className="text-center">
                <h2 className="subtituloDestacados my-5"> Libros destacados </h2>
                <Row className="g-4 justify-content-center">
                    <Col lg={2}>
                        <LibroCard
                            titulo="Crimen y Castigo"
                            autor="Fiódor Dostoievski"
                            imagen="/imagenes/CrimenYCastigo.jpg"
                        />
                    </Col>

                    <Col lg={2}>
                        <LibroCard
                            titulo="Demian"
                            autor="Herman Hesse"
                            imagen="/imagenes/Demian.jpg"
                        />
                    </Col>

                    <Col lg={2}>
                        <LibroCard
                            titulo="El Conde de Montecristo"
                            autor="Alexandre Dumas"
                            imagen="/imagenes/ElCondeDeMontecristo.jpg"
                        />
                    </Col>

                    <Col lg={2}>
                        <LibroCard
                            titulo="Anna Karenina"
                            autor="Lev Tolstói"
                            imagen="/imagenes/AnnaKarenina.jpg"
                        />
                    </Col>

                    <Col lg={2}>
                        <LibroCard
                            titulo="Orgullo y Prejuicio"
                            autor="Jane Austen"
                            imagen="/imagenes/OrgulloYPrejuicio.jpg"
                        />
                    </Col>

                    <Col lg={2}>
                        <LibroCard
                            titulo="Los hermanos Karamazov"
                            autor="Fiódor Dostoievski"
                            imagen="/imagenes/LosHermanosKaramazov.jpg"
                        />
                    </Col>
                </Row>
            </Container>

            <Footer />
        </>
    )
}

export default App