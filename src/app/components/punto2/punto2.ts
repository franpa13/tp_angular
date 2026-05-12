import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardItem } from './interfaces/card.type';
import { CartEntry } from './interfaces/cart-entry.type';

@Component({
  selector: 'app-punto2',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './punto2.html',
  styleUrls: ['./punto2.css'],
})
export class Punto2 {
  public cart: CartEntry[] = [];
  public isCartModalOpen = false;

  public cards: CardItem[] = [
    {
      id: 1,
      name: 'Auriculares Inalámbricos',
      description: 'Sonido espacial y cancelación de ruido para el trabajo y el ocio.',
      img: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=300&q=80',
      price: 149.99,
    },
    {
      id: 2,
      name: 'Smartwatch Avanzado',
      description: 'Monitor de salud y notificaciones inteligentes en tu muñeca.',
      img: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=300&q=80',
      price: 229.99,
    },
    {
      id: 3,
      name: 'Tablet Pro',
      description: 'Pantalla táctil de alta definición y batería de larga duración.',
      img: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=300&q=80',
      price: 499.99,
    },
    {
      id: 4,
      name: 'Laptop Gamer',
      description: 'Rendimiento extremo para juegos y edición de video.',
      img: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=300&q=80',
      price: 1299.99,
    },
    {
      id: 5,
      name: 'Cámara de acción',
      description: 'Resistente al agua y lista para grabar aventuras en 4K.',
      img: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?auto=format&fit=crop&w=300&q=80',
      price: 199.99,
    },
    {
      id: 6,
      name: 'Altavoz Inteligente',
      description: 'Control por voz y sonido envolvente para tu hogar conectado.',
      img: 'https://images.unsplash.com/photo-1543512214-318c7553f230?auto=format&fit=crop&w=300&q=80',
      price: 99.99,
    },
    {
      id: 7,
      name: 'Teclado Mecánico RGB',
      description: 'Interruptores táctiles y retroiluminación personalizable.',
      img: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=300&q=80',
      price: 119.99,
    },
    {
      id: 8,
      name: 'Drone Compacto',
      description: 'Vuelo estable y cámara para capturar video aéreo.',
      img: 'https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=300&q=80',
      price: 349.99,
    },
  ];

  public getCartCount(): number {
    return this.cart.reduce((sum, e) => sum + e.quantity, 0);
  }

  public getCartTotal(): number {
    return this.cart.reduce((sum, e) => sum + e.product.price * e.quantity, 0);
  }

  public isInCart(product: CardItem): boolean {
    return this.cart.some(e => e.product.id === product.id);
  }

  public addToCart(product: CardItem): void {
    if (!this.isInCart(product)) {
      this.cart.push({ product, quantity: 1 });
    }
  }

  public increment(entry: CartEntry): void {
    entry.quantity++;
  }

  public decrement(entry: CartEntry): void {
    if (entry.quantity > 1) {
      entry.quantity--;
    } else {
      this.removeEntry(entry);
    }
  }

  public removeEntry(entry: CartEntry): void {
    this.cart = this.cart.filter(e => e.product.id !== entry.product.id);
  }

  public openCartModal(): void {
    this.isCartModalOpen = true;
  }

  public closeCartModal(): void {
    this.isCartModalOpen = false;
  }
}
