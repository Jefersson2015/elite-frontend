import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { usuarioService } from '../services/api';
import '../styles/Auth.css';

function Register() {
  const [formData, setFormData] = useState({ username: '', password: '', roll: 'cliente' });  // almacena los datos del formulario de registro - automaticamente se asigna rol 'cliente'
  const [mensaje, setMensaje] = useState(null); // Estado para el mensaje
  const [tipo, setTipo] = useState(''); // 'exito' verde o 'error' rojo
  const navigate = useNavigate();   // Hook para redirigir al usuario después del registro exitoso

  const handleSubmit = async (e) => {
    e.preventDefault();   // Evita que el formulario recargue la página
    try {
      await usuarioService.registrar(formData);   // Envía los datos del formulario al backend (UsuarioController.java)
      setMensaje('¡Registro exitoso! Redirigiendo...');
      setTipo('exito');
      // si es exitoso = verde. Espera 2 segundos y redirige al login
      setTimeout(() => navigate('/login'), 2000);
    } catch (error) {
      setMensaje('Error al registrar. Intenta con otro correo.');
      setTipo('error');
      // si es error = rojo. El mensaje desaparece después de 3 segundos
      setTimeout(() => setMensaje(null), 3000);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Crear cuenta</h2>

        {/* Mensaje de éxito o error */}
        {mensaje && (
          <div className={`mensaje-alerta ${tipo}`}>
            {mensaje}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              placeholder="Correo electrónico"
              value={formData.username}
              onChange={(e) => setFormData({...formData, username: e.target.value})}
              required
            />
          </div>
          <div className="form-group"> 
              <input type="password"
              placeholder="Contraseña"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              required
            />
          </div>
          <button type="submit" className="btn-submit">Registrarse</button>
        </form>
        <p className="auth-link">
          ¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;