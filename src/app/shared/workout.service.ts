import { Injectable } from '@angular/core';

import { AuthService } from '../auth/auth.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WorkoutService {

  constructor(private authService: AuthService, private http: HttpClient) { }

  saveWorkoutToDb(workout) {
    return this.http.post('https://workoutengine-7df19.firebaseio.com/' + this.authService.getUserId() + '.json', JSON.stringify(workout));
  }

  saveWorkoutsToDb(workouts) {
    return this.http.put('https://workoutengine-7df19.firebaseio.com/' + this.authService.getUserId() + '.json', JSON.stringify(workouts));
  }

  getWorkoutsFromDb() {
    return this.http.get('https://workoutengine-7df19.firebaseio.com/' + this.authService.getUserId() + '.json');
  }
}
