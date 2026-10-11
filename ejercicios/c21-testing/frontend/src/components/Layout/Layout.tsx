import type { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';
import '../../styles/Layout.css';

interface LayoutProps { children: ReactNode };
function Layout({ children }: LayoutProps) {
    return (
        <div className="layout">
        <Header />
        <main className="contenido">
            {children}
        </main>
        <Footer />
        </div>
    );
}

export default Layout;