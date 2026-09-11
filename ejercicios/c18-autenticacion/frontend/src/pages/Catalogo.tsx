import { useState, useEffect } from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Spinner from 'react-bootstrap/Spinner'
import Alert from 'react-bootstrap/Alert'
import { useNavigate } from 'react-router-dom'
import LibroCard from '../components/LibroCard'
import { useFetch } from '../hooks/useFetch'
import type { LibroCardProps } from '../types/libroCardProps'
import '../App.css'

interface Props {
    librosCreados: LibroCardProps[]
}

function Libros({ librosCreados }: Props) {
    const navigate = useNavigate()
    const { data: librosMock, loading, error } = useFetch<LibroCardProps[]>('/libros.json')
    const [listaLibros, setListaLibros] = useState<LibroCardProps[]>([])

    useEffect(() => {
        const librosBase = librosMock ?? [];
        setListaLibros([...librosBase, ...librosCreados]);
    }, [librosMock, librosCreados]) 

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

            {listaLibros.length === 0 ? (
                <p className="text-center text-muted">No hay libros para mostrar en este momento.</p>
            ) : (
                <Row className="g-4 justify-content-center">
                    {listaLibros.map((libro) => (
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