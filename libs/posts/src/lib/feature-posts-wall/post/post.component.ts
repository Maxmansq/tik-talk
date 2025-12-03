import { Component, inject, input, OnInit, signal } from '@angular/core';
import { AvatarCircleComponent } from "@tt/common-ui";
import { SvgIconComponent } from "@tt/common-ui";
import { map, Subject, takeUntil } from 'rxjs';
import { PassedTimePipe } from '@tt/common-ui';
import { Comment, Post, selectPosts } from '@tt/data-access';
import { CommentComponent, PostInputComponent } from '../ui';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-post',
  imports: [AvatarCircleComponent, SvgIconComponent, PostInputComponent , CommentComponent, PassedTimePipe],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss',
})
export class PostComponent implements OnInit{
  post = input<Post>()
  store = inject(Store)
  comment = signal<Comment[]>([])
  private destroy$ = new Subject<void>();

  async ngOnInit() {
    this.store.select(selectPosts).pipe(
      map((arr) => arr.filter(res => res.id === this.post()?.id)),
      takeUntil(this.destroy$)
    ).subscribe((result) => {
      this.comment.set(result[0].comments)
    })
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

}

