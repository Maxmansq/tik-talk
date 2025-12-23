import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-poligon-header',
  imports: [RouterLink],
  templateUrl: './poligon-header.component.html',
  styleUrl: './poligon-header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PoligonHeaderComponent {
  flag = localStorage.getItem('flag')
  inWork = signal<boolean>(this.flag == 'true')
  headerWork = [
    {
      id: 0,
      name: 'Реакт-форм',
      link: 'reactform'
    },
    {
      id: 1,
      name: 'Доктор-форм',
      link: 'doctor'
    },
    {
      id: 2,
      name: 'Шаблон-форм',
      link: 'tempform'
    },
    {
      id: 3,
      name: 'Rx-Js',
      link: 'rxjs'
    },
  ]
  

  onSubmit() {
    this.inWork.set(false)
    localStorage.setItem('flag', 'false')
  }
  
  onOut() {
    this.inWork.set(true)
    localStorage.setItem('flag', 'true')
  }
}
