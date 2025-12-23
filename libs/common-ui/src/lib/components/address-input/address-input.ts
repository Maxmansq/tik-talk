import { ChangeDetectionStrategy, ChangeDetectorRef, Component, forwardRef, inject, signal } from '@angular/core';
import { ControlValueAccessor, FormControl, FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { TtInput } from "../tt-input/tt-input";
import { CommonModule } from '@angular/common';
import { DadataService } from '@tt/data-access'
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
    this.innerSearchControl.patchValue(city, {
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

  onSuggestionPick(city: string) {
    console.log(city)
    this.isDropdownOpened.set(0)
    this.innerSearchControl.patchValue(city, {
      emitEvent: false
    })
    this.onChange(city)
  }
}
