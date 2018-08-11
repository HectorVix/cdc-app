import { Component, OnInit } from '@angular/core';
import {Elementos_AreasManejadas,CamposOpcionales} from '../../../modelo/tabla';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { criterio_areasManejadas} from '../../../modelo/criterio-areas-manejadas';
@Component({
  selector: 'app-formulario-areas-manejadas',
  templateUrl: './formulario-areas-manejadas.component.html',
  styleUrls: ['./formulario-areas-manejadas.component.scss']
})
export class FormularioAreasManejadasComponent implements OnInit {
  lident = ['','S','N','?'];
  source_Elementos_AreasManejadas:Elementos_AreasManejadas[];
  source_CamposOpcionales_AreasManejadas:CamposOpcionales[];
  areaManejoForm: FormGroup;
  criterio_areasManejadas = new criterio_areasManejadas();
  criterio_protasign = this.criterio_areasManejadas.protasign;
  criterio_accesopub = this.criterio_areasManejadas.accesopub;
  criterio_status = this.criterio_areasManejadas.status;
  criterio_si_no = this.criterio_areasManejadas.si_no;
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

  constructor(private fb: FormBuilder) { 
    this.crear_areaManejoForm();
  }

  ngOnInit() {
  }
  crear_areaManejoForm() {
    this.areaManejoForm = this.fb.group({
      //página1
      //identificadores
      'codigoam': ['', Validators.required]
     
    });
  
  }

}
