import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Libros from './pages/Catalogo';
import LibroDetalle from './pages/LibroDetalle'
import LibroNuevo from './pages/LibroNuevo'
import Layout from './components/Layout/Layout'
import { useState } from 'react';
import { libros as librosIniciales } from './data/libros'
import type { LibroCardProps } from './types/libroCardProps';
import './App.css'

function App() {
  const [libros, setLibros] = useState<LibroCardProps[]>(librosIniciales);
  const agregarLibro = (nuevo: LibroCardProps) => setLibros([...libros, nuevo]);

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/catalogo" element={<Libros libros={libros} />} />
        <Route path="/libros/nuevo" element={<LibroNuevo onAgregar={agregarLibro} />} />
        <Route path="/libros/:id" element={<LibroDetalle libros={libros} />} />
      </Routes>
    </Layout>
  )
}

export default App
