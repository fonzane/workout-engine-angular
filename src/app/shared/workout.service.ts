import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Workout } from './workout.model';
import { Exercise } from './exercise.model';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class WorkoutService {
  workouts: Workout[] = [
    new Workout(1, "15.1.2019", [
      new Exercise("Pushups", [10, 11]),
      new Exercise("Situps", [25, 14, 16]),
      new Exercise("Beinheben", [13, 16, 14, 12])
    ]),
    new Workout(2, "17.2.2019", [
      new Exercise("Pushups", [12, 10, 8]),
      new Exercise("Situps", [20, 18, 16, 20, 25]),
      new Exercise("Beinheben", [18, 16, 14])
    ]),
    new Workout(3, "24.2.2019", [
      new Exercise("Pushups", [14, 12, 10]),
      new Exercise("Situps", [21, 19, 17]),
      new Exercise("Klimmzüge", [10, 8, 5])
    ]),
    new Workout(4, "11.3.2019", [
      new Exercise("Shoulder Raises", [18, 17, 18]),
      new Exercise("Situps", [15, 14, 14]),
      new Exercise("Squats", [20, 18, 19]),
      new Exercise("Beinheben", [20, 18, 19])
    ])
  ];

  constructor(private http: HttpClient, private authService: AuthService) { }

  getWorkouts() {
    //return this.workouts.slice();
    return this.http.get('https://workout-engine.firebaseio.com/' + this.authService.getCurrentUserID() + ".json").toPromise();
  }

  addWorkout(workout) {
    this.workouts.push(workout);
  }
  
  saveWorkoutToDb(workout) {
    this.http.post('https://workout-engine.firebaseio.com/' + this.authService.getCurrentUserID() + ".json", JSON.stringify(workout)).subscribe();
  }
  
  saveWorkoutsToDb(workouts) {
    this.http.put('https://workout-engine.firebaseio.com/' + this.authService.getCurrentUserID() + ".json", JSON.stringify(workouts)).subscribe();
  }

  getLastDay(month, year) {
    if (this.monthConverter(month) == 1 && !(+year % 4)) {
      return 29;
    } else if (this.monthConverter(month) == 1 && (+year % 4)) {
      return 28;
    } else if ((this.monthConverter(month) <= 6 && !(this.monthConverter(month) % 2)) || (this.monthConverter(month) > 6 && this.monthConverter(month) % 2)) {
      return 31;
    } else if ((this.monthConverter(month) <= 6 && this.monthConverter(month) % 2) || (this.monthConverter(month) > 6 && !(this.monthConverter(month) % 2))) {
      return 30;
    }
  }

  monthConverter (monthName) {
    let monthNumber;
    let monthAssoc = {Januar: 0, Februar: 1, März: 2, April: 3, Mai: 4, Juni: 5, Juli: 6, August: 7, September: 8, Oktober: 9, November: 10, Dezember: 11};
    monthNumber = monthAssoc[monthName];
    return monthNumber;
  }
}
