import { createSelector } from "@ngrx/store";
import { profileFeature } from "./profile.reducer";

export const selectFilteredProfiles = createSelector(
  profileFeature.selectProfiles,
  (profiles) => { return profiles}
)

export const selectFilteredSaveProfiles = createSelector(
  profileFeature.selectProfileFilters,
  (profileFilters) => { return profileFilters}
)

export const selectProfilePageable = createSelector(
  profileFeature.selectProfileFeatureState,
  (state) => {
    return {
      page: state.page,
      size: state.size
    }
  }
)


