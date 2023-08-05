import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserTaskQueueComponent } from './user-task-queue.component';

describe('UserTaskQueueComponent', () => {
  let component: UserTaskQueueComponent;
  let fixture: ComponentFixture<UserTaskQueueComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserTaskQueueComponent]
    });
    fixture = TestBed.createComponent(UserTaskQueueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
