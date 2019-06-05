import { Component, OnInit } from '@angular/core';

import { WorkoutService } from '../shared/workout.service';

@Component({
  selector: 'app-workout-graph',
  templateUrl: './workout-graph.component.html',
  styleUrls: ['./workout-graph.component.css']
})
export class WorkoutGraphComponent implements OnInit {
  workouts = [];
  exercises = {};

  isLoading = true;

  public barChartOptions = {
    scaleShowVerticalLines: true,
    responsive: true,
    scales: {
      yAxes: [{
        ticks: {},
        scaleLabel: {
          display: true,
          labelString: 'kg bewegt'
        }
      }]
    }
  };

  public barChartLabels = [];
  public barChartType = 'bar';
  public barChartLegend = true;

  public barChartData = [
    {data: [], label: 'Bitte wählen Sie eine Übung aus'}
  ];

  public chartColors = [
    { backgroundColor: '#0061ff' }
  ];

  constructor(private workoutService: WorkoutService) { }

  ngOnInit() {
    this.workoutService.getWorkoutsFromDb().subscribe(workouts => {
      for (const workout of Object.values(workouts)) {
        this.workouts.push(workout);
      }

      this.workouts.sort((a, b) => {
        a = a.date.split('.').reverse().join('');
        b = b.date.split('.').reverse().join('');
        return a > b ? 1 : a < b ? -1 : 0;
      });

      for (const workout of this.workouts) {
        for (const exercise of workout.exercises) {
          if (!this.exercises.hasOwnProperty(exercise.name)) {
            let amount = 0;
            for (const set of exercise.sets) {
              amount += set.rep * set.weight;
            }
            this.exercises[exercise.name] = [{date: workout.date, amount: amount}];
          } else {
            let amount = 0;
            for (const set of exercise.sets) {
              amount += set.rep * set.weight;
            }
            this.exercises[exercise.name].push({date: workout.date, amount: amount});
          }
        }
      }
      this.onExerciseChange(Object.keys(this.exercises)[0]);
      this.isLoading = false;
    });
  }

  onExerciseChange(value) {
    // reset the chart
    this.barChartLabels = [];
    this.barChartData = [
      { data: [], label: value}
    ];
    this.barChartOptions = {
      scaleShowVerticalLines: true,
      responsive: true,
      scales: {
        yAxes: [{
          ticks: {},
          scaleLabel: {
            display: true,
            labelString: 'kg bewegt'
          }
        }]
      }
    };
    // fill chart with data and set options
    for (const exerciseData of this.exercises[value]) {
      this.barChartLabels.push(exerciseData.date);
      this.barChartData[0].data.push(exerciseData.amount);
    }
    this.barChartOptions.scales.yAxes[0].ticks = {
        min: Math.min(...this.barChartData[0].data) - 50,
        max: Math.max(...this.barChartData[0].data) + 50
    };
    console.log(this.barChartOptions.scales.yAxes[0].ticks);
  }
}
