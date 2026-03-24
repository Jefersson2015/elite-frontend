import axios from 'axios';

//URL backend
const API_URL = 'http://localhost:8080/api';

//instancia de axios
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Servicios para Productos se conecta con ProductoController.java
export const productoService = {
  listarTodos: () => api.get('/productos'),
  crear: (producto) => api.post('/productos', producto),
  eliminar: (id) => api.delete(`/productos/${id}`),
};

//Servicios para Usuarios se conecta con UsuarioController.java
export const usuarioService = {
  registrar: (usuario) => api.post('/usuarios', usuario),
  login: (credentials) => api.post('/usuarios/login', credentials),
};

export default api;