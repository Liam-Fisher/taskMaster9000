import { Injectable, inject } from '@angular/core';
import { Database,ref, child,get, DatabaseReference, set,onChildChanged, DataSnapshot} from '@angular/fire/database';
import {BehaviorSubject, last} from 'rxjs'
export type taskStatus = 'incomplete'|'in progress'|'completed'|'deferred'; 
export interface Task {
  name: string
  description: string
  duration: number
  status?: string
}
export interface User {
  role: string
}
type info = {
  tasks: Record<string, Task>
  users: Record<string, User>
}
type schedule = {
  attendance: Record<string, boolean>
  tasks: Record<string, taskStatus>
  reset: {
    beenReset: boolean
    resetAt: number
  } 
}

@Injectable({
  providedIn: 'root'
})
export class FirebaseRealtimeService {
  readonly rtdb: Required<Database> = inject(Database);
  readonly _info:  DatabaseReference = ref(this.rtdb, 'info/');
  readonly _checklist: DatabaseReference = ref(this.rtdb, 'checklist/');
  readonly _schedule: DatabaseReference = ref(this.rtdb, 'schedule/');
  readonly _queues: DatabaseReference = ref(this.rtdb, 'queues/');
  public taskInfo: BehaviorSubject<Task[]>;
  public userInfo: BehaviorSubject<User[]>;
  public activeUser: string;
  public activeQueue: BehaviorSubject<Record<string, taskStatus>>;

  public taskChecklist: BehaviorSubject<Record<string, string>>;
  public activeTaskNames: Set<string>;  
  public activeUserNames: Set<string>;  

constructor() { }

// only want to call this once...
async loadTasks(): Promise<BehaviorSubject<Record<string, string>>> { 
  let infoSnapshot = await get(this._info);
  let checklistSnapshot = await get(this._checklist);
  if (!(infoSnapshot.exists()&&checklistSnapshot.exists())) {
    throw new Error(`snapshot not found`);
  }
    let infoVal = infoSnapshot.val() as Record<string, Task>;
    this.taskInfo= new BehaviorSubject(Object.values(infoVal));
    let checklistVal = checklistSnapshot.val() as Record<string, string>;
    this.taskChecklist = new BehaviorSubject(checklistVal);
    this.activeTaskNames = new Set([...Object.keys(infoVal)]);
    console.log(`checklist`);
    console.log(this.taskChecklist);


// this handler will be called many times
    onChildChanged(this._checklist, (alteredTaskStatus) => {
      if(alteredTaskStatus.exists()) {
          const name = alteredTaskStatus.key;
          const isComplete = alteredTaskStatus.val();
          if(isComplete) {
            this.activeTaskNames.delete(name);
          }
          else {
            this.activeTaskNames.add(name);
          }
        
          const currentChecklist = this.taskChecklist.getValue();
          currentChecklist[name] = isComplete;
          this.taskChecklist.next(currentChecklist);
    }
  }); 
  return this.taskChecklist;
}
// this will also be called many times
async markAsCompleted(updatedTask: Task) {
      set(child(this._checklist, updatedTask.name), updatedTask?.status ?? 'incomplete');
  }
currentStatus(name: string) {
  return this.taskChecklist.getValue()?.[name];
}
  // this will also be called many times
infoForActiveTasks() {
    return this.taskInfo
    .getValue()
    .filter( t => this.activeTaskNames.has(t.name))
    .map(t => {
      t.status = this._checklist[t.name];
      return t;
    });
  }
  async setUser(currentUser: string) {
    if(!this.activeUserNames.has(currentUser)) {
      throw Error(`user ${currentUser} not found`);
    }
    this.activeUser = currentUser;
    let queueRef = child(this._queues, `${currentUser}/`);
    let queueData = (await get(queueRef)).val() as Record<string, taskStatus>;
    this.activeQueue = new BehaviorSubject(queueData);
        onChildChanged(queueRef, (newQueueContent: DataSnapshot) => {
            let queueObj = newQueueContent.val() as Record<string, taskStatus>;
            for(let task in queueObj) { console.log(`user ${currentUser} has edited queue task ${task} to status ${queueObj[task]}`); }
            this.activeQueue.next(queueObj);
    });
  }
  /*
  async loadTasks(): Promise<BehaviorSubject<Record<string, string>>> { 
    const info = (await get(this._info)).val() as Record<string, Task>;
    const checklist = (await get(this._schedule)).val() as schedule;
    
    
    this.taskInfo= new BehaviorSubject(Object.values(info['tasks']));
    this.userInfo= new BehaviorSubject(Object.values(info['users']));
    this.taskChecklist = new BehaviorSubject(checklist.tasks);
    this.activeTaskNames = new Set([...Object.keys(info['tasks'])]);
    this.activeUserNames = new Set([...Object.keys(info['users'])]);
    console.log(`checklist`);
    console.log(this.taskChecklist);
  
  // this handler will be called many times
      onChildChanged(this._checklist, (alteredTaskStatus) => {
        if(alteredTaskStatus.exists()) {
            const name = alteredTaskStatus.key;
            const isComplete = alteredTaskStatus.val();
            if(isComplete) {
              this.activeTaskNames.delete(name);
            }
            else {
              this.activeTaskNames.add(name);
            }
          
            const currentChecklist = this.taskChecklist.getValue();
            currentChecklist[name] = isComplete;
            this.taskChecklist.next(currentChecklist);
      }
    }); 
    return this.taskChecklist;
  }

  taskStatusHandler(currentUser: string) {
    if(!this.activeUserNames.has(currentUser)) {
      throw Error(`user ${currentUser} not found`);
    }

    onChildChanged(this._checklist, (alteredTaskStatus) => {
      if(alteredTaskStatus.exists()) {
          const name = alteredTaskStatus.key;
          const newStatus = alteredTaskStatus.val();
          if(newStatus === 'incomplete') {
            this.activeTaskNames.add(name);
          }
          else {
            this.activeTaskNames.delete(name);
            if(newStatus === 'in progress') {
                set(child(this._queues, `${currentUser}/`))
            }
            else {
            }
          }
        
          const currentChecklist = this.taskChecklist.getValue();
          currentChecklist[name] = isComplete;
          this.taskChecklist.next(currentChecklist);
    }
  }); 
  }
  async dailyReset() {
    
    let resetRef = ref(this.rtdb, 'lastResetDay');
    try {
      const currentTime = new Date();
      const lastResetDay = (await get(resetRef)).val() as number;
      if(currentTime.getDate() !== lastResetDay) {
        await set(resetRef, currentTime.getDate());
      
      const schedule = (await get(this._schedule)).val() as schedule;

      let newChecklist = { "allDone": false };
      let activeTasks = Object.entries(schedule.tasks);
    for (let [id, status] of activeTasks) {
      if(status) {
        newChecklist[id] = 'incomplete';
      } 
    }
    set(this._checklist, newChecklist);

    
      let newQueues = {};
      let activeUsers = Object.entries(schedule.attendance);
    for (let [name, isPresent] of activeUsers) {
      if(isPresent) {
        newQueues[name] = { "allDone": 'incomplete' };
      } 
    }
    set(this._queues, newQueues);

    // clear all tasks in checklist then set allDone to false
    // clear all users task queues in users/{name}/tasks then set allDone to false
    
    
    // populate checklist with tasks that are true in schedule/tasks  
    // load all tasks that are true in activeTasks from taskInfo into taskStatus  
    // reset taskQueues to empty  
    // load users as taskQueue keys with value null from attendance 
    }
    catch(err) {

    }

  }
}
*/
}

