import { ChangeDetectionStrategy, Component} from '@angular/core';
import { ProfileFiltersComponent } from '../profile-filters/profile-filters.component';
import { PagesSearchProfiles } from '../../ui/pages-search-profiles/pages-search-profiles';


@Component({
  selector: 'app-search-page',
  imports: [ProfileFiltersComponent, PagesSearchProfiles],
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchPageComponent {
}
