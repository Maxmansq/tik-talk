import { Component, inject } from '@angular/core';
import { ProfileService } from '../../data/services/profile';
import { Profile } from '../../data/interfaces/profile.interfaces';
import { ProfileCardComponent } from '../../common-ul/profile-card/profile-card';

@Component({
  selector: 'app-search-page',
  imports: [ProfileCardComponent],
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.scss',
})
export class SearchPageComponent {
  profileService = inject(ProfileService)
    profiles: Profile[] = []
  
    constructor() {
      this.profileService.getTestsAccounts()
        .subscribe(val => {
          this.profiles = val
        })
  
    }
}
