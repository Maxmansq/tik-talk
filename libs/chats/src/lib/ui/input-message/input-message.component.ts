import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, inject, Output, Renderer2 } from '@angular/core';
import { ProfileService } from '@tt/data-access';
import { AvatarCircleComponent } from '@tt/common-ui';
import { FormsModule } from '@angular/forms';
import { SvgIconComponent } from '@tt/common-ui';

@Component({
  selector: 'app-input-message',
  imports: [AvatarCircleComponent, FormsModule, SvgIconComponent],
  templateUrl: './input-message.component.html',
  styleUrl: './input-message.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputMessageComponent {
  postText = ''
  r2 = inject(Renderer2)
  hostElement = inject(ElementRef).nativeElement
  profile = inject(ProfileService).me

  @Output() created = new EventEmitter<string>();

  onTextAreaInput(event: Event) {
    const textarea = event.target as HTMLTextAreaElement
  

    this.r2.setStyle(textarea, 'height', 'auto')
    this.r2.setStyle(textarea, 'height', textarea.scrollHeight + 'px')
  }

  onCreateMassage() {
    if (!this.postText) return

    this.created.emit(this.postText)
    this.postText = ''
    
    
  }
}
