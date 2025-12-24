import { inject, Injectable } from "@angular/core";
import { ProfileService } from "../services/profile";
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { profileAction } from "./profile.action";
import { map, switchMap, withLatestFrom } from "rxjs";
import { Store } from "@ngrx/store";
import { selectFilteredProfiles, selectFilteredSaveProfiles, selectProfilePageable } from "./profile.selector";

@Injectable({
  providedIn: "root"
})
export class ProfileEffects {
  profileService = inject(ProfileService)
  actions$ = inject(Actions)
  store = inject(Store)

  filterProfiles = createEffect(() => {
    return this.actions$.pipe(
      ofType(profileAction.filterEvents,
        profileAction.setPage),
      withLatestFrom(
        this.store.select(selectFilteredSaveProfiles),
        this.store.select(selectProfilePageable)
      ),
      switchMap(([_, filters, pageable]) => {
        return this.profileService.filterProfiles({
          ...pageable,
          ...filters
        })
      }),
      map(res => profileAction.profileLoaded({profiles:res.items}))
    )
  })
}