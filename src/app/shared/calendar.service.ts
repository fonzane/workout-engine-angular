import { Injectable } from '@angular/core';
import { WorkoutService } from './workout.service';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {

  constructor(private workoutService: WorkoutService, private authService: AuthService) { }

  /* ==== Functions to fill and change the calendar ==== */

  fillCalendar(year, month, day) {
    if(!year && !month && !day) {
      var date = new Date();
      day = date.getDate();
      localStorage.setItem('day', day);
  
      month = date.getMonth();
      localStorage.setItem('month', month);
  
      year = date.getFullYear();
      localStorage.setItem('year', year);
  
    } else {
      var date = new Date(year, month, day);
    }
    let monthNames = ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"];
  
    // Get the number for the last day of the month
    let lastDay = (function() {
      if (month == 1 && !(year % 4)) {
        return 29;
      } else if (month == 1 && (year % 4)) {
        return 28;
      } else if ((month <= 6 && !(month % 2)) || (month > 6 && month % 2)) {
        return 31;
      } else if ((month <= 6 && month % 2) || (month > 6 && !(month % 2))) {
        return 30;
      }
    })();
  
    // Get the number of the first weekday of the month
    let firstDay = new Date(year, month, 1).getDay();
    // let firstDay = date.getDay(date.setDate(1));
  
                /* ==== Fill in the Calendar HTML tree ==== */
  
    document.getElementById("CalendarHeading").innerHTML = `<span style="font-weight:bold">${monthNames[month]}<br>${date.getFullYear()}</span>`;
  
    // Fill in the Week Days in the Table Heading
    var weekDays = ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"];
    for(let i = 0; i < 7; i++) {
        var weekDaySelector = "WeekDay" + i;
        document.getElementById(weekDaySelector).innerHTML = weekDays[i];
    }
    // Empty all the calendar cells first
    for(let i = 0; i <= 41; i++) {
      var cellSelector = "nr" + i;
      document.getElementById(cellSelector).innerHTML = "";
    }
    // Fill in the Number of the Days in the Calendar Cells
    for(let i = 0; i < lastDay; i++) {
        var cellSelector = "nr" + (i + firstDay);
        document.getElementById(cellSelector).innerHTML = (i + 1).toString();
    }
    // Hide the last row if there is nothing to display
    if(document.getElementById("nr35").innerHTML === "") {
        document.getElementById("LastRow").style.display = "none" ;
    } else {
      document.getElementById("LastRow").style.display = "";
    }

    this.addNotifications();
  }

  nextMonth() {
    // Get and set the new month and year variables
    if(!document.body.contains(document.querySelector(".workoutTable"))){
      var day = localStorage.getItem("day");
      var month = parseInt(localStorage.getItem('month'))+1;
      var year = parseInt(localStorage.getItem('year'));
      if(month == 12) {
        month = 0;
        localStorage.setItem("month", month.toString());
        year++;
        localStorage.setItem("year", year.toString());
      }
      localStorage.setItem("month", month.toString());
      this.fillCalendar(year, month, day);
    }
  }

  prevMonth() {
    // Get and set the new month and year variables
    if(!document.body.contains(document.querySelector(".workoutTable"))){
      var day = localStorage.getItem("day");
      var month = parseInt(localStorage.getItem('month'))-1;
      var year = +localStorage.getItem('year');
      if(month == -1) {
        month = 11;
        localStorage.setItem("month", month.toString());
        year--;
        localStorage.setItem("year", year.toString());
      }
      localStorage.setItem("month", month.toString());
      this.fillCalendar(year, month, day);
    }
  }

  /* ==== Functions related to the workouttables ==== */

  async addNotifications() {
    // let workouts = this.workoutService.getWorkouts();
    let workouts;
    await this.workoutService.getWorkouts().then(resp => {
      workouts = resp;
    })

    for(let workout of Object.values(workouts)) {
      let workoutDate = workout["date"].split(".");

      if(workoutDate[1] === localStorage.getItem("month") && workoutDate[2] === localStorage.getItem("year")) {

        let firstDay = new Date(+localStorage.getItem("year"), +localStorage.getItem("month"), 1).getDay();

        let workoutArrow = document.createElement("div");
        workoutArrow.setAttribute("class", "notify");
        workoutArrow.setAttribute('id', (+workoutDate[0]+firstDay-1).toString());
        workoutArrow.addEventListener('click', () => {
          this.addWorkoutTable(workout, firstDay, workoutDate[0]);
        })

        document.getElementById("nr" + (+workoutDate[0]+firstDay-1)).appendChild(workoutArrow);

      }
    }
  }

  addWorkoutTable(workout, firstDay, workoutDay) {

    let arrowId = (firstDay + +workoutDay - 1).toString();
    let arrow = document.getElementById(arrowId.toString());

    if(!document.body.contains(document.querySelector(".workout-table"))) {
      
      arrow.classList.add("rotateArrow");

      try {
        arrow.classList.remove("rotateArrowBack");
      } catch {

      }

      let workoutTable = document.createElement("table");
      let left = arrow.getBoundingClientRect().left + window.scrollX;
      let top = arrow.getBoundingClientRect().top + window.scrollY + 15;
      workoutTable.classList.add("workout-table");
      workoutTable.style.position = "absolute";
      workoutTable.style.backgroundColor = "white";
      workoutTable.style.top = top + "px";
      workoutTable.style.left = left + "px";
      workoutTable.style.border = "1px solid black";
      
      for(let exercise of workout.exercises) {
        let row = document.createElement("tr");
        row.innerHTML += "<th>" + exercise.name + "</th>";
  
        for(let set of exercise.sets) {
          row.innerHTML += "<td>" + set + "</td>";
        }
  
        workoutTable.appendChild(row);
      }

      document.body.appendChild(workoutTable);

    } else if (arrow.classList.contains("rotateArrow")) {
      document.body.removeChild(document.querySelector(".workout-table"));

      arrow.classList.remove("rotateArrow");
      arrow.classList.add("rotateArrowBack");
    }
  }
}
