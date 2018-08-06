import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common'
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
const now = new Date();
@Component({
  selector: 'app-formulario-jerarquizacion',
  templateUrl: './formulario-jerarquizacion.component.html',
  styleUrls: ['./formulario-jerarquizacion.component.scss']
})
export class FormularioJerarquizacionComponent implements OnInit {

  lestim = ['',
    '0 - 5 localizaciones conocidas',
    '6 - 20 localizaciones conocidas',
    '21 - 100 localizaciones conocidas',
    '100 o más localizaciones conocidas'];
  labund = ['',
    '< 1000 individuos (PE Y AE), 1000 hectáreas (CN), 30 Km a lo largo de un río (CN) ',
    '= 1000 - 3000 individuos, 1000-5000 hectáreas, 30-10 Km',
    '= 3000 - 10,000 individuos, 5000-25,000 hectareás, 100-500 Km',
    '> 10,000 individuos , 25,000 hectáreas, 500 kilómetros'];

  lgdist = ['', 'Endémica de un país, departamento grande o región; una área < 260 km²',
    'Edémica regional; una área de 260 - 26,000 km²',
    'Moderadamente ampia pero dispersa; una área de 26,000 - 2,600,000 km²',
    'Amplia; una área > 2,600,000 km²'];
  lndist = ['',
    'Muy limitada; porcentaje de territorio nacional < 3%',
    'Limitada; porcentaje de territorio nacional 3 - 10%',
    'Moderadamente amplia; porcentaje de territorio nacional 10 - 50%',
    'Amplia; porcentaje de territorio nacional > 50%'];

  lleprot = ['',
    'Ninguna LE protegida (hasta dónde se conoce)',
    'Por lo menos una LE protegida',
    'Varias LE protegidas',
    'Muchas LE protegidas',
    'Se ignora'];
  lamenaz = ['',
    'Muy amenazado: El elemento es directamente explotado o amenazado por causas naturalez o por el hombre',
    'Moderadamente amenazado: El habitat o comunidad se presta para usos alternos que amenazan al elemento',
    'Ligeramente amenazado: El habitat o comunidad se protege ya que no se presta para usos que amenazan al elemento',
    'Sin amenaza'];
  lgfragil = ['',
    'Muy frágil (murciélago en cueva de maternidad)',
    'Frágil (Felis spp.)',
    'Bastante resistente (perezoso de tres dedos)',
    'Resistente (algunas ardillas)'];
  lrango = ['', '', ''];
  val: number;

  jerarquizacionForm: FormGroup;
  date: { year: number, month: number };
  modelDate: NgbDateStruct;
  constructor(
    private fb: FormBuilder,
    public datepipe: DatePipe
  ) {
    this.createFormJerarquizacionNacional();
  }

  ngOnInit() {
  }
  createFormJerarquizacionNacional() {
    this.jerarquizacionForm = this.fb.group({
      //pagina1
      'codigoe': ['', Validators.required],
      'nombren': '',
      'nacion': '',
      'nloctip': '',
      'nlestim': '',
      'nlestimcom': '',
      'nabund': '',
      'nabundcom': '',
      'ndist': '',
      'ndistcom': '',
      'nleprot': '',
      'nleprotcom': '',
      'namenaz': '',
      'namenazcom': '',
      //pagina2
      'notroconsi': '',
      'rangon': '', 'fecharn': '',
      'nranrzon': '',
      'nnecprotec': '',
      'nnecinvent': '',
      'nnecestudi': '',
      'nnecmaejo': '',
      'resrn': '',
      'edautor': '',
      'edicion': '',
      'actualizar': ''
    });
  }
  // this.registroForm.get('fechaNacimiento').value;
  onSubmit() {
    console.log('Criterio ', this.jerarquizacionForm.get('nlestim').value);

  }
  /**Criterios de Jerarquización  
   *   Es comun y con diferente significado segun sea el caso para
   *   GLESTIM, NLESTIM, GABUND, NABUND, GDIST, NDIST, 
   *   GLEPROT, NLEPROT, GAMENAZ, NAMENAZ, GFRAGIL
   * **/
  getCriterio_Jerarquizacion(i: number) {
    switch (i) {
      case 0: return '';
      case 1: return 'A';
      case 2: return 'B';
      case 3: return 'C';
      case 4: return 'D';
      case 5: return 'I';
    }
  }

  selectToday() {
    this.modelDate = { year: now.getFullYear(), month: now.getMonth() + 1, day: now.getDate() };
  }

}
