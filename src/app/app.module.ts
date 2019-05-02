import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WorkoutFormComponent } from './workout-form/workout-form.component';
import { WorkoutCalendarComponent } from './workout-calendar/workout-calendar.component';
import { WorkoutService } from './shared/workout.service';
import { WorkoutEditComponent } from './workout-edit/workout-edit.component';
import { AuthenticateComponent } from './auth/authenticate/authenticate.component';
import { AuthGuardService } from './auth/authenticate/auth-guard.service';

@NgModule({
  declarations: [
    AppComponent,
    WorkoutFormComponent,
    WorkoutCalendarComponent,
    WorkoutEditComponent,
    AuthenticateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [WorkoutService, AuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
