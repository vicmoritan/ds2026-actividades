import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import type { LibroCardProps } from '../types/libroCardProps'
import { libroSchema, type LibroValidado } from '../schemas/libroSchema'

interface Props {
    onAgregar: (libro: LibroCardProps) => void
}

function LibroNuevo({ onAgregar }: Props) {
    const navigate = useNavigate()
    const [form, setForm] = useState({titulo: '', autor: '', descripcion: '', precio: ''})
    const [errores, setErrores] = useState<Record<string, string>>({})

    const handleChange = (e: React.ChangeEvent <HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target

        setForm({...form, [name]: value})
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        const resultado = libroSchema.safeParse(form)

        if (!resultado.success) {
            const errores: Record<string, string> = {}

            for (const issue of resultado.error.issues) {
                const campo = String(issue.path[0])

                if (!errores[campo]) {
                    errores[campo] = issue.message
                }
            }

            setErrores(errores)
            return
        }

        setErrores({})

        const libroValidado: LibroValidado = resultado.data

        onAgregar({
            ...libroValidado,
            id: Date.now(),
            precio: Number(libroValidado.precio),
            imagen: '/imagenes/sinImagen.jpg'
        })

        navigate('/catalogo')
    }

    return (
        <Form
            onSubmit={handleSubmit}
            className="container pt-5 mt-4"
            style={{ maxWidth: '500px' }}
        >
            <h2 className="subtituloDestacados text-center mb-4">
                Agregar libro
            </h2>

            <Form.Group className="mb-3">
                <Form.Label>Título</Form.Label>
                <Form.Control
                    name="titulo"
                    value={form.titulo}
                    onChange={handleChange}
                    isInvalid={!!errores.titulo}
                />
                <Form.Control.Feedback type="invalid">
                    {errores.titulo}
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Autor</Form.Label>
                <Form.Control
                    name="autor"
                    value={form.autor}
                    onChange={handleChange}
                    isInvalid={!!errores.autor}
                />
                <Form.Control.Feedback type="invalid">
                    {errores.autor}
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Descripción</Form.Label>
                <Form.Control
                    as="textarea"
                    rows={3}
                    name="descripcion"
                    value={form.descripcion}
                    onChange={handleChange}
                    isInvalid={!!errores.descripcion}
                />
                <Form.Control.Feedback type="invalid">
                    {errores.descripcion}
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-4">
                <Form.Label>Precio</Form.Label>
                <Form.Control
                    type="number"
                    name="precio"
                    value={form.precio}
                    onChange={handleChange}
                    isInvalid={!!errores.precio}
                />
                <Form.Control.Feedback type="invalid">
                    {errores.precio}
                </Form.Control.Feedback>
            </Form.Group>

            <div className="text-center">
                <Button type="submit"> Agregar libro </Button>
            </div>
        </Form>
    )
}

export default LibroNuevo