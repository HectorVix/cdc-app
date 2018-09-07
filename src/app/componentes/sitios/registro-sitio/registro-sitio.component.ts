import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { criterio_Sitio } from '../../../modelo/select/overview-sitio';
import { debounceTime } from 'rxjs/operators';
import { UsuarioService } from '../../../servicios/usuario.service';
import { Sitio } from '../../../modelo/sitio/sitio-modelo';
//import { criterio_le } from '.././criterio-le';

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
  criterio_Sitio= new criterio_Sitio();
  criterio_mapasitio = this.criterio_Sitio.mapasitio;
  criterio_rangoant= this.criterio_Sitio.rangoant;
  criterio_impdivbiol = this.criterio_Sitio.impdivbiol;
  criterio_impnodivbiol = this.criterio_Sitio.impnodivbiol;
  criterio_urgencia = this.criterio_Sitio.urgencia;
  private _success = new Subject<string>();
  staticAlertClosed = false;
  successMessage: string;
  tipoAlert: string;

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
 


  constructor(private fb: FormBuilder,private usuarioService: UsuarioService) {
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
      'lista_identificadores': '', //codmacsitio, nommacsitio, codmegsitio, nommegsitio
      //localizadores
      'nacion': '',
      'subnacion': '',
      'siteresp': '',
      'lista_localizadores': '',//codsubdiv, nomsubdiv, nommapa, codmapa
      'lat': '',
      'long': '',
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
      'areaprisec1': '',//number
      'areaprisec2': '',
      'areapri1': '',//number
      'areapri2': '',
      'areatotal1': '',//number
      'areatotal2': '',
      'comsitio': '',
      //página 2
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
    console.log(this.sitioForm.value);
   var sitio = new Sitio();
   sitio.codsitio="hola vix xd";

    this.addSitio(sitio);
  }
    //agrega un nuevo registro de sitio 
    addSitio(sitio: Sitio): void {
      this.usuarioService.addSitio(sitio)
        .subscribe(
          resElemento => {
            this.changeSuccessMessage(`Se registro el sitio  :${resElemento.codsitio}.`, 'success');
          //  this.crearFormLocalizacion_Elemento();
          }, err => {
            this.changeSuccessMessage('No se pudo regitrar el Sitio.', 'primary');
          });
    }

  public changeSuccessMessage(mensaje: string, tipo: string) {
    this.tipoAlert = tipo;
    this._success.next(mensaje);
  }

  //Mapa del sitio
  getCriterio_MapaSitio(i: number) {
    switch (i) {
      case 0: '';
      case 1: 'S';
      case 2: 'P';
      case 3: 'N';
    }
  }
  //Rango anterior (se omitieron rango 3 y 4 ya que pierden su sentido en el contexto de Sitio)
  getCriterio_rangoAnterior(i: number) {
    switch (i) {
      case 0: '';
      case 1: '1';
      case 2: '2';
      case 5: '5';
    }
  }
  //Importancia para la Diversidad Biológica
  getCriterio_impdivbiol(i: number) {
    switch (i) {
      case 0: '';
      case 1: 'E1';
      case 2: 'E2';
      case 3: 'E3';
      case 4: 'E4';
      case 5: 'E5';
    }
  }
  //Importancia No relacionada con la Bio-diversidad
  getCriterio_impnodivbiol(i: number) {
    switch (i) {
      case 0: '';
      case 1: 'V1';
      case 2: 'V2';
      case 3: 'V3';
      case 4: 'V4';
      case 5: 'V5';
    }
  }
  //Urgencia de protección del Sitio
  getCriterio_Urgencia(i: number) {
    switch (i) {
      case 0: '';
      case 1: 'U1';
      case 2: 'U2';
      case 3: 'U3';
      case 4: 'U4';
      case 5: 'U5';
    }
  }
}
