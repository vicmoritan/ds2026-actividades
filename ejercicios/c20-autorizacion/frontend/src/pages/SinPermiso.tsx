import Alert from 'react-bootstrap/Alert';
import { Link } from 'react-router-dom';

export function SinPermiso() {
  return (
    <Alert variant="warning">
      <Alert.Heading>Acceso Denegado</Alert.Heading>
      <div>
         <p><b>No tenés los permisos necesarios para acceder a esta página.</b></p>
        <p>Esto es una zona restringida.</p>   
      </div>
      <Link to="/catalogo" className="btn btn-primary">
        Volver al catálogo
      </Link>
    </Alert>
  );
}