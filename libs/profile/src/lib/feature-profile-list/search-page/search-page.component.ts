import { ChangeDetectionStrategy, Component} from '@angular/core';
import { ProfileFiltersComponent } from '../profile-filters/profile-filters.component';
import { PagesSearchProfiles } from '../../ui/pages-search-profiles-var1/pages-search-profiles';
import { PagesSearchIntersectionObserver } from '../../ui/pages-search-intersection-observer-var2/pages-search-intersection-observer';
import { PagesListInfiniteScroll } from '../../ui/pages-list-infinite-scroll-var3/pages-list-infinite-scroll';



@Component({
  selector: 'app-search-page',
  imports: [ProfileFiltersComponent, PagesListInfiniteScroll, PagesSearchProfiles, PagesSearchIntersectionObserver],
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchPageComponent {
}
