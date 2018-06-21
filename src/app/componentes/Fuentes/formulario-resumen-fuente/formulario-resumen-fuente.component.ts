import { Component, OnInit } from '@angular/core';
import  {FuenteModelo} from  '../formulario-resumen-fuente/fuente-modelo';
@Component({
  selector: 'app-formulario-resumen-fuente',
  templateUrl: './formulario-resumen-fuente.component.html',
  styleUrls: ['./formulario-resumen-fuente.component.scss']
})
export class FormularioResumenFuenteComponent implements OnInit {
  codfuente: string;
  public pelicula;
  text = 'hola1';
  constructor() {

    this.pelicula = {id: 1, titulo: "La verdad duele", anio: 2016};
   }

  ngOnInit() {

  }

  
}
