import { Post, Comment } from "./interfaces/post.interfaces";
import { PostService,  } from "./services/post.service";
import { PostCreateDto } from "./interfaces/post.interfaces";
export * from './+state'


export {
  PostService,
}

export type {
  Post,
  Comment,
  PostCreateDto
}