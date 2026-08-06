import { Autor } from "../types/autor.types";

const autores: Autor[] = [
  {
    id: 1,
    nombre: "Fiódor Dostoievski",
    nacionalidad: "Ruso",
  },
  {
    id: 2,
    nombre: "Herman Hesse",
    nacionalidad: "Suizo",
  },
  {
    id: 3,
    nombre: "Alexandre Dumas",
    nacionalidad: "Francés",
  },
  {
    id: 4,
    nombre: "Lev Tolstói",
    nacionalidad: "Ruso",
  },
  {
    id: 5,
    nombre: "Jane Austen",
    nacionalidad: "Británica",
  },
  {
    id: 7,
    nombre: "Homero",
    nacionalidad: "Griego",
  },
  {
    id: 8,
    nombre: "Emily Brontë",
    nacionalidad: "Británica",
  }, 
  {
    id: 9,
    nombre: "Albert Camus",
    nacionalidad: "Francés",
  },
  {
    id: 10,
    nombre: "Franz Kafka",
    nacionalidad: "Checo",
  }
];

let proximoId = 11;

export function findAll(): Autor[] {
  return autores;
}

export function findById(id: number): Autor | undefined {
  return autores.find(autor => autor.id === id);
}

export function create(datos: Omit<Autor, "id">): Autor {
  const nuevo: Autor = { id: proximoId++, ...datos };
  autores.push(nuevo);
  return nuevo;
}

export function update(id: number, datos: Partial<Omit<Autor, "id">>): Autor | undefined {
  const i = autores.findIndex(autor => autor.id === id);
  if (i === -1) return undefined;
  autores[i] = { ...autores[i], ...datos };
  return autores[i];
}

export function remove(id: number): boolean {
  const i = autores.findIndex(autor => autor.id === id);
  if (i === -1) return false;
  autores.splice(i, 1);
  return true;
}