import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { criterio_Jerarquizacion } from '../../../modelo/select/overview-jerarquia';

@Component({
  selector: 'app-formulario-jerarquizacion-elemento-global',
  templateUrl: './formulario-jerarquizacion-elemento-global.component.html',
  styleUrls: ['./formulario-jerarquizacion-elemento-global.component.scss']
})
export class FormularioJerarquizacionElementoGlobalComponent implements OnInit {
  criterio_Jeraquizacion = new criterio_Jerarquizacion();
  criterio_glestim = this.criterio_Jeraquizacion.lgn_lestim;
  criterio_gabund = this.criterio_Jeraquizacion.lgn_abund;
  criterio_gdist = this.criterio_Jeraquizacion.lg_dist;
  criterio_gleprot = this.criterio_Jeraquizacion.lgn_leprot;
  criterio_gamenaz = this.criterio_Jeraquizacion.lgn_amenaz;
  criterio_gfragil = this.criterio_Jeraquizacion.lg_fragil;
  criterio_rangog = this.criterio_Jeraquizacion.lg_rango;
  jerarquizacion_GlobalForm: FormGroup;
  
  constructor(private fb: FormBuilder) {
    this.crear_Jerarquizacion_Global();
   }

  ngOnInit() {
  }
  crear_Jerarquizacion_Global() {
    this.jerarquizacion_GlobalForm = this.fb.group({
      //página1
      'codigoe': ['', Validators.required],    
      'nombreg': '',
      'descrielem': '',
      'especle': '',
      'especranga': '',
      'especrangb': '',
      'especrangc': '',
      'especrangd': '',
      'habitat': '',
      'permanencia': '',
      'gloctip': '',
      'comtax': '',
      'glestim': '',
      'glestimcom': '',
      'gabund': '',
      'gabundcom': '',
      'gdist': '',
      'gdistcom': '',
      //página 2
      'gleprot': '',
      'gleprotcom': '',
      'gamenaz': '',
      'gamenazcom': '',
      'gfragil': '',
      'gfragilcom': '',
      'gotroconsi': '',
      'rangog': '',
      'fecharg': '',
      'granrazon': '',
      'gnecprotec': '',
      'gnecinvent': '',
      'gnecestudi': '',
      'gnecmanejo': '',
      'resrg': '',
      'edautor': '',
      'edicion': '',
      'actualizar': ''
    });
  
  }
  onSubmit(){
    console.log(this.jerarquizacion_GlobalForm.value);
  }
}
