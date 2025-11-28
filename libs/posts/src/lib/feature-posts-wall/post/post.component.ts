import { Component, inject, input, OnInit, signal } from '@angular/core';
import { AvatarCircleComponent } from "@tt/common-ui";
import { SvgIconComponent } from "@tt/common-ui";
import { debounceTime, firstValueFrom } from 'rxjs';
import { PassedTimePipe } from '@tt/common-ui';
import { Comment, Post, PostService } from '@tt/data-access';
import { CommentComponent, PostInputComponent } from '../ui';

@Component({
  selector: 'app-post',
  imports: [AvatarCircleComponent, SvgIconComponent, PostInputComponent , CommentComponent, PassedTimePipe],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss',
})
export class PostComponent implements OnInit{
  post = input<Post>()
 
  comment = signal<Comment[]>([])

  postService = inject(PostService)

  async ngOnInit() {
    this.postService.$dataPotok.pipe(
      debounceTime(100)
    )
      .subscribe(val => {
        if (val.postId != 0){
          this.onCreated()
        }
      })
    this.comment.set(this.post()!.comments)
  }


  async onCreated() {
    const comments = await firstValueFrom(this.postService.getCommentsByPostId(this.post()!.id))
    this.comment.set(comments)
  }
}

