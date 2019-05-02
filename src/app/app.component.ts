import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

import { WorkoutService } from './shared/workout.service';
import { AuthService } from './auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  exerciseCountArr: number[] = [];

  constructor(private workoutService: WorkoutService,
              public authService: AuthService,
              public router: Router) {

  }
  
  ngOnInit() {
    firebase.initializeApp({
      apiKey: "AIzaSyDmUTRb_VBwRuJJAjeCXpuYNmJuTa6vRaQ",
      authDomain: "workout-engine.firebaseapp.com"
    });
  }

  onExerciseCount(exerciseCount) {
    this.exerciseCountArr = [];
    if(exerciseCount > 0 && exerciseCount <= 15) {
      for(let i = 1; i <= exerciseCount; i++) {
        this.exerciseCountArr.push(i);
      }
    } else {
      alert("Bitte geben Sie eine gültige Zahl ein.")
    }
  }

  onLogout() {
    this.authService.logout();
    this.router.navigate(['/authenticate']);
  }
}
