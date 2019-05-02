import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-workout-edit',
  templateUrl: './workout-edit.component.html',
  styleUrls: ['./workout-edit.component.css']
})
export class WorkoutEditComponent implements OnInit {
  // @ViewChild('f') exerciseForm: NgForm;
  workouts = [];
  workoutDates = [];
  sets = [1, 2, 3, 4, 5]

  constructor(private http: HttpClient, private authService: AuthService) { }

  ngOnInit() {
    try {
      this.http.get('https://workout-engine.firebaseio.com/' + this.authService.getCurrentUserID() + '.json').subscribe((resp) => {
        
        for(let workout of Object.values(resp)) {
          this.workouts.push(workout);
        }
  
        for(let workout of this.workouts) {
          let month = +workout.date.split('.')[1] + 1;
          this.workoutDates.push(workout.date.split('.')[0] + '.' + month + '.' + workout.date.split('.')[2]);
        }
      })
    } catch (e) {
      console.log(e);
    }
  }

  onClearForm(form) {
    form.reset();
  }

  onDelete(workoutIndex) {
    this.workouts.splice(workoutIndex, 1);
    this.workoutDates.splice(workoutIndex, 1);
    // this.workoutService.saveWorkoutsToDb(this.workouts);
  }

  onAddExercise(form, workout) {
    if(form.value.uebung == "" || form.value.set1 == "") {
      alert("Bitte tragen Sie gültige Werte ein.");
      return;
    }
    let exercise = {};
    exercise["name"] = form.value.uebung;
    exercise["sets"] = [];

    for(let i = 1; i <= 5; i++) {
      if(form.value['set' + i]) {
        exercise["sets"].push(form.value['set' + i]);
      }
    }
    for(let i = 0; i < 5; i++) {
      try {
        if(workout.exercises[i].name === exercise["name"]) {
          workout.exercises.splice(i, 1);
          workout.exercises.push(exercise);
          return;
        }
      } catch{}
    }
    workout["exercises"].push(exercise);
  }

  onEdit(exercise, form) {
    form.setValue({
      uebung: exercise.name,
      set1: exercise.sets[0] || 0,
      set2: exercise.sets[1] || 0,
      set3: exercise.sets[2] || 0,
      set4: exercise.sets[3] || 0,
      set5: exercise.sets[4] || 0,
    })
  }

  onDeleteExercise(exerciseName, workout) {
    for(let i = 0; i < 5; i++) {
      if(workout.exercises[i].name === exerciseName) {
        workout.exercises.splice(i, 1);
      }
    }
  }
  
}
