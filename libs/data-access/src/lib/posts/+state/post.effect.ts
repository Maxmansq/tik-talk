import { inject, Injectable } from "@angular/core";
import { PostService } from "../services/post.service";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { postAction } from "./post.action";
import { map, switchMap, tap } from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class PostEffects {
  postService = inject(PostService)
  actions$ = inject(Actions)

  posts = createEffect(() => {
    return this.actions$.pipe(
      ofType(postAction.getPost),
      switchMap(() => {
        return this.postService.fetchPost()
      }),
      map(res => postAction.loadPosts({posts: res}))
    )
  })

  newPost = createEffect(() => {
    return this.actions$
      .pipe(
        ofType(postAction.createPost),
        switchMap(({newPost}) => {
          return this.postService.createPost(newPost).pipe(
            switchMap(res => [
              postAction.loadNewPost({post: res}),
              postAction.getPost()
            ])
          )
        }),
      )
  })

  comment = createEffect(() => {
    return this.actions$
      .pipe(
        ofType(postAction.createComment),
        switchMap(({newComment}) => {
          return this.postService.createComment(newComment).pipe(
            switchMap(() => [
              postAction.getPost()
            ])
          )
        }),
      )
  })
  
}