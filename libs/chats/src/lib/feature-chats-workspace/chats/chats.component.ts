import { Component, ElementRef, inject, Renderer2 } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { debounceTime, fromEvent, Subject, takeUntil } from 'rxjs';
import { ChatsListComponent } from '../chats-list/chats-list.component';

@Component({
  selector: 'app-chats',
  imports: [RouterOutlet, ChatsListComponent],
  templateUrl: './chats.component.html',
  styleUrl: './chats.component.scss',
})
export class ChatsComponent {
  private destroy$ = new Subject<void>();
  hostElement = inject(ElementRef)
  r2 = inject(Renderer2)

  ngAfterViewInit() {
    this.resizeChat()
      fromEvent(window, 'resize')
        .pipe(
          debounceTime(40),
          takeUntil(this.destroy$)
        )
        .subscribe(() => {
          this.resizeChat()
        })
    }
    ngOnDestroy() {
      this.destroy$.next();
      this.destroy$.complete();
    }
  
  resizeChat() {
    const {top} = this.hostElement.nativeElement.getBoundingClientRect();
    const height = window.innerHeight - top - 24
    console.log(height)
    this.r2.setStyle(this.hostElement.nativeElement, 'height', `${height}px`)
  }
}
