import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { UsuarioService } from '../../servicios/usuario.service';
import { Router } from '@angular/router';
import { UsuarioModelo, Rol } from '../../modelo/usuario-modelo';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common'
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';

const now = new Date();
@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  isLoginError: boolean = false;
  loginForm: FormGroup;
  registroForm: FormGroup;
  recuperarContrasenaForm: FormGroup;
  usDatos: FormGroup;
  usuarioDatos: any;
  us: UsuarioModelo[];
  model: NgbDateStruct;
  date: { year: number, month: number };
  emailConfirmar: string;
  //pruebas
  data: any;
  fecha: Date;
  modeloDate2: NgbDateStruct;
  rol: Rol;
  private _success = new Subject<string>();
  staticAlertClosed = false;
  successMessage: string;
  tipoAlert: string;

  constructor(public fb: FormBuilder,
    private usuarioService: UsuarioService,
    private router: Router,
    public fb2: FormBuilder,
    public fb3: FormBuilder,
    public datepipe: DatePipe) {
    this.loginForm = fb.group({
      LFemail: ['', [Validators.required, Validators.email]],
      LFcontrasena: ['', Validators.required]
    });

    this.crearRegistroForm();
    this.restablecerContrasenaForm();
  }
  ngOnInit() {
    setTimeout(() => this.staticAlertClosed = true, 20000);
    this._success.subscribe((message) => this.successMessage = message);
    this._success.pipe(
      debounceTime(5000)
    ).subscribe(() => this.successMessage = null);
  }

  //logiarse
  onSubmit() {
    this.usuarioService.userAuthentication(this.loginForm.get('LFemail').value, this.loginForm.get('LFcontrasena').value)
      .subscribe((data: any) => {
        localStorage.setItem('userToken', data.access_token);
        this.router.navigate(['/home']);
      },
        (err: HttpErrorResponse) => {
          this.changeSuccessMessage('Error al logiarse , usuario invalido o servidor no disponible', 'primary');
          this.isLoginError = true;
        });
    /*
        this.usuarioService.getUsuarioDatos()
          .subscribe(
            data => {
              this.data = data;
              console.log(this.data);
              this.router.navigate(['/home']);
            }, err => {
              this.changeSuccessMessage('No se pudo logiar, servidor no disponible.', 'warning ');
            });
    */
  }
  //Guardar Registro
  onSubmitRegistro() {
    this.modeloDate2 = this.registroForm.get('fechaNacimiento').value;
    this.fecha = this.toModel(this.modeloDate2);
    this.addUsuario(this.registroForm.value);
  }

  addUsuario(usDatos: UsuarioModelo): void {
    usDatos.fechaNacimiento = this.fecha;
    this.rol = new Rol();
    this.rol.rolId = 1;
    usDatos.rolrolid = this.rol;

    this.usuarioService.addUsuario(usDatos)
      .subscribe(
        us => {
          this.changeSuccessMessage(`Registro exitoso:${us.nombre}.`, 'success');
          this.rebuildFormRegisrtro();
        }, err => {
          this.changeSuccessMessage('No se pudo registrar, servidor no disponible.', 'primary');
        });

  }


  rebuildFormLogin() {
    this.loginForm.reset({
    });

  }

  rebuildFormRegisrtro() {
    this.registroForm.reset({
    });

  }
  crearRegistroForm() {
    this.registroForm = this.fb2.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      fechaNacimiento: ['', Validators.required],
      email: ['', [Validators.email, Validators.required]],
      contrasena: ['', Validators.required],

    });
  }
  restablecerContrasenaForm() {
    this.recuperarContrasenaForm = this.fb3.group({
      emailRecuperarContrasena: ['', [Validators.email, Validators.required]]
    });
  }
  selectToday() {
    this.model = { year: now.getFullYear(), month: now.getMonth() + 1, day: now.getDate() };
  }

  toModel(date: NgbDateStruct): Date {
    return date ? new Date('' + date.year + '-' + date.month + '-' + date.day) : null;
  }

  public changeSuccessMessage(mensaje: string, tipo: string) {
    this.tipoAlert = tipo;
    this._success.next(mensaje);
  }
}
