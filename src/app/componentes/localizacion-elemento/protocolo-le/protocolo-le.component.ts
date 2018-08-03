import { Component, OnInit } from '@angular/core';
import {Protocolo} from '../../../modelo/tabla';
@Component({
  selector: 'app-protocolo-le',
  templateUrl: './protocolo-le.component.html',
  styleUrls: ['./protocolo-le.component.scss']
})
export class ProtocoloLeComponent implements OnInit {
  lrangog= ['','G1','G2'];
  lrangon= ['','N1','N2'];
  source_Protocolo:Protocolo[];
  settings_Protocolo = {
    columns: {
      le: {
        title: 'LE'
      },
      nommapaNummarg: {
        title: 'NOMMAPA NUMMARG'
      },
      prov: {
        title: 'PROV'
      },
      direccion: {
        title: 'DIRECCION'
      },
      ultObs: {
        title: 'ULT OBS'
      }
      
    }
  };
  constructor() { }

  ngOnInit() {
  }

}
