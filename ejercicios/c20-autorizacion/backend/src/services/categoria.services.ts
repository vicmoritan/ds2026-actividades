import { prisma } from "../config/prisma";
import { Categoria, Prisma } from "../generated/prisma/client";

export type CategoriaConLibros = Prisma.CategoriaGetPayload<{ include: { libros: true } }>;

export function findAll(): Promise<CategoriaConLibros[]> {
  return prisma.categoria.findMany({ include: { libros: true } });
}

export async function findById(id: number): Promise<CategoriaConLibros | null> {
  return prisma.categoria.findUnique({
    where: { id },
    include: { libros: true }
  });
}

export async function create(datos: Omit<Categoria, "id">): Promise<Categoria> {
  return prisma.categoria.create({
    data: datos
  });
}

export async function update(id: number, datos: Omit<Categoria, "id">): Promise<Categoria | null> {
  return prisma.categoria.update({
    where: { id },
    data: datos
  });
}

export async function remove(id: number): Promise<boolean> {
  const existe = await prisma.categoria.findUnique({ where: { id } });
  if (!existe) return false;
  
  await prisma.categoria.delete({ where: { id } });
  return true;
}