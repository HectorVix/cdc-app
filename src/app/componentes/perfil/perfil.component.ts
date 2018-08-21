import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../servicios/usuario.service';
import { UsuarioModelo } from '../../modelo/usuario-modelo';

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
  constructor(private usuarioService: UsuarioService) { }

  ngOnInit() {
    this.usuarioService.getUsuarioDatos()
    .subscribe((data: UsuarioModelo) => this.datosUsuario = { ...data });
  }

}
