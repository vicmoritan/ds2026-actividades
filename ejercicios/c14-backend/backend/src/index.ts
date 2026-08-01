import express from "express";

const app = express();
const PORT = 3000;

app.get("/", (_req, res) => {
  res.json({ mensaje: "API de la Librería — ¡hola desde un contenedor! 🐳" });
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});

interface Libro {
  id: number;
  titulo: string;
  autor: string;
  imagen: string;
  descripcion?: string;
  precio: number;
};

const libros: Libro[] = [
  {
    id: 1,
    titulo: "Crimen y Castigo",
    autor: "Fiódor Dostoievski",
    imagen: "/imagenes/CrimenYCastigo.jpg",
    descripcion:
      "Una de las obras más importantes de la literatura rusa. Sigue la historia de Raskólnikov, un estudiante que enfrenta las consecuencias morales y psicológicas de un crimen que cree justificar racionalmente.",
    precio: 24999,
  },
  {
    id: 2,
    titulo: "Demian",
    autor: "Herman Hesse",
    imagen: "/imagenes/Demian.jpg",
    descripcion:
      "Novela de formación que explora la búsqueda de identidad, la individualidad y el crecimiento espiritual a través de la amistad entre Emil Sinclair y el enigmático Demian.",
    precio: 18999,
  },
  {
    id: 3,
    titulo: "El Conde de Montecristo",
    autor: "Alexandre Dumas",
    imagen: "/imagenes/ElCondeDeMontecristo.jpg",
    descripcion:
      "Una apasionante historia de traición, venganza y redención. Edmond Dantès busca recuperar su vida tras años de injusto encarcelamiento.",
    precio: 27999,
  },
  {
    id: 4,
    titulo: "Anna Karenina",
    autor: "Lev Tolstói",
    imagen: "/imagenes/AnnaKarenina.jpg",
    descripcion:
      "Clásico de la literatura universal que retrata el amor, la familia y las convenciones sociales en la Rusia del siglo XIX a través de la vida de Anna Karenina.",
    precio: 25999,
  },
  {
    id: 5,
    titulo: "Orgullo y Prejuicio",
    autor: "Jane Austen",
    imagen: "/imagenes/OrgulloYPrejuicio.jpg",
    descripcion:
      "Una novela romántica e inteligente que explora las relaciones humanas, las diferencias de clase y los prejuicios a través de Elizabeth Bennet y el señor Darcy.",
    precio: 19999,
  },
  {
    id: 6,
    titulo: "Los hermanos Karamazov",
    autor: "Fiódor Dostoievski",
    imagen: "/imagenes/LosHermanosKaramazov.jpg",
    descripcion:
      "Una profunda reflexión sobre la fe, la libertad, la moral y la naturaleza humana, centrada en los conflictos de una compleja familia rusa.",
    precio: 28999,
  },
];

app.get("/libros", (_req, res) => {
  res.json(libros);
});