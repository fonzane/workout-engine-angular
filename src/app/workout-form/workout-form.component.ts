import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { CalendarService } from '../shared/calendar.service';
import { WorkoutService } from '../shared/workout.service';
import { Set } from '../shared/set.model';
import { Exercise } from '../shared/exercise.model';
import { Workout } from '../shared/workout.model';

@Component({
  selector: 'app-workout-form',
  templateUrl: './workout-form.component.html',
  styleUrls: ['./workout-form.component.css']
})
export class WorkoutFormComponent implements OnInit {
  workouts = [];

  exerciseArr: number[] = [];

  selectedDay = '1';
  selectedMonth = 'Mai';
  selectedYear = '2019';

  constructor(public calendarService: CalendarService,
              private workoutService: WorkoutService,
              private router: Router) { }

  ngOnInit() {
  }

  async onWorkoutSubmit(form) {

    // Check for double entries first
    const workoutDate = form.value.day + '.' + this.calendarService.monthConverter(form.value.month) + '.' + form.value.year;

    await this.workoutService.getWorkoutsFromDb().toPromise().then((workouts) => {
      for (const workout of Object.values(workouts)) {
        this.workouts.push(workout);
      }
    });

    for (const workout of this.workouts) {
      if (workoutDate === workout.date) {
        alert('Sorry, bitte nur ein Workout pro Tag speichern.');
        return;
      }
    }

    const exercises: Exercise[] = [];

    for (let i = 0; i < this.exerciseArr.length; i++) {

      if (!form.value['uebung' + i]) {
        alert('Sie haben vergessen ein wichtiges Feld auszufüllen.');
        return;
      }

      const sets: Set[] = [];

      for (let j = 1; j <= 5; j++) {

        if (form.value[`uebung${i}satz${j}`]) {
          const set = new Set(form.value[`uebung${i}satz${j}`], form.value[`uebung${i}satz${j}kg`]);
          sets.push(set);
        } else {
          continue;
        }
      }

      const exercise = new Exercise(form.value[`uebung${i}`], sets);
      exercises.push(exercise);
    }

    const workout = new Workout(workoutDate, exercises);
    this.workoutService.saveWorkoutToDb(workout).subscribe(() => {
      alert('Vielen Dank, Ihr Workout wurde gespeichert.');
      this.router.navigate(['workout-edit']);
    });
  }

  onExerciseChange(exerciseCount) {
    this.exerciseArr = [];
    if (exerciseCount > 0 && exerciseCount < 16) {
      for (let i = 0; i < exerciseCount; i++) {
        this.exerciseArr.push(i);
      }
    }
  }

}
