import { ref, onMounted, watch } from 'vue'
import { Modal, Toast } from 'bootstrap'
import { deleteLeyenda, fetchLeyendas } from '@/services/leyendas'
import { getProvincias, getCantones, getDistritos } from '@/services/ubicacion'
import { getCategorias } from '@/services/categorias'
import router from '@/router'
import type { Leyenda } from '@/types/leyenda'
import type { Provincia, Canton, Distrito } from '@/types/ubicacion'

// Composable para manejar la lógica de la lista de leyendas
export function useLeyendasList() {
  const BASE_API = 'http://localhost:8080'
  const leyendas = ref<Leyenda[]>([])
  const loading = ref(true)
  const error = ref('')
  const successMessage = ref('')
  const errorMessage = ref('')
  const leyendaIdAEliminar = ref<number | null>(null)
  const eliminarModalRef = ref<HTMLElement | null>(null)
  const toastRef = ref<HTMLElement | null>(null)
  const eliminarModalInstance = ref<Modal | null>(null)
  interface Filtros {
    nombre: string
    categoria: string | number
    provincia: string | number
    canton: string | number
    distrito: string | number
    fecha: string
  }
  const filtros = ref<Filtros>({
    nombre: '',
    categoria: '',
    provincia: '',
    canton: '',
    distrito: '',
    fecha: ''
  })
  const provincias = ref<Provincia[]>([])
  const cantones = ref<Canton[]>([])
  const distritos = ref<Distrito[]>([])
  const categorias = ref<{ id: number; nombre: string }[]>([])

  // Observadores para actualizar los filtros y cargar datos relacionados
  watch(() => filtros.value.provincia, async (id) => {
    if (id) {
      cantones.value = await getCantones(Number(id))
    } else {
      cantones.value = []
    }
    filtros.value.canton = ''
    filtros.value.distrito = ''
  })

  // Observador para cargar distritos cuando cambia canton
  watch(() => filtros.value.canton, async (id) => {
    if (id) {
      distritos.value = await getDistritos(Number(id))
    } else {
      distritos.value = []
    }
    filtros.value.distrito = ''
  })

  // Función para obtener los filtros válidos (no vacíos)
  function obtenerFiltrosValidos() {
    return Object.fromEntries(
      Object.entries(filtros.value).filter(([,val]) => val !== '')
    )
  }

  // Función para cargar las leyendas con los filtros aplicados
  async function fetch() {
    loading.value = true
    error.value = ''
    try {
      const filtrosFinales = obtenerFiltrosValidos()
      const response = await fetchLeyendas(filtrosFinales)
      leyendas.value = response.items ?? response
    } catch {
      error.value = 'Error al cargar las leyendas.'
    } finally {
      loading.value = false
    }
  }

  // Función para editar una leyenda
  // Redirige a la página de edición de leyenda con el ID correspondiente
  function editarLeyenda(id: number) {
    router.push(`/leyendas/editar/${id}`)
  }

  // Función para confirmar la eliminación de una leyenda
  function confirmarEliminacion(id: number) {
    leyendaIdAEliminar.value = id
    if (eliminarModalRef.value) {
      eliminarModalInstance.value = new Modal(eliminarModalRef.value)
      eliminarModalInstance.value.show()
    }
  }

  // Función para eliminar una leyenda confirmada
  async function eliminarLeyendaConfirmada() {
    if (leyendaIdAEliminar.value === null) return
    try {
      await deleteLeyenda(leyendaIdAEliminar.value)
      successMessage.value = 'Leyenda eliminada correctamente.'
      errorMessage.value = ''
      await fetch()
    } catch {
      errorMessage.value = 'No se pudo eliminar la leyenda.'
      successMessage.value = ''
    } finally {
      eliminarModalInstance.value?.hide()
      leyendaIdAEliminar.value = null
      mostrarToast()
    }
  }

  // Función para mostrar un toast de éxito o error
  function mostrarToast() {
    if (toastRef.value) {
      const toast = new Toast(toastRef.value)
      toast.show()
    }
  }

  // Cargar las provincias, categorías y leyendas al montar el componente
  onMounted(async () => {
    provincias.value = await getProvincias()
    categorias.value = await getCategorias()
    await fetch()
  })

  return {
    BASE_API,
    leyendas,
    loading,
    error,
    successMessage,
    errorMessage,
    filtros,
    provincias,
    cantones,
    distritos,
    categorias,
    eliminarModalRef,
    toastRef,
    fetch,
    editarLeyenda,
    confirmarEliminacion,
    eliminarLeyendaConfirmada
  }
}
