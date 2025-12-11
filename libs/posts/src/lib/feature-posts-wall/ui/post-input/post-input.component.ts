import { ChangeDetectionStrategy, Component, EventEmitter, HostBinding, inject, input, Output, Renderer2 } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { postAction, PostCreateDto, PostService } from '@tt/data-access';
import { AvatarCircleComponent, SvgIconComponent } from '@tt/common-ui'
import { GlobalStoreService }  from '@tt/data-access'
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-post-input',
  imports: [AvatarCircleComponent, FormsModule, SvgIconComponent],
  templateUrl: './post-input.component.html',
  styleUrl: './post-input.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PostInputComponent {
  postId = input<number>(0)
  isCommentInput = input(false)
  titlePost = ''
  postText = ''
  r2 = inject(Renderer2)
  profile = inject(GlobalStoreService).me
  store = inject(Store)

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
    if (this.postId() === 0) {
      this.store.dispatch(postAction.testAction({value: 1}))
      console.log('DISPATCH TEST ACTION');
      this.store.dispatch(postAction.inputNewPost(
      {inputPost: {
        title: this.titlePost,
        content: this.postText,
        authorId: this.profile()!.id,
      }}
    ))
    } else {
      this.store.dispatch(postAction.inputNewComment(
        {inputComment: {
          text: this.postText,
          authorId: this.profile()!.id,
          postId: this.postId()
        }}
      ))
    }
    this.postText = ''
    this.titlePost = ''
    
  }
    
}
