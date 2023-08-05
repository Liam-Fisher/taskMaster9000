import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SectionComponent } from './section/section.component';
import {FloorPlanDisplayComponent } from './floor-plan-display/floor-plan-display.component';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';
import { TaskComponent } from './task/task.component';

@NgModule({
  declarations: [
    SectionComponent,
    FloorPlanDisplayComponent,
    TaskComponent
  ],
  imports: [
    CommonModule,
    MatMenuModule,
    MatIconModule,
    FormsModule,
    MatDialogModule,
    ReactiveFormsModule
  ],
  exports: [
    FloorPlanDisplayComponent
  ]
})
export class FloorPlanModule { }
