import { Component, OnInit, ViewChild } from '@angular/core';

import * as firebase from 'firebase';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  @ViewChild("f") authForm;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    setTimeout(() => {
      this.authForm.setValue({
        email: 'test@test.com',
        password: '123456'
      });
    }, 500);

  }

  onSignin(form) {
    const email = form.value.email;
    const password = form.value.password;

    this.authService.signinUser(email, password);
  }

  onSignup(form) {
    const email = form.value.email;
    const password = form.value.password;

    this.authService.signupUser(email, password);
  }

}
