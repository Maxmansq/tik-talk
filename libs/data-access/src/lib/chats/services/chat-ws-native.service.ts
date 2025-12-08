import { ChatConnectionWSParams, ChatWsService } from '../interfaces/chat-ws-service.interfaces';


export class ChatWsNativeService implements ChatWsService {

    #socket: WebSocket | null = null;
    
    connect(params: ChatConnectionWSParams): void {
        if (this.#socket) return

        this.#socket = new WebSocket(params.url, [params.token])

        this.#socket.onmessage = (event: MessageEvent) => {
            params.handleMessage(JSON.parse(event.data))
        }

        this.#socket.onclose = () => {
            console.log('Сокет закрыт')
        }
    }

    sendMessage(chatId: number, text: string): void {
        this.#socket?.send(
            JSON.stringify({
                text,
                chat_id: chatId
            })
        )
    }

    disconnect(): void {
        this.#socket?.close()
    }
}