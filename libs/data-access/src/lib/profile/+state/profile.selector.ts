import { createSelector } from "@ngrx/store";
import { profileFeature } from "./profile.reducer";

export const selectFilteredProfiles = createSelector(
  profileFeature.selectProfiles,
  (profiles) => profiles

)