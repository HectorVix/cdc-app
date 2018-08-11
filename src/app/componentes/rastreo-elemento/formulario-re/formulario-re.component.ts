import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common'
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { DISABLED } from '@angular/forms/src/model';
import { disableDebugTools } from '@angular/platform-browser';
import { criterio_re } from '../../../modelo/criterio-re';
const now = new Date();
@Component({
  selector: 'app-formulario-re',
  templateUrl: './formulario-re.component.html',
  styleUrls: ['./formulario-re.component.scss']
})
export class FormularioReComponent implements OnInit {
  reForm: FormGroup;
  date: { year: number, month: number };
  modelDate: NgbDateStruct;
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
  constructor(
    private fb: FormBuilder
  ) {
    this.crearFormRastreoElemento();
  }

  ngOnInit() {
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
      'fecha_revrg': '',
      'formularg': '',
      'resprg': '',
      'aepeu': '',
      'fecha_aepeu': '',
      'cites': '',
      'iucn': '',
      'planscons': '',
      'resplan': '',
      'resumenman': '',
      'resresumen': '',
      'exsitu': '',
      'inst_exsitu': '',
      'endemismo': '',
      //status (nacional)
      'rangon': '',
      'fecha_revrn': '',
      'formularn': '',
      'rastreolen': '',
      'lestimn': [''],
      'leprotn': '',
      'abundn': '',
      'protnacion': '',
      'refnombren': '',
      'transparencian': '',
      //status (subnacional)
      'rangos': '',
      'fecha_revrs': '',
      'formulars': '',
      'rastreoles': '',
      'lestims': '',
      'leprots': '',
      'abunds': '',
      'protsubnac': '',
      'refnombres': '',
      'transparencias': '',
      //campos opcionales
      're_opc1': '',
      're_opc2': '',
      're_opc3': '',
      're_opc4': '',
      're_opc5': '',
      // manteniiento del registro
      'codfuenten': '',
      'codfuentes': '',
      'actualizag': '',
      'actualizan': '',
      'actualizas': ''
    });
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
  
  selectToday() {
    this.modelDate = { year: now.getFullYear(), month: now.getMonth() + 1, day: now.getDate() };
  }
}
