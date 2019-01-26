import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmacionComponent } from '../../../componentes/dialogo/confirmacion/confirmacion.component';
import { LocalizacionService } from '../../../servicios/localizacion/localizacion.service';
import { FechaService } from '../../../servicios/fecha/fecha.service';
// import { DatePipe } from '@angular/common'
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { protocolo_LE_Modelo } from '../../../modelo/localizacion/protocolo-le-modelo';
import { dispersion_Modelo } from '../../../modelo/localizacion/dispersion-modelo';
//--------------tabla------------------------------------
import { protocolo_LE_FormGroup } from '../../../modelo/formGroup/protocoloLE';
import { MatPaginator, MatSort, MatTableDataSource, MatSelectModule, MatDialog } from '@angular/material';
//import { contacto_Dato } from '../../../modelo/tabla/contacto-dato';

@Component({
  selector: 'app-protocolo-le',
  templateUrl: './protocolo-le.component.html',
  styleUrls: ['./protocolo-le.component.scss']
})
export class ProtocoloLeComponent implements OnInit {
  protocoloLeForm: FormGroup;
  private _success = new Subject<string>();
  staticAlertClosed = false;
  successMessage: string;
  tipoAlert: string;
  loading: boolean;
  data_dispersion = [];
  settings_Protocolo = {
    columns: {
      le: {
        title: 'LE'
      },
      nommapanummarg: {
        title: 'MAPA'
      },
      prov: {
        title: 'PROV'
      },
      direccion: {
        title: 'DIRECCION'
      },
      ultobs: {
        title: 'ULTOBS'
      }

    }
  };
  constructor(private fb: FormBuilder,
    private localizacionServicio: LocalizacionService,
    private fechaServicio: FechaService,
    private dialog: MatDialog) {
    this.crearForm_ProtocoloLe(new protocolo_LE_Modelo);
  }

  ngOnInit() {
    setTimeout(() => this.staticAlertClosed = true, 20000);
    this._success.subscribe((message) => this.successMessage = message);
    this._success.pipe(
      debounceTime(10000)
    ).subscribe(() => this.successMessage = null);
  }

  crearForm_ProtocoloLe(row: protocolo_LE_Modelo) {
    this.protocoloLeForm = new protocolo_LE_FormGroup().getProtocolo_LE_FormGrup(row);
  }
  guardarProtocolo() {
    var protocoloLE_Base = this.setProtocoloLE(this.protocoloLeForm.value);
    var dispersionLista: Array<dispersion_Modelo> = new Array();
    this.data_dispersion.forEach(data_dispersion => {
      var dispersionBase = new dispersion_Modelo();
      dispersionBase.le = data_dispersion.le;
      dispersionBase.nommapanummarg = data_dispersion.nommapanummarg;
      dispersionBase.prov = data_dispersion.prov;
      dispersionBase.direccion = data_dispersion.direccion;
      dispersionBase.ultobs = data_dispersion.ultobs;
      dispersionLista.push(dispersionBase);
    });

    protocoloLE_Base.dispersionList = dispersionLista;
    this.addProtocoloLocalizacionElemento(protocoloLE_Base);
  }
  setProtocoloLE(protocoloLe): protocolo_LE_Modelo {
    protocoloLe.fecha = this.fechaServicio.toFormatoDateTime(protocoloLe.fecha);
    return protocoloLe;
  }
  //agrega un nuevo registro localización elemento
  addProtocoloLocalizacionElemento(protocoloLE: protocolo_LE_Modelo): void {
    this.loading = true;
    this.localizacionServicio.addProtocoloLE(protocoloLE)
      .subscribe(
        resProtocoloLE => {
          this.loading = false;
          this.changeSuccessMessage(`Se registro la localización del elemento :${resProtocoloLE.codigoe}.`, 'success');
        }, err => {
          this.loading = false;
          this.changeSuccessMessage(`No se pudo regitrar el protocolo de localización del elemento. Comprueba que exista CODIGOE:${protocoloLE.codigoe}.`,
            'primary');
        });
  }
  public changeSuccessMessage(mensaje: string, tipo: string) {
    this.tipoAlert = tipo;
    this._success.next(mensaje);
  }
  openDialogo(): void {
    const dialogRef = this.dialog.open(ConfirmacionComponent, {
      width: '250px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result)
        this.guardarProtocolo();
    });
  }
}
