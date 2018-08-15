import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { criterio_Jerarquizacion } from '../../../modelo/criterio-jerarquizacion';

@Component({
  selector: 'app-formulario-jerarquizacion-elemento-subnacional',
  templateUrl: './formulario-jerarquizacion-elemento-subnacional.component.html',
  styleUrls: ['./formulario-jerarquizacion-elemento-subnacional.component.scss']
})
export class FormularioJerarquizacionElementoSubnacionalComponent implements OnInit {
 criterio_Jeraquizacion = new criterio_Jerarquizacion();
  criterio_lestims = this.criterio_Jeraquizacion.lgn_lestim;
  criterio_abunds = this.criterio_Jeraquizacion.lgn_abund;
  criterio_dists = this.criterio_Jeraquizacion.ln_dist;
  criterio_leprots = this.criterio_Jeraquizacion.lgn_leprot;
  criterio_amenazs = this.criterio_Jeraquizacion.lgn_amenaz;
  criterio_rangos = this.criterio_Jeraquizacion.ln_rango;
 jerarquizacion_SubnacionalForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.crear_Jerarquizacion_Global();
   }

  ngOnInit() {
  }
  onSubmit(){

  }
  crear_Jerarquizacion_Global() {
    this.jerarquizacion_SubnacionalForm = this.fb.group({
      'codigoe': ['', Validators.required],    
      'nacion': '',
      'subnacion': '',
      'nombres': '',
      'loctips': '',
      'lestims': '',
      'comlestims': '',
      'abunds': '',
      'comabunds': '',
      'dists': '',
      'comdists': '',
      'leprots': '',
      'comleprots': '',
      'amenazs': '',
      'comamenazs': '',
      'otraconsids': '',
      'rangos': '',
      'fecharevrs': '',
      'razonrs': '',
      'necprotecs': '',
      'necinvents': '',
      'necmanejos': '',
      'autored': '',
      'edicion': '',
      'actualizar': '',
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
