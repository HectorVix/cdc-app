import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-formulario-jerarquizacion-elemento-subnacional',
  templateUrl: './formulario-jerarquizacion-elemento-subnacional.component.html',
  styleUrls: ['./formulario-jerarquizacion-elemento-subnacional.component.scss']
})
export class FormularioJerarquizacionElementoSubnacionalComponent implements OnInit {
 llestims = ['','A','B'];
 labunds =  ['','A','B'];
 ldists =   ['','A','B'];
 lleprots = ['','A','B'];
 lamenazs =  ['','A','B'];
 lrangos =  ['','A','B'];
 

  constructor() { }

  ngOnInit() {
  }

}
