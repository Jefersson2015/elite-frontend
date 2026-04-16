import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { usuarioService } from '../services/api';
import '../styles/Auth.css';

function Login() {
  
  const [credentials, setCredentials] = useState({ username: '', password: '' });     // ← Estado que almacena las credenciales ingresadas por el usuario
  const [error, setError] = useState('');                       // ← Estado para mostrar mensajes de error en pantalla
  const navigate = useNavigate();                           // ← Hook para redirigir al usuario después del login

  const handleSubmit = async (e) => {
    e.preventDefault();                             // ← Evita que el formulario recargue la página
    setError('');                                   // ← limpiar antes de intentar
    try {
      const response = await usuarioService.login(credentials);     // Envía las credenciales al backend (UsuarioController.java)

      if (response.data) {
        localStorage.setItem('usuario', JSON.stringify(response.data));   // Guarda los datos del usuario en localStorage para mantener la sesión
        if (response.data.rol === 'admin') {      // Redirige según el rol: admin va al panel, cliente va al inicio
          navigate('/admin');
        } else {
          navigate('/');
        }
      } else {
        setError('Credenciales inválidas');         // ← antes: alert(...) Si el backend responde pero sin datos, las credenciales son inválidas
      }
    } catch (error) {
      setError('Error al iniciar sesión');          // ← antes: alert(...) Si el backend no responde o hay error de red
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Iniciar Sesión</h2>

        {/* ── Mensaje de error estético ──*/ }
        {error && (
          <div className="auth-error">
            <span className="auth-error__icon">⚠</span>
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              placeholder="Email"
              value={credentials.username}
              onChange={(e) => setCredentials({...credentials, username: e.target.value})}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Contraseña"
              value={credentials.password}
              onChange={(e) => setCredentials({...credentials, password: e.target.value})}
              required
            />
          </div>
          <button type="submit" className="btn-submit">Ingresar</button>
        </form>

        <p className="auth-link">
          ¿No tienes cuenta? <Link to="/register">Regístrate</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;