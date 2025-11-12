import { Component, EventEmitter, HostBinding, inject, input, Output, Renderer2 } from '@angular/core';
import { AvatarCircleComponent } from '../../../common-ul/avatar-circle/avatar-circle.component';
import { ProfileService } from '../../../data/services/profile';
import { PostService } from '../../../data/services/post.service';
import { FormsModule } from '@angular/forms';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-post-input',
  imports: [AvatarCircleComponent, FormsModule],
  templateUrl: './post-input.component.html',
  styleUrl: './post-input.component.scss',
})
export class PostInputComponent {
  postId = input<number>(0)
  isCommentInput = input(false)
  titlePost = ''
  postText = ''
  r2 = inject(Renderer2)
  postService = inject(PostService)
  profile = inject(ProfileService).me

  @Output() created = new EventEmitter()

  @HostBinding('class.commentBorder')
  get isComment() {
    return this.isCommentInput()
  }

  onTextAreaInput(event: Event) {
    const textarea = event.target as HTMLTextAreaElement
  

    this.r2.setStyle(textarea, 'height', 'auto')
    this.r2.setStyle(textarea, 'height', textarea.scrollHeight + 'px')
  }


  onCreatePost() {
    if (!this.postText) return
    if (!this.isCommentInput() && !this.titlePost) return
    
    if (this.isCommentInput()) {
      firstValueFrom(this.postService.createComment({
      text: this.postText,
      postId: this.postId(),
      authorId: this.profile()!.id,
      // communityId: 
    })).then(() => {
      this.postText = ''
      this.created.emit()
    })
      return
    }

    firstValueFrom(this.postService.createPost({
      title: this.titlePost,
      content: this.postText,
      authorId: this.profile()!.id,
      // communityId: 
    })).then(() => {
      this.postText = ''
      this.titlePost = ''
    })
    
  }
}
