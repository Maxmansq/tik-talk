import { Component, inject } from '@angular/core';
import { ChatsBtnComponent } from '../chats-btn/chats-btn.component';
import { ChatsService } from '../../../data/services/chats.service';
import { AsyncPipe } from '@angular/common';
import { RouterLink, RouterLinkActive } from "@angular/router";
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { map, startWith, switchMap } from 'rxjs';

@Component({
  selector: 'app-chats-list',
  imports: [ChatsBtnComponent, AsyncPipe, RouterLink, RouterLinkActive, ReactiveFormsModule],
  templateUrl: './chats-list.component.html',
  styleUrl: './chats-list.component.scss',
})
export class ChatsListComponent {
  chatsService = inject(ChatsService)
  filterChatsControl = new FormControl('')
  chatsList$ = this.chatsService.getMychats()
    .pipe(
      switchMap(chats => {
        return this.filterChatsControl.valueChanges
          .pipe(
            startWith(''),
            map(inputValue => {
              return chats.filter(chats => {
                return `${chats.userFrom.lastName} ${chats.userFrom.firstName}`.toLowerCase().includes(inputValue?.toLowerCase() ?? '')
              })
            })
          )
      })
    )
}
