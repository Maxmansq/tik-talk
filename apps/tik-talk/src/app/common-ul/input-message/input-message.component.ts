import { Component, ElementRef, EventEmitter, inject, Output, Renderer2 } from '@angular/core';
import { ProfileService } from '../../data/services/profile';
import { AvatarCircleComponent } from '../avatar-circle/avatar-circle.component';
import { FormsModule } from '@angular/forms';
import { SvgIconComponent } from '../svg-icon/svg-icon.component';

@Component({
  selector: 'app-input-message',
  imports: [AvatarCircleComponent, FormsModule, SvgIconComponent],
  templateUrl: './input-message.component.html',
  styleUrl: './input-message.component.scss',
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
