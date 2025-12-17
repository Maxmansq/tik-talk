import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router'; 
import { AuthService } from '@tt/data-access';
import { TtInput } from '@tt/common-ui'



@Component({
  selector: 'app-login-page',
  imports: [ReactiveFormsModule, TtInput],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginPageComponent implements OnInit {
  authService = inject(AuthService)
  router = inject(Router)

  isPasswordVisible = signal<boolean>(false)

  form = new FormGroup({
    username: new FormControl(null, Validators.required),
    password: new FormControl(null, Validators.required)
  })

  ngOnInit(): void {
    this.form.valueChanges.subscribe(val => {
      console.log(val)
    })
  }

  
  onSubmit(event: Event) {

    if (this.form.valid) {
      console.log(event)

      // @ts-expect-error
      this.authService.login(this.form.value)
      .subscribe(() => {
        this.router.navigate([''])
      })
    }
    
  }
}