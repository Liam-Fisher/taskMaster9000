import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { TaskDisplayComponent } from './task-display/task-display.component';
import { MatTableModule} from '@angular/material/table';
import { MatFormFieldModule} from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';

import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatRadioModule} from '@angular/material/radio';
import {MatDialogModule} from '@angular/material/dialog';
import { TaskUiComponent } from './task-ui/task-ui.component';
import { TaskDialogComponent, TaskDialogContent } from './task-dialog/task-dialog.component';

@NgModule({
  declarations: [
    TaskDisplayComponent,
    TaskUiComponent,
    TaskDialogComponent,
    TaskDialogContent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    MatDialogModule
  ],
  exports: [
    TaskDisplayComponent
  ]
})
export class TaskTableModule { }
