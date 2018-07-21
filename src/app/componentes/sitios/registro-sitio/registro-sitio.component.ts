import { Component, OnInit } from '@angular/core';
import {Identificadores_Sitio} from '../../../modelo/tabla';
@Component({
  selector: 'app-registro-sitio',
  templateUrl: './registro-sitio.component.html',
  styleUrls: ['./registro-sitio.component.scss']
})
export class RegistroSitioComponent implements OnInit {
  identificadores_Sitio:Identificadores_Sitio[];
  settings_Identificadores_Sitio = {
    columns: {
      CODMACSITIO: {
        title: 'CODMACSITIO'
      },
      NOMMACSTIO: {
        title: 'NOMMACSTIO'
      }
    }
  };

  constructor() { }

  ngOnInit() {
  }

}
