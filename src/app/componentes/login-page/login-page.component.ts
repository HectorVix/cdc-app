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
  usuario : UsuarioModelo;
  correo : string;
  password : string ;
  usuarioDatos: any;
  data: any;
  us: UsuarioModelo[];
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
    
   this.usuarioService.getUsuarioDatos ()
   .subscribe(data => {
      this.data = data;
      console.log(this.data);
  
    });
       

  
 /*.subscribe(data => {
      this.data = data;
      console.log(this.data);
  
    });*/
    
    
   
  
    //this.router.navigate(['/home']);
    this.add ("benita");
   
  }

  add(correo : string ): void {
    correo = correo.trim();
   if (!correo) { return; }
    this.usuarioService.addUsuario({correo} as UsuarioModelo)
    .subscribe(us => {

      console.log ('bbb:'+us.correo);
    });
  }
  

  rebuildForm() {
    this.loginForm.reset({
     
    });
    
  }
 
}
