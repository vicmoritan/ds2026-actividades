import { useParams, Link } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Spinner from 'react-bootstrap/Spinner'
import { Button } from 'react-bootstrap'
import { useState, useEffect } from 'react'
import { useFetch } from '../hooks/useFetch'
import type { LibroCardProps } from '../types/libroCardProps'

interface Props {
    librosCreados: LibroCardProps[]
}

function LibroDetalle({ librosCreados }: Props) {
    const { id } = useParams()
    const { data: librosMock, loading } = useFetch<LibroCardProps[]>('/libros.json')
    const [libro, setLibro] = useState<LibroCardProps | null>(null)

    useEffect(() => {
        const librosBase = librosMock ?? [];
        const listaCompleta = [...librosBase, ...librosCreados];
        
        if (id && listaCompleta.length > 0) {
            const encontrado = listaCompleta.find((l) => l.id === Number(id))
            if (encontrado) {
                setLibro(encontrado)
            }
        }
    }, [id, librosMock, librosCreados])

    if (loading) {
        return (
            <Container className="py-5 text-center">
                <Spinner animation="border" variant="primary" />
            </Container>
        )
    }

    if (!libro) {
        return (
            <Container className="py-5 text-center">
                <h2>Libro no encontrado</h2>
                <Link to="/catalogo" className="btn btn-secondary mt-3">Volver al catálogo</Link>
            </Container>
        )
    }

    return (
        <Container className="py-5">
            <Row className="align-items-center">
                <Col md={4}>
                    <img src={libro.imagen} alt={libro.titulo} className="img-fluid rounded shadow imagen-detalle" />
                </Col>
                <Col md={6} className="ps-md-5">
                    <h1>{libro.titulo}</h1>
                    <h4 className="text-muted">{libro.autor}</h4>
                    <p>{libro.descripcion ? libro.descripcion : "Sin descripción disponible"}</p>
                    {libro.precio && (<h3>${libro.precio}</h3>)}
                    <div className="d-flex gap-2 mt-3">
                        <Button className="btn btn-primary">Comprar</Button>
                        <Link to="/catalogo" className="btn btn-secondary"> Ir al catálogo </Link>
                    </div>
                </Col>
            </Row>
        </Container>
    )
}

export default LibroDetalle;