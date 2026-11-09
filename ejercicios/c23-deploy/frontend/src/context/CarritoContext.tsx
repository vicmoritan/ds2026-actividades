import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import type { LibroCardProps } from '../types/libroCardProps';

interface CarritoContextType {
  libros: LibroCardProps[];
  agregar: (libro: LibroCardProps) => void;
  quitar: (id: number) => void;
  contiene: (id: number) => boolean;
}

const CarritoContext = createContext<CarritoContextType | null>(null);

export function CarritoProvider({ children }: { children: ReactNode }) {
  const [libros, setLibros] = useState<LibroCardProps[]>([]);

  const agregar = (libro: LibroCardProps) => {
    setLibros((actuales) =>
      actuales.some((actual) => actual.id === libro.id) ? actuales : [...actuales, libro]
    );
  };

  const quitar = (id: number) => {
    setLibros((actuales) => actuales.filter((libro) => libro.id !== id));
  };

  const contiene = (id: number) => libros.some((libro) => libro.id === id);

  return (
    <CarritoContext.Provider value={{ libros, agregar, quitar, contiene }}>
      {children}
    </CarritoContext.Provider>
  );
}

export function useCarrito() {
  const contexto = useContext(CarritoContext);
  if (!contexto) {
    throw new Error('useCarrito debe usarse dentro de <CarritoProvider>');
  }
  return contexto;
}
