import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Chat, GroupMessages, LastMessage, Message } from '../interfaces/chats.interfaces';
import { Profile, ProfileService } from './../../profile';
import { firstValueFrom, map, Observable } from 'rxjs';
import { DateTime } from 'luxon';
import { ChatWsService } from '../interfaces/chat-ws-service.interfaces';
import { ChatWsNativeService } from './chat-ws-native.service';
import { AuthService } from '../../auth'
import { ChatWsMessage } from '../interfaces/chat-ws-message.interface';
import { isErrorTokenMessage, isNewMessage, isUnreadMessage } from '../interfaces/type-guards';
import { ChatWsRxjsService } from './chat-ws-rxjs.service';

@Injectable({
  providedIn: 'root',
})
export class ChatsService {
  http = inject(HttpClient)
  baseUrl = 'https://icherniakov.ru/yt-course/'
  chatsUrl = `${this.baseUrl}chat/`
  messageUrl = `${this.baseUrl}message/`
  profileServiceMe = inject(ProfileService).me
  profileService = inject(ProfileService)
  #authService = inject(AuthService)

  wsAdapter: ChatWsService = new ChatWsRxjsService()

  activeChatMessage = signal<GroupMessages[]>([])

  unreadMessagesCount = signal<number>(0)


  connectWS() {
    console.log(this.#authService.token)
    return this.wsAdapter.connect({
      url: `${this.baseUrl}chat/ws`,
      token: this.#authService.token ?? '',
      handleMessage: this.handleWSMessage.bind(this)
    }) as Observable<ChatWsMessage>;
  }


   async handleWSMessage(message: ChatWsMessage) {
    console.log('Получено сообщение в сервисе чатов:', message);

    if (isUnreadMessage(message)) {
      this.unreadMessagesCount.set(message.data.count)
    }
    if (isNewMessage(message)) {
      let falg = false
      const userProfile = await firstValueFrom(this.profileService.getAccount(message.data.author.toString()))
      const typeMessage: Message = {
      id: message.data.id,
      userFromId: message.data.author,
      personalChatId: message.data.chat_id,
      text: message.data.message,
      createdAt: message.data.created_at.replace(" ", "T") + ".000000",
      isRead: false,
      isMine: this.profileServiceMe()!.id === message.data.author,
      user: userProfile
      }
      this.activeChatMessage.set(
        this.activeChatMessage().map(group => {
          if (this.dateFormat(group.date) === this.dateFormat(typeMessage.createdAt)) {
            falg = true
            return {
              date: group.date,
              messages: [...group.messages, typeMessage]
            }
          }
          return group
        })
      )
      if (!falg) {
        this.activeChatMessage.set(
          [...this.activeChatMessage(),
            {
            date: typeMessage.createdAt,
            messages: [typeMessage]
          }],
        )
      }
    }
  }

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
    const result: GroupMessages[] = []
    for (const val of dataMessage) {
      const dataMessage = this.dateFormat(val.createdAt)

      const group = result.find(group => this.dateFormat(group.date) === dataMessage)

      if (group) {
        group.messages.push(val)
      }
      else {
        result.push({
          date: val.createdAt,
          messages: [val]
        })
      }
    }
    console.log(result)
    return result
  }


  dateFormat(dateString: string) {
    return DateTime.fromISO(dateString, {zone: "utc"}).toFormat("dd-MM-yyyy")
  }
  
}
