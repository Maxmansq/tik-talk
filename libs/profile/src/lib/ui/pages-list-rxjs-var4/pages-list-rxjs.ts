import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Profile, ProfileService, selectFilteredProfiles } from '@tt/data-access';
import { ProfileCardComponent } from '../profile-card/profile-card';
import { firstValueFrom, scan, Subject } from 'rxjs';
import { InfiniteScrollDirective }  from 'ngx-infinite-scroll'

@Component({
  selector: 'lib-pages-list-rxjs',
  imports: [ProfileCardComponent, InfiniteScrollDirective],
  templateUrl: './pages-list-rxjs.html',
  styleUrl: './pages-list-rxjs.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PagesListRxjs implements OnInit {
  store = inject(Store)
  profileService = inject(ProfileService)

  profilesSubject$ = new Subject<Profile[]>()

  infiniteProfiles$ = this.profilesSubject$
    .pipe(
      scan((acc, curr) => {
        return acc.concat(curr) as Profile[]
      }, [] as Profile[])
    )

  page = 0

  ngOnInit() {
    this.getNextPage()
  }

  async getNextPage() {
    this.page += 1
    const response = await firstValueFrom(this.profileService.filterProfiles({page: this.page}))
    this.profilesSubject$.next(response.items)
  }

  onScroll() {
    console.log(123)
    this.getNextPage()
  }

  profiles = this.store.selectSignal(selectFilteredProfiles)
}
