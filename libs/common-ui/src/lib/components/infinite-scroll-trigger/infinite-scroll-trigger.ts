import { ChangeDetectionStrategy, Component, OnInit, output } from '@angular/core';

@Component({
  selector: 'lib-infinite-scroll-trigger',
  imports: [],
  templateUrl: './infinite-scroll-trigger.html',
  styleUrl: './infinite-scroll-trigger.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InfiniteScrollTrigger implements OnInit {

  loaded = output()

  ngOnInit(): void {
    this.loaded.emit()
  }
}
