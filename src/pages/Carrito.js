import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  getCarrito, 
  eliminarDelCarrito, 
  vaciarCarrito, 
  calcularTotal 
} from '../services/carritoService';
import './Carrito.css';

function Carrito() {
  const [carrito, setCarrito] = useState([]);
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();

  // Cargar carrito al iniciar
  useEffect(() => {
    cargarCarrito();
  }, []);

  const cargarCarrito = () => {
    const carritoActual = getCarrito();
    setCarrito(carritoActual);
    setTotal(calcularTotal());
  };

  const handleEliminar = (id) => {
    const carritoActualizado = eliminarDelCarrito(id);
    setCarrito(carritoActualizado);
    setTotal(calcularTotal());
  };

  const handleVaciar = () => {
    // eslint-disable-next-line no-restricted-globals
if (confirm('¿Seguro que deseas vaciar el carrito?')) {
      vaciarCarrito();
      setCarrito([]);
      setTotal(0);
    }
  };

  const handleComprar = () => {
    if (carrito.length === 0) {
      alert('El carrito está vacío');
      return;
    }

    // Verificar si hay usuario logueado
    const usuario = JSON.parse(localStorage.getItem('usuario'));
    
    if (!usuario) {
      alert('Debes iniciar sesión para realizar un pedido');
      navigate('/login');
      return;
    }

    // Aquí se conectaría con el backend para crear el pedido
    // Por ahora, simulamos la compra
    alert('¡Compra realizada con éxito!\nTotal: $' + total.toLocaleString() + ' COP');
    vaciarCarrito();
    setCarrito([]);
    setTotal(0);
    navigate('/');
  };

  return (
    <div className="carrito-container">
      <div className="carrito-header">
        <h1>🛒 Carrito de Compras</h1>
        <button onClick={() => navigate('/')} className="btn-seguir">
          ← Seguir Comprando
        </button>
      </div>

      {carrito.length === 0 ? (
        <div className="carrito-vacio">
          <p>🛍️ Tu carrito está vacío</p>
          <button onClick={() => navigate('/')} className="btn-comprar">
            Ir a Tienda
          </button>
        </div>
      ) : (
        <div className="carrito-content">
          <div className="carrito-items">
            <h2>Productos ({carrito.length})</h2>
            {carrito.map(item => (
              <div key={item.id} className="carrito-item">
                <img 
                  src={`https://via.placeholder.com/100x100?text=${encodeURIComponent(item.nombre)}`} 
                  alt={item.nombre}
                  className="item-imagen"
                />
                <div className="item-info">
                  <h3>{item.nombre}</h3>
                  <p className="item-precio">${item.precio?.toLocaleString()} COP</p>
                  <p className="item-cantidad">Cantidad: {item.cantidad}</p>
                  <p className="item-subtotal">
                    Subtotal: ${(item.precio * item.cantidad)?.toLocaleString()} COP
                  </p>
                </div>
                <button 
                  onClick={() => handleEliminar(item.id)}
                  className="btn-eliminar-item"
                >
                  Eliminar
                </button>
              </div>
            ))}
          </div>

          <div className="carrito-resumen">
            <h2>Resumen del Pedido</h2>
            <div className="resumen-fila">
              <span>Subtotal:</span>
              <span>${total.toLocaleString()} COP</span>
            </div>
            <div className="resumen-fila">
              <span>Envío:</span>
              <span>Gratis</span>
            </div>
            <div className="resumen-total">
              <span>Total:</span>
              <span>${total.toLocaleString()} COP</span>
            </div>
            <button onClick={handleComprar} className="btn-comprar">
              Realizar Pedido
            </button>
            <button onClick={handleVaciar} className="btn-vaciar">
              Vaciar Carrito
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Carrito;