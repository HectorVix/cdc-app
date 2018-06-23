import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  loginForm: FormGroup;
  constructor(public fb: FormBuilder) {
    this.loginForm = fb.group({
      loginFormEmailEx: ['', [Validators.required, Validators.email]],
       loginFormPasswordEx: ['', Validators.required],
    });
  }
  ngOnInit() {
  }

}
