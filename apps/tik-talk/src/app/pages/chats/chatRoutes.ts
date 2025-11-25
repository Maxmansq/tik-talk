import { Route } from "@angular/router";
import { ChatsComponent } from "./chats.component";
import { ChatWorkspaceComponent } from "./chat-workspace/chat-workspace.component";

export const ChatRoutes: Route[] = [
  {
    path: '',
    component: ChatsComponent,
    children: [
      {
        path: ':id', component: ChatWorkspaceComponent
      }
    ]
  }
]