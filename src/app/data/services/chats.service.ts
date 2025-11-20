import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Chat, LastMessage, Message } from '../interfaces/chats.interfaces';
import { ProfileService } from './profile';
import { map, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChatsService {
  http = inject(HttpClient)
  baseUrl = 'https://icherniakov.ru/yt-course/'
  chatsUrl = `${this.baseUrl}chat/`
  messageUrl = `${this.baseUrl}message/`
  profileServiceMe = inject(ProfileService).me

  activeChatMessage = signal<Message[]>([])

  messagesIsNotRead = signal<number>(0)

  createChat(userId: number){
    return this.http.post<Chat>(`${this.chatsUrl}${userId}`, {})
  }

  getMychats(){
    return this.http.get<LastMessage[]>(`${this.chatsUrl}get_my_chats/`)
  }

  getChatId(chatId: number){
    return this.http.get<Chat>(`${this.chatsUrl}${chatId}`)
      .pipe(
        map(chat => {
          const patchedMessages = chat.messages.map(message => {
              return {
                ...message,
                user: chat.userFirst.id === message.userFromId ? chat.userFirst : chat.userSecond,
                isMine: message.userFromId === this.profileServiceMe()!.id
              }
            })
          const isnotread = chat.messages.map(message => {
            return chat.messages.filter(val => {
              return val.userFromId !== this.profileServiceMe()?.id && !val.isRead
            })
          })

          this.activeChatMessage.set(patchedMessages)
          this.messagesIsNotRead.set(isnotread.length)

          return {
            ...chat,
            companion: chat.userFirst.id === this.profileServiceMe()?.id ? chat.userSecond: chat.userFirst,
            messages: patchedMessages
          }
        })
      )
  }

  sendMessage(chatId: number, message: string) {
    return this.http.post<Message>(`${this.messageUrl}send/${chatId}`, {}, {
      params: {
        message
      }
    })
  }
  
}
