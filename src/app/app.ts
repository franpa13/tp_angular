import { Component, signal, AfterViewInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Punto1 } from "./components/punto1/punto1";
import { initFlowbite } from 'flowbite';
import { Punto2 } from "./components/punto2/punto2";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Punto1, Punto2],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements AfterViewInit {
  protected readonly title = signal('tp3');

  ngAfterViewInit(): void {
    initFlowbite();
  }
}
