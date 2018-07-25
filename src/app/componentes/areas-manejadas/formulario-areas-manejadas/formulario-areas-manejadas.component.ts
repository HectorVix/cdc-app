import { Component, OnInit } from '@angular/core';
import {Elementos_AreasManejadas,CamposOpcionales} from '../../../modelo/tabla';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-formulario-areas-manejadas',
  templateUrl: './formulario-areas-manejadas.component.html',
  styleUrls: ['./formulario-areas-manejadas.component.scss']
})
export class FormularioAreasManejadasComponent implements OnInit {
  lident = ['','S','N','?'];
  source_Elementos_AreasManejadas:Elementos_AreasManejadas[];
  source_CamposOpcionales_AreasManejadas:CamposOpcionales[];
  
  settings_Elementos_AreasManejadas = { 
    columns: {
      codigoe: {
        title: 'CODIGOE'
      },
      nombres: {
        title: 'NOMBRES'
      },
      status: {
        title: 'STATUS'
      },
      codfuente: {
        title: 'CODFUENTE'
      }
    }
  };
  settings_CamposOpcionales_AreasManejadas = { 
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
