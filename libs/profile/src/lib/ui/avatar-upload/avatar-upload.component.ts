import { Component, signal } from '@angular/core';
import { SvgIconComponent } from "@tt/common-ui";
import { DndDirective } from '@tt/common-ui';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-avatar-upload',
  imports: [SvgIconComponent, DndDirective, FormsModule],
  templateUrl: './avatar-upload.component.html',
  styleUrl: './avatar-upload.component.scss',
})
export class AvatarUploadComponent {
  preview = signal<string>('/assets/imags/avatar.png')
  avatar: File | null = null

  fileBrowserHandler(event: Event) {
    const file = (event.target as HTMLInputElement)?.files?.[0]
    this.proccessFile(file)
  }
  onfileDroped(file: File) {
    this.proccessFile(file)
  }

  proccessFile(file: File | null | undefined) {
    if (!file || !file.type.match('image')) return
    const reader = new FileReader
    reader.onload = event => {
      this.preview.set(event.target?.result?.toString() ?? '') 
    }
    reader.readAsDataURL(file)
    this.avatar = file
  }
}
