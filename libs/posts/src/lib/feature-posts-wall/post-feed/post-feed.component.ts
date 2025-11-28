import { Component, ElementRef, inject, input, Renderer2 } from '@angular/core';
import { debounceTime, firstValueFrom, fromEvent, Subject, takeUntil } from 'rxjs';
import { PostService } from '@tt/data-access';
import { PostInputComponent } from '../ui';
import { PostComponent } from '../post/post.component';


@Component({
  selector: 'app-post-feed',
  imports: [PostInputComponent, PostComponent],
  templateUrl: './post-feed.component.html',
  styleUrl: './post-feed.component.scss',
})
export class PostFeedComponent {
  private destroy$ = new Subject<void>();
  postService = inject(PostService)
  feed = inject(PostService).posts
  inputcontent = input()


  ngAfterViewInit() {
    this.resizeFeed()
    fromEvent(window, 'resize')
      .pipe(
        debounceTime(100),
        takeUntil(this.destroy$)
      )
      .subscribe(() => {
        this.resizeFeed()
      })
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  hostElement = inject(ElementRef)
  r2 = inject(Renderer2)

  constructor() {
    firstValueFrom(this.postService.fetchPost()) 
  }

  resizeFeed() {
    const {top} = this.hostElement.nativeElement.getBoundingClientRect();

    const height = window.innerHeight - top - 24 - 24
    this.r2.setStyle(this.hostElement.nativeElement, 'height', `${height}px`)
  }

  //Ловим данные инпут из потока
  ngOnInit() {
    this.postService.$dataPotok.subscribe(val => {
      console.log(val)
      if (!val.content) return
      if (val.title) {
        firstValueFrom(this.postService.createPost({
        title: val.title,
        content: val.content,
        authorId: val.authorId
      }))
      }
      else {
        firstValueFrom(this.postService.createComment({
        text: val.content,
        postId: val.postId,
        authorId: val.authorId,
    }))
    }
    })
  }
}
    