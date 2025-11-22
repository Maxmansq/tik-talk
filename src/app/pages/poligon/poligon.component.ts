import { Component } from '@angular/core';
import { PoligonHeaderComponent } from '../../common-ul/poligon-header/poligon-header.component';
import { PoligonWorkComponent } from './poligon-work/poligon-work.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-poligon',
  imports: [PoligonHeaderComponent, RouterOutlet],
  templateUrl: './poligon.component.html',
  styleUrl: './poligon.component.scss',
})
export class PoligonComponent {

}
