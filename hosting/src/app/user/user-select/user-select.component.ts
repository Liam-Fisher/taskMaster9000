import { Component } from '@angular/core';
import { FirebaseRealtimeService } from 'src/app/firebase-realtime.service';

@Component({
  selector: 'app-user-select',
  templateUrl: './user-select.component.html',
  styleUrls: ['./user-select.component.scss']
})
export class UserSelectComponent {
  constructor(private fb: FirebaseRealtimeService) { }
  
}
