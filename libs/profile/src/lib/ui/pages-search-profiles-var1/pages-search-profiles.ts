import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ProfileCardComponent } from '../profile-card/profile-card';
import { InfiniteScrollTrigger } from '@tt/common-ui';
import { Store } from '@ngrx/store';
import { profileAction, selectFilteredProfiles } from '@tt/data-access';

@Component({
  selector: 'lib-pages-search-profiles',
  imports: [ProfileCardComponent, InfiniteScrollTrigger],
  templateUrl: './pages-search-profiles.html',
  styleUrl: './pages-search-profiles.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PagesSearchProfiles {

  store = inject(Store)

  profiles = this.store.selectSignal(selectFilteredProfiles)

  timeToFeach() {
    this.store.dispatch(profileAction.setPage({}))
  }
}
