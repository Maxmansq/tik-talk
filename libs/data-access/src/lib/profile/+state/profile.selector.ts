import { createSelector } from "@ngrx/store";
import { profileFeature, profileSaveFilterFeature } from "./profile.reducer";

export const selectFilteredProfiles = createSelector(
  profileFeature.selectProfiles,
  (profiles) => { return profiles}
)

export const selectFilteredSaveProfiles = createSelector(
  profileSaveFilterFeature.selectProfileFilters,
  (profileFilters) => { return profileFilters}
)


