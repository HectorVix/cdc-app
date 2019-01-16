import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../servicios/usuario/usuario.service';
import { usuario_Modelo } from '../../modelo/usuario/usuario-modelo';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {
  datosUsuario: usuario_Modelo;
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
      .subscribe((data: usuario_Modelo) => this.datosUsuario = { ...data });
  }

}
