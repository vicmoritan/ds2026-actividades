import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'

function Hero() {
    return (
        <section className="hero">
            <Container className="text-center py-5">
                <h1 className="tituloHero"> ¡Te damos la bienvenida a Libros del Subsuelo! </h1>

                <h2 className="subtituloHero"> Historias profundas para mentes inquietas.</h2>

                <Button variant="primary"> Accedé a nuestro catálogo </Button>
            </Container>
        </section>
    )
}

export default Hero