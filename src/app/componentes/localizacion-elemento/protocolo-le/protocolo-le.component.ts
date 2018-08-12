import { Component, OnInit } from '@angular/core';
import {Protocolo} from '../../../modelo/tabla';
import { criterio_le } from '../../../modelo/criterio-le';
@Component({
  selector: 'app-protocolo-le',
  templateUrl: './protocolo-le.component.html',
  styleUrls: ['./protocolo-le.component.scss']
})
export class ProtocoloLeComponent implements OnInit {
  criterio_le = new criterio_le();
  criterio_rangog = this.criterio_le.rangog;
  criterio_rangon = this.criterio_le.rangon;
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
