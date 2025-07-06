export interface Leyenda {
  id: number
  nombre: string
  descripcion: string
  fecha_leyenda: string
  imagen_url: string
  categoria_id: number
  provincia_id: number
  canton_id: number
  distrito_id: number
  categoria_nombre?: string
  provincia_nombre?: string
  canton_nombre?: string
  distrito_nombre?: string
}
