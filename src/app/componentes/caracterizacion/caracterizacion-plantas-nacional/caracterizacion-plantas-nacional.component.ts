import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { caracterizacion_Modelo } from '../../../modelo/resumen/caracterizacion-modelo';
import { planta_Modelo } from '../../../modelo/resumen/planta-modelo';
import { distribucion_Modelo } from '../../../modelo/resumen/distribucion-modelo';
import { distribucion2_Modelo } from '../../../modelo/resumen/distribucion2-modelo';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { CaracterizacionService } from '../../../servicios/caracterizacion/caracterizacion.service';
import { FechaService } from '../../../servicios/fecha/fecha.service';
import { ConfirmacionComponent } from '../../../componentes/dialogo/confirmacion/confirmacion.component';

//--------------tabla------------------------------------
import { planta_FormGroup } from '../../../modelo/formGroup/planta';
import { MatPaginator, MatSort, MatTableDataSource, MatSelectModule, MatDialog } from '@angular/material';
//import { area_Dato } from '../../../modelo/tabla/area-dato'

@Component({
  selector: 'app-caracterizacion-plantas-nacional',
  templateUrl: './caracterizacion-plantas-nacional.component.html',
  styleUrls: ['./caracterizacion-plantas-nacional.component.scss']
})
export class CaracterizacionPlantasNacionalComponent implements OnInit {
  caracterizacionPlantasNacionalForm: FormGroup;
  private _success = new Subject<string>();
  staticAlertClosed = false;
  successMessage: string;
  tipoAlert: string;
  loading: boolean;
  selected = new FormControl(0);
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
        title: 'CODECOREGN'
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

  data_distribucion = [];
  data_distribucion2 = [];
  constructor(private fb: FormBuilder,
    private caracterizacionServicio: CaracterizacionService,
    private fechaServicio: FechaService,
    private dialog: MatDialog) {
    this.crearForm_CaracterizacionPlantasNacional(new planta_Modelo);
  }

  ngOnInit() {
    setTimeout(() => this.staticAlertClosed = true, 20000);
    this._success.subscribe((message) => this.successMessage = message);
    this._success.pipe(
      debounceTime(5000)
    ).subscribe(() => this.successMessage = null);
  }
  crearForm_CaracterizacionPlantasNacional(planta: planta_Modelo) {
    this.caracterizacionPlantasNacionalForm = new planta_FormGroup().getPlantaFormGrup(planta);
  }
  guardarCPlanta() {
    var cplanta = new caracterizacion_Modelo();
    var plantaBase = this.setPlanta(this.caracterizacionPlantasNacionalForm.value);
    var planta: Array<planta_Modelo> = new Array();
    var distribucion: Array<distribucion_Modelo> = new Array();
    var distribucion2: Array<distribucion2_Modelo> = new Array();

    this.data_distribucion.forEach(data_distribucion1 => {
      var distribucionBase = new distribucion_Modelo();
      distribucionBase.codsubnac = data_distribucion1.codsubnac;
      distribucionBase.nomsubnac = data_distribucion1.nomsubnac;
      distribucionBase.statsubnac = data_distribucion1.statsubnac;
      distribucion.push(distribucionBase);
    });

    this.data_distribucion2.forEach(data_distribucion2 => {
      var distribucionBase2 = new distribucion2_Modelo();
      distribucionBase2.codecoregn = data_distribucion2.codecoregn;
      distribucionBase2.statecoregn = data_distribucion2.statecoregn;
      distribucionBase2.codcuencan = data_distribucion2.codcuencan;
      distribucionBase2.statcuencan = data_distribucion2.statcuencan;
      distribucion2.push(distribucionBase2);
    });
    plantaBase.distribucionList = distribucion;
    plantaBase.distribucion2List = distribucion2;
    planta.push(plantaBase);
    cplanta.plantaList = planta;
    this.addCaracterizacionPlanta(cplanta);
  }

  setPlanta(datos: planta_Modelo): planta_Modelo {
    datos.edicionn = this.fechaServicio.toFormatoDateTime(this.caracterizacionPlantasNacionalForm.get('edicionn').value);
    datos.actualizan = this.fechaServicio.toFormatoDateTime(this.caracterizacionPlantasNacionalForm.get('actualizan').value);
    return datos;
  }
  //agrega un nuevo registro de caracterizacion de planta
  addCaracterizacionPlanta(caracterizacion: caracterizacion_Modelo): void {
    this.loading = true;
    this.caracterizacionServicio.addCaracterizacionPlanta(caracterizacion)
      .subscribe(
        resPlanta => {
          this.loading = false;
          this.changeSuccessMessage(`Se registro la caracterizacion de la planta :${resPlanta.codigoe}.`, 'success');
        }, err => {
          this.loading = false;
          this.changeSuccessMessage('No se pudo regitrar la caracterizacion de la planta.', 'primary');
        });
  }

  public changeSuccessMessage(mensaje: string, tipo: string) {
    this.tipoAlert = tipo;
    this._success.next(mensaje);
  }

  tabPagina1() {
    this.selected.setValue(0);
  }
  tabPagina2() {
    this.selected.setValue(1);

  }
  tabPagina3() {
    this.selected.setValue(2);

  }
  tabPagina4() {
    this.selected.setValue(3);

  }
  openDialogo(): void {
    const dialogRef = this.dialog.open(ConfirmacionComponent, {
      width: '250px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result)
        this.guardarCPlanta();
    });
  }
  nuevoFormulario() {
    this.crearForm_CaracterizacionPlantasNacional(new planta_Modelo);
    this.data_distribucion = [];
  }
}
