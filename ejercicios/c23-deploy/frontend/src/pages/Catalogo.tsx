import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Spinner from 'react-bootstrap/Spinner'
import Alert from 'react-bootstrap/Alert'
import { useNavigate } from 'react-router-dom'
import LibroCard from '../components/LibroCard'
import { useFetch } from '../hooks/useFetch'
import { useBusqueda } from '../context/BusquedaContext'
import type { LibroCardProps } from '../types/libroCardProps'
import '../App.css'

function Libros() {
    const navigate = useNavigate()
    const { filtro } = useBusqueda()
    const { data: libros, loading, error } = useFetch<LibroCardProps[]>('/libros')

    const librosFiltrados = libros?.filter((libro) => {
        const texto = filtro.trim().toLowerCase();
        if (!texto) return true;
        return (
            libro.titulo.toLowerCase().includes(texto) ||
            libro.autor?.nombre?.toLowerCase().includes(texto)
        );
    });

    if (loading) {
        return (
            <Container className="py-5 text-center">
                <Spinner animation="border" variant="primary" />
                <p className="mt-2 text-muted">Cargando libros...</p>
            </Container>
        )
    }

    if (error) {
        return (
            <Container className="py-5">
                <Alert variant="danger">
                    <Alert.Heading>Error al cargar los libros</Alert.Heading>
                    <p>{error}</p>
                </Alert>
            </Container>
        )
    }

    return (
        <Container className="py-5">
            <div className="position-relative d-flex justify-content-end align-items-center mb-5">
                <h1 className="subtituloDestacados position-absolute top-50 start-50 translate-middle m-0"> 
                    Nuestros libros 
                </h1>
                <Button className="botonAgregar" onClick={() => navigate('/libros/nuevo')}>
                    + Agregar libro
                </Button>
            </div>

            {(!librosFiltrados || librosFiltrados.length === 0) ? (
                <p className="text-center text-muted">
                    {filtro.trim()
                        ? 'No se encontraron libros que coincidan con la búsqueda.'
                        : 'No hay libros para mostrar en este momento.'}
                </p>
            ) : (
                <Row className="g-4 justify-content-center">
                    {librosFiltrados.map((libro) => (
                        <Col lg={3} md={4} sm={6} xs={12} className="mb-3" key={libro.id}>
                            <LibroCard {...libro} />
                        </Col>
                    ))}
                </Row>
            )}
        </Container>
    )
}

export default Libros;