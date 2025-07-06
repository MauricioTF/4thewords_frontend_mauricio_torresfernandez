import api from '@/api/axios'

// servicio para obtener leyendas con filtros
// y para crear, editar, eliminar leyendas

export async function fetchLeyendas(filtros: Record<string, string | number>) {
  const response = await api.get('/leyendas', { params: filtros })
  return response.data
}

export async function getProvincias() {
  const res = await api.get('/ubicacion/provincias')
  return res.data
}

export async function getCantones(provinciaId: number) {
  const response = await api.get('/ubicacion/cantones', { params: { provincia_id: provinciaId } })
  return response.data
}

export async function getDistritos(cantonId: number) {
  const response = await api.get('/ubicacion/distritos', { params: { canton_id: cantonId } })
  return response.data
}

export async function getCategorias() {
  const response = await api.get('/categorias')
  return response.data
}

export async function uploadImage(formData: FormData) {
  const response = await api.post('/leyendas/upload-image', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
  return response.data // la URL de la imagen
}

export async function createLeyenda(data: Record<string, any>) {
  const response = await api.post('/leyendas/', data)
  return response.data
}

export async function getLeyendaById(id: number) {
  const response = await api.get(`/leyendas/${id}`)
  return response.data
}

export async function updateLeyenda(id: number, data: any) {
  const response = await api.put(`/leyendas/${id}`, data)
  return response.data
}

export async function deleteLeyenda(id: number) {
  await api.delete(`/leyendas/${id}`)
}
