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
      'codigoam': ['', Validators.required],
      'nombream': '',
      'sinam': '',
      'ammayor': '',
      'coddueno': '',
      'codsitio': '',
      'nomsitio': '',
      //localizadores
      'nacion': '',
      'subnacion': '',
      'subdivision': '',
      'nommapa': '',
      'codmapa': '',
      'nummarg': '',
      'lat': '',
      'long': '',
      'coords': '',
      'coordn': '',
      'coorde': '',
      'coordo': '',
      //decriptores
      'descripcion': '',
      'areatot1': '', //number
      'areatot2': '', 
      'areasubnac1': '',//number
      'areasubnac2': '',
      'multisubnac': '',
      'limites': '',
      'continua': '',
      'involtnc': '',
      'comentario': '',
      //status
      'fechaesta': '',
      'protasign': '',
      //manejo
      'administrador': '',
      'instadmin': '',
      'diradmin1': '',
      'diradmin2': '',
      'ciudadadmin': '',
      'subnacadmin': '',
      'codpostaladmin': '',
      'telefadminist': '',
      'accesopub': '',
      'instcoop': '',
      'commanejo': '',
      //elementos
      'lista_elementos': '',// lista de codigoe,nombres, status y codfuente
      //campos opcionales
      'amopc1': '',
      'amopc2': '',
      'amopc3': '',
      'amopc4': '',
      'amopc5': '',
      //mantenimiento del registro
      'respdatos': '',
      'actualizar': ''    
    });
  
  }
 // comun para : multisubnac, limites, continua , involtnc
  getCriterio_Si_No(i:number){
    switch(i) {
      case 0 : return '';
      case 1 : return '1'; // Sí
      case 2 : return '0'; // No
    }
  }

  getCriterio_Protasign (i:number){
    switch(i){
      case 0: return '';
      case 1: return '1';
      case 2: return '2';
      case 3: return '3';
    }
  }

}
