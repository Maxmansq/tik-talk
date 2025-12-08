import { Component, inject } from '@angular/core';
import { SvgIconComponent } from '@tt/common-ui';
import { SubscriberCardComponent } from './subscriber-card/subscriber-card.component';
import { RouterLinkActive, RouterModule } from '@angular/router';
import { ChatsService, ProfileService } from '@tt/data-access';
import { AsyncPipe } from '@angular/common';
import { firstValueFrom } from 'rxjs';
import { ImgUrlPipe } from '@tt/common-ui';

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

  chatService = inject(ChatsService)

  countUnreadMessage = this.chatService.unreadMessagesCount


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
    },
    {
      id: 3,
      lable: 'Полигон',
      icon: 'poligon',
      link: 'poligon'
    }
  ]

  ngOnInit() {
    firstValueFrom(this.profileService.getMe()) 
  }
}
