import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common'
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { criterio_Jerarquizacion } from '.././criterio-jerarquizacion';
const now = new Date();
@Component({
  selector: 'app-formulario-jerarquizacion',
  templateUrl: './formulario-jerarquizacion.component.html',
  styleUrls: ['./formulario-jerarquizacion.component.scss']
})
export class FormularioJerarquizacionComponent implements OnInit {

  criterio_Jeraquizacion = new criterio_Jerarquizacion();
  criterio_nlestim = this.criterio_Jeraquizacion.lgn_lestim;
  criterio_nabund = this.criterio_Jeraquizacion.lgn_abund;
  criterio_ndist = this.criterio_Jeraquizacion.ln_dist;
  criterio_nleprot = this.criterio_Jeraquizacion.lgn_leprot;
  criterio_namenaz = this.criterio_Jeraquizacion.lgn_amenaz;
  criterio_rangon = this.criterio_Jeraquizacion.ln_rango;
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
