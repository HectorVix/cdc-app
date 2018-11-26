import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { criterio_Sitio } from '../../../modelo/select/overview-sitio';
import { debounceTime } from 'rxjs/operators';
import { UsuarioService } from '../../../servicios/usuario.service';
import { sitio_Modelo } from '../../../modelo/sitio/sitio-modelo';
import { ConfirmacionComponent } from '../../../componentes/dialogo/confirmacion/confirmacion.component';
import { MatDialog } from '@angular/material';

import { Identificadores_Sitio, Localizadores_Sitio } from '../../../modelo/tablas/tabla';
@Component({
  selector: 'app-registro-sitio',
  templateUrl: './registro-sitio.component.html',
  styleUrls: ['./registro-sitio.component.scss']
})
export class RegistroSitioComponent implements OnInit {
  source_identificadores_Sitio: Identificadores_Sitio[];
  source_localizadores_Sitio: Localizadores_Sitio[];
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
