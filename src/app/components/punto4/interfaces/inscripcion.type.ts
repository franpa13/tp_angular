export interface Inscripcion {
  id: number;
  dni: string;
  precio: number;
  categoriaAlumno: number;
  fechaInscripcion: string;
  email: string;
  curso: string;
  precioTotal: number;
}

export interface CategoriaAlumno {
  id: number;
  nombre: string;
  descuento: number;
}

export interface ResumenCategoria {
  categoria: number;
  nombre: string;
  cantidad: number;
  total: number;
}
