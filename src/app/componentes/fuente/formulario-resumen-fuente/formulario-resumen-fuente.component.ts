import { Component, OnInit } from '@angular/core';
import { FuenteModelo } from '../formulario-resumen-fuente/fuente-modelo';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-formulario-resumen-fuente',
  templateUrl: './formulario-resumen-fuente.component.html',
  styleUrls: ['./formulario-resumen-fuente.component.scss']
})
export class FormularioResumenFuenteComponent implements OnInit {
  fuenteForm: FormGroup;
  fuentemodelo: FuenteModelo;
  archivado = ['', 'CDC', 'ZOOLOGIA', 'BOTANICA', 'SECCION LIBROS', 'TESIS', 'NO EN CASA'];
  naturalezaDocument = ['', 'A', 'C', 'F', 'I', 'D', 'L', 'M', 'O', 'P', 'R'];



  constructor(private fb: FormBuilder) {
    this.createForm();

  }
  createForm() {

    this.fuenteForm = this.fb.group({
      'codfuente': [null, Validators.minLength(3)],
      'cita': [null, Validators.minLength(5)],
      'archivado': '',
      'cobgeo': '',
      'resumen': [null, Validators.minLength(10)],
      'comunat': '',
      'comunterr': '',
      'bosque': '',
      'sabana': '',
      'prado': '',
      'chaparral': '',
      'desierto': '',
      'alpino': '',
      'otroterr': '',
      'comunac': '',
      'palustre': '',
      'lacustre': '',
      'pluvial': '',
      'estuarino': '',
      'maritimo': '',
      'subterp': '',
      //flora
      'flora': '',
      'floraac': '',
      'floraterp': '',
      'plnovasc': '',
      'microorg': '',
      'infositio': '',
      //fauna
      'fauna': '',
      'faunaac': '',
      'faunaterr': '',
      'moluscos': '',
      'insectos': '',
      'crustaceos': '',
      'otroantrop': '',
      'otroinvert': '',
      'peces': '',
      'anfibios': '',
      'reptiles': '',
      'aves': '',
      'mamiferos': '',
      'cienfisic': '',
      'fisiotopo': '',
      //otros
      'hidrol    ': '',
      'geologia  ': '',
      'suelos    ': '',
      'clima     ': '',
      'biologia  ': '',
      'ecologia  ': '',
      'funecol   ': '',
      'diversnat ': '',
      'inventario': '',
      'tecinvest ': '',
      'am        ': '',
      'planmanejo': '',
      'tecmanejo ': '',
      'estimpamb ': '',
      'organprot ': '',
      'herrprot  ': ''


    });
  }


  resetForm() {

    this.fuenteForm.reset();
  }


  ngOnInit() {

  }

  onSubmit() {

    console.log("Form Submitted!");
  }
}
