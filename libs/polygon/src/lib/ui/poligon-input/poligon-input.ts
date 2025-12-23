import { ChangeDetectionStrategy, ChangeDetectorRef, Component, forwardRef, inject } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'lib-poligon-input',
  imports: [FormsModule],
  templateUrl: './poligon-input.html',
  styleUrl: './poligon-input.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => PoligonInput),
    multi: true
  }]
})
export class PoligonInput implements ControlValueAccessor {

  input: string | null = null

  cdr = inject(ChangeDetectorRef)


  onChange = (address: string) => {}

  onTouched = () => {}

  writeValue(obj: any): void {
    this.cdr.markForCheck()
    this.input = obj
  }

  registerOnChange(fn: any): void {
    this.onChange = fn
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn
  }
  
  setDisabledState?(isDisabled: boolean): void {
  }

  modelOnChange(address: string){
    this.onChange(address)
  }
}
