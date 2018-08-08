import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { criterio_Jerarquizacion } from '.././criterio-jerarquizacion';

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
 /**Criterios de Jerarquización  
   *   Es comun y con diferente significado segun sea el caso global, nacional o subnacional  para
   *   lestim, abund, dist, leprot, amenaz, fragil
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
}
