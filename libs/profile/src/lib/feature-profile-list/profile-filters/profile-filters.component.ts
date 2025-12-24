import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { profileAction, ProfileService, selectFilteredSaveProfiles } from '@tt/data-access';
import { debounceTime, startWith } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-profile-filters',
  imports: [ReactiveFormsModule],
  templateUrl: './profile-filters.component.html',
  styleUrl: './profile-filters.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileFiltersComponent {
  fb = inject(FormBuilder)
  profileService = inject(ProfileService)
  store = inject(Store)
  saveForm = this.store.selectSignal(selectFilteredSaveProfiles)


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
    this.searchForm.patchValue(this.saveForm())
  }
  
}
