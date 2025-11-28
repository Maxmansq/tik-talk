import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FormServiceService {

  getTypeDelivery() {
    return of([
    {
      code: 'lift',
      lable: 'Подьем на этаж',
      value:  true
    },
    {
      code: 'strong-packege',
      lable: 'Усиленная упаковка',
      value:  true
    },
    {
      code: 'fast',
      lable: 'Ускоренная достака',
      value:  false
    },
    ])
  }
}
