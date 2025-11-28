import { Component, computed, ElementRef, inject, input, Renderer2 } from '@angular/core';
import { ChatWorkspaceMessageComponent } from '../chat-workspace-message.component';
import { debounceTime, firstValueFrom, fromEvent, Subject, takeUntil, timer } from 'rxjs';
import { InputMessageComponent } from './../../../../ui';
import { TimeMassagePipe } from '@tt/common-ui';
import { ChatsService } from './../../../../data';
import { Chat } from './../../../../data';


@Component({
  selector: 'app-chat-workspace-message-wrapper',
  imports: [ChatWorkspaceMessageComponent, InputMessageComponent, TimeMassagePipe],
  templateUrl: './chat-workspace-message-wrapper.component.html',
  styleUrl: './chat-workspace-message-wrapper.component.scss',
})
export class ChatWorkspaceMessageWrapperComponent {
  chatservice = inject(ChatsService)
  private destroy$ = new Subject<void>();


  chat = input.required<Chat>()

  message = computed(() => {
    setTimeout(() => {
      this.hostelement.nativeElement.scrollTop = this.hostelement.nativeElement.scrollHeight
    }, 100)
    return this.chatservice.activeChatMessage()
  }) 

  constructor() {
    console.log(this.message())
    timer(0, 100000)
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe(async () => {
        await this.chatservice.getChatId(this.chat().id)
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
