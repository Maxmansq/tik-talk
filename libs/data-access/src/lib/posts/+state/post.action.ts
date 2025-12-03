import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { Comment, CommentCreateDto, Post, PostCreateDto } from "../interfaces/post.interfaces";

export const postAction = createActionGroup(
  {
    source: 'post',
    events: { 
      'get post': emptyProps(),
      'load posts': props<{posts: Post[]}>(),
      'create post': props<{newPost: PostCreateDto}>(),
      'load new post': props<{post: Post}>(),
      'input new post': props<{inputPost: PostCreateDto}>(),
      'input new comment': props<{inputComment: CommentCreateDto}>(),
      'create comment': props<{newComment: CommentCreateDto}>(),
      'load new comment': props<{comment: Comment}>()
    }
  }
)