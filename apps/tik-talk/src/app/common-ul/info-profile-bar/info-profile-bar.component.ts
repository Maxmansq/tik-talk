import { Component, inject, Input } from '@angular/core';
import { ProfileService } from '../../data/services/profile';
import { AvatarCircleComponent } from '../avatar-circle/avatar-circle.component';
import { Profile } from '../../data/interfaces/profile.interfaces';

@Component({
  selector: 'app-info-profile-bar',
  imports: [AvatarCircleComponent],
  templateUrl: './info-profile-bar.component.html',
  styleUrl: './info-profile-bar.component.scss',
})
export class InfoProfileBarComponent {
  profileService = inject(ProfileService)
  @Input() profileBar!: Profile
  profile$ = this.profileService.getMe().subscribe((res) => {
    this.data = res
  })

  data!: Profile;

}
