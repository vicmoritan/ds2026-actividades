import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Spinner from 'react-bootstrap/Spinner'
import LibroCard from '../components/LibroCard'
import Hero from '../components/Hero'
import { useFetch } from '../hooks/useFetch'
import type { LibroCardProps } from '../types/libroCardProps'
import '../App.css'

function Home() {

    const { data: libros, loading, error } = useFetch<LibroCardProps[]>('/libros.json')

    if (loading) {
        return (
            <>
                <Hero />
                <Container className="text-center py-5">
                    <Spinner animation="border" variant="primary" />
                    <p className="mt-2 text-muted">Cargando novedades...</p>
                </Container>
            </>
        )
    }

    if (error) {
        return (
            <>
                <Hero />
                <Container className="text-center py-5">
                    <p className="text-danger">No se pudieron cargar los libros destacados.</p>
                </Container>
            </>
        )
    }

    return (
        <>
            <Hero />
            <Container className="text-center mb-5">
                <h2 className="subtituloDestacados my-5">
                    Libros destacados
                </h2>

                <Row className="g-4 justify-content-center">
                    {(libros ?? []).map((libro) => (
                        <Col lg={2} md={4} sm={6} xs={12} key={libro.id}>
                            <LibroCard {...libro} />
                        </Col>
                    ))}
                </Row>
            </Container>
        </>
    )
}

export default Home