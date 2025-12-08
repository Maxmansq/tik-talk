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
            filter(({userid}) => userid),
            switchMap(({userid}) => {
              console.log(`я тут2 $`)
              return this.chatsService.createChat(userid)
                .pipe(
                  switchMap(chat => {
                    console.log('я тут3')
                    this.router.navigate(['chat', chat.id])
                    return of(null)
                  })
                )
            } )
          )
      }
      return this.chatsService.getChatId(id)
    }))
}
