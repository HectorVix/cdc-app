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
import { MatDialog } from '@angular/material';

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
    this.crearForm_CaracterizacionPlantasNacional();
  }

  ngOnInit() {
    setTimeout(() => this.staticAlertClosed = true, 20000);
    this._success.subscribe((message) => this.successMessage = message);
    this._success.pipe(
      debounceTime(5000)
    ).subscribe(() => this.successMessage = null);
  }
  crearForm_CaracterizacionPlantasNacional() {
    this.caracterizacionPlantasNacionalForm = this.fb.group({
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
      //ditribucion
      //'lista_distribucion1': '',
      //'lista_distribucion2': '',
      'elevminn': '', //number
      'elevmaxn': '', //number
      'disyuntn': '',
      'periferican': '',
      'comdistn': '',
      //habitat
      'marinon': '',
      'estuarinon': '',
      'fluvialn': '',
      'lacustren': '',
      'palustren': '',
      'terrestren': '',
      'comhabn': '',
      //ecología
      'comecoln': '',
      //fenología
      //1 línea
      'nenea1': '',
      'nenea2': '',
      'nenea3': '',
      'nenea4': '',

      'nmara1': '',
      'nmara2': '',
      'nmara3': '',
      'nmara4': '',

      'nmaya1': '',
      'nmaya2': '',
      'nmaya3': '',
      'nmaya4': '',

      'njula1': '',
      'njula2': '',
      'njula3': '',
      'njula4': '',

      'nseta1': '',
      'nseta2': '',
      'nseta3': '',
      'nseta4': '',

      'nnova1': '',
      'nnova2': '',
      'nnova3': '',
      'nnova4': '',

      //2 línea
      'neneb1': '',
      'neneb2': '',
      'neneb3': '',
      'neneb4': '',

      'nmarb1': '',
      'nmarb2': '',
      'nmarb3': '',
      'nmarb4': '',

      'nmayb1': '',
      'nmayb2': '',
      'nmayb3': '',
      'nmayb4': '',

      'njulb1': '',
      'njulb2': '',
      'njulb3': '',
      'njulb4': '',

      'nsetb1': '',
      'nsetb2': '',
      'nsetb3': '',
      'nsetb4': '',

      'nnovb1': '',
      'nnovb2': '',
      'nnovb3': '',
      'nnovb4': '',

      //3 línea
      'nfeba1': '',
      'nfeba2': '',
      'nfeba3': '',
      'nfeba4': '',

      'nabra1': '',
      'nabra2': '',
      'nabra3': '',
      'nabra4': '',

      'njuna1': '',
      'njuna2': '',
      'njuna3': '',
      'njuna4': '',

      'nagoa1': '',
      'nagoa2': '',
      'nagoa3': '',
      'nagoa4': '',

      'nocta1': '',
      'nocta2': '',
      'nocta3': '',
      'nocta4': '',

      'ndica1': '',
      'ndica2': '',
      'ndica3': '',
      'ndica4': '',

      //4 línea
      'nfebb1': '',
      'nfebb2': '',
      'nfebb3': '',
      'nfebb4': '',

      'nabrb1': '',
      'nabrb2': '',
      'nabrb3': '',
      'nabrb4': '',

      'njunb1': '',
      'njunb2': '',
      'njunb3': '',
      'njunb4': '',

      'nagob1': '',
      'nagob2': '',
      'nagob3': '',
      'nagob4': '',

      'noctb1': '',
      'noctb2': '',
      'noctb3': '',
      'noctb4': '',

      'ndicb1': '',
      'ndicb2': '',
      'ndicb3': '',
      'ndicb4': '',

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
    this.crearForm_CaracterizacionPlantasNacional();
    this.data_distribucion = [];
  }
}
