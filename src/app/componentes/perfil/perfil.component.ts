import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../servicios/usuario/usuario.service';
import { usuario_Modelo } from '../../modelo/usuario/usuario-modelo';
import { JwtHelperService } from '@auth0/angular-jwt';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { validarContrasena } from '../../core/nav-menu/contrasena-coincidencia';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {
  datosUsuario: usuario_Modelo;
  area: String;
  private _success = new Subject<string>();
  staticAlertClosed = false;
  successMessage: string;
  tipoAlert: string;
  cambiarContrasenaForm: FormGroup;
  loading: boolean;
  loadingPerfil: boolean;
  jwthelper = new JwtHelperService();
  decodedToken = this.jwthelper.decodeToken(localStorage.getItem('userToken'));
  constructor(private usuarioService: UsuarioService,
    public fb: FormBuilder) { }

  ngOnInit() {
    this.usuarioService.getUsuarioDatos(this.decodedToken.jti)
      .subscribe(
        data => {
          this.loadingPerfil = false;
          this.datosUsuario = data;
        },
        err => {
          this.loadingPerfil = true;
          this.datosUsuario = null;
        });
    this.area = this.decodedToken.sub;
    this.crearCambiarContrasenaForm();
    setTimeout(() => this.staticAlertClosed = true, 20000);
    this._success.subscribe((message) => this.successMessage = message);
    this._success.pipe(
      debounceTime(10000)
    ).subscribe(() => this.successMessage = null);
  }
  cambiar_Contrasena() {
    this.loading = true;
    if (this.datosUsuario) {
      this.datosUsuario.contrasena = this.cambiarContrasenaForm.get('contrasena').value;
      this.usuarioService.actualizarPefil(this.datosUsuario).
        subscribe(
          resPerfil => {
            this.loading = false;
            this.changeSuccessMessage(`Se cambio la contraseña para el correo:${resPerfil.perfil}.`, 'success');
          }
          , err => {
            this.loading = false;
            this.changeSuccessMessage('No se pudo cambiar la contraseña, comprueba que esté disponible el servicio.', 'primary');
          }
        );
    }
  }
  crearCambiarContrasenaForm() {
    this.cambiarContrasenaForm = this.fb.group({
      contrasena: ['', [Validators.required, Validators.minLength(8)]],
      repetir_contrasena: ['', [Validators.required, Validators.minLength(8), validarContrasena]]
    })
  }
  nuevo() {
    this.cambiarContrasenaForm.reset({
    });
  }

  public changeSuccessMessage(mensaje: string, tipo: string) {
    this.tipoAlert = tipo;
    this._success.next(mensaje);
  }
}
