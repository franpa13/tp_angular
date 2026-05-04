import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Punto1 } from "./components/punto1/punto1";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Punto1],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('tp3');
}
