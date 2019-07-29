import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { UsuarioService } from '../../servicios/usuario/usuario.service';
import { FechaService } from '../../servicios/fecha/fecha.service';
import { Router } from '@angular/router';
import { usuario_Modelo, Rol } from '../../modelo/usuario/usuario-modelo';
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
  model: NgbDateStruct;
  date: { year: number, month: number };
  emailConfirmar: string;
  fecha: Date;
  fechaFormato: NgbDateStruct;
  rol: Rol;
  private _success = new Subject<string>();
  staticAlertClosed = false;
  successMessage: string;
  tipoAlert: string;
  loading: boolean;

  constructor(public fb: FormBuilder,
    private usuarioServicio: UsuarioService,
    private fechaServicio: FechaService,
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
    localStorage.removeItem('userToken');
  }
  ngOnInit() {
    setTimeout(() => this.staticAlertClosed = true, 20000);
    this._success.subscribe((message) => this.successMessage = message);
    this._success.pipe(
      debounceTime(10000)
    ).subscribe(() => this.successMessage = null);
  }

  //logiarse
  onSubmit() {
    this.loading = true;
    this.usuarioServicio.userAuthentication(this.loginForm.get('LFemail').value, this.loginForm.get('LFcontrasena').value)
      .subscribe((data: any) => {
        this.loading = false;
        localStorage.setItem('userToken', data.access_token);
        this.router.navigate(['/home']);
      },
        (err: HttpErrorResponse) => {
          this.loading = false;
          this.changeSuccessMessage('Correo/contraseña invalidos o servidor no disponible.', 'primary');
          this.isLoginError = true;
        });
  }
  //Guardar Registro
  onSubmitRegistro() {
    // this.fechaFormato = this.registroForm.get('fechaNacimiento').value;
    this.fecha = this.fechaServicio.toFormatoDateTime(this.registroForm.get('fechaNacimiento').value);
    this.addUsuario(this.registroForm.value);
  }

  addUsuario(usDatos: usuario_Modelo): void {
    this.loading = true;
    usDatos.fechaNacimiento = this.fecha;
    this.rol = new Rol();
    this.rol.rolId = 7;
    usDatos.rolrolid = this.rol;

    this.usuarioServicio.addUsuario(usDatos)
      .subscribe(
        us => {
          this.loading = false;
          this.changeSuccessMessage(`Registro exitoso:${us.nombre}.`, 'success');
          this.rebuildFormRegisrtro();
        }, err => {
          this.loading = false;
          this.changeSuccessMessage('Error correo ya utilizado o servidor no disponible.', 'primary');
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

  public changeSuccessMessage(mensaje: string, tipo: string) {
    this.tipoAlert = tipo;
    this._success.next(mensaje);
  }
}
