import { Libro } from "../types/libro.types";

const libros: Libro[] = [   
  {
    id: 1,
    titulo: "Crimen y Castigo",
    autor: "Fiódor Dostoievski",
    imagen: "/imagenes/CrimenYCastigo.jpg",
    descripcion: "Una de las obras más importantes de la literatura rusa. Sigue la historia de Raskólnikov, un estudiante que enfrenta las consecuencias morales y psicológicas de un crimen que cree justificar racionalmente.",
    precio: 24999,
  },
  {
    id: 2,
    titulo: "Demian",
    autor: "Herman Hesse",
    imagen: "/imagenes/Demian.jpg",
    descripcion: "Novela de formación que explora la búsqueda de identidad, la individualidad y el crecimiento espiritual a través de la amistad entre Emil Sinclair y el enigmático Demian.",
    precio: 18999,
  },
  {
    id: 3,
    titulo: "El Conde de Montecristo",
    autor: "Alexandre Dumas",
    imagen: "/imagenes/ElCondeDeMontecristo.jpg",
    descripcion: "Una apasionante historia de traición, venganza y redención. Edmond Dantès busca recuperar su vida tras años de injusto encarcelamiento.",
    precio: 27999,
  },
  {
    id: 4,
    titulo: "Anna Karenina",
    autor: "Lev Tolstói",
    imagen: "/imagenes/AnnaKarenina.jpg",
    descripcion: "Clásico de la literatura universal que retrata el amor, la familia y las convenciones sociales en la Rusia del siglo XIX a través de la vida de Anna Karenina.",
    precio: 25999,
  },
  {
    id: 5,
    titulo: "Orgullo y Prejuicio",
    autor: "Jane Austen",
    imagen: "/imagenes/OrgulloYPrejuicio.jpg",
    descripcion: "Una novela romántica e inteligente que explora las relaciones humanas, las diferencias de clase y los prejuicios a través de Elizabeth Bennet y el señor Darcy.",
    precio: 19999,
  },
  {
    id: 6,
    titulo: "Los hermanos Karamazov",
    autor: "Fiódor Dostoievski",
    imagen: "/imagenes/LosHermanosKaramazov.jpg",
    descripcion: "Una profunda reflexión sobre la fe, la libertad, la moral y la naturaleza humana, centrada en los conflictos de una compleja familia rusa.",
    precio: 28999,
  },
  {
    id: 7,
    titulo: "La Odisea",
    autor: "Homero",
    imagen: "/imagenes/LaOdisea.jpg",
    descripcion: "Uno de los poemas épicos más importantes de la literatura. Narra el largo viaje de Odiseo de regreso a Ítaca tras la guerra de Troya, enfrentando innumerables desafíos y criaturas mitológicas.",
    precio: 29117,
  },
  {
    id: 8,
    titulo: "Cumbres borrascosas",
    autor: "Emily Brontë",
    imagen: "/imagenes/CumbresBorrascosas.jpg",
    descripcion: "Una intensa historia de amor, obsesión y venganza ambientada en los páramos ingleses. Considerada una de las grandes novelas de la literatura británica.",
    precio: 12000,
  }, 
  {
    id: 9,
    titulo: "El extranjero",
    autor: "Albert Camus",
    imagen: "/imagenes/ElExtranjero.jpg",
    descripcion: "Obra fundamental del existencialismo que sigue la vida de Meursault, un hombre indiferente cuya actitud desafía las normas sociales y morales de su época.",
    precio: 12000,
  },
  {
    id: 10,
    titulo: "La metamorfosis",
    autor: "Franz Kafka",
    imagen: "/imagenes/LaMetamorfosis.jpg",
    descripcion: "Clásico de la literatura universal que relata la inesperada transformación de Gregor Samsa y reflexiona sobre la identidad, el aislamiento y las relaciones familiares.",
    precio: 9500,
  }
];

let proximoId = 11;

export function findAll(): Libro[] {
  return libros;
}

export function findById(id: number): Libro | undefined {
  return libros.find(libro => libro.id === id);
}

export function create(datos: Omit<Libro, "id">): Libro {
  const nuevo: Libro = { id: proximoId++, ...datos };
  libros.push(nuevo);
  return nuevo;
}

export function update(id: number, datos: Partial<Omit<Libro, "id">>): Libro | undefined {
  const i = libros.findIndex(libro => libro.id === id);
  if (i === -1) return undefined;
  libros[i] = {...libros[i], ...datos,};
  return libros[i];
}

export function remove(id: number): boolean {
  const i = libros.findIndex(libro => libro.id === id);
  if (i === -1) return false;
  libros.splice(i, 1);
  return true;
}