import { Routes } from '@angular/router';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { SearchPageComponent } from './pages/search-page/search-page.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { LayoutComponent } from './common-ul/layout/layout.component';
import { canActivateAuth } from './auth/access.guard';
import { SettingsPageComponent } from './pages/settings-page/settings-page.component';
import { InfoProfileBarComponent } from './common-ul/info-profile-bar/info-profile-bar.component';
import { ChatRoutes } from './pages/chats/chatRoutes';

export const routes: Routes = [
  {
    path: '', component: LayoutComponent, children: [
      {path: '', redirectTo: 'profile/me', pathMatch: 'full'},
      {path: 'profile/:id', component: ProfilePageComponent},
      {path: 'settings', component: SettingsPageComponent},
      {path: 'search', component: SearchPageComponent},
      {path: 'profilebar', component: InfoProfileBarComponent},
      {
        path: 'chat',
        loadChildren: () => ChatRoutes

      }
    ],
    canActivate: [canActivateAuth]
},
  {path: 'login', component: LoginPageComponent},
];
