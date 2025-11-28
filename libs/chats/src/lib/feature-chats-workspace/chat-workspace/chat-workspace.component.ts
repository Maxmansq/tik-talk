import { Component, inject } from '@angular/core';
import { ChatWorkspaceHeaderComponent } from './chat-workspace-header/chat-workspace-header.component';
import { ChatWorkspaceMessageWrapperComponent } from './chat-workspace-message/chat-workspace-message-wrapper/chat-workspace-message-wrapper.component';
import { ActivatedRoute, Router } from '@angular/router';
import { ChatsService } from '@tt/data-access';
import { filter, of, switchMap } from 'rxjs';
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
  router = inject(Router)

  activeChat$ = this.route.params
    .pipe(switchMap(({id}) => {
      if (id === 'new') {
        return this.route.queryParams
          .pipe(
            filter(({userId}) => userId),
            switchMap(({userId}) => {
              return this.chatsService.createChat(userId)
                .pipe(
                  switchMap(chat => {
                    this.router.navigate(['chats', chat.id])
                    return of(null)
                  })
                )
            } )
          )
      }
      return this.chatsService.getChatId(id)
    }))
}
