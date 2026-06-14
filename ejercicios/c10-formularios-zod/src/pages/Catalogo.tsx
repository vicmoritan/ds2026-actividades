import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import { useNavigate } from 'react-router-dom'
import LibroCard from '../components/LibroCard'
import type { LibroCardProps } from '../types/libroCardProps'
import '../App.css'

interface Props {
    libros: LibroCardProps[]
}

function Libros({ libros }: Props) {

    const navigate = useNavigate()

    return (
        <Container className="py-5">

            <div className="position-relative d-flex justify-content-end align-items-center mb-5">
                <h1 className="subtituloDestacados position-absolute top-50 start-50 translate-middle m-0"> Nuestros libros </h1>

                <Button className="botonAgregar" onClick={() => navigate('/libros/nuevo')}> + Agregar libro</Button>
            </div>

            {libros.length === 0 ? (
                <p className="text-center">
                    No hay libros para mostrar.
                </p>
            ) : (
                <Row className="g-4 justify-content-center">
                    {libros.map((libro) => (
                        <Col lg={3} md={4} sm={6} xs={12} className="mb-3" key={libro.id}>
                            <LibroCard {...libro} />
                        </Col>
                    ))}
                </Row>
            )}

        </Container>
    )
}

export default Libros