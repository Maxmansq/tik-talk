import { ChangeDetectionStrategy, Component } from '@angular/core';
import { debounceTime, distinctUntilChanged, find, first, from, fromEvent, Observable, of, skip, take, tap, throttleTime, throwError, timer } from 'rxjs';


function castomTimer(time: number){
  return new Observable(subscription => {
    const unter = setInterval(() => {
      subscription.next('')
    }, time)
    return () => {
      clearInterval(unter)
    }
  })
}

@Component({
  selector: 'lib-rx-js',
  imports: [],
  templateUrl: './rx-js.html',
  styleUrl: './rx-js.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RxJs {



  constructor() {
    //   const obserable$ = from([1,2,3,4,5,6,7,8]) Запускает next на каждом элементе массива
    //   const obserable$ = of([1,2,3,4,5,6,7,8]) Запускает next всего значения
    // const obserable$ = timer(0, 2000) Может быть интервалом или таймером
    // const obserable$ = fromEvent(document.body, 'click') отслеживает ивенты
    // const obserable$ = throwError(()=> 123) Выбрасывает ошибку 

    const obserable$ = timer(0, 1000)
      .pipe(
        // take(1) Берёт n значение и завершает поток
        // first() Берёт 1 значение и завершает поток
        // skip(3) Пропускает n значений отправляет поток дальше
        // find(val => val === 3) Ищет только нужное значение а потом вырубает поток
        // distinctUntilChanged() Не пропускает оддинаковые значения принимает colback функцию
        // tap() Просто пропускает через себя значения и реагирует на них
        // debounceTime(1000) Пропускает последнее событие после тишины в n сек
        // throttleTime(500) Пропускает по одному событию раз в n времени
      )



    const sub = obserable$.subscribe({
      next: (val) => console.log('next', val),
      error: (err) => console.log('error', err),
      complete: () => console.log('complete')
    })


    setTimeout(() => {
      sub.unsubscribe()
    }, 10000)

    }
  }






  // constructor() {
  //   const obserable$ = from([1,2,3,4,5,6,7,8])





  //   obserable$.subscribe({
  //     next: (val) => console.log('next', val),
  //     error: (err) => console.log('error', err),
  //     complete: () => console.log('complete')
  //   })

  //   }
  // }








  // constructor() {
  //   let i = 0
  //   const sub = castomTimer(1000)
  //     .subscribe({
  //       next: () => console.log(i+=1),
  //       complete: () => console.log('Destroy')
  //     })

  //   setTimeout(() => {
  //     sub.unsubscribe()
  //   }, 10000)
  // }

