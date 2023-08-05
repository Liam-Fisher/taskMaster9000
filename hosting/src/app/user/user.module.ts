import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserDisplayComponent } from './user-display/user-display.component';
import { UserSelectComponent } from './user-select/user-select.component';
import { UserTaskQueueComponent } from './user-task-queue/user-task-queue.component';



@NgModule({
  declarations: [
    UserDisplayComponent,
    UserSelectComponent,
    UserTaskQueueComponent
  ],
  imports: [
    CommonModule
  ]
})
export class UserModule { }
