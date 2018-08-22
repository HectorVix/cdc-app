import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../servicios/usuario.service';
import { UsuarioModelo } from '../../modelo/usuario-modelo';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {
  datosUsuario: UsuarioModelo;
  model = {
    left: true,
    middle: false,
    right: false
  };
  jwthelper = new JwtHelperService();
  decodedToken = this.jwthelper.decodeToken(localStorage.getItem('userToken'));
  constructor(private usuarioService: UsuarioService) { }

  ngOnInit() {
    this.usuarioService.getUsuarioDatos(this.decodedToken.jti)
    .subscribe((data: UsuarioModelo) => this.datosUsuario = { ...data });
  }

}
