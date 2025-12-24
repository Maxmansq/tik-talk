import { JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { NoReactValidator } from "./../../validators";


@Component({
  selector: 'app-test-form',
  imports: [FormsModule, JsonPipe, NoReactValidator],
  templateUrl: './test-form.component.html',
  styleUrl: './test-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
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
