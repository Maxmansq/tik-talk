import { ChangeDetectionStrategy, Component, forwardRef, input, signal } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'

@Component({
  selector: 'lib-tt-input',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './tt-input.html',
  styleUrl: './tt-input.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => TtInput)
    }
  ]
})
export class TtInput implements ControlValueAccessor{

  type = input<'text' | 'password'>('text')
  placeholder = input<string>()

  onChange: any

  disabled = signal<boolean>(false)

  onTouched: any


  writeValue(obj: any | string): void {
    console.log(obj)
  }

  registerOnChange(fn: any): void {
    console.log(fn)
    this.onChange = fn
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled.set(isDisabled)
  }

  value: string | null = null

  onModelChange(val: string | null) {
    this.onChange(val)

  }

  

}
