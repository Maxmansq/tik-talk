export interface ChatConnectionWSParams {
    url: string,
    token: string,
    handleMessage: (message: any) => void
}




export interface ChatWsService {
    connect: (params: ChatConnectionWSParams) => void;
    sendMessage: (chatId: number, text: string) => void;
    disconnect: () => void;
}