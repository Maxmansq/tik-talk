import { Component, Input } from '@angular/core';

@Component({
  selector: 'svg[icon]',
  imports: [],
  template: '<svg:use [attr.href]="href"></svg:use>',
  styles: [''],
})
export class SvgIconComponent {
  @Input() icon = ''

  get href() {
    console.log(`/assets/svg/${this.icon}.svg#${this.icon}`)
    return `/assets/svg/${this.icon}.svg#${this.icon}`
  }

}
