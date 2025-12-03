import { Component, ElementRef, inject, input, Renderer2 } from '@angular/core';
import { debounceTime, firstValueFrom, fromEvent, Subject, takeUntil } from 'rxjs';
import { postAction, PostService, selectInputComment, selectInputPost, selectPosts } from '@tt/data-access';
import { PostInputComponent } from '../ui';
import { PostComponent } from '../post/post.component';
import { Store } from '@ngrx/store';


@Component({
  selector: 'app-post-feed',
  imports: [PostInputComponent, PostComponent],
  templateUrl: './post-feed.component.html',
  styleUrl: './post-feed.component.scss',
})
export class PostFeedComponent {
  private destroy$ = new Subject<void>();
  store = inject(Store)
  feed = this.store.selectSignal(selectPosts)
  newInputPost = this.store.select(selectInputPost)
  newInputComment = this.store.select(selectInputComment)


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
    // firstValueFrom(this.postService.fetchPost())
    this.store.dispatch(postAction.getPost())
  }

  resizeFeed() {
    const {top} = this.hostElement.nativeElement.getBoundingClientRect();

    const height = window.innerHeight - top - 24 - 24
    this.r2.setStyle(this.hostElement.nativeElement, 'height', `${height}px`)
  }

  //Ловим данные инпут из потока
  ngOnInit() {
    this.newInputPost.subscribe(res => {
      if (res.title === '' || res.content === '') return
      this.store.dispatch(postAction.createPost({
        newPost: res 
      }))
    })
    this.newInputComment.subscribe(res => {
      if (res.text === '') return
      this.store.dispatch(postAction.createComment({
        newComment: res
      }))
    })
      }
}

    