import { z } from 'zod';

export const libroSchema = z.object({
    titulo: z.string().trim().min(1, 'Ingrese un título'),
    autor: z.string().trim().min(1, 'Ingrese un autor'),
    descripcion: z.string().trim().min(1, 'Ingrese una descripción'),
    precio: z.coerce.number().positive('El precio debe ser mayor a 0'),
});

export type LibroValidado = z.infer<typeof libroSchema>;