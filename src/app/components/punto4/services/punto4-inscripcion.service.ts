import { Injectable } from '@angular/core';
import { CategoriaAlumno, Inscripcion, ResumenCategoria } from '../interfaces/inscripcion.type';

@Injectable({
  providedIn: 'root',
})
export class Punto4InscripcionService {
  private inscripciones: Inscripcion[] = [];
  private nextId = 1;

  public readonly categorias: CategoriaAlumno[] = [
    { id: 1, nombre: 'Estudiante', descuento: 35 },
    { id: 2, nombre: 'Egresado', descuento: 50 },
    { id: 3, nombre: 'Particular', descuento: 0 },
  ];

  public getAll(): Inscripcion[] {
    return [...this.inscripciones];
  }

  public create(inscripcion: Omit<Inscripcion, 'id'>): Inscripcion {
    const nuevaInscripcion: Inscripcion = {
      ...inscripcion,
      id: this.nextId++,
    };

    this.inscripciones.push(nuevaInscripcion);
    return nuevaInscripcion;
  }

  public update(id: number, cambios: Omit<Inscripcion, 'id'>): Inscripcion | null {
    const index = this.inscripciones.findIndex((inscripcion) => inscripcion.id === id);

    if (index === -1) {
      return null;
    }

    this.inscripciones[index] = {
      ...cambios,
      id,
    };

    return this.inscripciones[index];
  }

  public delete(id: number): void {
    this.inscripciones = this.inscripciones.filter((inscripcion) => inscripcion.id !== id);
  }

  public calcularPrecioTotal(precio: number, categoriaAlumno: number): number {
    const descuento = this.categorias.find((categoria) => categoria.id === categoriaAlumno)?.descuento ?? 0;
    return precio - precio * (descuento / 100);
  }

  public getNombreCategoria(categoriaAlumno: number): string {
    return (
      this.categorias.find((categoria) => categoria.id === categoriaAlumno)?.nombre ??
      'Sin categoria'
    );
  }

  public getResumenPorCategoria(): ResumenCategoria[] {
    return this.categorias.map((categoria) => {
      const inscripcionesPorCategoria = this.inscripciones.filter(
        (inscripcion) => inscripcion.categoriaAlumno === categoria.id,
      );

      return {
        categoria: categoria.id,
        nombre: categoria.nombre,
        cantidad: inscripcionesPorCategoria.length,
        total: inscripcionesPorCategoria.reduce(
          (total, inscripcion) => total + inscripcion.precioTotal,
          0,
        ),
      };
    });
  }

  public getTotalGeneral(): number {
    return this.inscripciones.reduce((total, inscripcion) => total + inscripcion.precioTotal, 0);
  }
}
