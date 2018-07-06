import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-formulario-jerarquizacion',
  templateUrl: './formulario-jerarquizacion.component.html',
  styleUrls: ['./formulario-jerarquizacion.component.scss']
})
export class FormularioJerarquizacionComponent implements OnInit {
  lnaciones = ['','GT','US'];
  jerarquizacionForm: FormGroup;
  constructor(private fb: FormBuilder) {
    this.createFormJerarquizacionNacional();
   }
  
  ngOnInit() {
  }
  createFormJerarquizacionNacional() {
    this.jerarquizacionForm = this.fb.group({
      'codigoe': ['', Validators.required],
      'cobgeo': '',
      'nlestimcom': ''
      
      
    });
  }

}
