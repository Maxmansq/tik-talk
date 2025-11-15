import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatWorkspaceMessageWrapperComponent } from './chat-workspace-message-wrapper.component';

describe('ChatWorkspaceMessageWrapperComponent', () => {
  let component: ChatWorkspaceMessageWrapperComponent;
  let fixture: ComponentFixture<ChatWorkspaceMessageWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChatWorkspaceMessageWrapperComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChatWorkspaceMessageWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
