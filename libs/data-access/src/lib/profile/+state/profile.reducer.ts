import { createFeature, createReducer, on } from "@ngrx/store";
import { Profile } from "../interfaces/profile.interfaces";
import { profileAction } from "./profile.action";

export interface ProfileState {
  profiles: Profile[],
  profileFilters: Record<string, any>
}

export const initialState: ProfileState = {
  profiles: [],
  profileFilters: {}
}

export const profileFeature = createFeature({
  name: 'profileFeature',
  reducer: createReducer(
    initialState,
    on(profileAction.profileLoaded, (state, payload) => {
      return {
        ...state,
        profiles: payload.profiles
      }
    })
  )
})