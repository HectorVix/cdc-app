import { Component, OnInit } from '@angular/core';
import { FuenteModelo } from '../../../modelo/fuente-modelo';
import { criterio_ResumenesFuente } from '../../../modelo/criterio-resumenes-fuente';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-formulario-resumen-fuente',
  templateUrl: './formulario-resumen-fuente.component.html',
  styleUrls: ['./formulario-resumen-fuente.component.scss']
})
export class FormularioResumenFuenteComponent implements OnInit {
  fuenteForm: FormGroup;
  fuentemodelo: FuenteModelo;
  criterio_ResumenesFuente = new criterio_ResumenesFuente();
  criterio_codfuente = this.criterio_ResumenesFuente.codfuente;
  criterio_publicacion_cdc = this.criterio_ResumenesFuente.publicacion_cdc;
  criterio_valor = this.criterio_ResumenesFuente.valor;

  constructor(private fb: FormBuilder) {
    this.crearForm_ResumenesFuente();

  }
  crearForm_ResumenesFuente() {

    this.fuenteForm = this.fb.group({
      'codigo': '',
      'codfuente':'',
      'cita':'',
      'archivado': '',
      'documentopdf': '',
      'cobgeo': '',
      'coords': '',
      'coordn': '',
      'coorde': '',
      'coordo': '',
      'resumen': '',
      //tema
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
      'fluvial': '',
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
      'otroartrop': '',
      'otroinvert': '',
      'peces': '',
      'anfibios': '',
      'reptiles': '',
      'aves': '',
      'mamiferos': '',
      'cienfisic': '',
      'fisiotopo': '',
      //otros
      'hidrol': '',
      'geologia': '',
      'suelos': '',
      'clima': '',
      'biologia': '',
      'ecologia': '',
      'funecol': '',
      'diversnat': '',
      'inventario': '',
      'tecinvest': '',
      'am': '',
      'planmanejo': '',
      'tecmanejo': '',
      'estimpamb': '',
      'organprot': '',
      'herrprot': '',
      'publicacioncdc': '',
      'valor': '',
      'clave': '',
      'comentario': '',
      'notadigest': '',
      'actualizar': '',
      'control': '',
      'bcd': ''
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

  getCriterio_ResumenesFuente(i: number) {
    switch (i) {
      case 0: return '';
      case 1: return 'A';
      case 2: return 'C';
      case 3: return 'F';
      case 4: return 'I';
      case 5: return 'D';
      case 6: return 'L';
      case 7: return 'M';
      case 8: return 'O';
      case 9: return 'P';
      case 10: return 'R';
    }
  }
  getCriterio_Publicacion_cdc(i: number) {
    switch (i) {
      case 0: return '';
      case 1: return '1' //Sí
      case 2: return '0' //No
    }
  }
  getCriterio_Valor(i: number) {
    switch (i) {
      case 0: return '';
      case 1: return '1'; 
      case 2: return '2';
      case 3: return '3'; 
    }
  }
}
