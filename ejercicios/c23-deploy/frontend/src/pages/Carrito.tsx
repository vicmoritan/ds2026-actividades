import Container from 'react-bootstrap/Container';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import { Link } from 'react-router-dom';
import { useCarrito } from '../context/CarritoContext';
import { formatearPrecio } from '../utils/formatearPrecio';

function Carrito() {
  const { libros, quitar } = useCarrito();

  return (
    <Container className="py-5">
      <h1 className="subtituloDestacados text-center mb-5">Mi carrito</h1>

      {libros.length === 0 ? (
        <p className="text-center text-muted">Todavía no agregaste libros al carrito.</p>
      ) : (
        <ListGroup className="mx-auto" style={{ maxWidth: '700px' }}>
          {libros.map((libro) => (
            <ListGroup.Item key={libro.id} className="d-flex align-items-center gap-3">
              <Image src={libro.imagen} alt="" width={64} height={88} className="object-fit-cover" />
              <div className="flex-grow-1">
                <h2 className="h5 mb-1">{libro.titulo}</h2>
                <p className="text-muted mb-1">{libro.autor.nombre}</p>
                <strong>{formatearPrecio(libro.precio)}</strong>
              </div>
              <Button variant="outline-danger" onClick={() => quitar(libro.id)}>
                Quitar
              </Button>
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}

      <div className="text-center mt-4">
        <Link to="/catalogo" className="btn btn-secondary">Volver al catálogo</Link>
      </div>
    </Container>
  );
}

export default Carrito;
