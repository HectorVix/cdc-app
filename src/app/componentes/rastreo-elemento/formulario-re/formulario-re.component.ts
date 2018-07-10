import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common'
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-formulario-re',
  templateUrl: './formulario-re.component.html',
  styleUrls: ['./formulario-re.component.scss']
})
export class FormularioReComponent implements OnInit {
  reForm: FormGroup;
 ltropicos= ['', '', ''];
 lnacion= ['', '', ''];
 lsubnacion= ['', '', ''];
 lclasetax= ['', '', ''];
 lorden= ['', '', ''];
 lfamilia= ['', '', ''];
 lgenero= ['', '', ''];
 lfuentenom= ['', '', ''];
 lrefnomber= ['', '', ''];
 ldistrax= ['', '', ''];
 ldudatax= ['', '', ''];
 lnumsinn= ['', '', ''];
 //status global
 lrangog= ['', '', ''];
 lformularg= ['', '', ''];
 laepeu= ['', '', ''];
 lcites= ['', '', ''];
 luicn= ['', '', ''];
 lplanscons= ['', '', ''];
 lresumenman= ['', '', ''];
 lexsitu= ['', '', ''];
 lendemismo= ['', '', ''];
//status nacional
 lrangon= ['', '', ''];
 lformularn= ['', '', ''];
 lrastreolen= ['', '', ''];
 llestimn= ['', '', ''];
 lleprotn= ['', '', ''];
 labundn= ['', '', ''];
 lprotnacion= ['', '', ''];
 ltransparencian= ['', '', ''];
 //status subnacional
 lrangos= ['', '', ''];
 lformulars= ['', '', ''];//num
 lrastreoles= ['', '', '']; //num
 lestimn= ['', '', ''];
 leprotn= ['', '', '']; //num
 //labundn= ['', '', '']; repetido
 //lprotnacion= ['', '', '']; repetido
 ltranspatencias= ['', '', ''];
  constructor(
              private fb: FormBuilder
             )
            {
               this.crearFormRastreoElemento();
            }

  ngOnInit() {
  }

  //crear formulario Rastreo Elemento
  crearFormRastreoElemento()
  {
    this.reForm = this.fb.group({
      //pagina1
        //identificadores
      'codigoe': ['', Validators.required],
      'tropicos': '',
      'nacion': '',
      'subnacion': '',
        //taxonomia (global)
      'clasetax': '',
      'orden': '',
      'familia': '',
      'genero': '',
      'nombreg': '',
      'autor': '',
      'fuentenom': '',
      'refnomber': '',
      'distrax': '',
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
      'uicn': '',
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
      'lestimn': '',
      'leprotn': '',
      'abundn': '',
      'protancion': '',
      'refnombre': '',
      'transparencian': '',
        //status (subnacional)
      'rangos': '', 
      'fecha_revrs': '',
      'formulars': '',
      'rastreoles': '',
      'lestims': '', //se cambio el nombre
      'leprots': '', //se cambio el nombre
      'abunds': '',  //se cambio el nombre
      'protancios': '',
      'refnombres': '', // se cambio el nombre
      'transparencias': '',
      'actualizan': '',
      'abc': ''
    });
  }
}
