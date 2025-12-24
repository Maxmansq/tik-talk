import { ChangeDetectionStrategy, Component, inject, Input } from '@angular/core';
import { Profile } from '@tt/data-access';
import { ImgUrlPipe } from '@tt/common-ui';
import { Router, RouterLink } from "@angular/router";

@Component({
  selector: 'app-profile-card',
  imports: [ImgUrlPipe, RouterLink],
  templateUrl: './profile-card.html',
  styleUrl: './profile-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileCardComponent {
  @Input() profile!: Profile
  router = inject(Router)


  async sendMessage(userid: number) {
    this.router.navigate(['/chat', 'new'], {queryParams:  {userid}})
  }
}
