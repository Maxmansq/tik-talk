import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { profileAction, selectFilteredProfiles } from '@tt/data-access';
import { ProfileCardComponent } from '../profile-card/profile-card';
import { InfiniteScrollDirective }  from 'ngx-infinite-scroll'

@Component({
  selector: 'lib-pages-list-infinite-scroll',
  imports: [ProfileCardComponent, InfiniteScrollDirective],
  templateUrl: './pages-list-infinite-scroll.html',
  styleUrl: './pages-list-infinite-scroll.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PagesListInfiniteScroll {
  store = inject(Store)

  profiles = this.store.selectSignal(selectFilteredProfiles)

  onScroll() {
   this.timeToFeach() 
  }

  timeToFeach() {
    this.store.dispatch(profileAction.setPage({}))
  }

  
}
