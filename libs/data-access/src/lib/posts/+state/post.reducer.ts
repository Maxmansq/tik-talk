import { createFeature, createReducer, on } from "@ngrx/store";
import { Comment, CommentCreateDto, Post, PostCreateDto } from "../interfaces/post.interfaces";
import { postAction } from "./post.action";

export interface PostState {
  posts: Post[],
  newPost: Post | null,
  inputPost: PostCreateDto,
  inputComment: CommentCreateDto
}

export const initialPostState: PostState = {
  posts: [],
  newPost: null,
  inputPost: {
    title: '',
    content: '',
    authorId: 0,
  },
  inputComment: {
    text: '',
    authorId: 0,
    postId: 0,
  }
}

export const postFeature = createFeature({
  name: 'postFeature',
  reducer: createReducer(
    initialPostState,
    on(postAction.loadPosts, (state, payload) => {
      return {
        ...state,
        posts: payload.posts
      }
    })
  )
})

export const createNewPostFeature = createFeature({
  name: 'createNewPostFeature',
  reducer: createReducer(
    initialPostState,
    on(postAction.loadNewPost, (state, payload) => {
      return {
        ...state,
        newPost: payload.post
      }
    })
  )
})


export const inputPostFeature = createFeature({
  name: 'inputPostFeature',
  reducer: createReducer(
    initialPostState,
    on(postAction.inputNewPost, (state, payload) => {
      return {
        ...state,
        inputPost: payload.inputPost
      }
    })
  )
})

export const inputCommentFeature = createFeature({
  name: 'inputCommentFeature',
  reducer: createReducer(
    initialPostState,
    on(postAction.inputNewComment, (state, payload) => {
      return {
        ...state,
        inputComment: payload.inputComment
      }
    })
  )
})

