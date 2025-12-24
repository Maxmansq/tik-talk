import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ProfileCardComponent } from '../profile-card/profile-card';
import { Store } from '@ngrx/store';
import { profileAction, selectFilteredProfiles } from '@tt/data-access';
import { WaIntersectionObserverDirective, WaIntersectionObservee } from '@ng-web-apis/intersection-observer'


@Component({
  selector: 'lib-pages-search-intersection-observer',
  imports: [ProfileCardComponent, WaIntersectionObserverDirective, WaIntersectionObservee],
  templateUrl: './pages-search-intersection-observer.html',
  styleUrl: './pages-search-intersection-observer.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PagesSearchIntersectionObserver {

  store = inject(Store)

  profiles = this.store.selectSignal(selectFilteredProfiles)


  onIntersection(entres: IntersectionObserverEntry[] ) {
    if (!entres.length) return
    if (entres[0].intersectionRatio > 0) {
      this.timeToFeach()
    }

  }

  timeToFeach() {
      this.store.dispatch(profileAction.setPage({}))
    }
}
