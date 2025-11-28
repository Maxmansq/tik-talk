import { Component, input } from '@angular/core';
import { AvatarCircleComponent } from '@tt/common-ui';
import { PassedTimePipe } from '@tt/common-ui';
import { Comment } from '@tt/data-access';

@Component({
  selector: 'app-comment',
  imports: [AvatarCircleComponent, PassedTimePipe],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.scss',
})
export class CommentComponent {
  comment = input<Comment>()
}
