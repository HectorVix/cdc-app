import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import {NgbCarouselConfig} from '@ng-bootstrap/ng-bootstrap';
import { UsuarioModelo, Rol } from '../../../modelo/usuario-modelo';
import { elemento_Modelo } from '../../../modelo/elemento-modelo';
import { UsuarioService } from '../../../servicios/usuario.service';
import { debounceTime } from 'rxjs/operators';



@Component({
  selector: 'app-elemento',
  templateUrl: './elemento.component.html',
  styleUrls: ['./elemento.component.scss']
})
export class ElementoComponent implements OnInit {
  elementoForm : FormGroup;
  rol: Rol;
  usuario: UsuarioModelo;
  constructor(private fb: FormBuilder, private usuarioService: UsuarioService,) {
    this.crearForm_Elemento();
   }

  ngOnInit() {
  }

  crearForm_Elemento ()
  {
    this.elementoForm = this.fb.group({
    
      'codigo': ['', Validators.required],
      'nombrecomun': '',
      'nombrecientifico': '',
      'comentario': ''
    
    });
  }
  onSubmit(){
    console.log(this.elementoForm.value);
    this.addElemento(this.elementoForm.value);

  }

  addElemento(elemento: elemento_Modelo): void {
    
    console.log(elemento.codigo);
    this.rol = new Rol();
    this.rol.rolId = 1;
    this.usuario = new UsuarioModelo();
    this.usuario.rolrolid=this.rol;
    elemento.uSUARIOusuarioid=this.usuario;
    this.usuarioService.addElemento(elemento)
      .subscribe(
        us => {
         console.log('ok');
                
        }, err => {
          console.log('bad');
        });
  }
}
