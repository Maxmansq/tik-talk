import { createFeature, createReducer, on } from "@ngrx/store";
import { CommentCreateDto, Post, PostCreateDto } from "../interfaces/post.interfaces";
import { postAction } from "./post.action";

export interface PostState {
  posts: Post[],
  newPost: Post | null,
  inputPost: PostCreateDto,
  inputComment: CommentCreateDto,
  testData: number[]
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
  },
  testData: []
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
    }),
    on(postAction.loadNewPost, (state, payload) => {
      return {
        ...state,
        newPost: payload.post
      }
    }),
    on(postAction.testAction, (state, payload) => {
      return {
        ...state,
        testData: [...state.testData, payload.value]
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

