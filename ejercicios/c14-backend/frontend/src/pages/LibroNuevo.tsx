import { useNavigate } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import type { LibroCardProps } from '../types/libroCardProps'
import { libroSchema, type LibroValidado } from '../schemas/libroSchema'

interface Props {
    onAgregar: (libro: LibroCardProps) => void
}

function LibroNuevo({ onAgregar }: Props) {
    const navigate = useNavigate()
    const {register, handleSubmit, formState: { errors }} = useForm<LibroValidado>({resolver: zodResolver(libroSchema)})

    const onSubmit = (data: LibroValidado) => {
        onAgregar({
            ...data,
            id: Date.now(),
            precio: Number(data.precio),
            imagen: '/imagenes/sinImagen.jpg'
        })

        navigate('/catalogo')
    }

    return (
        <Form onSubmit={handleSubmit(onSubmit)} className="container pt-5 mt-4" style={{ maxWidth: '500px' }}>

            <h2 className="subtituloDestacados text-center mb-4"> Agregar libro </h2>

            <Form.Group className="mb-3">
                <Form.Label>Título</Form.Label>
                <Form.Control
                    {...register('titulo')}
                    isInvalid={!!errors.titulo}
                />
                <Form.Control.Feedback type="invalid">
                    {errors.titulo?.message}
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Autor</Form.Label>
                <Form.Control
                    {...register('autor')}
                    isInvalid={!!errors.autor}
                />
                <Form.Control.Feedback type="invalid">
                    {errors.autor?.message}
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Descripción</Form.Label>
                <Form.Control
                    as="textarea"
                    rows={3}
                    {...register('descripcion')}
                    isInvalid={!!errors.descripcion}
                />
                <Form.Control.Feedback type="invalid">
                    {errors.descripcion?.message}
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-4">
                <Form.Label>Precio</Form.Label>
                <Form.Control
                    type="number"
                    {...register('precio')}
                    isInvalid={!!errors.precio}
                />
                <Form.Control.Feedback type="invalid">
                    {errors.precio?.message}
                </Form.Control.Feedback>
            </Form.Group>

            <div className="text-center">
                <Button type="submit">
                    Agregar libro
                </Button>
            </div>
        </Form>
    )
}

export default LibroNuevo