import { Component, inject } from '@angular/core';
import { ChatWorkspaceHeaderComponent } from './chat-workspace-header/chat-workspace-header.component';
import { ChatWorkspaceMessageComponent } from './chat-workspace-message/chat-workspace-message.component';
import { ChatWorkspaceMessageWrapperComponent } from './chat-workspace-message/chat-workspace-message-wrapper/chat-workspace-message-wrapper.component';
import { InputMessageComponent } from '../../../common-ul/input-message/input-message.component';
import { ActivatedRoute, Router } from '@angular/router';
import { ChatsService } from '../../../data/services/chats.service';
import { switchMap } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-chat-workspace',
  imports: [ChatWorkspaceHeaderComponent, ChatWorkspaceMessageWrapperComponent, AsyncPipe, ReactiveFormsModule],
  templateUrl: './chat-workspace.component.html',
  styleUrl: './chat-workspace.component.scss',
})
export class ChatWorkspaceComponent {
  route = inject(ActivatedRoute)
  chatsService = inject(ChatsService)

  activeChat$ = this.route.params
    .pipe(switchMap(({id}) => this.chatsService.getChatId(id)))
}
