import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common'
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { DISABLED } from '@angular/forms/src/model';
import { disableDebugTools } from '@angular/platform-browser';
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
 //status global
 lrangog= ['', 'G1', 'G2','G3','G4','G5','GU','GH','GX'];
 lformularg= ['', 'Computarizado', 'Manual'];
 lcites= ['', 'Apéndice I','Apéndice','Apéndice II', 'Apéndice III'];
 luicn= ['', 'Extinta', 'En peligro','Vulnerable','Rara','Indeterminada','Insuficientemente conocida',
              'Fuera de peligro','No está en peligro ( lista especies endémicas)',
              'No tomada en cuenta por UICN'];
 lexsitu= ['', 'SÍ','NO'];
 lendemismo= ['', 'Endémico a jurisdicción CDC sub-nacional', 'Endémico nacional'];
//status nacional
 lrangon= ['', 'N1', 'N2','N3','N4','N5','NA','NE','NH','NN','NR','NRF','NU','NX'];
 
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
      'refnombreg': '',
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
  selectToday() {
    this.modelDate = { year: now.getFullYear(), month: now.getMonth() + 1, day: now.getDate() };
  }
}
