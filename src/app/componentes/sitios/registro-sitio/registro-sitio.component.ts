import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';

//import { criterio_le } from '.././criterio-le';

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
  sitioForm: FormGroup;   //formulario de sitio

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
  

  constructor(private fb: FormBuilder) { 
    this.crearFormSitio();
  }

  ngOnInit() {
  }
  crearFormSitio() {
    this.sitioForm = this.fb.group({
      //página1
      //identificadores
      'codsitio': ['', Validators.required],
      'nomsitio': '',
      'sinsitio': '',
      'lista_identificadores': '', //codmacsitio, nommacsitio, codmegsitio, nommegsitio
      //localizadores
      'nacion': '',
      'subnacion': '',
      'siteresp': '',
      'lista_localizadores': '',//codsubdiv, nomsubdiv, nommapa, codmapa
      'lat': '',
      'long': '',
      'coords': '',
      'coordn': '',
      'coorde': '',
      'coordo': '',
      'direccion': '',
      //descripción del sitio/diseño
      'descrito': '',
      'mapasitio': '',
      'fechamapa': '',
      'dibujante': '',
      'justlimite': '',
      'areaprisec': '',
      'areapri': '',
      'areatotal': '',
      'comsitio': '',
      //página 2
      //importancia del sitio
      'rangoant': '',
      'comrango': '',
      'impdivbiol': '',
      'comdivbiol': '',
      'urgencia': '',
      'comurgencia': '',
      //bienes raíces y portección
      'intenccons': '',
      'numlotes': '',
      'costestprot': '',
      'coddesig': '',
      'designacion': '',
      'comprot': '',
      //administración
      'comusotierra': '',
      'compeligrnat': '',
      'comexoticas': '',
      'usotierraf': '',
      'necinform': '',
      'necmanejo': '',
      'comam': '',
      //campos opcionales
      'rbsopc1': '',
      'rbsopc2': '',
      'rbsopc3': '',
      'rbsopc4': '',
      'rbsopc5': '',
      //mantenimiento del registro
      'respdatos': '',
      'actualizar': ''

    });
  }
}
