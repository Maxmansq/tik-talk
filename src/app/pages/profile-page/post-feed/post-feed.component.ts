import { Component, ElementRef, HostListener, inject, input, Renderer2 } from '@angular/core';
import { PostInputComponent } from '../post-input/post-input.component';
import { PostComponent } from '../post/post.component';
import { PostService } from '../../../data/services/post.service';
import { debounce, debounceTime, firstValueFrom, from, fromEvent, Subject, takeUntil } from 'rxjs';
import { PostCreateDto } from '../../../data/interfaces/post.interfaces';


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
    console.log(`${height}`)
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
    