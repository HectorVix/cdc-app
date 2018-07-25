import { Component, OnInit } from '@angular/core';
import {Identificadores_Sitio,Localizadores_Sitio,CamposOpcionales} from '../../../modelo/tabla';
@Component({
  selector: 'app-registro-sitio',
  templateUrl: './registro-sitio.component.html',
  styleUrls: ['./registro-sitio.component.scss']
})
export class RegistroSitioComponent implements OnInit {
  source_identificadores_Sitio:Identificadores_Sitio[];
  source_localizadores_Sitio:Localizadores_Sitio[];
  source_CamposOpcionales_Sitio:CamposOpcionales[];
  lident = ['','S','N','?'];

  settings_Identificadores_Sitio = { 
    columns: {
      codmacsitio: {
        title: 'CODMACSITIO'
      },
      nommacsitio: {
        title: 'NOMMACSITIO'
      }
    }
  };
  settings_Localizadores_Sitio = {
    columns: {
      codsubdiv: {
        title: 'CODSUBDIV'
      },
      nomsubdiv: {
        title: 'NOMSUBDIV'
      },
      nommapa: {
        title: 'NOMMAPA'
      },
      codmapa: {
        title: 'CODMAPA'
      },
    }
  };
  settings_CamposOpcionales_Sitio= {
    columns: {
      datos: {
        title: 'DATOS'
      }
      
    }
  };
  

  constructor() { }

  ngOnInit() {
  }

}
