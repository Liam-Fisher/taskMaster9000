import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FloorPlanDisplayComponent } from './floor-plan-display.component';

describe('FloorPlanDisplayComponent', () => {
  let component: FloorPlanDisplayComponent;
  let fixture: ComponentFixture<FloorPlanDisplayComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FloorPlanDisplayComponent]
    });
    fixture = TestBed.createComponent(FloorPlanDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
