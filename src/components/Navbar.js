import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getCantidadItems } from '../services/carritoService';
import '../styles/Navbar.css';

function Navbar() {
  const [cantidadCarrito, setCantidadCarrito] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false); // Estado del menú hamburguesa

  // Actualizar contador del carrito cuando cambie
  useEffect(() => {
    const actualizarContador = () => {
      setCantidadCarrito(getCantidadItems());
    };

    actualizarContador();

    // Escuchar cambios en localStorage
    window.addEventListener('storage', actualizarContador);
    return () => window.removeEventListener('storage', actualizarContador);
  }, []);

  // Cerrar menú al hacer click en un link
  const cerrarMenu = () => setMenuOpen(false);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">Elite Shoes</Link>

        {/* Links — solo visibles en desktop */}
        <ul className="navbar-menu">
          <li><Link to="/" className="navbar-link">Inicio</Link></li>
          <li><Link to="/catalogo" className="navbar-link">Catálogo</Link></li>
          <li><Link to="/ofertas" className="navbar-link">Ofertas</Link></li>
        </ul>

        <div className="navbar-buttons">
          {/* Carrito: siempre visible en desktop y móvil */}
          <Link to="/carrito" className="btn-carrito-nav">
            🛒 Carrito
            {cantidadCarrito > 0 && (
              <span className="carrito-badge">{cantidadCarrito}</span>
            )}
          </Link>

          {/* Botones solo visibles en desktop */}
          <Link to="/login" className="btn-login">Login</Link>
          <Link to="/register" className="btn-register">Registrarse</Link>

          {/* Hamburguesa: solo visible en móvil */}
          <button
            className={`navbar-hamburger ${menuOpen ? 'active' : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Abrir menú"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>

      {/* Menú desplegable — solo en móvil */}
      <div className={`navbar-mobile-menu ${menuOpen ? 'open' : ''}`}>
        <Link to="/" onClick={cerrarMenu}>Inicio</Link>
        <Link to="/catalogo" onClick={cerrarMenu}>Catálogo</Link>
        <Link to="/ofertas" onClick={cerrarMenu}>Ofertas</Link>
        <div className="mobile-divider"></div>
        <Link to="/carrito" className="mobile-carrito" onClick={cerrarMenu}>
          🛒 Carrito
          {cantidadCarrito > 0 && (
            <span className="carrito-badge">{cantidadCarrito}</span>
          )}
        </Link>
        <Link to="/login" className="mobile-login" onClick={cerrarMenu}>Login</Link>
        <Link to="/register" className="mobile-register" onClick={cerrarMenu}>Registrarse</Link>
      </div>
    </nav>
  );
}

export default Navbar;