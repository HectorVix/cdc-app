import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {Distribucion1_Resumen,Distribucion2_Resumen,CamposOpcionales} from '../../../modelo/tabla';


@Component({
  selector: 'app-caracterizacion-plantas-nacional',
  templateUrl: './caracterizacion-plantas-nacional.component.html',
  styleUrls: ['./caracterizacion-plantas-nacional.component.scss']
})
export class CaracterizacionPlantasNacionalComponent implements OnInit {
  caracterizacionPlantasNacionalForm:FormGroup;
  source_Distribucion1:Distribucion1_Resumen[];
  source_Distribucion2:Distribucion2_Resumen[];
  source_CamposOpcionales:CamposOpcionales[];
  
  settings_CamposOpcionales= { 
    columns: {
      datos: {
        title: 'RCPN.OPC'
      }
    }
  };
  settings_distribucion1 = { 
    columns: {
      codsubnac: {
        title: 'CODSUBNAC'
      },
      nomsubnac: {
        title: 'NOMSUBNAC'
      },
      statsubnac: {
        title: 'STATSUBNAC'
      }
    }
  };
  settings_distribucion2 = { 
    columns: {
      codecoregn: {
        title: 'CODECORGN'
      },
      statecoregn: {
        title: 'STATECOREGN'
      },
      codcuencan: {
        title: 'CODCUENCAN'
      },
      statcuencan: {
        title: 'STATCUENCAN'
      }
    }
  };
  constructor(private fb:FormBuilder) {
    this.crearForm_CaracterizacionPlantasNacional();
   }

  ngOnInit() {
  }
  crearForm_CaracterizacionPlantasNacional()
  {
    this.caracterizacionPlantasNacionalForm= this.fb.group ({
      //identificadores
      'codigoe': ['', Validators.required],
      'nacion': '',
      'nombren': '',
      'nomcomunn': '',
      //taxonomía
      'comsubespn': '',
      'taxasimiln': '',
      'comidentn': '',
      'comtaxn': '',
      //status
      'rangog': '',
      'rangon': '',
      'aepeu': '',
      'cites': '',
      'uicn': '',
      'rastreolen': '',
      'protnacion': '',
      'malezan': '',
      'clasifinstn': '',
      'comstatn': '',
      //inventario
      'priinventn': '',
      'necinventn': '',
      'cominventn': '',
      'respropn': '',
      'lista_distribucion1': '',
      'lista_distribucion2': '',
      'elevminn': '', //number
      'elevmaxn': '', //number
      'disyuntn': '',
      'periferican': '',
      'comdistn': '',
      //habitat
      'comhabn': '',
      //ecología
      'comecoln': '',
      //fenología
      'lista_fenologia': '',
      'comfenoln': '',
      //reproducción
      'comrepn': '',
      //manejo
      'commanejon': '',
      //campos opcionales
      'rcpnopc1': '',
      'rcpnopc2': '',
      'rcpnopc3': '',
      'rcpnopc4': '',
      'rcpnopc5': '',
      //mantenimiento del registro
      'codfuente': '',
      'cita': '',
      'transparen': '',
      'refg': '',
      'refn': '',
      'edicionn': '', //date
      'autoredn': '',
      'actualizan': '', //date
     });
  
  }

}
