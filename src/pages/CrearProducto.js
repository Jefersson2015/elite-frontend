import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { productoService } from '../services/api';
import './CrearProducto.css';

function CrearProducto() {
  const [producto, setProducto] = useState({
    nombre: '',
    descripcion: '',
    precio: '',
    stock: ''
  });
  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setProducto({
      ...producto,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const productoData = {
      nombre: producto.nombre,
      descripcion: producto.descripcion,
      precio: parseFloat(producto.precio),
      stock: parseInt(producto.stock)
    };

    try {
      await productoService.crear(productoData);
      setMensaje('¡Producto creado exitosamente!');
      setError('');
      setProducto({ nombre: '', descripcion: '', precio: '', stock: '' });
      
      setTimeout(() => {
        navigate('/admin');
      }, 2000);
    } catch (error) {
      console.error('Error:', error);
      setError('Error al crear el producto');
    }
  };

  return (
    <div className="crear-producto-container">
      <div className="crear-producto-card">
        <h2>Agregar Producto</h2>
        
        {mensaje && <div className="mensaje-exito">{mensaje}</div>}
        {error && <div className="mensaje-error">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Nombre</label>
            <input
              type="text"
              name="nombre"
              placeholder="Ej: Zapatillas Nike"
              value={producto.nombre}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Descripción</label>
            <textarea
              name="descripcion"
              placeholder="Descripción del producto"
              value={producto.descripcion}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Precio (COP)</label>
            <input
              type="number"
              name="precio"
              placeholder="Ej: 250000"
              value={producto.precio}
              onChange={handleChange}
              required
              min="0"
            />
          </div>

          <div className="form-group">
            <label>Stock</label>
            <input
              type="number"
              name="stock"
              placeholder="Ej: 50"
              value={producto.stock}
              onChange={handleChange}
              required
              min="0"
            />
          </div>

          <button type="submit" className="btn-guardar">Guardar</button>
          <button type="button" className="btn-cancelar" onClick={() => navigate('/admin')}>
            Cancelar
          </button>
        </form>
      </div>
    </div>
  );
}

export default CrearProducto;