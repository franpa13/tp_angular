import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardItem } from './interfaces/card.type';

@Component({
  selector: 'app-punto2',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './punto2.html',
  styleUrls: ['./punto2.css'],
})
export class Punto2 {
  public cards: CardItem[] = [
    {
      id: 1,
      name: 'Auriculares Inalámbricos',
      description: 'Sonido espacial y cancelación de ruido para el trabajo y el ocio.',
      img: 'https://images.unsplash.com/photo-1518448030800-0d6acc0a0b72?auto=format&fit=crop&w=300&q=80',
      price: 149.99,
    },
    {
      id: 2,
      name: 'Smartwatch Avanzado',
      description: 'Monitor de salud y notificaciones inteligentes en tu muñeca.',
      img: 'https://images.unsplash.com/photo-1517153292960-3013d32281a5?auto=format&fit=crop&w=300&q=80',
      price: 229.99,
    },
    {
      id: 3,
      name: 'Tablet Pro',
      description: 'Pantalla táctil de alta definición y batería de larga duración.',
      img: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=300&q=80',
      price: 499.99,
    },
    {
      id: 4,
      name: 'Laptop Gamer',
      description: 'Rendimiento extremo para juegos y edición de video.',
      img: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=300&q=80',
      price: 1299.99,
    },
    {
      id: 5,
      name: 'Cámara de acción',
      description: 'Resistente al agua y lista para grabar aventuras en 4K.',
      img: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=300&q=80',
      price: 199.99,
    },
    {
      id: 6,
      name: 'Altavoz Inteligente',
      description: 'Control por voz y sonido envolvente para tu hogar conectado.',
      img: 'https://images.unsplash.com/photo-1512428559087-560fa5ceab42?auto=format&fit=crop&w=300&q=80',
      price: 99.99,
    },
    {
      id: 7,
      name: 'Teclado Mecánico RGB',
      description: 'Interruptores táctiles y retroiluminación personalizable.',
      img: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=300&q=80',
      price: 119.99,
    },
    {
      id: 8,
      name: 'Drone Compacto',
      description: 'Vuelo estable y cámara para capturar video aéreo.',
      img: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=300&q=80',
      price: 349.99,
    },
  ];
}
