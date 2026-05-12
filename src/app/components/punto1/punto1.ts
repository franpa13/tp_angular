import { Component } from '@angular/core';
import { CarrouselItem } from './interfaces/carrousel.types';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-punto1',
  imports: [CommonModule],
  templateUrl: './punto1.html',

  styleUrl: './punto1.css',
})
export class Punto1 {
  public contador = 0;

  public items: CarrouselItem[] = [
    {
      id: 1,
      name: 'Cataratas del Iguazu',
      description: 'Las Cataratas del Iguazu son uno de los sistemas de cascadas mas grandes del mundo y estan ubicadas entre Argentina y Brasil.',
      img: 'https://commons.wikimedia.org/wiki/Special:FilePath/Argentinian%20Iguazu%20Falls.jpg'
    },
    {
      id: 2,
      name: 'Torre Eiffel',
      description: 'La Torre Eiffel es el monumento mas emblematico de Paris y fue inaugurada en 1889 para la Exposicion Universal.',
      img: 'https://upload.wikimedia.org/wikipedia/commons/a/a8/Tour_Eiffel_Wikimedia_Commons.jpg'
    },
    {
      id: 3,
      name: 'Machu Picchu',
      description: 'Machu Picchu es una antigua ciudad inca del siglo XV situada en los Andes peruanos y reconocida como Patrimonio de la Humanidad.',
      img: 'https://upload.wikimedia.org/wikipedia/commons/e/eb/Machu_Picchu%2C_Peru.jpg'
    }
  ];

  public constructor() {
    this.moveImg(0);
  }

  goTo(index: number): void {
    this.contador = index;
  }

  moveImg(move: number): void {
    this.contador += move;

    if (this.contador >= this.items.length) {
      this.contador = 0;
    }

    if (this.contador < 0) {
      this.contador = this.items.length - 1;
    }
  }
}
