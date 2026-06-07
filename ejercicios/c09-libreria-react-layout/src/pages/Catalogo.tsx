import { useState } from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'

function Catalogo() {

    const [texto, setTexto] = useState('')
    const [libros, setLibros] = useState<any[]>([])
    const [error, setError] = useState('')
    const [cargando, setCargando] = useState('')

    async function buscarLibros() {

        const q = texto.trim()

        if (q === '') {
            setError('Ingrese un libro')
            setLibros([])
            return
        }

        setError('')
        setCargando('Cargando...')

        try {
            const response = await fetch(
                `https://openlibrary.org/search.json?q=${q}`
            )

            if (!response.ok) {
                throw new Error()
            }

            const data = await response.json()

            setLibros(data.docs.slice(0, 12))

            if (data.docs.length === 0) {
                setError('No se encontraron libros')
            }

        } catch {
            setError('Error en la búsqueda del libro')
            setLibros([])
        }

        setCargando('')
    }

    return (
        <Container className="py-4">

            <h1 className="otrosTitulos"> Buscá un libro </h1>

            <Form.Control
                value={texto}
                onChange={(e) => setTexto(e.target.value)}
                placeholder="Buscar libro..."
                className="mb-2"
            />

            <Button
                className="mb-3"
                onClick={buscarLibros}
            >
                Buscar
            </Button>

            <div className="text-center text-muted mb-2">
                {cargando}
            </div>

            <div className="text-center text-danger fw-bold mb-2">
                {error}
            </div>

            <Row>
                {libros.map((libro) => (
                    <Col md={2} className="mb-3" key={libro.key}>
                        <Card>

                            <Card.Img
                                variant="top"
                                src={
                                    libro.cover_i
                                        ? `https://covers.openlibrary.org/b/id/${libro.cover_i}-L.jpg`
                                        : '/imagenes/sinImagen.jpg'
                                }
                            />

                            <Card.Body>

                                <Card.Title>
                                    {libro.title}
                                </Card.Title>

                                <Card.Text>
                                    <strong>Autor:</strong>{' '}
                                    {libro.author_name
                                        ? libro.author_name[0]
                                        : 'Desconocido'}
                                </Card.Text>

                            </Card.Body>

                        </Card>
                    </Col>
                ))}
            </Row>

        </Container>
    )
}

export default Catalogo