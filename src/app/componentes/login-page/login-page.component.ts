import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { UsuarioModelo } from '../login-page/usuario-modelo';
import { UsuarioService } from '../../servicios/usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  loginForm: FormGroup;
  usuario : UsuarioModelo;
  correo : string;
  password : string ;
  usuarioDatos: any;

  constructor(public fb: FormBuilder, private usuarioService: UsuarioService , private router : Router) {
    this.loginForm = fb.group({
      loginFormEmailEx: ['', [Validators.required, Validators.email]],
       loginFormPasswordEx: ['', Validators.required],
    });
  }
  ngOnInit() {
  }
  onSubmit() {
    
    

   this.correo=this.loginForm.get('loginFormEmailEx').value;
   this.password=this.loginForm.get('loginFormPasswordEx').value
    
    console.log(this.correo,this.password);
       
    /*this.usuarioService.userAuthentication(this.correo,this.password).subscribe((data : any)=>{
      localStorage.setItem('userToken',data.access_token);
      this.router.navigate(['/home']);
    });*/
    this.router.navigate(['/home']);
   
  }
  

  rebuildForm() {
    this.loginForm.reset({
     
    });
    
  }
 
}
