import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CategoriaAlumno, Inscripcion, ResumenCategoria } from './interfaces/inscripcion.type';
import { Punto4InscripcionService } from './services/punto4-inscripcion.service';

type FormularioInscripcion = {
  dni: string;
  precio: number | null;
  categoriaAlumno: number | null;
  fechaInscripcion: string;
  email: string;
  curso: string;
};

@Component({
  selector: 'app-punto4',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './punto4.html',
  styleUrls: ['./punto4.css'],
})
export class Punto4 {
  public inscripcion: FormularioInscripcion = this.getFormularioVacio();
  public inscripcionEdicion: FormularioInscripcion = this.getFormularioVacio();
  public precioTotal: number | null = null;
  public precioTotalEdicion: number | null = null;
  public inscripciones: Inscripcion[] = [];
  public resumenCategorias: ResumenCategoria[] = [];
  public totalGeneral = 0;
  public idEdicion: number | null = null;
  public isEditModalOpen = false;

  public readonly categoriasAlumno: CategoriaAlumno[];

  public constructor(private readonly inscripcionService: Punto4InscripcionService) {
    this.categoriasAlumno = this.inscripcionService.categorias;
    this.actualizarVista();
  }

  public calcularTotal(): void {
    this.precioTotal = this.calcularTotalFormulario(this.inscripcion);
  }

  public calcularTotalEdicion(): void {
    this.precioTotalEdicion = this.calcularTotalFormulario(this.inscripcionEdicion);
  }

  public registrar(): void {
    this.calcularTotal();

    if (!this.formularioCompleto(this.inscripcion) || this.precioTotal === null) {
      return;
    }

    this.inscripcionService.create(this.getInscripcionDesdeFormulario(this.inscripcion, this.precioTotal));

    this.limpiarFormulario();
    this.actualizarVista();
  }

  public editar(inscripcion: Inscripcion): void {
    this.idEdicion = inscripcion.id;
    this.inscripcionEdicion = {
      dni: inscripcion.dni,
      precio: inscripcion.precio,
      categoriaAlumno: inscripcion.categoriaAlumno,
      fechaInscripcion: inscripcion.fechaInscripcion,
      email: inscripcion.email,
      curso: inscripcion.curso,
    };
    this.isEditModalOpen = true;
    this.calcularTotalEdicion();
  }

  public guardarEdicion(): void {
    this.calcularTotalEdicion();

    if (
      this.idEdicion === null ||
      !this.formularioCompleto(this.inscripcionEdicion) ||
      this.precioTotalEdicion === null
    ) {
      return;
    }

    this.inscripcionService.update(
      this.idEdicion,
      this.getInscripcionDesdeFormulario(this.inscripcionEdicion, this.precioTotalEdicion),
    );

    this.cerrarModalEdicion();
    this.actualizarVista();
  }

  public eliminar(id: number): void {
    this.inscripcionService.delete(id);

    if (this.idEdicion === id) {
      this.cerrarModalEdicion();
    }

    this.actualizarVista();
  }

  public cerrarModalEdicion(): void {
    this.idEdicion = null;
    this.isEditModalOpen = false;
    this.precioTotalEdicion = null;
    this.inscripcionEdicion = this.getFormularioVacio();
  }

  public getNombreCategoria(categoriaAlumno: number): string {
    return this.inscripcionService.getNombreCategoria(categoriaAlumno);
  }

  private calcularTotalFormulario(formulario: FormularioInscripcion): number | null {
    if (!formulario.precio || !formulario.categoriaAlumno) {
      return null;
    }

    return this.inscripcionService.calcularPrecioTotal(
      Number(formulario.precio),
      Number(formulario.categoriaAlumno),
    );
  }

  private getInscripcionDesdeFormulario(
    formulario: FormularioInscripcion,
    precioTotal: number,
  ): Omit<Inscripcion, 'id'> {
    return {
      dni: formulario.dni,
      precio: Number(formulario.precio),
      categoriaAlumno: Number(formulario.categoriaAlumno),
      fechaInscripcion: formulario.fechaInscripcion,
      email: formulario.email,
      curso: formulario.curso,
      precioTotal,
    };
  }

  private formularioCompleto(formulario: FormularioInscripcion): boolean {
    return Boolean(
      formulario.dni &&
        formulario.precio &&
        formulario.categoriaAlumno &&
        formulario.fechaInscripcion &&
        formulario.email &&
        formulario.curso,
    );
  }

  private actualizarVista(): void {
    this.inscripciones = this.inscripcionService.getAll();
    this.resumenCategorias = this.inscripcionService.getResumenPorCategoria();
    this.totalGeneral = this.inscripcionService.getTotalGeneral();
  }

  private limpiarFormulario(): void {
    this.precioTotal = null;
    this.inscripcion = this.getFormularioVacio();
  }

  private getFormularioVacio(): FormularioInscripcion {
    return {
      dni: '',
      precio: null,
      categoriaAlumno: null,
      fechaInscripcion: new Date().toISOString().slice(0, 10),
      email: '',
      curso: '',
    };
  }
}
