import { Component, ElementRef, inject, Renderer2, signal } from '@angular/core';
import { ProfileHeaderComponent } from './../../ui';
import { ProfileService } from '@tt/data-access';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { switchMap } from 'rxjs';
import { toObservable } from '@angular/core/rxjs-interop';
import { AsyncPipe } from '@angular/common';
import { SvgIconComponent } from "@tt/common-ui";
import { ImgUrlPipe } from '@tt/common-ui';
import { PostFeedComponent } from '@tt/posts';
import { Profile } from '@tt/data-access';


@Component({
  selector: 'app-profile-page',
  imports: [ProfileHeaderComponent, AsyncPipe, SvgIconComponent, RouterLink, ImgUrlPipe, PostFeedComponent],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.scss',
})
export class ProfilePageComponent {
  profileServise = inject(ProfileService)
  render = inject(Renderer2)
  el = inject(ElementRef)
  route = inject(ActivatedRoute)
  pushProfile:Profile = <Profile>{}
  subscriber$ = this.profileServise.getSubscribersShortList(6)
  router = inject(Router)

  target = (event: Profile) => {
    this.pushProfile = event 
    this.render.addClass(this.el.nativeElement, 'flag')

  }

  isMyPage = signal(false)


  me$ = toObservable(this.profileServise.me)

  profile$ = this.route.params
    .pipe(
      switchMap(({id}) => {
        this.isMyPage.set(id === 'me' || id === this.profileServise.me()?.id)
        if (id === 'me') return this.me$

        return this.profileServise.getAccount(id)
      })
    )

  async sendMessage(userid: number) {
    this.router.navigate(['/chat', 'new'], {queryParams:  {userid}})
  }
}
