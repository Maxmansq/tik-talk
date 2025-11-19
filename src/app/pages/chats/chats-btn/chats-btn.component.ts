import { Component, input } from '@angular/core';
import { AvatarCircleComponent } from '../../../common-ul/avatar-circle/avatar-circle.component';
import { Chat, LastMessage } from '../../../data/interfaces/chats.interfaces';

@Component({
  selector: 'button[chats]',
  imports: [AvatarCircleComponent],
  templateUrl: './chats-btn.component.html',
  styleUrl: './chats-btn.component.scss',
})
export class ChatsBtnComponent {
  chat = input<LastMessage>()
}
