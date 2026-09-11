import { z } from 'zod'

export const libroSchema = z.object({
  titulo: z.string().trim().min(1, 'Ingrese un título'),
  autorId: z.coerce.number().int().positive('El autor es obligatorio'),
  descripcion: z.string().trim().min(1, 'Ingrese una descripción'),
  precio: z.coerce.number().positive('El precio debe ser mayor a 0'),
  imagen: z.string().trim().min(1, 'La imagen es obligatoria'),
})

export type LibroValidado = z.infer<typeof libroSchema>