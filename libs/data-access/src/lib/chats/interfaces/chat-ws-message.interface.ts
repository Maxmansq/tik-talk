export interface ChatWsMessageBase {
  status: 'success' | 'error',
  
}

export interface ChatWsUnreadMessage extends ChatWsMessageBase {
  action: 'unread',
  data: {
    count: number
  }
}

export interface ChatWsSendMessage extends ChatWsMessageBase {
  text: string,
  chat_id: number
}


export interface ChatWsDataMessage {
  id: number,    
  message: string,
  chat_id: number,    
  created_at: string,
  author: number
}


export interface ChatWsNewMessage extends ChatWsMessageBase {
  action: 'message',
  data: ChatWsDataMessage
}

export interface ChatWsErrorMessage extends ChatWsMessageBase {
  action: 'error',
  message: string
}

export type ChatWsMessage = ChatWsUnreadMessage | ChatWsNewMessage | ChatWsErrorMessage;