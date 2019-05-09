import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-authenticate',
  templateUrl: './authenticate.component.html',
  styleUrls: ['./authenticate.component.css']
})
export class AuthenticateComponent implements OnInit {
  @ViewChild('f') authForm: NgForm;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    setTimeout(() => {
      this.authForm.setValue({
        email: 'test@test.com',
        password: '123456'
      });
    }, 250);
  }

  onSignup(form) {
    const email = form.value.email;
    const password = form.value.password;

    this.authService.signupUser(email, password);
  }

  onSignin(form) {
    const email = form.value.email;
    const password = form.value.password;

    this.authService.signinUser(email, password);
  }

}
