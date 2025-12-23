import { ChangeDetectionStrategy, ChangeDetectorRef, Component, forwardRef, inject, signal } from '@angular/core';
import { ControlValueAccessor, FormArray, FormControl, FormGroup, FormRecord, FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { DadataService } from '@tt/data-access';
import { PoligonInput } from "../poligon-input/poligon-input";
import { debounceTime, map, switchMap, tap } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { DadataSuggestion } from '@tt/data-access';

@Component({
  selector: 'lib-address-input',
  imports: [ReactiveFormsModule, FormsModule, PoligonInput, AsyncPipe],
  templateUrl: './address-input.html',
  styleUrl: './address-input.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AddressInput),
      multi: true
    }
  ]
})
export class AddressInput implements ControlValueAccessor {

  address = new FormControl()

  resultAddress = new FormGroup({
    city: new FormControl<string>(''),
    street: new FormControl<string>(''),
    house: new FormControl<string>(''),
  })

  listAddressFlag = signal<number>(0)


  onChange = (address: DadataSuggestion) => {};

  onTouched = () => {};

  dadataService = inject(DadataService)

  cdr = inject(ChangeDetectorRef)


  listAddressData$ = this.address.valueChanges
    .pipe(
      switchMap(val => {
        return this.dadataService.getSuggestion(val)
      }),
      tap((val) => this.listAddressFlag.set(val.length))
    )


  writeValue(addres: string | null): void {
  }

  registerOnChange(fn: any): void {
    this.onChange = fn
    
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn
    
  }
  
  setDisabledState?(isDisabled: boolean): void {
  }

  onAddresClick(addres: DadataSuggestion) {
    this.address.patchValue(addres.unrestricted_value)
    this.resultAddress.patchValue({
      city: addres.data.city,
      street: addres.data.street,
      house: addres.data.house
    })
    setTimeout(()=> {
      this.listAddressFlag.set(0)
    }, 200)
    
  }



}
