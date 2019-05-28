import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { WorkoutService } from '../shared/workout.service';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-workout-calendar',
  templateUrl: './workout-calendar.component.html',
  styleUrls: ['./workout-calendar.component.css']
})
export class WorkoutCalendarComponent implements OnInit {
  workouts = [];
  isLoading = true;

  showTable = false;

  date = new Date();
  day = this.date.getDate();
  month = this.date.getMonth();
  year = this.date.getFullYear();

  months = ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'];


  constructor(private workoutService: WorkoutService) { }

  ngOnInit() {
    this.workoutService.getWorkoutsFromDb().subscribe(workouts => {
      for (const workout of Object.values(workouts)) {
        this.workouts.push(workout);
      }
      this.isLoading = false;
      setTimeout(() => {
        this.fillCalendar(this.year, this.month, this.day);
      }, 100);
    });
  }

  fillCalendar(year, month, day) {

    for(let i = 0; i <= 41; i++) {
      document.getElementById('nr' + i).innerHTML = '';
    }

    const date = new Date(year, month, day);

    document.getElementById('CalendarHeading').innerHTML = '<b>' + this.months[month] + ' ' + year + '</b>';

    const firstDay = new Date(year, month, 1).getDay();
    const lastDay = (() => {
        if (month == 1 && !(year % 4)) {
            return 29;
        } else if (month == 1 && (year % 4)) {
            return 28;
        } else if (month <= 6 && !(month % 2)) {
            return 31;
        } else if (month <= 6 && month % 2) {
            return 30;
        } else if (month > 6 && month % 2) {
            return 31;
        } else if (month > 6 && !(month % 2)) {
            return 30;
        }
    })();

    for(let i = firstDay; i <= lastDay + firstDay - 1; i++) {
        document.getElementById('nr' + i).innerHTML = (i - firstDay + 1).toString();
    }

    if(document.getElementById('nr35').innerHTML === '') {
        document.getElementById('LastRow').style.display = 'none' ;
    }

    this.addNotifications(this.workouts, firstDay);
  }

  onNextMonth() {
    let month = this.month + 1;
    let year = this.year;

    if (month === 12) {
      month = 0;
      year++;
    }

    this.month = month;
    this.year = year;

    this.fillCalendar(year, month, 1);
  }

  onPrevMonth() {
    let month = this.month - 1;
    let year = this.year;

    if (month === -1) {
      month = 11;
      year--;
    }

    this.month = month;
    this.year = year;

    this.fillCalendar(year, month, 1);
  }

  addNotifications(workouts, firstDay) {
    for (const workout of workouts) {
      const workoutDay = +workout.date.split('.')[0];
      const workoutMonth = +workout.date.split('.')[1];
      const workoutYear = +workout.date.split('.')[2];

      if (workoutMonth - 1 === this.month && workoutYear === this.year) {
        const notify = document.createElement('div');
        notify.classList.add('notify');
        notify.addEventListener('click', () => {
          if (notify.classList.contains('rotateArrow')) {
            notify.classList.remove('rotateArrow');
            notify.classList.add('rotateArrowBack');
            this.showTable = false;
          } else if (!this.showTable) {
            try {
              notify.classList.remove('rotateArrowBack');
            } finally {
              notify.classList.add('rotateArrow');
              this.showTable = true;
              setTimeout(() => {
                this.fillTable(workout.exercises);
                window.scrollTo(0, document.body.scrollHeight);
              }, 100);
            }
          }
        });
        document.getElementById('nr' + (firstDay + workoutDay - 1)).appendChild(notify);
      }
    }
  }

  fillTable(exercises) {
    for (const exercise of exercises) {
      const row = document.createElement('tr');
      const cell = document.createElement('td');
      cell.innerHTML = exercise.name;
      row.appendChild(cell);
      for (const set of exercise.sets) {
        const cell = document.createElement('td');
        cell.innerHTML = set.rep + ' mal ' + set.weight + 'kg';
        row.appendChild(cell);
      }
      document.getElementById('workoutTableBody').appendChild(row);
    }
  }

}
