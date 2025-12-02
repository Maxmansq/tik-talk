import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { Post } from "../interfaces/post.interfaces";

export const postAction = createActionGroup(
  {
    source: 'post',
    events: 
      { 'get post': emptyProps(),
        'load posts': props<{posts: Post[]}>()
      }
  }
)