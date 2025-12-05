import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { profileAction, ProfileService, selectFilteredSaveProfiles } from '@tt/data-access';
import { debounceTime, map, startWith } from 'rxjs';
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
  saveForm = this.store.select(selectFilteredSaveProfiles)


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

  ngOnInit() {
    this.searchForm.controls.firstName.setValue(localStorage.getItem('firstName') === 'undefined' || localStorage.getItem('firstName') === 'null' ? '' : localStorage.getItem('firstName'))
    this.searchForm.controls.lastName.setValue(localStorage.getItem('lastName') === 'undefined' || localStorage.getItem('lastName') === 'null' ? '' : localStorage.getItem('lastName'))
    this.searchForm.controls.stack.setValue(localStorage.getItem('stack') === 'undefined' || localStorage.getItem('stack') === 'null' ? '' : localStorage.getItem('stack'))
  }

   ngOnDestroy() {
    this.saveForm.pipe()
      .subscribe(res => {
        localStorage.setItem('firstName', res['firstName'])
        localStorage.setItem('lastName', res['lastName'])
        localStorage.setItem('stack', res['stack'])
      })
  }
  
}
