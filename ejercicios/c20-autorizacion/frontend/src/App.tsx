import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Libros from './pages/Catalogo';
import LibroDetalle from './pages/LibroDetalle'
import LibroNuevo from './pages/LibroNuevo'
import Login from './pages/Login'
import Layout from './components/Layout/Layout'
import { BusquedaProvider } from './context/BusquedaContext'; 
import { AuthProvider } from './context/AuthContext';
import './App.css'

function App() {
  return (
    <AuthProvider>
      <BusquedaProvider>  
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/catalogo" element={<Libros />} />
            <Route path="/libros/nuevo" element={<LibroNuevo />} />
            <Route path="/login" element={<Login />} />
            <Route path="/libros/:id" element={<LibroDetalle />} />
          </Routes>
        </Layout>
      </BusquedaProvider>
    </AuthProvider
  )
}

export default App;
