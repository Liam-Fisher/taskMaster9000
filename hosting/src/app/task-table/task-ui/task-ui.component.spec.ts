import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskUiComponent } from './task-ui.component';

describe('TaskUiComponent', () => {
  let component: TaskUiComponent;
  let fixture: ComponentFixture<TaskUiComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TaskUiComponent]
    });
    fixture = TestBed.createComponent(TaskUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
