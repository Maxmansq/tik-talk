import { Component, inject } from '@angular/core';
import { SvgIconComponent } from '../svg-icon/svg-icon.component';
import { SubscriberCardComponent } from './subscriber-card/subscriber-card.component';
import { RouterLinkActive, RouterModule } from '@angular/router';
import { ProfileService } from '../../data/services/profile';
import { AsyncPipe } from '@angular/common';
import { firstValueFrom } from 'rxjs';
import { ImgUrlPipe } from '../../helpers/pipes/img-url.pipe';

@Component({
  selector: 'app-sidebar',
  imports: [SvgIconComponent,
    SubscriberCardComponent, RouterModule, AsyncPipe, ImgUrlPipe, RouterLinkActive],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  profileService = inject(ProfileService)

  subscribers$ = this.profileService.getSubscribersShortList(3)

  me = this.profileService.me

  menuItems = [
    {
      id: 0,
      lable: 'Моя страница',
      icon: 'home',
      link: 'profile/me'
    },
    {
      id: 1,
      lable: 'Чаты',
      icon: 'chat',
      link: 'chat'
    },
    {
      id: 2,
      lable: 'Поиск',
      icon: 'search',
      link: 'search'
    }
  ]

  ngOnInit() {
    firstValueFrom(this.profileService.getMe()) 
  }
}
