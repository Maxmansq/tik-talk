import { Component, ElementRef, inject, input, Renderer2, signal } from '@angular/core';
import { ChatWorkspaceMessageComponent } from '../chat-workspace-message.component';
import { InputMessageComponent } from '../../../../../common-ul/input-message/input-message.component';
import { ChatsService } from '../../../../../data/services/chats.service';
import { Chat } from '../../../../../data/interfaces/chats.interfaces';
import { debounceTime, firstValueFrom, fromEvent, Subject, takeUntil, timer } from 'rxjs';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-chat-workspace-message-wrapper',
  imports: [ChatWorkspaceMessageComponent, InputMessageComponent, DatePipe],
  templateUrl: './chat-workspace-message-wrapper.component.html',
  styleUrl: './chat-workspace-message-wrapper.component.scss',
})
export class ChatWorkspaceMessageWrapperComponent {
  chatservice = inject(ChatsService)
  private destroy$ = new Subject<void>();

  chat = input.required<Chat>()

  messages = this.chatservice.activeChatMessage

  datainject = () => {

  }


  constructor() {
    timer(0, 10000)
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe(() => {
        const chat = firstValueFrom(this.chatservice.getChatId(this.chat().id))
    })
    
  }
  

  async onSendMessage(message: string) {
    await firstValueFrom(this.chatservice.sendMessage(this.chat().id, message))
    const chat = firstValueFrom(this.chatservice.getChatId(this.chat().id))

    setTimeout(() => {
      this.hostelement.nativeElement.scrollTop = this.hostelement.nativeElement.scrollHeight
    }, 100)
    
  }


  hostelement = inject(ElementRef)
  r2 = inject(Renderer2)

  ngAfterViewInit() {
    this.resizeChat()
    fromEvent(window, 'resize')
      .pipe(
        debounceTime(40),
        takeUntil(this.destroy$)
      )
      .subscribe(() => {
        this.resizeChat()
      })
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  resizeChat() {
    const {top} = this.hostelement.nativeElement.getBoundingClientRect();
    const height = window.innerHeight - top - 120
    console.log(height)
    this.r2.setStyle(this.hostelement.nativeElement, 'height', `${height}px`)
  }
}
