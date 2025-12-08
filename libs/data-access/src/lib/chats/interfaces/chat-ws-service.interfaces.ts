import { ChatWsMessage } from "./chat-ws-message.interface";

export interface ChatConnectionWSParams {
    url: string,
    token: string,
    handleMessage: (message: ChatWsMessage) => void
}




export interface ChatWsService {
    connect: (params: ChatConnectionWSParams) => void;
    sendMessage: (chatId: number, text: string) => void;
    disconnect: () => void;
}