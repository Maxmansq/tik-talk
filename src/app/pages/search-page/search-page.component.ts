import { Component, inject } from '@angular/core';
import { ProfileService } from '../../data/services/profile';
import { Profile } from '../../data/interfaces/profile.interfaces';
import { ProfileCardComponent } from '../../common-ul/profile-card/profile-card';
import { ProfileFiltersComponent } from './profile-filters/profile-filters.component';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-search-page',
  imports: [ProfileCardComponent, ProfileFiltersComponent, AsyncPipe],
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.scss',
})
export class SearchPageComponent {
  profileService = inject(ProfileService)
    profiles = this.profileService.filteredProfiles
  
    constructor() {
    }
}
