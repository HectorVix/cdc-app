import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Subject } from 'rxjs';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { UsuarioService } from '../../servicios/usuario/usuario.service';
import { usuario_Modelo, Rol } from '../../modelo/usuario/usuario-modelo';
import { validarContrasena } from './contrasena-coincidencia';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.scss']
})
export class NavMenuComponent implements OnInit {
  isCollapsed = true;
  rolAdmin = false;
  private _success = new Subject<string>();
  staticAlertClosed = false;
  successMessage: string;
  tipoAlert: string;
  registroForm: FormGroup;
  loading: boolean;
  criterio_Rol = [];

  constructor(private router: Router,
    public fb: FormBuilder,
    private usuarioServicio: UsuarioService, ) {

    this.obtener_Roles();
  }

  ngOnInit() {
    setTimeout(() => this.staticAlertClosed = true, 20000);
    this._success.subscribe((message) => this.successMessage = message);
    this._success.pipe(
      debounceTime(10000)
    ).subscribe(() => this.successMessage = null);
    var jwthelper = new JwtHelperService();
    var decodedToken = jwthelper.decodeToken(localStorage.getItem('userToken'));
    if (decodedToken.sub == "Admin")
      this.rolAdmin = true;
    else
      this.rolAdmin = false;
    this.crearRegistroForm();
  }
  colapsar() {
    this.isCollapsed = true;
  }
  Logout() {
    localStorage.removeItem('userToken');
    this.router.navigate(['/login']);
  }
  crearRegistroForm() {
    this.registroForm = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      fechaNacimiento: '',
      email: ['', [Validators.email, Validators.required]],
      rol: ['', Validators.required],
      contrasena: ['', [Validators.required, Validators.minLength(8)]],
      repetir_contrasena: ['', [Validators.required, Validators.minLength(8), validarContrasena]]
    })
  }
  guardarRegistro() {
    var us = new usuario_Modelo();
    var rol = new Rol();
    us.nombre = this.registroForm.get('nombre').value;
    us.apellido = this.registroForm.get('apellido').value;
    us.email = this.registroForm.get('email').value;
    us.contrasena = this.registroForm.get('contrasena').value;
    rol.rolId = this.registroForm.get('rol').value;
    us.rolrolid = rol;
    this.addUsuario(us);
  }
  addUsuario(usDatos: usuario_Modelo): void {
    this.loading = true;
    this.usuarioServicio.addUsuario(usDatos)
      .subscribe(
        us => {
          this.loading = false;
          this.changeSuccessMessage(`Registro exitoso:${us.nombre}.`, 'success');
          this.rebuildFormRegistro();
        }, err => {
          this.loading = false;
          this.changeSuccessMessage('Error correo ya utilizado o servidor no disponible.', 'primary');
        });
  }
  rebuildFormRegistro() {
    this.registroForm.reset({
    });
  }
  public changeSuccessMessage(mensaje: string, tipo: string) {
    this.tipoAlert = tipo;
    this._success.next(mensaje);
  }
  obtener_Roles() {
    this.usuarioServicio.obtener_Roles();
    this.criterio_Rol = this.usuarioServicio.rol_Valor;
  }
}