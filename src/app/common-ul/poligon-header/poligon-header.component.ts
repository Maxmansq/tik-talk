import { Component, signal } from '@angular/core';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-poligon-header',
  imports: [RouterLink],
  templateUrl: './poligon-header.component.html',
  styleUrl: './poligon-header.component.scss',
})
export class PoligonHeaderComponent {
  inWork = signal<boolean>(true)
  headerWork = [
    {
      id: 0,
      name: 'Формы',
      link: 'reactform'
    },
  ]

  onSubmit() {
    this.inWork.set(false)
  }
  
  onOut() {
    this.inWork.set(true)
  }
}
