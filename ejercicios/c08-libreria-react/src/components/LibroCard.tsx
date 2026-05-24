import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import {useState} from 'react'

type LibroCardProps = {
    titulo: string;
    autor: string;
    imagen: string;
};

function LibroCard({titulo, autor, imagen}: LibroCardProps) {
    const [agregado, setAgregado] = useState(false)

    return (
        <Card>
            <Card.Img variant="top" src={imagen}/>
            <Card.Body>
                <Card.Title>{titulo}</Card.Title>
                <Card.Text>{autor}</Card.Text>
            </Card.Body>
            
                <div className="d-flex flex-column gap-2 align-items-center mb-3">
                    <Button variant="primary"> Ver más </Button>

                    <Button variant={agregado ? "dark" : "outline-dark"} onClick={() => setAgregado(!agregado)}>
                        { agregado ? "Agregado ✓" : "Agregar al carrito"}
                    </Button>
                </div>
        </Card>
    );
}

export default LibroCard;