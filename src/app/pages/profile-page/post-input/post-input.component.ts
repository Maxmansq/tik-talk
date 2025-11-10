import { Component, inject, Renderer2 } from '@angular/core';
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
  titlePost = ''
  postText = ''
  r2 = inject(Renderer2)
  postService = inject(PostService)
  profile = inject(ProfileService).me

  onTextAreaInput(event: Event) {
    const textarea = event.target as HTMLTextAreaElement
  

    this.r2.setStyle(textarea, 'height', 'auto')
    this.r2.setStyle(textarea, 'height', textarea.scrollHeight + 'px')
  }


  onCreatePost() {
    if (!this.postText || !this.titlePost) return

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
