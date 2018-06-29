import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder ,FormControl} from '@angular/forms';
//import { UsuarioModelo } from '../login-page/usuario-modelo';
import { UsuarioService } from '../../servicios/usuario.service';
import { Router } from '@angular/router';
import {UsuarioModelo} from '../../modelo/usuario-modelo';
import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';

const now = new Date();
@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  loginForm: FormGroup;
  registroForm: FormGroup;
  usDatos: FormGroup;
  usuario1 : UsuarioModelo;
  usuarioDatos: any;
  data: any;
  us: UsuarioModelo[];
  model: NgbDateStruct;
  date: {year: number, month: number};
  constructor(public fb: FormBuilder, private usuarioService: UsuarioService ,
    private router : Router,
    public fb2: FormBuilder
  ) {
    this.loginForm = fb.group({
      LFemail: ['', [Validators.required, Validators.email]],
      LFcontrasena: ['', Validators.required],
      db: new FormControl()
    });
   
    this.crearRegistroForm();
  }
  ngOnInit() {
  }
  onSubmit() {
    
   console.log(this.loginForm.value);
  
    //this.router.navigate(['/home']);
    this.add (this.loginForm.value);
   
  }

  add(usDatos : UsuarioModelo ): void {
   
    this.usuarioService.addUsuario(usDatos)
    .subscribe(us => {

      console.log ('bbb:'+us.email);
    });
  }
  

  rebuildForm() {
    this.loginForm.reset({
     
    });
    
  }

  crearRegistroForm()
  {

    this.registroForm = this.fb2.group({
      nombre: ['', Validators.required],
      apellido: ['',  Validators.required],
      fechaNacimiento: ['', Validators.required],
      email: ['', [Validators.email, Validators.required]],
      contrasena: ['', Validators.required],
      
    });
  }
  selectToday() {
    this.model = {year: now.getFullYear(), month: now.getMonth() + 1, day: now.getDate()};
  }
}
