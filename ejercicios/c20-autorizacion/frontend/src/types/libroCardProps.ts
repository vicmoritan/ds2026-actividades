export type LibroCardProps = {
  id: number;
  titulo: string;
  autor: Autor;
  imagen: string;
  descripcion?: string;
  precio?: number;
};

export interface Autor { 
  id: number; 
  nombre: string; 
  nacionalidad: string 
}