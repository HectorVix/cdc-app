import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
//import { UsuarioModelo } from '../login-page/usuario-modelo';
import { UsuarioService } from '../../servicios/usuario.service';
import { Router } from '@angular/router';
import {UsuarioModelo} from '../../modelo/usuario-modelo';
@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  loginForm: FormGroup;
  usDatos: FormGroup;
  usuario1 : UsuarioModelo;
  //correo : string;
  //password : string ;
  usuarioDatos: any;
  data: any;
  us: UsuarioModelo[];
  constructor(public fb: FormBuilder, private usuarioService: UsuarioService , private router : Router) {
    this.loginForm = fb.group({
      correo: ['', [Validators.required, Validators.email]],
       password: ['', Validators.required],
    });
  }
  ngOnInit() {
  }
  onSubmit() {
    
    

   //this.correo=this.loginForm.get('loginFormEmailEx').value;
   //this.password=this.loginForm.get('loginFormPasswordEx').value
    
   this.usuarioService.getUsuarioDatos ()
   .subscribe(data => {
      this.data = data;
      console.log(this.data);
  
    });
       

  
 /*.subscribe(data => {
      this.data = data;
      console.log(this.data);
  
    });*/
    
    
   console.log(this.loginForm.value);
  
    //this.router.navigate(['/home']);
    this.add (this.loginForm.value);
   
  }

  add(usDatos : UsuarioModelo ): void {
   
    this.usuarioService.addUsuario(usDatos)
    .subscribe(us => {

      console.log ('bbb:'+us.correo);
    });
  }
  

  rebuildForm() {
    this.loginForm.reset({
     
    });
    
  }
 
}
