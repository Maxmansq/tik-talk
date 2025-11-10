import { Component, input } from '@angular/core';
import { Post } from '../../../data/interfaces/post.interfaces';
import { AvatarCircleComponent } from "../../../common-ul/avatar-circle/avatar-circle.component";
import { DatePipe } from '@angular/common';
import { SvgIconComponent } from "../../../common-ul/svg-icon/svg-icon.component";

@Component({
  selector: 'app-post',
  imports: [AvatarCircleComponent, DatePipe, SvgIconComponent],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss',
})
export class PostComponent {
  post = input<Post>()
}

