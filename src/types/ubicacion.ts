export interface Provincia {
  id: number
  nombre: string
}

export interface Canton {
  id: number
  nombre: string
  provincia_id: number
}

export interface Distrito {
  id: number
  nombre: string
  canton_id: number
}
