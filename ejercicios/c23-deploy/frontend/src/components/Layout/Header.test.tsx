import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Header from './Header'; 
import { AuthContext } from '../../context/AuthContext';
import { BusquedaProvider } from '../../context/BusquedaContext';

beforeEach(() => { cleanup(); });

function renderHeader(usuario: { id: number; email: string; nombre: string; rol: string } | null) {
  const auth = {
    usuario,
    cargando: false,
    estaAutenticado: usuario !== null,
    tieneRol: (rol: string) => usuario !== null && usuario.rol === rol,
    login: vi.fn(),
    logout: vi.fn(),
  };

  return render(
    <MemoryRouter>
      <BusquedaProvider>
        <AuthContext.Provider value={auth as any}>
          <Header />
        </AuthContext.Provider>
      </BusquedaProvider>
    </MemoryRouter>
  );
}

describe('Header Component (Renderizado por rol en la UI)', () => {
  it('Invitado: muestra "Ingresar" y NO ve "Nuevo libro" ni "Salir"', () => {
    renderHeader(null);

    expect(screen.getByRole('button', { name: /ingresar/i })).toBeInTheDocument();
    expect(screen.queryByText('Nuevo libro')).not.toBeInTheDocument();
    expect(screen.queryByText(/salir/i)).not.toBeInTheDocument();
  });

  it('CLIENTE: saluda por nombre, muestra "Salir" y NO ve "Nuevo libro"', () => {
    renderHeader({ id: 2, email: 'cliente@libreria.test', nombre: 'Cliente', rol: 'CLIENTE' });

    expect(screen.getByText(/hola, cliente/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /salir/i })).toBeInTheDocument();

    expect(screen.queryByText('Nuevo libro')).not.toBeInTheDocument();
  });

  it('ADMIN: saluda por nombre, muestra "Salir" y SÍ ve el enlace "Nuevo libro"', () => {
    renderHeader({ id: 1, email: 'admin@libreria.test', nombre: 'Admin', rol: 'ADMIN' });

    expect(screen.getByText(/hola, admin/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /salir/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /nuevo libro/i })).toBeInTheDocument();
  });
});