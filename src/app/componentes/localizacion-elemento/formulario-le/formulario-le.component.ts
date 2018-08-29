import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common'
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { Proteccion, CamposOpcionales } from '../../../modelo/tabla';
import { criterio_le } from '../../../modelo/criterio-le';
import { UsuarioService } from '../../../servicios/usuario.service';
import { localizacion_Elemento_Modelo } from '../../../modelo/localizacion-elemento-modelo';

const now = new Date();
@Component({
  selector: 'app-formulario-le',
  templateUrl: './formulario-le.component.html',
  styleUrls: ['./formulario-le.component.scss']
})
export class FormularioLeComponent implements OnInit {

  source_proteccion: Proteccion[];
  campos_Opcionales: CamposOpcionales[];
  leForm: FormGroup;
  criterio_le = new criterio_le();
  criterio_si_no = this.criterio_le.si_no;
  criterio_rango_le = this.criterio_le.rango_le;
  criterio_rangog = this.criterio_le.rangog;
  criterio_rangon = this.criterio_le.rangon;
  private _success = new Subject<string>();
  staticAlertClosed = false;
  successMessage: string;
  tipoAlert: string;
  settings_proteccion = {
    columns: {
      codigoam: {
        title: 'CODIGOAM'
      },
      nombream: {
        title: 'NOMBREAM'
      },
      CONTENIDO: {
        title: 'CONTENIDO'
      }
    }
  };
  settings_Campos_Opcionales = {
    columns: {

      datos: {
        title: 'DATOS'
      }
    }
  };
  constructor(private fb: FormBuilder, private usuarioService: UsuarioService) {
    this.crearFormLocalizacion_Elemento();
  }

  ngOnInit() {
    setTimeout(() => this.staticAlertClosed = true, 20000);
    this._success.subscribe((message) => this.successMessage = message);
    this._success.pipe(
      debounceTime(5000)
    ).subscribe(() => this.successMessage = null);
  }
  crearFormLocalizacion_Elemento() {
    this.leForm = this.fb.group({
      //página1
      //identificadores
      'codigole': ['', Validators.required],
      'ident': '',
      'nombres': '',
      'nomcomuns': '',
      'rangog': '',
      'rangon': '',
      'rangos': '',
      //localizadores
      'subnacion': '',
      'subdivision': '',
      'codsitio': '',
      'nomsitio': '',
      'sitioeva': '',
      'precision': '',
      'nommapa': '',
      'codmapa': '',
      'nummarg': '',
      'numpunto': '',
      'diezdiez': '',
      'latitud': '',
      'longitud': '',
      'coords': '',
      'coordn': '',
      'coorde': '',
      'coordo': '',
      'direccion': '',
      'ecoregion': '',
      'cuenca': '',
      //status
      'fechaeva': '',
      'ultobs': '',
      'priobs': '',
      'rangole': '',
      'fecharangole': '',
      'comrangole': '',
      'resprg': '',
      'datosle': '',
      'contacto': '',
      'numcontacto': '',
      //descripción
      'desgen': '',
      'elev': '',
      'area': '',
      //protección
      //'lista_proteccion': '',
      'masterreno': '',
      'masprotec': '',
      'masmanejo': '',
      'involtnc': '',
      'commanejo': '',
      'comprot': '',
      //propietario
      'prop': '',
      'infprop': '',
      'comprop': '',
      //campos opcionales
      'leopc1': '', 'leopc2': '', 'leopc3': '', 'leopc4': '', 'leopc5': '', 'leopc6': '', 'leopc7': '', 'leopc8': '', 'leopc9': '', 'leopc10': '',
      //comentarios generales
      'comentario': '',
      //documentación y mantenimiento
      'sensdatos': '',
      'limites': '',
      'fotos': '',
      'mejorfuente': '',
      'codfuente': '',
      'transcrito': '',
      'mdrev': '',
      'cartografo': '',
      'cc': '',
      'respdatos': '',
      'actualizar': ''

    });
  }

  guardarLocalizacion() {
    console.log(this.leForm.value);
    var localizacionElementoBase = this.setLocalizacionElemento(this.leForm.value);
    this.addLocalizacionElemento(localizacionElementoBase);
  }
  setLocalizacionElemento(datos: localizacion_Elemento_Modelo): localizacion_Elemento_Modelo {
    datos.fechaeva = this.usuarioService.toFormato(this.leForm.get('fechaeva').value);
    datos.ultobs = this.usuarioService.toFormato(this.leForm.get('ultobs').value);
    datos.fecharangole = this.usuarioService.toFormato(this.leForm.get('fecharangole').value);
    datos.transcrito = this.usuarioService.toFormato(this.leForm.get('transcrito').value);
    datos.cartografo = this.usuarioService.toFormato(this.leForm.get('cartografo').value);
    datos.actualizar = this.usuarioService.toFormato(this.leForm.get('actualizar').value);
    return datos;
  }

  //agrega un nuevo registro rastreo elemento
  addLocalizacionElemento(localizacionElemento: localizacion_Elemento_Modelo): void {
    this.usuarioService.addLocalizacionElemento(localizacionElemento)
      .subscribe(
        resElemento => {
          this.changeSuccessMessage(`Se registro la localización del elemento :${resElemento.codigole}.`, 'success');
        //  this.crearFormLocalizacion_Elemento();
        }, err => {
          this.changeSuccessMessage('No se pudo regitrar.', 'primary');
        });
  }

  public changeSuccessMessage(mensaje: string, tipo: string) {
    this.tipoAlert = tipo;
    this._success.next(mensaje);
  }


  /*
   * Comun para 
   *  ident, amadicion, masterreno, masprotec, masmanejo, sensdatos, limites, fotos, 
   *  infprop, mdrev, cc
   */

  getCriterio_Si_No(i: number) {
    switch (i) {
      case 0: return '';
      case 1: return '1';  //SI
      case 2: return '0';  //NO
    }
  }

  getCriterio_Rangole(i: number) {
    switch (i) {
      case 0: return '';
      case 1: return 'A';
      case 2: return 'B';
      case 3: return 'C';
      case 4: return 'D';
      case 5: return 'X';
    }
  }

}
