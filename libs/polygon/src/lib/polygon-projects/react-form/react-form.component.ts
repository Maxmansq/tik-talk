import { Component, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormArray, FormControl, FormGroup, FormRecord, ReactiveFormsModule, Validators, ɵInternalFormsSharedModule } from '@angular/forms';
import { FormServiceService } from './../../data'
import { KeyValuePipe } from '@angular/common';


enum ReciverType {
  PERSON = 'PERSON',
  LEGAL = 'LEGAL'
}

function getAdressess() {
  return new FormGroup({
      city: new FormControl<string | null>(''),
      street: new FormControl<string | null>(''),
      home: new FormControl<number | null>(null),
      aport: new FormControl<number | null>(null)
    }) 
}

interface Feature {
  code: string,
  lable: string,
  value: boolean
}

@Component({
  selector: 'app-react-form',
  imports: [ɵInternalFormsSharedModule, ReactiveFormsModule, KeyValuePipe],
  templateUrl: './react-form.component.html',
  styleUrl: './react-form.component.scss',
})
export class ReactFormComponent {
  formService = inject(FormServiceService)

  feacure: Feature[] = [] 

  ReciverType = ReciverType

  form = new FormGroup({
    type: new FormControl<ReciverType>(ReciverType.PERSON),
    name: new FormControl<string>('', Validators.required),
    lastname: new FormControl<string>(''),
    inn: new FormControl<string>(''),
    addresses: new FormArray([getAdressess()]),
    feature: new FormRecord({})
  })

  onSubmit(event: SubmitEvent) {
    this.form.markAllAsTouched()
    this.form.updateValueAndValidity
    if (this.form.invalid) return
    console.log(this.form.valid)
    console.log(this.form.value)
  }

  constructor() {
    this.form.controls.type.valueChanges
      .pipe(takeUntilDestroyed())
      .subscribe(val => {
        console.log(val)
        this.form.controls.inn.clearValidators()
        if (val === ReciverType.LEGAL){
          this.form.controls.inn.setValidators([Validators.required,
                                                Validators.minLength(10),
                                                Validators.maxLength(10)])
        }
      })
    
    this.formService.getTypeDelivery()
      .pipe(takeUntilDestroyed())
      .subscribe(val => {
        this.feacure = val
        for(let feature of val) {
          this.form.controls.feature.addControl(feature.code, new FormControl(feature.value))
        }
        
      })
    // const formPatch = {
    //   name: 'Alexey',
    //   lastname: 'Ivanov'
    // }
    // this.form.patchValue(formPatch)
    }

  addAddress() {
    this.form.controls.addresses.push(getAdressess())
  }

  deleteAddress(index: number) {
    this.form.controls.addresses.removeAt(index, {emitEvent: false})
  }

  sort() {
    return 0
  }
}
