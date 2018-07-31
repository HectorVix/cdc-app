import { Component, OnInit } from '@angular/core';
import {Distribucion1_Resumen,Distribucion2_Resumen,CamposOpcionales} from '../../../modelo/tabla';

@Component({
  selector: 'app-caracterizacion-plantas-nacional',
  templateUrl: './caracterizacion-plantas-nacional.component.html',
  styleUrls: ['./caracterizacion-plantas-nacional.component.scss']
})
export class CaracterizacionPlantasNacionalComponent implements OnInit {
  lrangog = ['','A','B'];
  lrangon = ['','A','B'];
  laepeu = ['','A','B'];
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
  constructor() { }

  ngOnInit() {
  }

}
