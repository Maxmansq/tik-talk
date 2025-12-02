import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { CommentCreateDto, Post, PostCreateDto } from '../interfaces/post.interfaces';
import { map, Subject, switchMap, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  #http = inject(HttpClient)
  baseApiUrl = 'https://icherniakov.ru/yt-course/'

  posts = signal<Post[]>([])

  createPost(payload: PostCreateDto) {
    return this.#http.post<Post>(`${this.baseApiUrl}post/`, payload)
      .pipe(
        switchMap(() => {
          return this.fetchPost()
        })
      )
  }
  
  fetchPost() {
    return this.#http.get<Post[]>(`${this.baseApiUrl}post/`)
      // pipe(
      // tap(res => this.posts.set(res)) 
      // )
  }

  createComment(payload: CommentCreateDto) {
    return this.#http.post<Comment>(`${this.baseApiUrl}comment/`, payload)
  }

  getCommentsByPostId(postId: number) {
    return this.#http.get<Post>(`${this.baseApiUrl}post/${postId}`)
      .pipe(
        map(res => res.comments)
      )
  }

  private linkDataPost = new Subject<any>()

  $dataPotok = this.linkDataPost.asObservable()

  sendDataMessage(value: any) {
    this.linkDataPost.next(value)
  }

}
