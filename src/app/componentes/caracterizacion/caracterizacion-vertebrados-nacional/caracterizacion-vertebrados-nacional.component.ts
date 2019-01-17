import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { caracterizacion_Modelo } from '../../../modelo/resumen/caracterizacion-modelo';
import { vertebrado_Modelo } from '../../../modelo/resumen/vertebrado-modelo';
import { distribucion_Modelo } from '../../../modelo/resumen/distribucion-modelo';
import { distribucion2_Modelo } from '../../../modelo/resumen/distribucion2-modelo';
import { ConfirmacionComponent } from '../../../componentes/dialogo/confirmacion/confirmacion.component';
import { MatDialog } from '@angular/material';
import { CaracterizacionService } from '../../../servicios/caracterizacion/caracterizacion.service';
import { FechaService } from '../../../servicios/fecha/fecha.service';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-caracterizacion-vertebrados-nacional',
  templateUrl: './caracterizacion-vertebrados-nacional.component.html',
  styleUrls: ['./caracterizacion-vertebrados-nacional.component.scss']
})
export class CaracterizacionVertebradosNacionalComponent implements OnInit {
  caracterizacionVertebradosNacional: FormGroup;
  cVertebradoPruebas: FormGroup;
  data_Distribucion1 = [];
  data_Distribucion2 = [];

  private _success = new Subject<string>();
  staticAlertClosed = false;
  successMessage: string;
  tipoAlert: string;
  loading: boolean;
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
  selected = new FormControl(0);
  constructor(private fb: FormBuilder,
    private dialog: MatDialog,
    private caracterizacionServicio: CaracterizacionService,
    private fechaServicio: FechaService) {
    this.crearForm_caracterizacionVertebradosNacional();
  }

  ngOnInit() {
    setTimeout(() => this.staticAlertClosed = true, 50000);
    this._success.subscribe((message) => this.successMessage = message);
    this._success.pipe(
      debounceTime(10000)
    ).subscribe(() => this.successMessage = null);
  }
  crearForm_caracterizacionVertebradosNacional() {
    this.caracterizacionVertebradosNacional = this.fb.group({
      //identificadores
      'codigoe': ['', Validators.required],
      'nacion': '',
      'nombreg': '',
      'autor': '',
      'nombren': '',
      'nomcomunn': '',
      //taxonomía
      'clasetax': '',
      'orden': '',
      'familia': '',
      'genero': '',
      'comtaxg': '',
      'comsubespn': '',
      //status
      'rangog': '',
      'cites': '',
      'uicn': '',
      'aepeu': '',
      'fechaaepeu': '',//date
      'endemismo': '',
      'comstatg': '',
      'rangon': '',
      'protnacion': '',
      'rastreolen': '',
      'espdeportn': '',
      'espcomern': '',
      'pezdeport': '',
      'ndeportpro': '',
      'cazapieln': '',
      'pesten': '',
      'comstatn': '',
      //distribución
      //'lista_distribucion1': '',
      //'lista_distribucion2': '',
      'elevminn': '',//Number 
      'elevmaxn': '',//Number
      'comdistg': '',
      'comdistn': '',
      //migración
      'residente': '',
      'miglocal': '',
      'migdist': '',
      'repn': '',
      'norepn': '',
      'transmign': '',
      'aparirregn': '',
      'mign': '',
      'commigg': '',
      'commign': '',
      //habitat
      'marino': '',
      'estuarino': '',
      'fluvial': '',
      'lacustre': '',
      'palustre': '',
      'terrestre': '',
      'subterran': '',
      'factorespe': '',
      'comhabg': '',
      'comhabrep': '',
      'comhabn': '',
      //hábitos alimenticios
      'habitosalim': '',
      'comalimg': '',
      'comalimn': '',
      //ecología
      'comecolg': '',
      'comecoln': '',
      //fenología-Estacionalidad
      'fenologia': '',
      'nenea': '', 'nabra': '', 'njula': '', 'nocta': '',
      'neneb': '', 'nabrb': '', 'njulb': '', 'noctb': '',
      'nfeba': '', 'nmaya': '', 'nagoa': '', 'nnova': '',
      'nfebb': '', 'nmayb': '', 'nagob': '', 'nnovb': '',
      'nmara': '', 'njuna': '', 'nseta': '', 'ndica': '',
      'nmarb': '', 'njunb': '', 'nsetb': '', 'ndicb': '',
      'comfenolg': '',
      'comfenoln': '',
      //reproducción
      'colrep': '',
      'comrepg': '',
      'comrepn': '',
      //manejo
      'commanejog': '',
      'commanejon': '',
      //atributos misceláneos
      'usoeconom': '',
      'longitud': '',
      'peso': '',
      //campos opcionales
      'rcvnopc1': '',
      'rcvnopc2': '',
      'rcvnopc3': '',
      'rcvnopc4': '',
      'rcvnopc5': '',
      //referencias
      'refg': '',
      'refn': '',
      //matenimiento del registro
      'ediciong': '', //date
      'actualizag': '', //date
      'edicionn': '',  //date
      'actualizan': ''//date
    });
  }
  guardar_Caracterizacion_Vertebrado() {
    var caracterizacion_Vertebrado = new caracterizacion_Modelo();
    var vertebradoLista: Array<vertebrado_Modelo> = new Array();
    var distribucion1: Array<distribucion_Modelo> = new Array();
    var distribucion2: Array<distribucion2_Modelo> = new Array();

    var vertebradoBase = this.setVertebrado(this.caracterizacionVertebradosNacional.value);
    this.data_Distribucion1.forEach(data_distribucion1 => {
      var distribucionBase = new distribucion_Modelo();
      distribucionBase.codsubnac = data_distribucion1.codsubnac;
      distribucionBase.nomsubnac = data_distribucion1.nomsubnac;
      distribucionBase.statsubnac = data_distribucion1.statsubnac;
      distribucion1.push(distribucionBase);
    });

    this.data_Distribucion2.forEach(data_distribucion2 => {
      var distribucionBase2 = new distribucion2_Modelo();
      distribucionBase2.codecoregn = data_distribucion2.codecoregn;
      distribucionBase2.statecoregn = data_distribucion2.statecoregn;
      distribucionBase2.codcuencan = data_distribucion2.codcuencan;
      distribucionBase2.statcuencan = data_distribucion2.statcuencan;
      distribucion2.push(distribucionBase2);
    });
    vertebradoBase.distribucionList = distribucion1;
    vertebradoBase.distribucion2List = distribucion2;
    vertebradoLista.push(vertebradoBase);
    caracterizacion_Vertebrado.vertebradoList = vertebradoLista;
    this.addCaracterizacionVertebrado(caracterizacion_Vertebrado);
  }
  setVertebrado(datos: vertebrado_Modelo): vertebrado_Modelo {
    datos.fechaaepeu = this.fechaServicio.toFormatoDateTime(this.caracterizacionVertebradosNacional.get('fechaaepeu').value);
    datos.ediciong = this.fechaServicio.toFormatoDateTime(this.caracterizacionVertebradosNacional.get('ediciong').value);
    datos.actualizag = this.fechaServicio.toFormatoDateTime(this.caracterizacionVertebradosNacional.get('actualizag').value);
    datos.edicionn = this.fechaServicio.toFormatoDateTime(this.caracterizacionVertebradosNacional.get('edicionn').value);
    datos.actualizan = this.fechaServicio.toFormatoDateTime(this.caracterizacionVertebradosNacional.get('actualizan').value);
    return datos;
  }
  //agrega un nuevo registro de caracterizacion de vertebrado nacional
  addCaracterizacionVertebrado(caracterizacion: caracterizacion_Modelo): void {
    this.loading = true;
    this.caracterizacionServicio.addCaracterizacionVertebrado(caracterizacion)
      .subscribe(
        resVertebrado => {
          this.loading = false;
          this.changeSuccessMessage(`Se registro la caracterizacion del vertebrado :${resVertebrado.codigoe}.`, 'success');
        }, err => {
          this.loading = false;
          this.changeSuccessMessage('No se pudo regitrar la caracterizacion del vertebrado. Comprueba que exista el elemento, verifica que el servidor este disponible , tiene que estar activo CORS Toggle',
            'primary');
        });
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
  tabPagina5() {
    this.selected.setValue(4);
  }
  openDialogo(): void {
    const dialogRef = this.dialog.open(ConfirmacionComponent, {
      width: '250px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result)
        this.guardar_Caracterizacion_Vertebrado();
    });
  }
  public changeSuccessMessage(mensaje: string, tipo: string) {
    this.tipoAlert = tipo;
    this._success.next(mensaje);
  }
}
