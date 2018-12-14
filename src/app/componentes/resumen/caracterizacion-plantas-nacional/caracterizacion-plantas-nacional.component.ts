import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Distribucion1_Resumen, Distribucion2_Resumen, CamposOpcionales } from '../../../modelo/tablas/tabla';
import { caracterizacion_Modelo } from '../../../modelo/resumen/caracterizacion-modelo';
import { planta_Modelo } from '../../../modelo/resumen/planta-modelo';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { UsuarioService } from '../../../servicios/usuario.service';
import { ConfirmacionComponent } from '../../../componentes/dialogo/confirmacion/confirmacion.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-caracterizacion-plantas-nacional',
  templateUrl: './caracterizacion-plantas-nacional.component.html',
  styleUrls: ['./caracterizacion-plantas-nacional.component.scss']
})
export class CaracterizacionPlantasNacionalComponent implements OnInit {
  caracterizacionPlantasNacionalForm: FormGroup;
  source_Distribucion1: Distribucion1_Resumen[];
  source_Distribucion2: Distribucion2_Resumen[];
  source_CamposOpcionales: CamposOpcionales[];
  private _success = new Subject<string>();
  staticAlertClosed = false;
  successMessage: string;
  tipoAlert: string;
  loading: boolean;
  selected = new FormControl(0);

  settings_CamposOpcionales = {
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
  constructor(private fb: FormBuilder, private usuarioService: UsuarioService,
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
      'nenea1':'',
      'nenea2':'',
      'nenea3':'',
      'nenea4':'',

      'nmara1':'',
      'nmara2':'',
      'nmara3':'',
      'nmara4':'',

      'nmaya1':'',
      'nmaya2':'',
      'nmaya3':'',
      'nmaya4':'',
      
      'njula1':'',
      'njula2':'',
      'njula3':'',
      'njula4':'',

      'nseta1':'',
      'nseta2':'',
      'nseta3':'',
      'nseta4':'',

      'nnova1':'',
      'nnova2':'',
      'nnova3':'',
      'nnova4':'',
   
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
    console.log(this.caracterizacionPlantasNacionalForm.value);
    var cplanta = new caracterizacion_Modelo();
    var plantaBase = this.setPlanta(this.caracterizacionPlantasNacionalForm.value);
    var planta: Array<planta_Modelo> = new Array();
    planta.push(plantaBase);
    cplanta.plantaList = planta;
    this.addCaracterizacionPlanta(cplanta);
  }

  setPlanta(datos: planta_Modelo): planta_Modelo {
    datos.edicionn = this.usuarioService.toFormato(this.caracterizacionPlantasNacionalForm.get('edicionn').value);
    datos.actualizan = this.usuarioService.toFormato(this.caracterizacionPlantasNacionalForm.get('actualizan').value);
    return datos;
  }
  //agrega un nuevo registro de caracterizacion de planta
  addCaracterizacionPlanta(caracterizacion: caracterizacion_Modelo): void {
    this.loading = true;
    this.usuarioService.addCaracterizacionPlanta(caracterizacion)
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
}
