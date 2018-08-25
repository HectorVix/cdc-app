import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { criterio_Jerarquizacion } from '../../../modelo/select/overview-jerarquia';

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
    {
      console.log(this.jerarquizacion_SubnacionalForm.value);
      }
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
  
}
