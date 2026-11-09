import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Alert, Button, Form, Spinner } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import type { Autor, LibroCardProps } from '../types/libroCardProps'
import { libroSchema, type LibroValidado } from '../schemas/libroSchema'
import { useFetch } from '../hooks/useFetch'
import { apiFetch } from '../services/api'

type LibroFormulario = z.input<typeof libroSchema>

function LibroEditar() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [libro, setLibro] = useState<LibroCardProps | null>(null)
  const [errorApi, setErrorApi] = useState<string | null>(null)
  const [cargandoLibro, setCargandoLibro] = useState(true)
  const [errorLibro, setErrorLibro] = useState<string | null>(null)
  const { data: autores, loading, error } = useFetch<Autor[]>('/autores')
  const { register, handleSubmit, reset, formState: { errors } } = useForm<LibroFormulario, unknown, LibroValidado>({
    resolver: zodResolver(libroSchema),
  })

  useEffect(() => {
    if (!id) {
      setErrorLibro('No se indicó qué libro modificar.')
      setCargandoLibro(false)
      return
    }

    let activo = true
    apiFetch<LibroCardProps>(`/libros/${id}`)
      .then((libroCargado) => {
        if (!activo) return
        setLibro(libroCargado)
        reset({
          titulo: libroCargado.titulo,
          autorId: libroCargado.autor.id,
          descripcion: libroCargado.descripcion ?? '',
          precio: libroCargado.precio,
          imagen: libroCargado.imagen,
        })
      })
      .catch((e: unknown) => {
        if (activo) setErrorLibro(e instanceof Error ? e.message : 'Error desconocido')
      })
      .finally(() => {
        if (activo) setCargandoLibro(false)
      })

    return () => {
      activo = false
    }
  }, [id, reset])

  const onSubmit = async (data: LibroValidado) => {
    try {
      await apiFetch<LibroCardProps>(`/libros/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
      })
      navigate('/catalogo')
    } catch (e) {
      setErrorApi(e instanceof Error ? e.message : 'Error desconocido')
    }
  }

  if (loading || cargandoLibro) return <Spinner animation="border" />
  if (error) return <Alert variant="danger">{error}</Alert>
  if (errorLibro || !libro) {
    return <Alert variant="danger">{errorLibro ?? 'No se encontró el libro.'}</Alert>
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)} className="container pt-5 mt-4" style={{ maxWidth: '500px' }}>
      <h2 className="subtituloDestacados text-center mb-4">Modificar libro</h2>

      {errorApi && <Alert variant="danger">{errorApi}</Alert>}

      <Form.Group className="mb-3">
        <Form.Label>Título</Form.Label>
        <Form.Control {...register('titulo')} isInvalid={!!errors.titulo} />
        <Form.Control.Feedback type="invalid">{errors.titulo?.message}</Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Autor</Form.Label>
        <Form.Select {...register('autorId', { valueAsNumber: true })} isInvalid={!!errors.autorId}>
          <option value="">Seleccioná un autor…</option>
          {(autores ?? []).map((autor) => (
            <option key={autor.id} value={autor.id}>{autor.nombre}</option>
          ))}
        </Form.Select>
        <Form.Control.Feedback type="invalid">{errors.autorId?.message}</Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Descripción</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          {...register('descripcion')}
          isInvalid={!!errors.descripcion}
        />
        <Form.Control.Feedback type="invalid">{errors.descripcion?.message}</Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-4">
        <Form.Label>Precio</Form.Label>
        <Form.Control type="number" {...register('precio')} isInvalid={!!errors.precio} />
        <Form.Control.Feedback type="invalid">{errors.precio?.message}</Form.Control.Feedback>
      </Form.Group>

      <Form.Control type="hidden" {...register('imagen')} />
      <div className="d-flex justify-content-center gap-2">
        <Button type="button" variant="secondary" onClick={() => navigate('/catalogo')}>
          Cancelar
        </Button>
        <Button type="submit">Guardar cambios</Button>
      </div>
    </Form>
  )
}

export default LibroEditar
