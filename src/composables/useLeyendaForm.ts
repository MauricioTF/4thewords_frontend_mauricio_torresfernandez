import { ref, onMounted, watch, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import {
  getProvincias,
  getCantones,
  getDistritos
} from '@/services/ubicacion'
import {
  createLeyenda,
  uploadImage,
  getLeyendaById,
  updateLeyenda
} from '@/services/leyendas'
import { getCategorias } from '@/services/categorias'

// Composable para manejar el formulario de creación y edición de leyendas
export function useLeyendaForm() {
  const router = useRouter()
  const route = useRoute()
  const isEdit = computed(() => !!route.params.id)
  const error = ref('')
  const imagen = ref<File | null>(null)
  const imagen_url_actual = ref<string | null>(null)
  const BASE_API = 'http://localhost:8080'
  const form = ref({
    nombre: '',
    descripcion: '',
    fecha: '',
    categoria: '',
    provincia: '',
    canton: '',
    distrito: ''
  })
  const categorias = ref<{ id: number; nombre: string }[]>([])
  const provincias = ref<{ id: number; nombre: string }[]>([])
  const cantones = ref<{ id: number; nombre: string }[]>([])
  const distritos = ref<{ id: number; nombre: string }[]>([])

  // Cargar las categorías, provincias y, si es edición, la leyenda a editar
  onMounted(async () => {
    categorias.value = await getCategorias()
    provincias.value = await getProvincias()

    // Si es edición, cargar la leyenda
    if (isEdit.value) {
      const leyenda = await getLeyendaById(Number(route.params.id))
      form.value = {
        nombre: leyenda.nombre,
        descripcion: leyenda.descripcion,
        fecha: leyenda.fecha_leyenda,
        categoria: leyenda.categoria_id,
        provincia: leyenda.provincia_id,
        canton: leyenda.canton_id,
        distrito: leyenda.distrito_id
      }
      imagen_url_actual.value = leyenda.imagen_url
      // Cargar cantones y distritos basados en la leyenda
      cantones.value = await getCantones(leyenda.provincia_id)
      distritos.value = await getDistritos(leyenda.canton_id)
    }
  })

  // Actualizar cantones y distritos cuando cambian provincia o canton
  watch(() => form.value.provincia, async (provinciaId) => {
    if (provinciaId) {
      cantones.value = await getCantones(Number(provinciaId))
    } else {
      cantones.value = []
    }
    form.value.canton = ''
    form.value.distrito = ''
    distritos.value = []
  })

  // Actualizar distritos cuando cambia canton
  watch(() => form.value.canton, async (cantonId) => {
    if (cantonId) {
      distritos.value = await getDistritos(Number(cantonId))
    } else {
      distritos.value = []
    }
    form.value.distrito = ''
  })

  // Manejar la carga de imagen
  function handleImage(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0]
    if (file) {
      const validTypes = ['image/jpeg', 'image/png', 'image/gif']
      if (!validTypes.includes(file.type)) {
        error.value = 'La imagen debe ser .jpg, .jpeg, .png o .gif'
        imagen.value = null
        return
      }
    }
    imagen.value = file ?? null
  }

  // Función para manejar el envío del formulario
  // Crea o actualiza una leyenda según el contexto (edición o creación)
  // Valida los campos del formulario antes de enviar
  // Sube la imagen si se proporciona una nueva
  // Redirige a la lista de leyendas después de crear o actualizar
  async function handleSubmit() {
    try {
      error.value = ''
      let imagenUrl = imagen_url_actual.value ?? ''

      if (imagen.value) {
        const formDataImg = new FormData()
        formDataImg.append('imagen', imagen.value)
        imagenUrl = await uploadImage(formDataImg)
      }

      if (!form.value.nombre || form.value.nombre.length > 255) {
        error.value = 'El nombre es obligatorio y debe tener máximo 255 caracteres.'
        return
      }

      if (!form.value.descripcion || form.value.descripcion.length < 10) {
        error.value = 'La descripción debe tener al menos 10 caracteres.'
        return
      }

      if (!form.value.fecha) {
        error.value = 'La fecha es obligatoria.'
        return
      }

      if (!form.value.categoria || !form.value.provincia || !form.value.canton || !form.value.distrito) {
        error.value = 'Debe seleccionar categoría, provincia, cantón y distrito.'
        return
      }

      const payload = {
        nombre: form.value.nombre,
        descripcion: form.value.descripcion,
        fecha_leyenda: form.value.fecha,
        imagen_url: imagenUrl,
        categoria_id: Number(form.value.categoria),
        provincia_id: Number(form.value.provincia),
        canton_id: Number(form.value.canton),
        distrito_id: Number(form.value.distrito)
      }

      if (isEdit.value) {
        await updateLeyenda(Number(route.params.id), payload)
      } else {
        await createLeyenda(payload)
      }

      router.push('/leyendas')
    } catch {
      error.value = isEdit.value ? 'Error al actualizar la leyenda.' : 'Error al crear la leyenda.'
    }
  }

  return {
    form,
    error,
    handleImage,
    handleSubmit,
    imagen_url_actual,
    imagen,
    BASE_API,
    categorias,
    provincias,
    cantones,
    distritos,
    isEdit
  }
}
