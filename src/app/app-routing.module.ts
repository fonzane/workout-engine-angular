import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WorkoutCalendarComponent } from './workout-calendar/workout-calendar.component';
import { WorkoutFormComponent } from './workout-form/workout-form.component';
import { WorkoutEditComponent } from './workout-edit/workout-edit.component';
import { AuthenticateComponent } from './auth/authenticate/authenticate.component';
import { AuthGuardService } from './auth/authenticate/auth-guard.service';

const routes: Routes = [
  { path: '', redirectTo: 'authenticate', pathMatch: 'full'},
  { path: 'workout-form', component: WorkoutFormComponent, canActivate: [AuthGuardService]},
  { path: 'workout-calendar', component: WorkoutCalendarComponent, canActivate: [AuthGuardService]},
  { path: 'workout-edit', component: WorkoutEditComponent, canActivate: [AuthGuardService] },
  { path: 'authenticate', component: AuthenticateComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
