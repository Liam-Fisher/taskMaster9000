import { Component, Output, EventEmitter } from '@angular/core';
//import { MatMenuTrigger } from '@angular/material/menu';
//import {MatDialog, MatDialogModule} from '@angular/material/dialog';
//import { FormGroup } from '@angular/forms';
interface Task {
  name: string
  description: string
  icon?: string
  statusCode: number 
  // 0 - initialized  
  // 1 - in progress
  // 2 - completed 
  // 3 - needs review
}

@Component({
  selector: 'app-task',
  template: `
    <mat-menu #menu="matMenu">
      <button *ngFor="let task of tasks; let i=index" mat-menu-item (click)="emitChanges(i)">
        <mat-icon *ngIf="task.statusCode===0">{{task?.icon ?? "build"}}</mat-icon>
        <mat-icon *ngIf="task.statusCode===1">{{task?.icon ?? "cached"}}</mat-icon>
        <mat-icon *ngIf="task.statusCode===2">{{task?.icon ?? "check_circle"}}</mat-icon>
        <mat-icon *ngIf="task.statusCode>2">{{task?.icon ?? "error"}}</mat-icon>
      {{task.name}}
      </button>
    </mat-menu>
  `,
})
export class TaskComponent {
  //@Input() x: number;
  //@Input() y: number;
  //@Input() width: number;
  //@Input() height: number;
  // make observable
  tasks: Task[] = [
    {
      name: "easyTask",
      description: "easy and fun",
      icon: "build",
      statusCode: 0
    }
  ];
  @Output() menuChanges = new EventEmitter<any>(); // call firebase rt db service
  constructor() {}
    emitChanges(index: number) {
      this.tasks[index].statusCode++;
      this.tasks[index].statusCode %= 4;
      this.tasks.forEach(t => console.log(t));
    }
}
