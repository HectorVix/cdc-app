import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
//import { UsuarioModelo } from '../login-page/usuario-modelo';
import { UsuarioService } from '../../servicios/usuario.service';
import { Router } from '@angular/router';
import { UsuarioModelo } from '../../modelo/usuario-modelo';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common'

const now = new Date();
@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  loginForm: FormGroup;
  registroForm: FormGroup;
  recuperarContrasenaForm: FormGroup;
  usDatos: FormGroup;
  usuarioDatos: any;
  us: UsuarioModelo[];
  model: NgbDateStruct;
  date: { year: number, month: number };

  //pruebas
  data: any;
  fecha: Date ;
  modelo2: NgbDateStruct;
  constructor(public fb: FormBuilder,
    private usuarioService: UsuarioService,
    private router: Router,
    public fb2: FormBuilder,
    public fb3: FormBuilder,
    public datepipe: DatePipe)
     {
    this.loginForm = fb.group({
      LFemail: ['', [Validators.required, Validators.email]],
      LFcontrasena: ['', Validators.required],
      //db: new FormControl()
    });

    this.crearRegistroForm();
    this.restablecerContrasenaForm();
  }
  ngOnInit() {
  }
  onSubmit() {

    console.log(this.loginForm.value);

    //this.router.navigate(['/home']);
   // this.addUsuario(this.loginForm.value);
   this.usuarioService.getUsuarioDatos()
     .subscribe(data => {
      this.data = data;
      console.log(this.data);
  
    });

  }
  //Guardar Registro
  onSubmitRegistro(){


    console.log(this.registroForm.value);
    this.modelo2=this.registroForm.get('fechaNacimiento').value;
  // this.fecha=new Date();
   // let latest_date =this.datepipe.transform(this.fecha, 'yyyy-MM-dd');
     this.fecha=this.toModel(this.modelo2);
     
     console.log(this.registroForm.value);
     this.addUsuario(this.registroForm.value);
  //  this.addUsuario(this.registroForm.value);
  }

  addUsuario(usDatos: UsuarioModelo): void {
     console.log(usDatos.fechaNacimiento);
     ;
     usDatos.fechaNacimiento=  this.fecha;
     console.log(usDatos.fechaNacimiento);
      

   this.usuarioService.addUsuario(usDatos)
      .subscribe(us => {

        console.log('bbb:' + us.nombre);
      });
      
  }


  rebuildForm() {
    this.loginForm.reset({

    });

  }

  crearRegistroForm() {

    this.registroForm = this.fb2.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      fechaNacimiento: ['', Validators.required],
      email: ['', [Validators.email, Validators.required]],
      emailConfirmar: ['', [Validators.email, Validators.required]],
      contrasena: ['', Validators.required],

    });
  }
  restablecerContrasenaForm() {
    this.recuperarContrasenaForm = this.fb3.group({
      emailRecuperarContrasena:  ['', [Validators.email, Validators.required]]


    });
  }
  selectToday() {
    this.model = { year: now.getFullYear(), month: now.getMonth() + 1, day: now.getDate() };
  }
  toModel(date: NgbDateStruct): Date {
    return date ? new Date(''+date.year+'-'+date.month+'-'+date.day) : null;
  }
}
