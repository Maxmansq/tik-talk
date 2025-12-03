import { Routes } from '@angular/router';
import { LoginPageComponent } from '@tt/auth';
import { SearchPageComponent } from '@tt/profile';
import { ProfilePageComponent } from '@tt/profile';
import { LayoutComponent } from '@tt/layout';
import { canActivateAuth } from '@tt/auth';
import { SettingsPageComponent } from '@tt/profile';
import { ChatRoutes } from '@tt/chats';
import { PolygonRouts } from '@tt/polygon'
import { provideState } from '@ngrx/store';
import { createNewPostFeature, inputCommentFeature, inputPostFeature, PostEffects, postFeature, ProfileEffects, profileFeature, profileSaveFilterFeature } from '@tt/data-access';
import { provideEffects } from '@ngrx/effects';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    providers: [
      provideState(postFeature),
      provideState(createNewPostFeature),
      provideState(inputPostFeature),
      provideState(inputCommentFeature),
      provideEffects(PostEffects)
    ],
    children: [
      {
        path: '',
        redirectTo: 'profile/me',
        pathMatch: 'full',
      },
      {path: 'profile/:id', component: ProfilePageComponent},
      {path: 'settings', component: SettingsPageComponent},
      {
        path: 'search',
        component: SearchPageComponent,
        providers: [
          provideState(profileFeature),
          provideEffects(ProfileEffects),
          provideState(profileSaveFilterFeature),
        ]
      },
      {
        path: 'chat',
        loadChildren: () => ChatRoutes

      }
    ],
    canActivate: [canActivateAuth]
},
  {path: 'login', component: LoginPageComponent},
  {
    path: 'poligon',
    loadChildren: () => PolygonRouts}
];
