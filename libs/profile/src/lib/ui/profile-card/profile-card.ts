import { Component, Input } from '@angular/core';
import { Profile } from '@tt/interfaces/profile';
import { ImgUrlPipe } from '@tt/common-ui';

@Component({
  selector: 'app-profile-card',
  imports: [ImgUrlPipe],
  templateUrl: './profile-card.html',
  styleUrl: './profile-card.scss',
})
export class ProfileCardComponent {
  @Input() profile!: Profile
}
