import { Component, EventEmitter, HostBinding, inject, input, Output, Renderer2 } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PostCreateDto, PostService } from '@tt/data-access';
import { AvatarCircleComponent, SvgIconComponent } from '@tt/common-ui'
import { GlobalStoreService }  from '@tt/data-access'

@Component({
  selector: 'app-post-input',
  imports: [AvatarCircleComponent, FormsModule, SvgIconComponent],
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
  profile = inject(GlobalStoreService).me

  @Output() inputText = new EventEmitter<PostCreateDto>();

  @HostBinding('class.commentBorder')
  get isComment() {
    return this.isCommentInput()
  }

  onTextAreaInput(event: Event) {
    const textarea = event.target as HTMLTextAreaElement
  

    this.r2.setStyle(textarea, 'height', 'auto')
    this.r2.setStyle(textarea, 'height', textarea.scrollHeight + 'px')
  }

  //Отправка данных инпута в поток
  onCreateMassage() {
    this.postService.sendDataMessage({
      title: this.titlePost,
      content: this.postText,
      authorId: this.profile()!.id,
      postId: this.postId()
    })
    this.postText = ''
    this.titlePost = ''
  }
    
}
