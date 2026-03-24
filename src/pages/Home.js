import React, { useState, useEffect } from 'react';
import { productoService } from '../services/api';
import hombreImg from '../images/hombre/nike-p6000-hombre.jpeg'
import damaImg from '../images/dama/nike-p6000-dama.jpeg'
import infantilImg from '../images/infantil/niñe-p6000-infantil.jpeg'
import './Home.css';
import ProductoCard from '../components/ProductoCard';


function Home() {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    cargarProductos();
  }, []);

  const cargarProductos = async () => {
    try {
      const response = await productoService.listarTodos();
      setProductos(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error:', error);
      setLoading(false);
    }
  };

  return (
    <div className="home">
      <section className="hero">
        <h1>Nueva colección</h1>
        <p>Encuentra los mejores sneakers</p>
      </section>

      <section className="categorias">
        <div className="container">
          <h2>Categorías</h2>
            <div className="categorias-grid"> 
              <a href="/hombre" className="categoria-card">
  <img src={hombreImg} alt="Calzado hombre" />
  <div className="overlay"><span>HOMBRE</span></div>
</a>
<a href="/dama" className="categoria-card">
  <img src={damaImg} alt="Calzado dama" />
  <div className="overlay"><span>DAMA</span></div>
</a>
<a href="/infantil" className="categoria-card">
  <img src={infantilImg} alt="Calzado infantil" />
  <div className="overlay"><span>INFANTIL</span></div>
</a>
            </div>
        </div>
      </section>

      <section className="productos-destacados">
        <div className="container">
          <h2>Productos destacados</h2>
          
          {/* Si está cargando, muestra mensaje */}
          {loading ? (
            <p>Cargando productos...</p>
          ) : (
            <div className="productos-grid">
              {/* 
                Validación: Si hay productos, los muestra.
                Si no hay, muestra mensaje.
              */}
              {productos && productos.length > 0 ? (
                productos.map((producto, index) => (
                  <ProductoCard key={producto?.id || index} producto={producto} />
                ))
              ) : (
                <p>No hay productos disponibles</p>
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default Home;