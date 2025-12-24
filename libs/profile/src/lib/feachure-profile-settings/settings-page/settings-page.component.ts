import { ChangeDetectionStrategy, Component, effect, inject, ViewChild,} from '@angular/core';
import { ProfileHeaderComponent } from './../../ui';
import { FormBuilder, Validators, ɵInternalFormsSharedModule, ReactiveFormsModule } from '@angular/forms';
import { ProfileService } from '@tt/data-access';
import { firstValueFrom } from 'rxjs';
import { AvatarUploadComponent } from './../../ui';
import { RouterLink } from "@angular/router";
import { StackInput, SvgIconComponent, AddressInput } from "@tt/common-ui";

@Component({
  selector: 'app-settings-page',
  imports: [ProfileHeaderComponent, ɵInternalFormsSharedModule, ReactiveFormsModule, AvatarUploadComponent, RouterLink, SvgIconComponent, StackInput, AddressInput],
  templateUrl: './settings-page.component.html',
  styleUrl: './settings-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SettingsPageComponent {
  fb = inject(FormBuilder)
  profaleServise = inject(ProfileService)

  @ViewChild(AvatarUploadComponent) avatarUploader!: any

  form = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    username: [{value: '', disabled: true}, Validators.required],
    description: [''],
    stack: [''],
    city: ['']
  })

  constructor() {
    effect(() => {
      //@ts-ignore
      this.form.patchValue({
        ...this.profaleServise.me(),
    })

    });
    
  }

  ngAfterViewInit() {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    this.avatarUploader.avatar
  }

  // onClear() {
  //   this.form.patchValue({
  //     ...this.profaleServise.me(),
  //     //@ts-ignore
  //     stack: this.mergeStack(this.profaleServise.me()?.stack)})
  //   }


  onSave() {
    this.form.markAllAsTouched()
    this.form.updateValueAndValidity()

    if(this.form.invalid) {
      return
    }

    if (this.avatarUploader.avatar) {
      firstValueFrom(this.profaleServise.uploadAvatar(this.avatarUploader.avatar))
    }
    //@ts-ignore
    firstValueFrom(this.profaleServise.patchProfile({
      ...this.form.value}))
  } 

}
