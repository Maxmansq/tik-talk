import { Component, inject, input, OnInit, signal } from '@angular/core';
import { Comment, Post } from '../../../data/interfaces/post.interfaces';
import { AvatarCircleComponent } from "../../../common-ul/avatar-circle/avatar-circle.component";
import { DatePipe } from '@angular/common';
import { SvgIconComponent } from "../../../common-ul/svg-icon/svg-icon.component";
import { PostInputComponent } from '../post-input/post-input.component';
import { CommentComponent } from './comment/comment.component';
import { PostService } from '../../../data/services/post.service';
import { firstValueFrom } from 'rxjs';
import { PassedTimePipe } from '../../../helpers/pipes/passed-time.pipe';

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
    this.comment.set(this.post()!.comments)
  }

  async onCreated() {
    const comments = await firstValueFrom(this.postService.getCommentsByPostId(this.post()!.id))
    this.comment.set(comments)
  }
}

