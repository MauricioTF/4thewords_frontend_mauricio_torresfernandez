import api from '@/api/axios'

//servicio para obtener las provincias, cantones y distritos
export async function getProvincias() {
  const response = await api.get('/ubicacion/provincias') // Nota: asegúrate de que el prefijo /ubicacion esté en el backend
  return response.data
}

export async function getCantones(provinciaId: number) {
  const response = await api.get(`/ubicacion/cantones?provincia_id=${provinciaId}`)
  return response.data
}

export async function getDistritos(cantonId: number) {
  const response = await api.get(`/ubicacion/distritos?canton_id=${cantonId}`)
  return response.data
}
