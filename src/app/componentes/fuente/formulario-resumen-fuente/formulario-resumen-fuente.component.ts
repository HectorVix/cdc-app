import { Component, OnInit, ViewChild } from '@angular/core';
import { FuenteModelo } from '../../../modelo/fuente-modelo';
import { criterio_ResumenesFuente } from '../../../modelo/select/overview-fuente';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { forkJoin } from 'rxjs/observable/forkJoin';
import { UsuarioService } from '../../../servicios/usuario.service';
@Component({
  selector: 'app-formulario-resumen-fuente',
  templateUrl: './formulario-resumen-fuente.component.html',
  styleUrls: ['./formulario-resumen-fuente.component.scss']
})
export class FormularioResumenFuenteComponent implements OnInit {
  @ViewChild('file') file;
  public archivos: Set<File> = new Set();
  progress;
  canBeClosed = true;
  primaryButtonText = 'Upload';
  showCancelButton = true;
  uploading = false;
  uploadSuccessful = false;

  fuenteForm: FormGroup;
  fuentemodelo: FuenteModelo;
  criterio_ResumenesFuente = new criterio_ResumenesFuente();
  criterio_codfuente = this.criterio_ResumenesFuente.codfuente;
  criterio_publicacion_cdc = this.criterio_ResumenesFuente.publicacion_cdc;
  criterio_valor = this.criterio_ResumenesFuente.valor;
  variosList: string[] = ['Comunat', 'Comunterr', 'Bosque', 'Sabana', 'Prado', 'Chaparral', 'Alpino', 'Otroterr', 'Comunac', 'Palustre', 'Lacustre', 'Fluvial', 'Estuarino', 'Maritimo', 'Subterp'];
  floraList: string[] = ['Flora', 'Floraac', 'Floraterp', 'Plnovasc', 'Microorg', 'Infositio'];
  faunaList: string[] = ['Fauna', 'Faunaac', 'Faunaterr', 'Moluscos', 'Insectos', 'Crustaceos', 'Otroartrop', 'otroinvert', 'Peces', 'Anfibios', 'reptiles', 'Aves', 'Mamiferos', 'Cienfisic', 'Fisiotopo'];
  otrosList: string[] = ['Hidrol', 'Geologia', 'Suelos', 'Clima', 'Biologia', 'Ecologia', 'Funecol', 'Diversnat', 'Inventario', 'Tecinvest', 'Am', 'Planmanejo', 'Tecmanejo', 'Estimpamb', 'Organprot', 'Herrprot'];

  constructor(private fb: FormBuilder, private usuarioServicio: UsuarioService) {
    this.crearForm_ResumenesFuente();

  }
  crearForm_ResumenesFuente() {

    this.fuenteForm = this.fb.group({
      'codigo': '',
      'codfuente': '',
      'cita': '',
      'archivado': '',
      'documentopdf': '',
      'cobgeo': '',
      'coords': '',
      'coordn': '',
      'coorde': '',
      'coordo': '',
      'resumen': '',
      //tema
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
  agregarArchivos() {
    this.file.nativeElement.click();
  }
  onFilesAdded() {
    const files: { [key: string]: File } = this.file.nativeElement.files;
    for (let key in files) {
      if (!isNaN(parseInt(key))) {
        this.archivos.add(files[key]);
      }
    }
  }
  guardarFuente() {
    this.uploading = true;
    this.usuarioServicio.upload(this.archivos);

  }
  cancelar() {
    this.archivos = new Set();
    this.fuenteForm.reset;
    this.uploading = false;
  }
}
