import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { SvgIconComponent } from '@tt/common-ui';
import { SubscriberCardComponent } from './subscriber-card/subscriber-card.component';
import { RouterLinkActive, RouterModule } from '@angular/router';
import { ChatsService, ProfileService } from '@tt/data-access';
import { AsyncPipe } from '@angular/common';
import { firstValueFrom, Subscription, timer } from 'rxjs';
import { ImgUrlPipe } from '@tt/common-ui';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { isErrorTokenMessage } from '@tt/data-access';

@Component({
  selector: 'app-sidebar',
  imports: [SvgIconComponent,
    SubscriberCardComponent, RouterModule, AsyncPipe, ImgUrlPipe, RouterLinkActive],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent implements OnInit {
  profileService = inject(ProfileService)
  subscribers$ = this.profileService.getSubscribersShortList(3)
  chatService = inject(ChatsService)
  me = this.profileService.me
  countUnreadMessage = this.chatService.unreadMessagesCount

  destroyRef = inject(DestroyRef)

  wsSubscribe!: Subscription


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

  async reconnectWs() {
    await firstValueFrom(this.profileService.getMe())
    await firstValueFrom(timer(2000))
    this.connectWS()
  }

  connectWS() {
    this.wsSubscribe?.unsubscribe()
    this.wsSubscribe = this.chatService.connectWS()
      .pipe(
        takeUntilDestroyed(this.destroyRef)
      ).subscribe((message) => {
        if(isErrorTokenMessage(message)) {
          console.log('Токен протух, переподключаемся...')
          this.reconnectWs()
        }
      })
  }

  ngOnInit() {
    console.log('SidebarComponent initialized');
    firstValueFrom(this.profileService.getMe())
    this.connectWS()
  }
}
