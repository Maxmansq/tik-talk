import { Component, effect, inject } from '@angular/core';
import { ProfileHeaderComponent } from '../../common-ul/profile-header/profile-header.component';
import { FormBuilder, Validators, ɵInternalFormsSharedModule, ReactiveFormsModule } from '@angular/forms';
import { ProfileService } from '../../data/services/profile';
import { firstValueFrom } from 'rxjs';
import { AvatarUploadComponent } from './avatar-upload/avatar-upload.component';

@Component({
  selector: 'app-settings-page',
  imports: [ProfileHeaderComponent, ɵInternalFormsSharedModule, ReactiveFormsModule, AvatarUploadComponent],
  templateUrl: './settings-page.component.html',
  styleUrl: './settings-page.component.scss',
})
export class SettingsPageComponent {
  fb = inject(FormBuilder)
  profaleServise = inject(ProfileService)

  form = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    username: [{value: '', disabled: true}, Validators.required],
    description: [''],
    stack: ['']
  })

  constructor() {
    effect(() => {
      //@ts-ignore
      this.form.patchValue({
        ...this.profaleServise.me(),
        //@ts-ignore
        stack: this.mergeStack(this.profaleServise.me()?.stack)})

    });
    
  }

  onSave() {
    this.form.markAllAsTouched()
    this.form.updateValueAndValidity()

    if(this.form.invalid) {
      return
    }
    //@ts-ignore
    firstValueFrom(this.profaleServise.patchProfile({
      ...this.form.value,
      stack: this.splitStack(this.form.value.stack)}))
  } 

  splitStack(stack: string | null | string[] | undefined) {
    if (!stack) return []
    if(Array.isArray(stack)) return stack

    return stack.split(',')
  }

  mergeStack(stack: string | null | string[] | undefined) {
    if (!stack) return ''
    if(Array.isArray(stack)) return stack.join(',')

    return stack
  }
}
