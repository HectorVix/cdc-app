import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { UsuarioModelo } from '../login-page/usuario-modelo';
@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  loginForm: FormGroup;
  usuario : UsuarioModelo;

  constructor(public fb: FormBuilder) {
    this.loginForm = fb.group({
      loginFormEmailEx: ['', [Validators.required, Validators.email]],
       loginFormPasswordEx: ['', Validators.required],
    });
  }
  ngOnInit() {
  }
  onSubmit() {
  
    
    let jsonString = JSON.stringify(this.loginForm.value);

    console.log(jsonString);
    this.rebuildForm();
  }
  

  rebuildForm() {
    this.loginForm.reset({
     
    });
    
  }
 
}
