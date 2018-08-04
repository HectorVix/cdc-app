import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common'
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
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

//taxonomia global
 ldistrax= ['', 'Genero o familia monotípica', 
                'Genero pequeño (2-5 especies)',
                'Genero intermedio (6-20 especies)',
                'Genero grande (21+ especies)'];
 ldudatax= ['', 'Indudablemente una especie válida',
                'Posiblemente no válida como especie pero si como subespecie',
                'Probablemente no sea diferente a ningún nivel taxonómico'];
 lnumsinn= ['', '', ''];
 //status global
 lrangog= ['', '', ''];
 lformularg= ['', 'C', ''];
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
      'tropicos':['', Validators.required],
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
  selectToday() {
    this.modelDate = { year: now.getFullYear(), month: now.getMonth() + 1, day: now.getDate() };
  }
}
