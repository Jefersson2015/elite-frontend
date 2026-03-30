import React, { useState, useEffect } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import { productoService } from '../services/api';
import ProductoCard from '../components/ProductoCard';
import '../styles/Categoria.css';

function Categoria() {
  const { categoria } = useParams(); // ← Cambiado de 'nombre' a 'categoria'
  const location = useLocation();
  
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);

  // Obtener la categoría del URL o del pathname
  const categoriaNombre = categoria || location.pathname.split('/')[1];

  useEffect(() => {
    if (categoriaNombre) {
      cargarProductosPorCategoria();
    }
  }, [categoriaNombre]);

  const cargarProductosPorCategoria = async () => {
    try {
      const response = await productoService.listarTodos();
      // Filtrar productos por categoría
      const productosFiltrados = response.data.filter(
        prod => prod.categoria?.toLowerCase() === categoriaNombre.toLowerCase()
      );
      setProductos(productosFiltrados);
      setLoading(false);
    } catch (error) {
      console.error('Error:', error);
      setLoading(false);
    }
  };

  // Capitalizar primera letra
  const categoriaCapitalizada = categoriaNombre 
    ? categoriaNombre.charAt(0).toUpperCase() + categoriaNombre.slice(1)
    : 'Categoría';

  return (
    <div className="categoria-page">
      <section className="categoria-header">
        <h1>{categoriaCapitalizada}</h1>
        <Link to="/" className="btn-volver">← Volver al Inicio</Link>
      </section>

      <section className="categoria-productos">
        <div className="container">
          <h2>Productos de {categoriaCapitalizada}</h2>
          
          {loading ? (
            <p>Cargando productos...</p>
          ) : productos.length > 0 ? (
            <div className="productos-grid">
              {productos.map((producto, index) => (
                <ProductoCard key={producto?.id || index} producto={producto} />
              ))}
            </div>
          ) : (
            <div className="sin-productos">
              <p>👟 No hay productos disponibles en esta categoría</p>
              <Link to="/" className="btn-ir-tienda">Ir a la Tienda</Link>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default Categoria;