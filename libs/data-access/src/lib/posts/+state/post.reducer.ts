import { createFeature, createReducer, on } from "@ngrx/store";
import { Post } from "../interfaces/post.interfaces";
import { postAction } from "./post.action";

export interface PostState {
  posts: Post[]
}

export const initialStat: PostState = {
  posts: []
}

export const postFeature = createFeature({
  name: 'postFeature',
  reducer: createReducer(
    initialStat,
    on(postAction.loadPosts, (state, payload) => {
      return {
        ...state,
        posts: payload.posts
      }
    })
  )
})