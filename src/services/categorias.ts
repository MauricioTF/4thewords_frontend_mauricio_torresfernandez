import api from '@/api/axios'

// servicio para obtener las categorías
export async function getCategorias() {
 const response = await api.get('/categorias/')
  return response.data // <-- [{ id: 1, nombre: 'Leyenda 1' }, ...]
}
