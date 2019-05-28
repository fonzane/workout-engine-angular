import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { WorkoutService } from '../shared/workout.service';
import { Exercise } from '../shared/exercise.model';
import { Set } from '../shared/set.model';

@Component({
  selector: 'app-workout-edit',
  templateUrl: './workout-edit.component.html',
  styleUrls: ['./workout-edit.component.css']
})
export class WorkoutEditComponent implements OnInit {
  workouts = [];
  isLoading = true;

  constructor(private workoutService: WorkoutService, private router: Router) { }

  ngOnInit() {
    this.workoutService.getWorkoutsFromDb().subscribe((workouts) => {
      this.isLoading = false;
      for (const workout of Object.values(workouts)) {
        this.workouts.push(workout);
      }

      this.workouts.sort((a, b) => {
        a = a.date.split('.').reverse().join('');
        b = b.date.split('.').reverse().join('');
        return a > b ? 1 : a < b ? -1 : 0;
      });
    });
  }

  onRemoveWorkout(workout) {
    this.workouts.splice(this.workouts.indexOf(workout), 1);
    this.workoutService.saveWorkoutsToDb(this.workouts).subscribe((result) => {
      console.log(result);
      this.router.navigate(['workout-edit']);
    });
  }

  fillForm(exercise, form) {
    form.setValue({
      uebung: exercise.name,
      rep1: Object.values(exercise.sets[0] || {})[0] || '',
      weight1: Object.values(exercise.sets[0] || {})[1] || '',
      rep2: Object.values(exercise.sets[1] || {})[0] || '',
      weight2: Object.values(exercise.sets[1] || {})[1] || '',
      rep3: Object.values(exercise.sets[2] || {})[0] || '',
      weight3: Object.values(exercise.sets[2] || {})[1] || '',
      rep4: Object.values(exercise.sets[3] || {})[0] || '',
      weight4: Object.values(exercise.sets[3] || {})[1] || '',
      rep5: Object.values(exercise.sets[4] || {})[0] || '',
      weight5: Object.values(exercise.sets[4] || {})[1] || '',
    });
  }

  onAddExercise(form, workout) {

    let editMode = false;
    // Check if an existing exercise should be edited
    for (const exercise of workout.exercises) {
      if (exercise.name === form.value.uebung) {

        editMode = true;

        const sets: Set[] = [];

        for (let i = 1; i <= 5; i++) {

          if (form.value['rep' + 1] && form.value['weight' + i]) { // let out empty values
            const set = new Set(form.value['rep' + i], form.value['weight' + i]);
            sets.push(set);
          }

        }

        const newExercise: Exercise = new Exercise(form.value.uebung, sets);
        workout.exercises.splice(workout.exercises.indexOf(exercise), 1, newExercise);

      }
    }

    if (!editMode) {
      const sets: Set[] = [];
      for (let i = 1; i <= 5; i++) {

        if (form.value['rep' + i] && form.value['weight' + i]) { // let out empty values
          const set = new Set(form.value['rep' + i], form.value['weight' + i]);
          sets.push(set);
        }
      }

      const newExercise: Exercise = new Exercise(form.value.uebung, sets);
      workout.exercises.push(newExercise);
    }
  }

  onRemoveExercise(form, workout) {
    workout.exercises.splice(workout.exercises.indexOf(form.value.uebung), 1);
  }

  onClearForm(form) {
    form.reset();
  }

  onSaveWorkouts() {
    this.workoutService.saveWorkoutsToDb(this.workouts).subscribe((result) => {
      console.log(result);
      this.router.navigate(['workout-edit']);
    });
  }

}
