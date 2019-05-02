import { Component, OnInit, OnDestroy } from '@angular/core';
import { CalendarService } from '../shared/calendar.service';

@Component({
  selector: 'app-workout-calendar',
  templateUrl: './workout-calendar.component.html',
  styleUrls: ['./workout-calendar.component.css']
})
export class WorkoutCalendarComponent implements OnInit, OnDestroy{

  constructor(private calendarService: CalendarService) { }

  ngOnInit() {
    this.calendarService.fillCalendar(0,0,0);
  }

  ngOnDestroy() {
    try {
      document.body.removeChild(document.querySelector(".workout-table"));
    } catch {
      
    }
  }

  onNextMonth() {
    this.calendarService.nextMonth();
  }

  onPrevMonth() {
    this.calendarService.prevMonth();
  }
}
