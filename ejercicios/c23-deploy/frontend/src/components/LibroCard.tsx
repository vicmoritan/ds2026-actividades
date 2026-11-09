import { Link } from 'react-router-dom'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import type { LibroCardProps } from '../types/libroCardProps'
import { formatearPrecio } from '../utils/formatearPrecio'
import { useCarrito } from '../context/CarritoContext'

function LibroCard({ id, titulo, autor, imagen, precio, descripcion, esAdmin = false }: LibroCardProps & { esAdmin?: boolean }) {
    const libro = { id, titulo, autor, imagen, precio, descripcion }
    const { agregar, quitar, contiene } = useCarrito()
    const enCarrito = contiene(id)

    return (
        <Card>
            <Card.Img variant="top" src={imagen}/>
            <Card.Body className="text-center">
                <Card.Title>{titulo}</Card.Title>
                <Card.Text>{autor.nombre}</Card.Text>
                <Card.Text className="fw-bold">{formatearPrecio(precio)}</Card.Text>
            </Card.Body>
            
            <div className="d-flex flex-column gap-2 align-items-center mb-3">
                <Link to={`/libros/${id}`} className="btn btn-primary"> Ver más </Link>

                {esAdmin ? (
                    <Link to={`/libros/${id}/editar`} className="btn btn-outline-dark">Editar</Link>
                ) : (
                    <Button
                        variant={enCarrito ? "dark" : "outline-dark"}
                        onClick={() => enCarrito ? quitar(id) : agregar(libro)}
                    >
                        { enCarrito ? "Agregado ✓" : "Agregar al carrito"}
                    </Button>
                )}
            </div>
        </Card>
    );
}

export default LibroCard;