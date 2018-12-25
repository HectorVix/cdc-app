import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { criterio_Sitio } from '../../../modelo/select/overview-sitio';
import { debounceTime } from 'rxjs/operators';
import { UsuarioService } from '../../../servicios/usuario.service';
import { sitio_Modelo } from '../../../modelo/sitio/sitio-modelo';
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
  constructor(private fb: FormBuilder, private usuarioService: UsuarioService,
    private dialog: MatDialog) {
    this.crearFormSitio();
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
  guardarSitio() {
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
  setSitio(datos: sitio_Modelo): sitio_Modelo {
    datos.fechamapa = this.usuarioService.toFormato(this.sitioForm.get('fechamapa').value);
    datos.actualizar = this.usuarioService.toFormato(this.sitioForm.get('actualizar').value);
    return datos;
  }
  //agrega un nuevo registro de sitio 
  addSitio(sitio: sitio_Modelo): void {
    this.loading = true;
    this.usuarioService.addSitio(sitio)
      .subscribe(
        resElemento => {
          this.loading = false;
          this.changeSuccessMessage(`Se registro el sitio  :${resElemento.codsitio}.`, 'success');
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
}
