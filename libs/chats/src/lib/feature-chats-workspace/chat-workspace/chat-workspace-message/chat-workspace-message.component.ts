import { Component, HostBinding, input } from '@angular/core';
import { AvatarCircleComponent, DataLocalPipe } from '@tt/common-ui';
import { Message } from '../../../data/interfaces/chats.interfaces';

@Component({
  selector: 'app-chat-workspace-message',
  imports: [AvatarCircleComponent, DataLocalPipe],
  templateUrl: './chat-workspace-message.component.html',
  styleUrl: './chat-workspace-message.component.scss',
})
export class ChatWorkspaceMessageComponent {
  message = input.required<Message>()

  @HostBinding('class.is-mine')
  get isMine() {
    return this.message().isMine
  }
}
