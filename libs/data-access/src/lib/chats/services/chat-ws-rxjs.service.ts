import { finalize, Observable, tap } from "rxjs";
import { ChatWsMessage } from "../interfaces/chat-ws-message.interface";
import { ChatConnectionWSParams, ChatWsService } from "../interfaces/chat-ws-service.interfaces";
import { webSocket, WebSocketSubject } from "rxjs/webSocket";
import { AuthService } from "@tt/auth";
import { inject } from "@angular/core";

export class ChatWsRxjsService implements ChatWsService{
  #socket: WebSocketSubject<ChatWsMessage> | null = null;
  authService = inject(AuthService)

  connect(params: ChatConnectionWSParams): Observable<ChatWsMessage> {
    if (!this.#socket) {
      this.#socket = webSocket({
      url: params.url,
      protocol: [params.token]
    })
    }
    return this.#socket.asObservable()
      .pipe(
        tap(message => {
          params.handleMessage(message)
        }),
        finalize(() => {
          console.log('Сокет закрыт')
          this.reconnectSocket(params)
        })
      )
    }

  sendMessage(chatId: number, text: string) {
      this.#socket?.next({
        text,
        chat_id: chatId
      })
    };

  disconnect() {
    this.#socket = null;
    this.#socket = null
    };

  reconnectSocket(params: ChatConnectionWSParams) {
    this.authService.refreshAuthToken()

    if (this.authService.token) {
      this.disconnect();
      this.connect({
        url: params.url,
        token: this.authService.token,
        handleMessage: params.handleMessage
      })
    }
  }
}