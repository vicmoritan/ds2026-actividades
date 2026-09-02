import { z } from "zod";

export const categoriaCreateSchema = z.object({
  nombre: z.string().trim().min(1, "El nombre de la categoría es obligatorio").max(100),
});

export const categoriaUpdateSchema = categoriaCreateSchema.partial();

export const idParamSchema = z.object({
  id: z.coerce.number().int().positive("El id debe ser un número positivo"),
});

export type CategoriaCreate = z.infer<typeof categoriaCreateSchema>;