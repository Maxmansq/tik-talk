import { createFeature, createReducer, on } from "@ngrx/store";
import { Profile } from "../interfaces/profile.interfaces";
import { profileAction } from "./profile.action";

export interface ProfileState {
  profiles: Profile[],
  profileFilters: Record<string, any>,
  page: number,
  size: number
}

export const initialState: ProfileState = {
  profiles: [],
  profileFilters: {},
  page: 1,
  size: 10
}



export const profileFeature = createFeature({
  name: 'profileFeature',
  reducer: createReducer(
    initialState,
    on(profileAction.profileLoaded, (state, payload) => {
      return {
        ...state,
        profiles: state.profiles.concat(payload.profiles)
      }
    }),
    on(profileAction.setPage, (state, payload) => {
      let page = payload.page
      if (!page) page = state.page + 1
      return {
        ...state,
        page
      }
    }),
    on(profileAction.filterEvents, (state, payload) => {
      return {
        ...state,
        profiles: [],
        profileFilters: payload.filters,
        page: 1
      }
    })
  )
})
