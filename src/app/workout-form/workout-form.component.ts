import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { WorkoutService } from '../shared/workout.service';
import { Exercise } from '../shared/exercise.model';
import { Workout } from '../shared/workout.model';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-workout-form',
  templateUrl: './workout-form.component.html',
  styleUrls: ['./workout-form.component.css']
})
export class WorkoutFormComponent implements OnInit {
  exerciseCount: number[] = [];
  months: string[] = ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"];

  selectedDay = "1";
  selectedMonth = "Mai";
  selectedYear = "2019";

  constructor(private workoutService: WorkoutService, private authService: AuthService) { }

  ngOnInit() {
  }

  onExerciseCount(exerciseCount) {
    if(exerciseCount < 15 && exerciseCount > 0) {
      for(let i = 0; i < exerciseCount; i++) {
        this.exerciseCount.push(i);
      }
    } else {
      alert("Bitte geben Sie eine gültige Zahl zwischen 1 und 15 ein.")
    }
  }

  onClearForm() {
    this.exerciseCount = [];
  }

  async onWorkoutSubmit(form) {

    // First create the exercises
    let exercises: Exercise[] = [];

    for(let i = 0; i < this.exerciseCount.length; i++) {
      let uebung = form.value[`uebung${i}`];

      if(!uebung) {
        alert("Sie haben vergessen eine Übung einzutragen.");
        return;
      }
      
      // Get the sets and put them in an array
      let sets = []
      for(let j = 1; j <= 5; j++) {
        if(form.value[`satz${j}uebung${i}`]){
          sets.push(form.value[`satz${j}uebung${i}`]);
        }
      }

      // Create an exercise and add it to the array of exercises
      let exercise = new Exercise(uebung, sets);
      exercises.push(exercise);
    }

    let workoutDate = form.value['daySelector'] + "." + this.workoutService.monthConverter(form.value['monthSelector']) + "." + form.value['yearSelector']

    // Create a new workout with an ID, Date and the exercises
    let workout: Workout = new Workout(this.workoutService.workouts.length + 1,
                                       workoutDate,
                                       exercises);
    
    //Check if a workout already exists on the current date.
    let workouts = await this.workoutService.getWorkouts().then((resp) => resp);
    
    try {
      for(let workout1 of Object.values(workouts)) {
        if(workout1.date === workoutDate) {
          alert("Bitte tragen Sie nur ein Workout pro Tag ein.");
          return;
        }
      }
    } catch (e) {
      console.log(e);
    }

    this.workoutService.saveWorkoutToDb(workout);
    
    alert("Ihr Workout wurde gespeichert. Vielen Dank.")

    this.exerciseCount = [];
  }

  getDays() {
    let days = [];
    for(let i = 1; i <= this.workoutService.getLastDay(this.selectedMonth, +this.selectedYear); i++) {
      days.push(i);
    }
    return days;
  }

  onAddExercise() {
    this.exerciseCount.push(this.exerciseCount.length);
  }

  onRemoveExercise() {
    this.exerciseCount.pop();
  }
}
