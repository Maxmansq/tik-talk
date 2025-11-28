import { Profile } from "./../../profile"

export interface Chat {
  id: number,
  userFirst: Profile,
  userSecond: Profile,
  messages: Message[],
  companion?: Profile
}


export interface GroupMessages {
  date: string,
  messages: Message[]
}

export interface Message {
  id: number,
  userFromId: number,
  personalChatId: number,
  text: string,
  createdAt: string,
  isRead: boolean,
  updatedAt: string,
  user?: Profile,
  isMine?: boolean
}

export interface LastMessage {
  id: number,
  userFrom: Profile,
  message: string | null
  createdAt: string,
  unreadMessages: number
}

export interface TimeChat {
  data: string,
  messages: any[]
}