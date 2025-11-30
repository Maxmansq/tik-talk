import { inject, Injectable } from "@angular/core";
import { ProfileService } from "../services/profile";
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { profileAction } from "./profile.action";
import { map, switchMap } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class ProfileEffects {
  profileService = inject(ProfileService)
  actions$ = inject(Actions)

  filterProfiles = createEffect(() => {
    return this.actions$.pipe(
      ofType(profileAction.filterEvents),
      switchMap(({filters}) => {
        return this.profileService.filterProfiles(filters)
      }),
      map(res => profileAction.profileLoaded({profiles:res.items}))
    )
  })
}