import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Libros from './pages/Catalogo';
import LibroDetalle from './pages/LibroDetalle'
import LibroNuevo from './pages/LibroNuevo'
import Layout from './components/Layout/Layout'
import { useState } from 'react';
import type { LibroCardProps } from './types/libroCardProps';
import './App.css'

function App() {
  const [librosNuevos, setLibrosNuevos] = useState<LibroCardProps[]>([]);
  const agregarLibro = (nuevo: LibroCardProps) => setLibrosNuevos([...librosNuevos, nuevo]);

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/catalogo" element={<Libros librosCreados={librosNuevos} />} />
        <Route path="/libros/nuevo" element={<LibroNuevo onAgregar={agregarLibro} />} />
        <Route path="/libros/:id" element={<LibroDetalle librosCreados={librosNuevos} />} />
      </Routes>
    </Layout>
  )
}

export default App;
