import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {

  months = ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'];

  constructor() { }

  getDaysArr(month, year) {
    const daysArr = [];
    if (month === 1 && !(year % 4)) {
      for (let i = 1; i <= 29; i++) {
        daysArr.push(i);
      }
      return daysArr;
    } else if (month === 1 && (year % 4)) {
      for (let i = 1; i <= 28; i++) {
        daysArr.push(i);
      }
      return daysArr;
    } else if (month <= 6 && !(month % 2)) {
      for (let i = 1; i <= 31; i++) {
        daysArr.push(i);
      }
      return daysArr;
    } else if (month <= 6 && month % 2) {
      for (let i = 1; i <= 30; i++) {
        daysArr.push(i);
      }
      return daysArr;
    } else if (month > 6 && month % 2) {
      for (let i = 1; i <= 31; i++) {
        daysArr.push(i);
      }
      return daysArr;
    } else if (month > 6 && !(month % 2)) {
      for (let i = 1; i <= 30; i++) {
        daysArr.push(i);
      }
      return daysArr;
    }
  }

  monthConverter(monthName) {
    const monthMap = {
      Januar : 1,
      Februar : 2,
      März: 3,
      April: 4,
      Mai: 5,
      Juni: 6,
      Juli: 7,
      August: 8,
      September: 9,
      Oktober: 10,
      November: 11,
      Dezember: 12
    };
    return monthMap[monthName];
  }
}
