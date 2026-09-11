import { Link } from 'react-router-dom'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import {useState} from 'react'
import type {LibroCardProps} from '../types/libroCardProps'

function LibroCard({ id, titulo, autor, imagen }: LibroCardProps) {
    const [agregado, setAgregado] = useState(false)

    return (
        <Card>
            <Card.Img variant="top" src={imagen}/>
            <Card.Body className="text-center">
                <Card.Title>{titulo}</Card.Title>
                <Card.Text>{autor}</Card.Text>
            </Card.Body>
            
                <div className="d-flex flex-column gap-2 align-items-center mb-3">
                <Link to={`/libros/${id}`} className="btn btn-primary"> Ver más </Link>

                    <Button variant={agregado ? "dark" : "outline-dark"} onClick={() => setAgregado(!agregado)}>
                        { agregado ? "Agregado ✓" : "Agregar al carrito"}
                    </Button>
                </div>
        </Card>
    );
}

export default LibroCard;