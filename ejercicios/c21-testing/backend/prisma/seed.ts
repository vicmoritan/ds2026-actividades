import bcrypt from "bcrypt";
import { prisma } from "../src/config/prisma";


const autores = [
  {
    nombre: "Fiódor Dostoievski",
    nacionalidad: "Ruso",
  },
  {
    nombre: "Herman Hesse",
    nacionalidad: "Alemana",
  },
  {
    nombre: "Alexandre Dumas",
    nacionalidad: "Francés",
  },
  {
    nombre: "Lev Tolstói",
    nacionalidad: "Ruso",
  },
  {
    nombre: "Jane Austen",
    nacionalidad: "Británica",
  },
  {
    nombre: "Homero",
    nacionalidad: "Griego",
  },
  {
    nombre: "Emily Brontë",
    nacionalidad: "Británica",
  }, 
  {
    nombre: "Albert Camus",
    nacionalidad: "Francés",
  },
  {
    nombre: "Franz Kafka",
    nacionalidad: "Checo",
  }
];

const categorias = [
  { nombre: "Novela" },
  { nombre: "Literatura clásica" },
  { nombre: "Romance" },
  { nombre: "Drama" },
  { nombre: "Filosofía" },
  { nombre: "Aventura" },
  { nombre: "Mitología" },
  { nombre: "Existencialismo" },
  { nombre: "Literatura rusa" },
  { nombre: "Literatura inglesa" },
  { nombre: "Literatura francesa" },
  { nombre: "Literatura alemana" },
  { nombre: "Poesía épica" },
  { nombre: "Novela histórica" },
  { nombre: "Novela psicológica" }
];

const libros = [
  {
    titulo: "Crimen y Castigo",
    autor: "Fiódor Dostoievski",
    imagen: "/imagenes/CrimenYCastigo.jpg",
    descripcion: "Una de las obras más importantes de la literatura rusa. Sigue la historia de Raskólnikov, un estudiante que enfrenta las consecuencias morales y psicológicas de un crimen que cree justificar racionalmente.",
    precio: 24999,
    cats: ["Novela", "Literatura clásica", "Novela psicológica"],
  },

  {
    titulo: "Demian",
    autor: "Herman Hesse",
    imagen: "/imagenes/Demian.jpg",
    descripcion: "Novela de formación que explora la búsqueda de identidad, la individualidad y el crecimiento espiritual a través de la amistad entre Emil Sinclair y el enigmático Demian.",
    precio: 18999,
    cats: ["Novela", "Filosofía"],
  },

  {
    titulo: "El Conde de Montecristo",
    autor: "Alexandre Dumas",
    imagen: "/imagenes/ElCondeDeMontecristo.jpg",
    descripcion: "Una apasionante historia de traición, venganza y redención. Edmond Dantès busca recuperar su vida tras años de injusto encarcelamiento.",
    precio: 27999,
    cats: ["Novela", "Aventura", "Novela histórica"],
  },

  {
    titulo: "Anna Karenina",
    autor: "Lev Tolstói",
    imagen: "/imagenes/AnnaKarenina.jpg",
    descripcion: "Clásico de la literatura universal que retrata el amor, la familia y las convenciones sociales en la Rusia del siglo XIX a través de la vida de Anna Karenina.",
    precio: 25999,
    cats: ["Novela", "Romance", "Drama", "Literatura clásica"],
  },

  {
    titulo: "Orgullo y Prejuicio",
    autor: "Jane Austen",
    imagen: "/imagenes/OrgulloYPrejuicio.jpg",
    descripcion: "Una novela romántica e inteligente que explora las relaciones humanas, las diferencias de clase y los prejuicios a través de Elizabeth Bennet y el señor Darcy.",
    precio: 19999,
    cats: ["Novela", "Romance", "Literatura clásica"],
  },

  {
    titulo: "Los hermanos Karamazov",
    autor: "Fiódor Dostoievski",
    imagen: "/imagenes/LosHermanosKaramazov.jpg",
    descripcion: "Una profunda reflexión sobre la fe, la libertad, la moral y la naturaleza humana, centrada en los conflictos de una compleja familia rusa.",
    precio: 28999,
    cats: ["Novela", "Filosofía", "Drama", "Literatura clásica"],
  },

  {
    titulo: "La Odisea",
    autor: "Homero",
    imagen: "/imagenes/LaOdisea.jpg",
    descripcion: "Uno de los poemas épicos más importantes de la literatura. Narra el largo viaje de Odiseo de regreso a Ítaca tras la guerra de Troya, enfrentando innumerables desafíos y criaturas mitológicas.",
    precio: 29117,
    cats: ["Poesía épica", "Aventura", "Mitología", "Literatura clásica"],
  },

  {
    titulo: "Cumbres borrascosas",
    autor: "Emily Brontë",
    imagen: "/imagenes/CumbresBorrascosas.jpg",
    descripcion: "Una intensa historia de amor, obsesión y venganza ambientada en los páramos ingleses. Considerada una de las grandes novelas de la literatura británica.",
    precio: 12000,
    cats: ["Novela", "Romance", "Drama", "Literatura inglesa"],
  },

  {
    titulo: "El extranjero",
    autor: "Albert Camus",
    imagen: "/imagenes/ElExtranjero.jpg",
    descripcion: "Obra fundamental del existencialismo que sigue la vida de Meursault, un hombre indiferente cuya actitud desafía las normas sociales y morales de su época.",
    precio: 12000,
    cats: ["Novela", "Filosofía", "Existencialismo"],
  },

  {
    titulo: "La metamorfosis",
    autor: "Franz Kafka",
    imagen: "/imagenes/LaMetamorfosis.jpg",
    descripcion: "Clásico de la literatura universal que relata la inesperada transformación de Gregor Samsa y reflexiona sobre la identidad, el aislamiento y las relaciones familiares.",
    precio: 9500,
    cats: ["Novela", "Literatura clásica", "Drama", "Literatura alemana"],
  },
];

const usuarios = [
  { email: "admin@libreria.test",   nombre: "Admin",   rol: "ADMIN"   as const, password: "Admin1234" },
  { email: "cliente@libreria.test", nombre: "Cliente", rol: "CLIENTE" as const, password: "Cliente1234" },
];

async function main() {
  await prisma.autor.createMany({ data: autores });
  await prisma.categoria.createMany({ data: categorias });
  for (const { autor, cats, ...datos } of libros) {
    await prisma.libro.create({ data: {
      ...datos,
      autor: { connect: { nombre: autor } },
      categorias: { connect: cats.map(nombre => ({ nombre })) },
    } });
  }
    for (const { password, ...datos } of usuarios) {
    await prisma.usuario.upsert({
      where:  { email: datos.email },
      update: {},
      create: { ...datos, passwordHash: await bcrypt.hash(password, 10) },
    });
  }
}

main()
  .then(() => console.log("Seed listo"))
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());