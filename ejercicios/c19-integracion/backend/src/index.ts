import express from "express";
import authRoutes from "./routes/auth.routes";
import libroRoutes from "./routes/libro.routes";
import autorRoutes from "./routes/autor.routes";
import categoriaRoutes from "./routes/categoria.routes";
import { errorHandler } from "./middlewares/error.middleware";
import cors from "cors";

const app = express();
const PORT = 3000;

const corsOptions = { origin: [process.env.FRONTEND_URL ?? "http://localhost:5173"] };

app.use(cors(corsOptions));
app.use(express.json());

app.get("/", (_req, res) => {
  res.json({ mensaje: "API de la Librería — ¡hola desde un contenedor! 🐳" });
});


app.use("/api/auth", authRoutes);

app.use("/api/libros", libroRoutes);

app.use("/api/autores", autorRoutes);

app.use("/api/categorias", categoriaRoutes);

app.use((_req, res) => res.status(404).json({ error: "Ruta no encontrada" }));

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
