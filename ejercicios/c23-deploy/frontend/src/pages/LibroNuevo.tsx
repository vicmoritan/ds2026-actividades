import { useNavigate } from 'react-router-dom'
import { Form, Button, Spinner, Alert } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useState } from 'react'
import type { Autor, LibroCardProps } from '../types/libroCardProps'
import { libroSchema, type LibroValidado } from '../schemas/libroSchema'
import { useFetch } from '../hooks/useFetch'
import { apiFetch } from '../services/api'

type LibroFormulario = z.input<typeof libroSchema>

function LibroNuevo() {
  const navigate = useNavigate()
  const [errorApi, setErrorApi] = useState<string | null>(null)
  const { data: autores, loading, error } = useFetch<Autor[]>('/autores')

  const { register, handleSubmit, formState: { errors } } = useForm<LibroFormulario, unknown, LibroValidado>({
    resolver: zodResolver(libroSchema),
    defaultValues: {
      imagen: '/imagenes/sinImagen.jpg',
    },
  })

  const onSubmit = async (data: LibroValidado) => {
    try {
      await apiFetch<LibroCardProps>('/libros', {
        method: 'POST',
        body: JSON.stringify({
          ...data,
          imagen: '/imagenes/sinImagen.jpg',
        }),
      })
      navigate('/catalogo')
    } catch (e) {
      setErrorApi(e instanceof Error ? e.message : 'Error desconocido')
    }
  }

  if (loading) return <Spinner animation="border" />
  if (error) return <Alert variant="danger">{error}</Alert>

  return (
    <Form onSubmit={handleSubmit(onSubmit)} className="container pt-5 mt-4" style={{ maxWidth: '500px' }}>
      <h2 className="subtituloDestacados text-center mb-4"> Agregar libro </h2>

      {errorApi && <Alert variant="danger">{errorApi}</Alert>}

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
        <Form.Select
          {...register('autorId', { valueAsNumber: true })}
          isInvalid={!!errors.autorId}
        >
          <option value="">Seleccioná un autor…</option>
          {(autores ?? []).map((autor) => (
            <option key={autor.id} value={autor.id}>{autor.nombre}</option>
          ))}
        </Form.Select>
        <Form.Control.Feedback type="invalid">
          {errors.autorId?.message}
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

      <Form.Control type="hidden" {...register('imagen')} />

      <div className="text-center">
        <Button type="submit">
          Agregar libro
        </Button>
      </div>
    </Form>
  )
}

export default LibroNuevo