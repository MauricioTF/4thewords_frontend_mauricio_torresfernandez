import axios from 'axios'

// configuracion de axios para la API
//se crea una instancia de axios con la URL base y los headers necesarios
const instance = axios.create({
  baseURL: 'http://localhost:8080',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // tiempo de espera de 10 segundos
})

// Interceptor para manejar errores globales
instance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')// Obtener el token del localStorage
  // Si el token existe, se agrega al header de la peticion
  // Esto permite que el servidor pueda autenticar la peticion
  // y verificar que el usuario tiene permisos para acceder a los recursos
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export default instance
