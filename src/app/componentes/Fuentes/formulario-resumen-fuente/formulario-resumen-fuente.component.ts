import { Component, OnInit } from '@angular/core';
import  {FuenteModelo} from  '../formulario-resumen-fuente/fuente-modelo';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-formulario-resumen-fuente',
  templateUrl: './formulario-resumen-fuente.component.html',
  styleUrls: ['./formulario-resumen-fuente.component.scss']
})
export class FormularioResumenFuenteComponent implements OnInit {
  fuenteForm: FormGroup;
  fuentemodelo:FuenteModelo;
  archivado =['','CDC', 'ZOOLOGIA', 'BOTANICA', 'SECCION LIBROS','TESIS','NO EN CASA'];
  naturalezaDocument=['','A', 'C', 'F', 'I','D','L','M','O','P','R'];
  


  constructor(private fb: FormBuilder) {
    this.createForm();
      
  }
  createForm (){

    this.fuenteForm = this.fb.group({
        'codfuente': [null, Validators.minLength(3)],
        'cita': [null, Validators.minLength(5)],
        'archivado': ''
    });
  }
   
  resetForm (){

    this.fuenteForm.reset();
  }
  

  ngOnInit() {

  }

  onSubmit() {
    
      console.log("Form Submitted!");
    }
}
