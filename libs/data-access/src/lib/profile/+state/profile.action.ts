import { createActionGroup, props } from '@ngrx/store'
import { Profile } from '../interfaces/profile.interfaces'

export const profileAction = createActionGroup({
  source: 'profile',
  events: {
    'filter events': props<{filters: Record<string, any>}>(),
    'profile loaded': props<{profiles: Profile[]}>()
  }
})