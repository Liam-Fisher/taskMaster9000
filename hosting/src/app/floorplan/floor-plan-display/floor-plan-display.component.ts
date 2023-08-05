import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
interface Area {
  name: string
  x: string
  y: string
  width: string
  height: string
  fill: string
}
@Component({
  selector: 'app-floor-plan-display',
  template: `
  <app-task></app-task>
      <svg xmlns="http://www.w3.org/2000/svg" width="400" height="400">
        <rect *ngFor="let area of areas" 
        [attr.x] = "area.x"
        [attr.y]= "area.y"
        [attr.width] = "area.width"
        [attr.height] = "area.height"
        [attr.fill] = "area.fill"
        />
        </svg>
  `,
})
export class FloorPlanDisplayComponent {
  areas: Area[] = [ {
    name: "somewhere",
    x: "0",
    y: "0",
    width: "100",
    height: "100",
    fill: "blue"

  }]

  formGroup: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.formGroup = this.formBuilder.group({
      section1: this.formBuilder.group({
        optionA: [false],
        optionB: [false],
        optionC: [false],
      }),
      section2: this.formBuilder.group({
        optionA: [false],
        optionB: [false],
        optionC: [false],
      }),
    });
  }

  handleMenuChanges(value: any) {
    console.log('Current state of all section menus:', value);
  }
}
