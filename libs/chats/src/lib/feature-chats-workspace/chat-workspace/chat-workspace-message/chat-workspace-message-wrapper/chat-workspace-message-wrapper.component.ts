import { ChangeDetectionStrategy, Component, computed, ElementRef, inject, input, Renderer2 } from '@angular/core';
import { ChatWorkspaceMessageComponent } from '../chat-workspace-message.component';
import { debounceTime, firstValueFrom, fromEvent, Subject, takeUntil } from 'rxjs';
import { InputMessageComponent } from './../../../../ui';
import { TimeMassagePipe } from '@tt/common-ui';
import { ChatsService } from '@tt/data-access';
import { Chat } from '@tt/data-access';


@Component({
  selector: 'app-chat-workspace-message-wrapper',
  imports: [ChatWorkspaceMessageComponent, InputMessageComponent, TimeMassagePipe],
  templateUrl: './chat-workspace-message-wrapper.component.html',
  styleUrl: './chat-workspace-message-wrapper.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
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
  

  async onSendMessage(message: string) {
    // await firstValueFrom(this.chatservice.sendMessage(this.chat().id, message))
    this.chatservice.wsAdapter.sendMessage(this.chat().id, message)
    // setTimeout(() => {
    //   firstValueFrom(this.chatservice.getChatId(this.chat().id))
    // }, 500)
    
      
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
