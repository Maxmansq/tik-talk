import { Component, ElementRef, HostListener, Inject, inject, Renderer2 } from '@angular/core';
import { ProfileHeaderComponent } from '../../common-ul/profile-header/profile-header.component';
import { ProfileService } from '../../data/services/profile';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { firstValueFrom, switchMap } from 'rxjs';
import { toObservable } from '@angular/core/rxjs-interop';
import { AsyncPipe } from '@angular/common';
import { SvgIconComponent } from "../../common-ul/svg-icon/svg-icon.component";
import { ImgUrlPipe } from '../../helpers/pipes/img-url.pipe';
import { PostFeedComponent } from './post-feed/post-feed.component';
import { InfoProfileBarComponent } from '../../common-ul/info-profile-bar/info-profile-bar.component';
import { Profile } from '../../data/interfaces/profile.interfaces';


@Component({
  selector: 'app-profile-page',
  imports: [ProfileHeaderComponent, AsyncPipe, SvgIconComponent, RouterLink, ImgUrlPipe, PostFeedComponent, InfoProfileBarComponent],
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

  target = (event: Profile) => {
    this.pushProfile = event 
    this.render.addClass(this.el.nativeElement, 'flag')

  }


  me$ = toObservable(this.profileServise.me)

  profile$ = this.route.params
    .pipe(
      switchMap(({id}) => {
        if (id === 'me') return this.me$

        return this.profileServise.getAccount(id)
      })
    )
}
