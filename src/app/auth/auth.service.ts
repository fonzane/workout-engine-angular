import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  token: string;

  constructor(private router: Router) { }

  signupUser(email: string, password: string) {
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(() => {
        alert("Ihr Account wurde erstellt. Bitte loggen Sie sich ein.");
        this.router.navigate(['authenticate']);
      })
      .catch(error => alert(error.message));
  }

  signinUser(email: string, password: string) {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(() => {
        this.router.navigate(['workout-calendar']);
        firebase.auth().currentUser.getIdToken().then((token: string) => {
          this.token = token;
        })
      })
      .catch(error => alert(error.message));
  }

  getCurrentUserID() {
    return firebase.auth().currentUser.uid;
  }

  getToken() {
    firebase.auth().currentUser.getIdToken()
      .then((token: string) => {
        this.token = token;
      })
      .catch(error => alert(error.message));
    return this.token;
  }

  isAuthenticated() {
    return this.token != null;
  }

  logout() {
    firebase.auth().signOut();
    this.token = null;
  }
}
