import { Component, inject } from '@angular/core';
import { SvgIconComponent } from '../svg-icon/svg-icon.component';
import { SubscriberCardComponent } from './subscriber-card/subscriber-card.component';
import { RouterModule } from '@angular/router';
import { ProfileService } from '../../data/services/profile';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { firstValueFrom } from 'rxjs';
import { ImgUrlPipe } from '../../helpers/pipes/img-url.pipe';

@Component({
  selector: 'app-sidebar',
  imports: [SvgIconComponent, SidebarComponent,
    SubscriberCardComponent, RouterModule, AsyncPipe, JsonPipe, ImgUrlPipe],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  profileService = inject(ProfileService)

  subscribers$ = this.profileService.getSubscribersShortList()

  me = this.profileService.me

  menuItems = [
    {
      id: 0,
      lable: 'Моя страница',
      icon: 'home',
      link: ''
    },
    {
      id: 1,
      lable: 'Чаты',
      icon: 'chat',
      link: ''
    },
    {
      id: 2,
      lable: 'Поиск',
      icon: 'search',
      link: ''
    }
  ]

  ngOnInit() {
    firstValueFrom(this.profileService.getMe()) 
  }
}
