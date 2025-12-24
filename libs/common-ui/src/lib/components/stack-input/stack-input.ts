import { ChangeDetectionStrategy, Component, forwardRef, HostBinding, HostListener, signal } from '@angular/core';
import { SvgIconComponent } from "../svg-icon/svg-icon.component";
import { ControlContainer, ControlValueAccessor, FormsModule, ɵInternalFormsSharedModule } from '@angular/forms';
import { NG_VALUE_ACCESSOR } from '@angular/forms'
import { BehaviorSubject } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'lib-stack-input',
  imports: [SvgIconComponent, ɵInternalFormsSharedModule, FormsModule, AsyncPipe],
  templateUrl: './stack-input.html',
  styleUrl: './stack-input.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => StackInput),
      multi: true
    }
  ]
})
export class StackInput implements ControlValueAccessor {

  value$ = new BehaviorSubject<string[]>([])
  innerInput = ''

  #disabled = false

  @HostBinding('class.disabled')
  get disabled() {
    return this.#disabled
  }

  @HostListener('keydown.enter')
  onEnter() {
    if (!this.innerInput) return

    this.value$.next([...this.value$.value, this.innerInput])
    this.innerInput = ''
    this.onChange(this.value$.value)
  }

  writeValue(stack: string[] | null): void {
    if (!stack) {
      this.value$.next([])
      return
    }
    this.value$.next(stack)
  }
  registerOnChange(fn: any): void {
    this.onChange = fn

  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn

  }
  nextDisabledState?(isDisabled: boolean): void {
    this.#disabled = isDisabled
  }


  onChange(value: string[] | null) {
  }

  onTouched() {
  }

  onTagDelete(id: number) {
    const tags = this.value$.value
    tags.splice(id, 1)
    this.value$.next(tags)
    this.onChange(this.value$.value)
  }
}
