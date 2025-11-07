import { Component, inject } from '@angular/core';
import { ProfileHeaderComponent } from '../../common-ul/profile-header/profile-header.component';
import { ProfileService } from '../../data/services/profile';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { switchMap } from 'rxjs';
import { toObservable } from '@angular/core/rxjs-interop';
import { AsyncPipe } from '@angular/common';
import { SvgIconComponent } from "../../common-ul/svg-icon/svg-icon.component";
import { ImgUrlPipe } from '../../helpers/pipes/img-url.pipe';
import { PostFeedComponent } from './post-feed/post-feed.component';

@Component({
  selector: 'app-profile-page',
  imports: [ProfileHeaderComponent, AsyncPipe, SvgIconComponent, RouterLink, ImgUrlPipe, PostFeedComponent],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.scss',
})
export class ProfilePageComponent {
  profileServise = inject(ProfileService)
  route = inject(ActivatedRoute)

  subscriber$ = this.profileServise.getSubscribersShortList(6)



  me$ = toObservable(this.profileServise.me)

  profile$ = this.route.params
    .pipe(
      switchMap(({id}) => {
        if (id === 'me') return this.me$

        return this.profileServise.getAccount(id)
      })
    )
}
