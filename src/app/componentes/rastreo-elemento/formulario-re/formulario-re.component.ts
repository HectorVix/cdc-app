import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common'
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { DISABLED } from '@angular/forms/src/model';
import { disableDebugTools } from '@angular/platform-browser';
import { criterio_re } from '../../../modelo/criterio-re';
import { UsuarioService } from '../../../servicios/usuario.service';
import { elemento_Modelo } from '../../../modelo/jerarquizacion/elemento-modelo';
import { rastreo_Elemento_Modelo } from '../../../modelo/rastreo/rastreo-elemento-modelo';


@Component({
  selector: 'app-formulario-re',
  templateUrl: './formulario-re.component.html',
  styleUrls: ['./formulario-re.component.scss']
})
export class FormularioReComponent implements OnInit {
  reForm: FormGroup;
  criterio_re = new criterio_re();
  criterio_disttax = this.criterio_re.disttax;
  criterio_dudatax = this.criterio_re.dudatax;
  criterio_rangog = this.criterio_re.rangog;
  criterio_compu_manual = this.criterio_re.compu_manual;//formularg, plancons, resplan, resumenman, formularn, formulars
  criterio_endemismo = this.criterio_re.endemismo;
  criterio_rangon = this.criterio_re.rangon;
  criterio_cites = this.criterio_re.cites;
  criterio_iucn = this.criterio_re.iucn;
  criterio_si_no = this.criterio_re.si_no;// exsitu, transparen  
  criterio_listacdc = this.criterio_re.listacdc;
  private _success = new Subject<string>();
  staticAlertClosed = false;
  successMessage: string;
  tipoAlert: string;
  constructor(
    private fb: FormBuilder, private usuarioService: UsuarioService
  ) {
    this.crearFormRastreoElemento();
  }

  ngOnInit() {
    setTimeout(() => this.staticAlertClosed = true, 20000);
    this._success.subscribe((message) => this.successMessage = message);
    this._success.pipe(
      debounceTime(5000)
    ).subscribe(() => this.successMessage = null);
  }


  guardarRastreoElemento() {
    console.log(this.reForm.value);
    var rastreoElementoBase = this.setRastreoElemento(this.reForm.value);
    this.addRastroeElemento(rastreoElementoBase);
  }
  setRastreoElemento(datos: rastreo_Elemento_Modelo): rastreo_Elemento_Modelo {
    datos.fecharevrg = this.usuarioService.toFormato(this.reForm.get('fecharevrg').value);
    datos.fechaaepeu = this.usuarioService.toFormato(this.reForm.get('fechaaepeu').value);
    datos.fecharevrn = this.usuarioService.toFormato(this.reForm.get('fecharevrn').value);
    datos.fecharevrs = this.usuarioService.toFormato(this.reForm.get('fecharevrs').value);
    datos.actualizag = this.usuarioService.toFormato(this.reForm.get('actualizag').value);
    datos.actualizan = this.usuarioService.toFormato(this.reForm.get('actualizan').value);
    datos.actualizas = this.usuarioService.toFormato(this.reForm.get('actualizas').value);
    return datos;
  }

  //agrega un nuevo registro rastreo elemento
  addRastroeElemento(rastreoElemento: rastreo_Elemento_Modelo): void {
    this.usuarioService.addRastreoElemento(rastreoElemento)
      .subscribe(
        resElemento => {
          this.changeSuccessMessage(`Se registro el ratreo del elemento :${resElemento.codigoe}.`, 'success');
          this.crearFormRastreoElemento();
        }, err => {
          this.changeSuccessMessage('No se pudo regitrar.', 'primary');
        });
  }
  //crear formulario Rastreo Elemento
  crearFormRastreoElemento() {
    this.reForm = this.fb.group({
      //pagina1
      //identificadores
      'codigoe': ['', Validators.required],
      'tropicos': ['', Validators.required],
      'nacion': ['', Validators.required],
      'subnacion': '',
      //taxonomia (global)
      'clasetax': '',
      'orden': '',
      'familia': '',
      'genero': '',
      'nombreg': '',
      'autor': '',
      'fuentenom': '',
      'refnombreg': '',
      'disttax': '',
      'dudatax': '',
      'nomcomung': '',
      'comtaxg': '',
      //taxonomia (nacional)
      'nombren': '',
      'numsinn': '',
      'nomcomunn': '',
      'comtaxn': '',
      //status (global)
      'rangog': '',
      'fecharevrg': '',
      'formularg': '',
      'resprg': '',
      'aepeu': '',
      'fechaaepeu': '',
      'cites': '',
      'iucn': '',
      'planscons': '',
      'resplan': '',
      'resumenman': '',
      'resresumen': '',
      'exsitu': '',
      'instexsitu': '',
      'endemismo': '',
      //status (nacional)
      'rangon': '',
      'fecharevrn': '',
      'formularn': '',
      'rastreolen': '',
      'lestimn': '',
      'leprotn': '',
      'abundn': '',
      'protnacion': '',
      'refnombren': '',
      'transparencian': '',
      //status (subnacional)
      'rangos': '',
      'fecharevrs': '',
      'formulars': '',
      'rastreoles': '',
      'lestims': '',
      'leprots': '',
      'abunds': '',
      'protsubnac': '',
      'refnombres': '',
      'transparencias': '',
      //campos opcionales
      'reopc1': '',
      'reopc2': '',
      'reopc3': '',
      'reopc4': '',
      'reopc5': '',
      // manteniiento del registro
      'codfuenten': '',
      'codfuentes': '',
      'actualizag': '',
      'actualizan': '',
      'actualizas': ''
    });
  }
  //validar codigoe 
  validarCodigoe() {
    this.ValidarElementoCodigoe(this.reForm.get('codigoe').value);
  }
  ValidarElementoCodigoe(codigoe: String): elemento_Modelo {
    var elemento: elemento_Modelo;
    this.usuarioService.validarElementoCodigoe(codigoe)
      .subscribe(
        resElemento => {
          elemento = resElemento;
          console.log("validado elemento ok:" + resElemento.elementoId);
          this.changeSuccessMessage(`Si existe el elemento:${codigoe}.`, 'success');
        }, err => {
          this.changeSuccessMessage('No existe el elemento, por favor ingresa un codigo valido.', 'primary');
        });

    return elemento;
  }

  public changeSuccessMessage(mensaje: string, tipo: string) {
    this.tipoAlert = tipo;
    this._success.next(mensaje);
  }





  /****
   * Comun para 
   * formularg, plancons, resplan, resumenman, formularn
   */
  getCriterio_Compu_Manual(i: number) {
    switch (i) {
      case 0: return '';
      case 1: return 'C';
      case 2: return 'M';
    }

  }
  /****
 * Comun para 
 * disttax, dudatax
 */
  getCriterio_Tax(i: number) {
    switch (i) {
      case 0: return '';
      case 1: return 'A';
      case 2: return 'B';
      case 3: return 'C';
      case 4: return 'D';
    }
  }
  getCriterio_Endemismo(i: number) {
    switch (i) {
      case 0: return '';
      case 1: return 'S';
      case 2: return 'N';
      case 3: return 'M';
    }
  }
  getCriterio_Cites(i: number) {
    switch (i) {
      case 0: return '';
      case 1: return '1';
      case 2: return '2';
      case 3: return '3';
    }
  }
  getCriterio_Iucn(i: number) {
    switch (i) {
      case 0: return '';
      case 1: return 'EX';
      case 2: return 'E';
      case 3: return 'V';
      case 4: return 'R';
      case 5: return 'I';
      case 6: return 'K';
      case 7: return 'O';
      case 8: return 'NT';
    }
  }
  /*
  * Comun para 
  * exsitu, transparen
  */
  getCriterio_Si_No(i: number) {
    switch (i) {
      case 0: return '';
      case 1: return '1';
      case 2: return '0';
    }
  }
  getCriterio_Lista_Cdc(i: number) {
    switch (i) {
      case 0: return '';
      case 1: return 'S';
      case 2: return 'P';
      case 3: return 'N';
    }
  }

}
