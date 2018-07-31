import { Component, OnInit } from '@angular/core';
import {Distribucion1_Resumen,Distribucion2_Resumen,CamposOpcionales} from '../../../modelo/tabla';
@Component({
  selector: 'app-caracterizacion-vertebrados-nacional',
  templateUrl: './caracterizacion-vertebrados-nacional.component.html',
  styleUrls: ['./caracterizacion-vertebrados-nacional.component.scss']
})
export class CaracterizacionVertebradosNacionalComponent implements OnInit {
  source_Distribucion1:Distribucion1_Resumen[];
  source_Distribucion2:Distribucion2_Resumen[];
  source_CamposOpcionales:CamposOpcionales[];
  
  settings_CamposOpcionales= { 
    columns: {
      datos: {
        title: 'RCVN.OPC'
      }
    }
  };
  settings_Distribucion1 = { 
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
  settings_Distribucion2 = { 
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
