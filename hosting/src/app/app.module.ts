// Angular Core
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// Firebase
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { provideDatabase, getDatabase } from '@angular/fire/database';
import { environment } from '../environments/environment';
import {provideAuth, getAuth} from '@angular/fire/auth';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { FloorPlanModule } from './floorplan/floorplan.module';
import { TaskTableModule } from './task-table/task-table.module';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule ,
    FormsModule,
    ReactiveFormsModule,
    provideAuth(() =>  getAuth()),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideDatabase(() => getDatabase()),
    FloorPlanModule,
    TaskTableModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
