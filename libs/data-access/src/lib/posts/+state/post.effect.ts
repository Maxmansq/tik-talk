import { inject, Injectable } from "@angular/core";
import { PostService } from "../services/post.service";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { postAction } from "./post.action";
import { map, switchMap } from "rxjs";


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
  
}