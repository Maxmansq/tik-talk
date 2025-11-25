import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, FormsModule, NgForm } from '@angular/forms';
import { NoReactValidator } from "./no-react.validators";

@Component({
  selector: 'app-test-form',
  imports: [FormsModule, JsonPipe, NoReactValidator],
  templateUrl: './test-form.component.html',
  styleUrl: './test-form.component.scss',
})
export class TestFormComponent {
  username = ''
  person = {
    name: '',
    lastname: '',
    address: {
      street: '',
      building: 0
    }
  }

  hobby = ''

  onChenge(value: string) {
    console.log(value)
    this.username = value

  }

  onSubmit(form: NgForm) {
    console.log(form)
  }
}
