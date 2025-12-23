import { ChangeDetectionStrategy, ChangeDetectorRef, Component, forwardRef, inject, signal } from '@angular/core';
import { ControlValueAccessor, FormControl, FormGroup, FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule, Validators } from '@angular/forms';
import { TtInput } from "../tt-input/tt-input";
import { CommonModule } from '@angular/common';
import { DadataService, DadataSuggestion } from '@tt/data-access'
import { debounceTime, switchMap, tap } from 'rxjs';

@Component({
  selector: 'lib-address-input',
  imports: [TtInput, FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './address-input.html',
  styleUrl: './address-input.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => AddressInput) 
    }
  ]
})
export class AddressInput implements ControlValueAccessor {

  innerSearchControl = new FormControl()

  resultAddressForm = new FormGroup({
    city: new FormControl('', Validators.required),
    street: new FormControl('', Validators.required),
    house: new FormControl('', Validators.required)
  })

  onChange = (city: string) => {}

  onTouched = () => {}

  #dadataService = inject(DadataService)

  isDropdownOpened = signal<number>(0)

  cdr = inject(ChangeDetectorRef)


  suggestions$ = this.innerSearchControl.valueChanges
    .pipe( 
      debounceTime(500),
      switchMap(val => {
        return this.#dadataService.getSuggestion(val)
          .pipe(
            tap(res => {
              this.isDropdownOpened.set(res.length)
            })
          )
      })
    )

  writeValue(city: string): void {
    if (!city) return
    this.innerSearchControl.patchValue(city, {
      emitEvent: false
    })
    this.resultAddressForm.patchValue({
      city: city.split(',')[0],
      street: city.split(',')[1],
      house: city.split(',')[2] ? city.split(',')[2] : '',
    }, {
      emitEvent: false
    })
  }


  registerOnChange(fn: any): void {
    this.onChange = fn;
  }


  registerOnTouched(fn: any): void {
    this.onTouched = fn
  }


  setDisabledState?(isDisabled: boolean): void {
  }

  onSuggestionPick(address: DadataSuggestion) {
    this.isDropdownOpened.set(0)
    this.innerSearchControl.patchValue(address.value, {
      emitEvent: false
    })
    this.resultAddressForm.patchValue({
      city: address.data.city,
      street: address.data.street,
      house: address.data.house
    },{
      emitEvent: false
    }
  )
    this.onChange(
      `${address.data.region_with_type ?? ''}, ` +
      `${address.data.street_with_type ?? ''}, ` +
      `${address.data.house_type ?? ''} ${address.data.house ?? ''}`)
  }
}
