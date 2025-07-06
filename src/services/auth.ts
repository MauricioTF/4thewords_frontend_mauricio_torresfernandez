import axios from '@/api/axios'

//servicio para autenticar un usuario
// y obtener un token de acceso
// que se usará para autenticar las peticiones a la API
export interface LoginPayload {
  email: string
  password: string
}

export async function login(payload: LoginPayload): Promise<string> {
  const response = await axios.post('/auth/login', payload)
  return response.data.access_token
}
