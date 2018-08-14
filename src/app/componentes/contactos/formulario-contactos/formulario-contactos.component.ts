import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-formulario-contactos',
  templateUrl: './formulario-contactos.component.html',
  styleUrls: ['./formulario-contactos.component.scss']
})
export class FormularioContactosComponent implements OnInit {
 contactosForm:FormGroup;
  constructor(private fb:FormBuilder) { 
   this.crearForm_contactos();
  }

  ngOnInit() {
  }
crearForm_contactos(){
  this.contactosForm= this.fb.group({
    //identificadores
    'numident': ['', Validators.required],
    'nombreident': '',
    'titulo': '',
    'nombre': '',
    'apellido1': '',
    'apellido2': '',
    'sufijo': '',
    'posicion': '',
    'institucion': '',
    //localizadores
    'email': '',
    'dir1': '',
    'dir2': '',
    'dir3': '',
    'pais': '',
    'ciudad': '',
    'subnacion': '',
    'codpostal': '',
    'masident': '',
    'smsa': '',
    'teleftrabajo': '', //*number
    'telefhogar': '',   //*number
    //tipos de contactos
    'tipocont': '',
    //actividades con el contacto
    'activcont': '',
    //descripción
    'resumen': '',
    //documentación y mantenimiento
    'coddirp': '',
    'actualizar': ''//*date
    
  });
}
}
