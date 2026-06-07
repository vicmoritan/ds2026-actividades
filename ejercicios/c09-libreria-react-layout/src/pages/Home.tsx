import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import LibroCard from '../components/LibroCard'
import { libros } from '../data/libros'
import '../App.css'

function Home() {

    return (
        <>
        <Container className="text-center">
            <h2 className="subtituloDestacados my-5">
                Libros destacados
            </h2>

            <Row className="g-4 justify-content-center">
                {libros.map((libro) => (
                    <Col lg={2} key={libro.titulo}>
                        <LibroCard libro={libro} />
                    </Col>
                ))}
            </Row>
        </Container>
        </>
    )
}

export default Home