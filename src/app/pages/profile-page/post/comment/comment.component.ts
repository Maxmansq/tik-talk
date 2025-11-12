import { Component, input } from '@angular/core';
import { Comment } from '../../../../data/interfaces/post.interfaces';
import { AvatarCircleComponent } from '../../../../common-ul/avatar-circle/avatar-circle.component';
import { DatePipe } from '@angular/common';
import { PassedTimePipe } from '../../../../helpers/pipes/passed-time.pipe';

@Component({
  selector: 'app-comment',
  imports: [AvatarCircleComponent, PassedTimePipe],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.scss',
})
export class CommentComponent {
  comment = input<Comment>()
}
