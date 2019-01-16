import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { criterio_Sitio } from '../../../modelo/select/overview-sitio';
import { debounceTime } from 'rxjs/operators';
import { SitioService } from '../../../servicios/sitio/sitio.service';
import { FechaService } from '../../../servicios/fecha/fecha.service';
import { sitio_Modelo } from '../../../modelo/sitio/sitio-modelo';
import { respuesta_cdc_Modelo } from '../../../modelo/respuestaServicio/respuesta-cdc';
import { macsitio_Modelo } from '../../../modelo/sitio/macsitio-modelo';
import { subdivision_Modelo } from '../../../modelo/sitio/subdivision-modelo';
import { ConfirmacionComponent } from '../../../componentes/dialogo/confirmacion/confirmacion.component';
import { MatDialog } from '@angular/material';


@Component({
  selector: 'app-registro-sitio',
  templateUrl: './registro-sitio.component.html',
  styleUrls: ['./registro-sitio.component.scss']
})
export class RegistroSitioComponent implements OnInit {
  data_macsitio = [];
  data_subdivision = [];
  sitioForm: FormGroup;   //formulario de sitio
  buscarForm: FormGroup;   //formulario de sitio
  criterio_Sitio = new criterio_Sitio();
  criterio_mapasitio = this.criterio_Sitio.mapasitio;
  criterio_rangoant = this.criterio_Sitio.rangoant;
  criterio_impdivbiol = this.criterio_Sitio.impdivbiol;
  criterio_impnodivbiol = this.criterio_Sitio.impnodivbiol;
  criterio_urgencia = this.criterio_Sitio.urgencia;
  private _success = new Subject<string>();
  staticAlertClosed = false;
  successMessage: string;
  tipoAlert: string;
  loading: boolean;
  settings_Identificadores_Sitio = {
    columns: {
      codmacsitio: {
        title: 'CODMACSITIO'
      },
      nommacsitio: {
        title: 'NOMMACSITIO'
      }
    }
  };
  settings_Localizadores_Sitio = {
    columns: {
      codsubdiv: {
        title: 'CODSUBDIV'
      },
      nomsubdiv: {
        title: 'NOMSUBDIV'
      },
      nommapa: {
        title: 'NOMMAPA'
      },
      codmapa: {
        title: 'CODMAPA'
      },
    }
  };
  selected = new FormControl(0);
  constructor(private fb: FormBuilder, private fb2: FormBuilder,
    private sitioServicio: SitioService,
    private fechaServicio: FechaService,
    private dialog: MatDialog) {
    this.crearFormSitio();
    this.crearFormBuscar();
  }

  ngOnInit() {
    setTimeout(() => this.staticAlertClosed = true, 20000);
    this._success.subscribe((message) => this.successMessage = message);
    this._success.pipe(
      debounceTime(5000)
    ).subscribe(() => this.successMessage = null);
  }
  crearFormSitio() {
    this.sitioForm = this.fb.group({
      //página1
      //identificadores
      'codsitio': ['', Validators.required],
      'nomsitio': '',
      'sinsitio': '',
      //localizadores
      'nacion': '',
      'subnacion': '',
      'siteresp': '',
      'lat': '',
      'long1': '',
      'coords': '',
      'coordn': '',
      'coorde': '',
      'coordo': '',
      'direccion': '',
      //descripción del sitio/diseño
      'descrito': '',
      'mapasitio': '',
      'fechamapa': '',
      'dibujante': '',
      'justlimite': '',
      'areaprisec1': '',
      'areaprisec2': '',
      'areapri1': '',
      'areapri2': '',
      'areatotal1': '',
      'areatotal2': '',
      'comsitio': '',
      //importancia del sitio
      'rangoant': '',
      'comrango': '',
      'impdivbiol': '',
      'comdivbiol': '',
      'impnodivbiol': '',
      'comnodivbiol': '',
      'urgencia': '',
      'comurgencia': '',
      //bienes raíces y portección
      'intenccons': '',
      'numlotes': '',
      'costestprot1': '',
      'costestprot2': '',
      'coddesig': '',
      'designacion': '',
      'comprot': '',
      //administración
      'comusotierra': '',
      'compeligrnat': '',
      'comexoticas': '',
      'usotierraf': '',
      'necinform': '',
      'necmanejo': '',
      'comam': '',
      //campos opcionales
      'rbsopc1': '',
      'rbsopc2': '',
      'rbsopc3': '',
      'rbsopc4': '',
      'rbsopc5': '',
      //mantenimiento del registro
      'respdatos': '',
      'actualizar': ''
    });
  }
  crearFormBuscar() {
    this.buscarForm = this.fb2.group({
      'codigoSitio': '',
      'nombreSitio': '',
      'sinonimoSitio': '',
      'depto': ''
    });
  }
  guardarSitio() {
    if (this.sitioForm.get('codsitio').value) {
      var sitioBase = this.setSitio(this.sitioForm.value);
      var macsitio: Array<macsitio_Modelo> = new Array();
      var subdivision: Array<subdivision_Modelo> = new Array();
      this.data_macsitio.forEach(data_macsitio => {
        var macsitioBase = new macsitio_Modelo();
        macsitioBase.codmacsitio = data_macsitio.codmacsitio;
        macsitioBase.nommacsitio = data_macsitio.nommacsitio;
        macsitio.push(macsitioBase);
      });
      this.data_subdivision.forEach(data_subdivision => {
        var subdivisionBase = new subdivision_Modelo();
        subdivisionBase.codsubdiv = data_subdivision.codsubdiv;
        subdivisionBase.nomsubdiv = data_subdivision.nomsubdiv;
        subdivisionBase.nommapa = data_subdivision.nommapa;
        subdivisionBase.codmapa = data_subdivision.codmapa;
        subdivision.push(subdivisionBase);
      });
      sitioBase.macsitioList = macsitio;
      sitioBase.subdivisionList = subdivision;
      this.addSitio(sitioBase);
    }
    else
      this.changeSuccessMessage('No se pudo regitrar el Sitio. El codigo del sitio es obligatorio', 'warning');
  }
  setSitio(datos: sitio_Modelo): sitio_Modelo {
    datos.fechamapa = this.fechaServicio.toFormatoDateTime(this.sitioForm.get('fechamapa').value);
    datos.actualizar = this.fechaServicio.toFormatoDateTime(this.sitioForm.get('actualizar').value);
    return datos;
  }
  //agrega un nuevo registro de sitio 
  addSitio(sitio: sitio_Modelo): void {
    this.loading = true;
    this.sitioServicio.addSitio(sitio)
      .subscribe(
        resSitio => {
          this.loading = false;
          this.changeSuccessMessage(`Se registro el sitio  :${resSitio.codsitio}.`, 'success');
        }, err => {
          this.loading = false;
          this.changeSuccessMessage('No se pudo regitrar el Sitio.', 'primary');
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
  openDialogo(): void {
    const dialogRef = this.dialog.open(ConfirmacionComponent, {
      width: '250px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result)
        this.guardarSitio();
    });
  }
  openDialogoEditar(): void {
    const dialogRef = this.dialog.open(ConfirmacionComponent, {
      width: '250px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result)
        this.editarSitio();
    });
  }
  editarSitio() {
    console.log('Listo para editar');
  }
  buscarSitio() {
    var a = "~^ªº~†⑦→∞¬¬";
    var b = "~^ªº~†⑦→∞¬¬";
    var c = "~^ªº~†⑦→∞¬¬";
    var d = "~^ªº~†⑦→∞¬¬";
    if (this.buscarForm.get('codigoSitio').value)
      a = this.buscarForm.get('codigoSitio').value;
    if (this.buscarForm.get('nombreSitio').value)
      b = this.buscarForm.get('nombreSitio').value;
    if (this.buscarForm.get('sinonimoSitio').value)
      c = this.buscarForm.get('sinonimoSitio').value;
    if (this.buscarForm.get('depto').value)
      d = this.buscarForm.get('depto').value;
    console.log('buscar:', a, b, c, d);
  }
}
