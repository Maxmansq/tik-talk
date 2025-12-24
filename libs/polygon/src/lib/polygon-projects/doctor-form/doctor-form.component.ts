import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { MaskitoDirective } from '@maskito/angular';
import { Store } from '@ngrx/store';
import { phoneMask } from '@tt/common-ui';
import { onlyText } from '@tt/common-ui';
import { selectPosts, selectTest } from '@tt/data-access';



enum dataService {
  teropevt = 'терапевтическая стоматологическая помощь взрослым и детям',
  hiryrg = 'хирургическая помощь взрослым и детям ортодонтия',
  ortod = 'ортодонтия профилактика и гигиена полости рта',
  start = 'Выберите'
}


enum  week {
  weekdays = 'Будние дни',
  weekends = 'Выходные дни'
}

enum doctorTime {
  morning =  "9:00-12:00",
  langh = "12:00-15:00",
  evning = "15:00-18:00",
  night = "18:00-21:00"
}

const validateStartEror: ValidatorFn = (control: AbstractControl) => {
  if (control.value == 'Выберите') {
    return {StartEror: 'Выберите услугу'}
  }
  return null

}


@Component({
  selector: 'app-doctorform',
  imports: [ReactiveFormsModule, MaskitoDirective],
  templateUrl: './doctor-form.component.html',
  styleUrl: './doctor-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DoctorformComponent {

  dataService = dataService
  week = week
  doctorTime = doctorTime
  phoneMask = phoneMask
  onlyText = onlyText
  store = inject(Store)


  constructor() {
    this.store.select(selectTest).subscribe(res => {
      console.log(res);
    });
  }

  form = new FormGroup(
    { 
      name: new FormControl<string>('', Validators.required),
      phone: new FormControl<string>('', [Validators.required, Validators.minLength(18)]),
      service: new FormControl(dataService.start ,[Validators.required, validateStartEror]),
      week: new FormControl(this.week.weekdays),
      timedoctor: new FormControl(this.doctorTime.morning),
      personData: new FormControl<boolean>(false)
    }
  )

  onSubmit(event: SubmitEvent) {
    this.form.markAllAsTouched()
    this.form.updateValueAndValidity()
    if (this.form.invalid) {
      return
    } 
    console.log(this.form.controls.service.value)
  }

}
