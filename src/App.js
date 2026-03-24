import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Carrito from './pages/Carrito';
import AdminDashboard from './pages/AdminDashboard';
import CrearProducto from './pages/CrearProducto';
import Categoria from './pages/Categoria';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/carrito" element={<Carrito />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/crear-producto" element={<CrearProducto />} />
          <Route path="/:categoria" element={<Categoria />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;