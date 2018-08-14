import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {Protocolo} from '../../../modelo/tabla';
import { criterio_le } from '../../../modelo/criterio-le';
@Component({
  selector: 'app-protocolo-le',
  templateUrl: './protocolo-le.component.html',
  styleUrls: ['./protocolo-le.component.scss']
})
export class ProtocoloLeComponent implements OnInit {
  protocoloLeForm:FormGroup;
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
  constructor(private fb:FormBuilder) {
    this.crearForm_ProtocoloLe();
   }

  ngOnInit() {
  }

  crearForm_ProtocoloLe ()
  {
   this.protocoloLeForm= this.fb.group ({
    'codigoe': ['', Validators.required],
    'rangog': '',
    'rangon': '',
    'nombre': '',
    'nomcomun': '',
    'lista_protocolo_le': ''
   });

  }
}
