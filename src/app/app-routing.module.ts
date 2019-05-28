import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WorkoutFormComponent } from './workout-form/workout-form.component';
import { WorkoutCalendarComponent } from './workout-calendar/workout-calendar.component';
import { WorkoutEditComponent } from './workout-edit/workout-edit.component';
import { AuthComponent } from './auth/auth.component';
import { AuthGuardService } from './auth/auth-guard.service';

const routes: Routes = [
  { path: '', redirectTo: 'authenticate', pathMatch: 'full' },
  { path: 'workout-form', component: WorkoutFormComponent, canActivate: [AuthGuardService] },
  { path: 'workout-calendar', component: WorkoutCalendarComponent, canActivate: [AuthGuardService] },
  { path: 'workout-edit', component: WorkoutEditComponent, canActivate: [AuthGuardService] },
  { path: 'authenticate', component: AuthComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
