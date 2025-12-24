import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { BehaviorSubject, catchError, combineLatest, concatMap, debounceTime, distinctUntilChanged, exhaustMap, find, first, firstValueFrom, forkJoin, from, fromEvent, interval, lastValueFrom, map, mergeMap,
  Observable, of, pairwise, pipe, reduce, ReplaySubject, scan, skip, Subject, switchMap, take, takeUntil, tap, throttleTime, throwError, timer, 
  withLatestFrom} from 'rxjs';


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
export class RxJs implements OnDestroy {
  // Работает по принципу реактивной переменной
  subject$ = new Subject<number>()

  // Работает по принципу реактивной переменной но с начальным значением
  behSub$ = new BehaviorSubject<number>(1)

  // Может помнить последние значения других подписчиков (принимает кол последних значений и время их актуальности)
  repSub$ = new ReplaySubject<number>(4, 2000)

  // constructor() {
  //   this.subject$.subscribe(val => {
  //     console.log(val)
  //   })
  //   this.subject$.next(3)
  //   timer(3000).subscribe(() => {
  //     this.subject$.next(5)
  //   })

  // }


  // Метод отписки
  constructor() {
    let i = 0
    timer(0, 500)
      .pipe(
        map(val => {
          i++
          return val += i
        }),
        takeUntil(this.destroy$),
        //Можно так если в конструкторе
        takeUntilDestroyed()
        
      )
      .subscribe(val => {
        console.log(val)
      })
  }

  destroy$ = new Subject<void>()

  ngOnDestroy(): void {
    this.destroy$.next()
    this.destroy$.complete()
  }

  

}
                                // ГЕНЕРИРУЮЩИЕ
    //   const obserable$ = from([1,2,3,4,5,6,7,8]) Запускает next на каждом элементе массива
    //   const obserable$ = of([1,2,3,4,5,6,7,8]) Запускает next всего значения
    // const obserable$ = timer(0, 2000) Может быть интервалом или таймером
    // const obserable$ = fromEvent(document.body, 'click') отслеживает ивенты
    // const obserable$ = throwError(()=> 123) Выбрасывает ошибку 



                                  //КОМБИНИРУЮЩИЕ
    // Комбинирует несколько потоков в один и собирает их значения в массив, 
    // но начинает рабатать только когда хоть один поток сработает
    // const obserable$ = combineLatest([
    //   interval(3000).pipe(
    //     map(val => {
    //       return "1_" + val})
    //     ) 
    //   ,
    //   interval(400).pipe(
    //     map(val => {
    //       return "2_" + val})
    //     ),
    //   fromEvent(document.body, 'click')
    // ])
    // Комбинирует несколько потоков в один и одновременно со всеми потоками склеивается в один массив данных 
    // (ждет вывода результата всех)
    // const obserable$ = zip([
    // ])
    // Возвращает последний результат двух потоков (Можно веруть обьектом)
    // const obserable$ = forkJoin([
    // ])
    // Просто соединяет два потока и возвращает значения как кто смог (в куче)
    // const obserable$ = merge([
    // ])
    // Просто соединяет два потока и возвращает значения строго по порядку (сначала первый все возвращает потом второй)
    // const obserable$ = concat([
    // .pipe(
    //   pairwise() Суммирует значения потоков в массив 
    // )
    // Просто соединяет два потока и возвращает значения как кто смог (в куче)
    // const obserable$ = merge([
    // ])
     // ПОзволяет внедрить второй не зависимый поток и склечить их в один массив
    // const obserable$ = interval()
    //   .pipe(
    //     withLatestFrom(obserable$2)
    // )




                                    //ОБРАБОТКА ОШИБОК
    // Ловит ошибки обрабатывает их и завершает поток
    // pipe(
    //  catchError(err => {
    //    return of(false)})
    // )
    // Ловит ошибки и запускает поток заново n колличество раз Есть обьект с настройками {count: 1, resetOnSuccess: true, delay: () гибкая настройка retry}
    // pipe(
    //  retry(2)
    // )
    // Выполняет задержку
    // pipe(
    //  delay(6000)
    // )
    // При завершении потока выполняет логику в нем (Даже при ошибках)
    // pipe(
    //  finalize()
    // )



                                    //ВЕРНУТЬ ЗНАЧЕНИЕ PROMIS
    // Берет первое значение из потока превращает его в promis и закрывает поток
    // firstValueFrom(obserable$).then(
    //   console.log(123)
    // )
    // То же самое что и firstValueFrom только берет последние значение Обязательно работать через await
    // lastValueFrom(obserable$).then(
    // //   console.log(123))




                                      // HIGER-ORDER OBSERABLES
        // switchMap(() => {
        //   return 4 * 2
        // }) Позволяет переключится на другой поток и совержить действие,
        //  но если пришло сразу же новое значение до завершения старого
        //  он бросает предыдущие и начинает работать с новым

        // mergeMap(() => {
        //   return 2 * 2
        // }) То же самое что и switchMap но он обрабатывает все значения даже если старые не успели закончится

        // concatMap() То же самое что и mergeMap но сохраняет последовательность 

        // exhaustMap() В отличае от switchMap при появлении нового значения он продолжает работать со старым а новые тем самым выкидываются
      


                                    // НАКОПИТЕЛЬНЫЕ
        //  reduce((acc, curr) => {
        //   return acc + curr
        //  }, 0) Копит значения в acc а curr это next значение в потоке
  
        //  scan((acc, curr) => {
        //   return acc + curr
        //  }, 0) Копит значения в acc но отдает значение каждый раз когда acc пополнился
        // map() мутирует каждое значение
    





                                      // ФИЛЬТРАЦИЯ
        // filter() фильтрует значение по условию
        // take(1) Берёт n значение и завершает поток
        // first() Берёт 1 значение и завершает поток
        // skip(3) Пропускает n значений отправляет поток дальше
        // find(val => val === 3) Ищет только нужное значение а потом вырубает поток
        // distinctUntilChanged() Не пропускает оддинаковые значения принимает colback функцию
        // tap() Просто пропускает через себя значения и реагирует на них
        // debounceTime(1000) Пропускает последнее событие после тишины в n сек
        // throttleTime(500) Пропускает по одному событию раз в n времени



  //   const sub = obserable$.subscribe({
  //     next: (val) => console.log('next', val),
  //     error: (err) => console.log('error', err),
  //     complete: () => console.log('complete')
  //   })


  //   setTimeout(() => {
  //     sub.unsubscribe()
  //   }, 20000)

  //   }
  // }


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

