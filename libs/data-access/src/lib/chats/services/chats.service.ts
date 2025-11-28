import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Chat, GroupMessages, LastMessage, Message } from '../interfaces/chats.interfaces';
import { ProfileService } from './../../profile';
import { map } from 'rxjs';
import { DateTime } from 'luxon';

@Injectable({
  providedIn: 'root',
})
export class ChatsService {
  http = inject(HttpClient)
  baseUrl = 'https://icherniakov.ru/yt-course/'
  chatsUrl = `${this.baseUrl}chat/`
  messageUrl = `${this.baseUrl}message/`
  profileServiceMe = inject(ProfileService).me

  activeChatMessage = signal<GroupMessages[]>([])

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
          
          this.activeChatMessage.set(this.listDateMessage(patchedMessages))

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

  listDateMessage(dataMessage: Message[]) {
    let iterTime:any = null
    const result: any[] = []
    dataMessage.forEach(val => {
      const day = DateTime.fromISO(val.createdAt, {zone: "utc"}).toLocal().day
      if (day != iterTime) {
        iterTime = day
        result.push(
          { 
            date: val.createdAt,
            messages: dataMessage
              .filter(val => {
                const filterDay = DateTime.fromISO(val.createdAt, {zone: "utc"}).toLocal().day
                return filterDay == iterTime
              })
          } 
        )
      }
      }
    )
    return result
  }
  
}
