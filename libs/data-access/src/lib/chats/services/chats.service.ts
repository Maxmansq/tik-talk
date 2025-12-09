import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Chat, GroupMessages, LastMessage, Message } from '../interfaces/chats.interfaces';
import { Profile, ProfileService } from './../../profile';
import { firstValueFrom, map, Observable } from 'rxjs';
import { DateTime } from 'luxon';
import { ChatWsService } from '../interfaces/chat-ws-service.interfaces';
import { ChatWsNativeService } from './chat-ws-native.service';
import { AuthService } from '@tt/auth'
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
      const userProfile = await firstValueFrom(this.profileService.getAccount(message.data.author.toString()))
      const typeMessage: Message = {
      id: message.data.id,
      userFromId: message.data.author,
      personalChatId: message.data.chat_id,
      text: message.data.message,
      createdAt: message.data.created_at.replace(" ", "T") + ".219462",
      isRead: false,
      isMine: false,
      user: userProfile
      }
      const data = []
      for (const group of this.activeChatMessage()) {
        data.push(...group.messages)
      }
      data.push(typeMessage)
      console.log(data)
      this.activeChatMessage.set(this.listDateMessage(data))
    }
    // if (isErrorTokenMessage(message)) {
    //   console.log('Токен протух, переподключаемся...');
    //   this.wsAdapter.disconnect()
    //   this.#authService.refreshAuthToken().subscribe(() => {
    //     this.connectWS()
    //   })
      
    //   }
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
