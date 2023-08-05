import { Component,Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA  } from '@angular/material/dialog';
import { FirebaseRealtimeService, Task } from 'src/app/firebase-realtime.service';

@Component({
  selector: 'app-task-dialog',
  template:   `<br>`,
  styleUrls: ['./task-dialog.component.scss']
})
export class TaskDialogComponent {
  constructor(private fb: FirebaseRealtimeService, public dialog: MatDialog) { }
  openDialog(selectedTask: Task): void {
    const dialogRef = this.dialog.open(TaskDialogContent, {data: selectedTask});
    dialogRef.afterClosed().subscribe(result => {
      this.fb.markAsCompleted(result);
    });
  }
}



@Component({
  selector: 'task-dialog-content',
  template: `
  <h1 mat-dialog-title>{{data.name}}</h1>
  <div mat-dialog-content>
    <p>{{data.description}}</p>
      <mat-label>Status</mat-label>
      <mat-radio-group 
      aria-labelledby="example-radio-group-label"
      class="example-radio-group"
      [(ngModel)]="data.status">
  <mat-radio-button class="example-radio-button" *ngFor="let status of statusOptions" [value]="status">
{{status}}  
</mat-radio-button>
    </mat-radio-group>
  <div mat-dialog-actions>
    <button mat-button (click)="onNoClick()">Clear</button>
    <button mat-button [mat-dialog-close]="data" cdkFocusInitial>Submit</button>
  </div>`,
})
export class TaskDialogContent {
  readonly statusOptions: string[] = ['incomplete', 'in progress', 'completed'];
  constructor(
    public dialogRef: MatDialogRef<TaskDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Task
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}