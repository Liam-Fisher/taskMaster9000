import { Component,ViewChild } from '@angular/core';
import { Task } from 'src/app/firebase-realtime.service';
import { TaskDialogComponent } from '../task-dialog/task-dialog.component';

@Component({
  selector: 'app-task-display',
  template: `
  <app-task-dialog #dialog></app-task-dialog>
  <app-task-ui (selectTask)="printClicked($event)"></app-task-ui>
  `,
  styleUrls: ['./task-display.component.scss']
})
export class TaskDisplayComponent {
  @ViewChild('dialog') dialog: TaskDialogComponent;
  constructor() {}  
  printClicked(evt: Task) {
    this.dialog.openDialog(evt)
    console.log(`clicked on row ${evt}`);
  }
}
