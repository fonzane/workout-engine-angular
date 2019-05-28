import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  token: string;

  constructor(private router: Router) { }

  signinUser(email: string, password: string) {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(() => {
        this.router.navigate(['workout-form']);
        firebase.auth().currentUser.getIdToken().then((token: string) => {
          this.token = token;
        });
      })
      .catch(error => alert(error.message));
  }

  signupUser(email: string, password: string) {
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(() => {
        alert('Ihr Account wurde erstellt. Bitte loggen Sie sich ein.');
        this.router.navigate(['authenticate']);
      })
      .catch(error => alert(error.message));
  }

  isAuthenticated() {
    return this.token != null;
  }

  getUserId() {
    return firebase.auth().currentUser.uid;
  }

  logout() {
    firebase.auth().signOut();
    this.token = null;
  }
}
