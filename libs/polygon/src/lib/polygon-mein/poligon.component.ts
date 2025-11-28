import { Component } from '@angular/core';
import { PoligonHeaderComponent } from './../ui';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-poligon',
  imports: [PoligonHeaderComponent, RouterOutlet],
  templateUrl: './poligon.component.html',
  styleUrl: './poligon.component.scss',
})
export class PoligonComponent {
  
}
