import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase';

import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'workout-engine-new';
  navbarOpen = false;

  constructor(public authService: AuthService, private router: Router) {}

  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }

  ngOnInit() {
    firebase.initializeApp({
      apiKey: 'AIzaSyAJrbeynd5jFb1U_a5pwkNRuQJhkA2unCA',
      authDomain: 'workoutengine-7df19.firebaseapp.com'
    });
  }

  onLogout() {
    this.authService.logout();
    this.router.navigate(['authenticate']);
  }
}
