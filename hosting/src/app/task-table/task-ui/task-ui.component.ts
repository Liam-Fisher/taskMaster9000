import { Component, Output, ViewChild, EventEmitter, ChangeDetectorRef } from '@angular/core';
import {BehaviorSubject, Observable, from} from 'rxjs';
import { FirebaseRealtimeService, Task } from '../../firebase-realtime.service';
import {MatTableDataSource} from '@angular/material/table'
import {MatPaginator} from '@angular/material/paginator'
import {MatSort} from '@angular/material/sort'
type ActiveTask = Task&{
  status: string
};

@Component({
  selector: 'app-task-ui',
  template: `

<div id="pkdx-table">
    <mat-form-field>
    <mat-label>Filter</mat-label>
    <input matInput (keyup)="applyFilter($event)" placeholder="Ex. Mop" #input>
  </mat-form-field>
  
  <div class="mat-elevation-z8">
    <table mat-table [dataSource]="dataSource" matSort>
  
      <!-- Name Column -->
      <ng-container matColumnDef="name">
        <th mat-header-cell *matHeaderCellDef mat-sort-header> Name </th>
        <td mat-cell *matCellDef="let task"> {{task.name}} </td>
      </ng-container>

      <!-- Duration Column -->
      <ng-container matColumnDef="duration">
        <th mat-header-cell *matHeaderCellDef mat-sort-header> No. </th>
        <td mat-cell *matCellDef="let task"> ~{{task.duration}}m </td>
      </ng-container>
  
  
      <!-- Area Column -->
      <ng-container matColumnDef="area">
        <th mat-header-cell *matHeaderCellDef mat-sort-header> Area </th>
        <td mat-cell *matCellDef="let task"> {{task.area}} </td>
      </ng-container>


      <!-- Status Column -->
      <ng-container matColumnDef="status">
        <th mat-header-cell *matHeaderCellDef mat-sort-header> No. </th>
        <td mat-cell *matCellDef="let task"> {{task.status}} </td>
      </ng-container>

      <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
      <tr
        mat-row
        (touchstart)="clickedRow(row)"
        *matRowDef="let row; columns: displayedColumns;"
    ></tr>
    </table>
  
    <mat-paginator [pageSizeOptions]="[5, 10, 20, 50]"
                   showFirstLastButtons
                   aria-label="Select By Page">
    </mat-paginator>
  </div>
</div>
`,
  styleUrls: ['./task-ui.component.scss']
})
export class TaskUiComponent {
  dataSource: MatTableDataSource<Task>;
  displayedColumns: string[] = ['name', 'area', 'duration', 'status'];

  @Output() selectTask: EventEmitter<ActiveTask> = new EventEmitter(); 
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private fb: FirebaseRealtimeService, private cdRef: ChangeDetectorRef) {}  
  ngAfterViewInit() {
    from(this.fb.loadTasks())
    .subscribe((taskChecklist: BehaviorSubject<Record<string, string>>) => {
        this.dataSource = new MatTableDataSource();
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        taskChecklist.subscribe((checklist: Record<string, string>) => {
          this.fillTable();
        });  
        }
    );
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  clickedRow(row: ActiveTask) {
    row['status'] = this.fb.currentStatus(row.name) ? 'complete' : 'incomplete';
    this.selectTask.emit(row);
  }
  getIcon(index: number) {
    return ['build', 'cached', 'check_circle', 'warning'][index];
  }
  fillTable() {
    this.dataSource.data = this.fb.infoForActiveTasks();
    this.cdRef.detectChanges();
  }
}