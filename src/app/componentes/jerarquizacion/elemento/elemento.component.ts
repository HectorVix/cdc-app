import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { UsuarioModelo, Rol } from '../../../modelo/usuario-modelo';
import { elemento_Modelo } from '../../../modelo/elemento-modelo';
import { UsuarioService } from '../../../servicios/usuario.service';
import { debounceTime } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

const jwthelper = new JwtHelperService();
const decodedToken = jwthelper.decodeToken(localStorage.getItem('userToken'));
@Component({
  selector: 'app-elemento',
  templateUrl: './elemento.component.html',
  styleUrls: ['./elemento.component.scss']
})
export class ElementoComponent implements OnInit {
  elementoForm: FormGroup;
  rol: Rol;
  usuario: UsuarioModelo;
  fecha: Date;
  fechaFormato: NgbDateStruct;
  constructor(private fb: FormBuilder, private usuarioService: UsuarioService, ) {
    this.crearForm_Elemento();
  }

  ngOnInit() {
  }

  crearForm_Elemento() {
    this.elementoForm = this.fb.group({

      'codigo': ['', Validators.required],
      'nombrecomun': '',
      'nombrecientifico': '',
      'comentario': '',
      'fecha': '',

    });
  }
  onSubmit() {
   // console.log(decodedToken.jti);
    this.fechaFormato = this.elementoForm.get('fecha').value;
    this.fecha = this.usuarioService.toFormato(this.fechaFormato);
    this.addElemento(this.elementoForm.value);

  }


  addElemento(elemento: elemento_Modelo): void {
    elemento.fecha = this.fecha;
    this.usuarioService.addElemento(elemento)
      .subscribe(
        us => {
          console.log('ok');

        }, err => {
          console.log('bad');
        });
  }


}
