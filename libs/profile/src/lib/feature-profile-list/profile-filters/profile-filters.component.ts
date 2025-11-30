import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { profileAction, ProfileService } from '@tt/data-access';
import { debounceTime, startWith, switchMap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-profile-filters',
  imports: [ReactiveFormsModule],
  templateUrl: './profile-filters.component.html',
  styleUrl: './profile-filters.component.scss',
})
export class ProfileFiltersComponent {
  fb = inject(FormBuilder)
  profileService = inject(ProfileService)
  store = inject(Store)

  searchForm = this.fb.group({
    firstName: [''],
    lastName: [''],
    stack: [''],
  })

  constructor() {
    this.searchForm.valueChanges
      .pipe(
        startWith({}),
        debounceTime(300),
        takeUntilDestroyed()
      )
      .subscribe(formValue => {
        this.store.dispatch(profileAction.filterEvents({filters: formValue}))
      })
  }
}
