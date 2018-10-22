import { Component, OnInit, ViewChild } from '@angular/core';
import { fuente_Modelo } from '../../../modelo/fuente/fuente-modelo';
import { tema_Modelo } from '../../../modelo/fuente/tema-modelo';
import { criterio_ResumenesFuente } from '../../../modelo/select/overview-fuente';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { forkJoin } from 'rxjs/observable/forkJoin';
import { UsuarioService } from '../../../servicios/usuario.service';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
@Component({
  selector: 'app-formulario-resumen-fuente',
  templateUrl: './formulario-resumen-fuente.component.html',
  styleUrls: ['./formulario-resumen-fuente.component.scss']
})
export class FormularioResumenFuenteComponent implements OnInit {
  //archivos
  @ViewChild('file') file;
  public archivos: Set<File> = new Set();
  progress;
  canBeClosed = true;
  primaryButtonText = 'Upload';
  showCancelButton = true;
  uploading = false;
  uploadSuccessful = false;
  //mensajes
  private _success = new Subject<string>();
  staticAlertClosed = false;
  successMessage: string;
  tipoAlert: string;
  //formulario
  fuenteForm: FormGroup;
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
      'naturalezadocumento': '',
      'codfuente': '',
      'cita': '',
      'archivado': '',
      'cobgeo': '',
      'coords': '',
      'coordn': '',
      'coorde': '',
      'coordo': '',
      'resumen': '',
      //tema
      'varios': null,
      'flora': null,
      'fauna': null,
      'otros': null,
      'publicacioncdc': null,
      'valor': '',
      'clave': '',
      'comentario': '',
      'notadigest': '',
      'actualizar': '', //date
      'control': '',    //date
      'bcd': ''
    });
  }


  resetForm() {

    this.fuenteForm.reset();
  }


  ngOnInit() {
    setTimeout(() => this.staticAlertClosed = true, 20000);
    this._success.subscribe((message) => this.successMessage = message);
    this._success.pipe(
      debounceTime(5000)
    ).subscribe(() => this.successMessage = null);
  }

  onSubmit() {
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
    // this.uploading = true;
    //  this.usuarioServicio.upload(this.archivos);

    var temaList: Array<tema_Modelo> = new Array();
    var varios = this.fuenteForm.get('varios').value;
    var flora = this.fuenteForm.get('flora').value;
    var fauna = this.fuenteForm.get('fauna').value;
    var otros = this.fuenteForm.get('otros').value;
    var fuenteBase = this.setFuente(this.fuenteForm.value);

    for (let tema of varios) {
      var temaModelo = new tema_Modelo();
      temaModelo.nombre = tema;
      temaModelo.tipo = 1;
      temaList.push(temaModelo);
    }
    for (let tema of flora) {
      var temaModelo = new tema_Modelo();
      temaModelo.nombre = tema;
      temaModelo.tipo = 1;
      temaList.push(temaModelo);
    }
    for (let tema of fauna) {
      var temaModelo = new tema_Modelo();
      temaModelo.nombre = tema;
      temaModelo.tipo = 1;
      temaList.push(temaModelo);
    }
    for (let tema of otros) {
      var temaModelo = new tema_Modelo();
      temaModelo.nombre = tema;
      temaModelo.tipo = 1;
      temaList.push(temaModelo);
    }
    fuenteBase.temaList = temaList;
    this.addArea(fuenteBase);
  }

  setFuente(fuente: fuente_Modelo): fuente_Modelo {

    if (fuente.varios)
      fuente.varios = true;
    else
      fuente.varios = false;

    if (fuente.flora)
      fuente.flora = true;
    else
      fuente.flora = false;
    if (fuente.fauna)
      fuente.fauna = true;
    else
      fuente.fauna = false;
    if (fuente.otros)
      fuente.otros = true;
    else
      fuente.otros = false;
    fuente.actualizar = this.usuarioServicio.toFormato(this.fuenteForm.get('actualizar').value);
    fuente.control = this.usuarioServicio.toFormato(this.fuenteForm.get('control').value);
    return fuente;
  }
  //agrega una nueva fuente
  addArea(fuente: fuente_Modelo): void {
    var jwthelper = new JwtHelperService();
    var decodedToken = jwthelper.decodeToken(localStorage.getItem('userToken'));
    this.usuarioServicio.addFuente(fuente, decodedToken.jti)
      .subscribe(
        resFuente => {
          this.changeSuccessMessage(`Se registro la fuente  :${resFuente.codfuente}.`, 'success');
          //  this.crearFormFuente();
        }, err => {
          this.changeSuccessMessage('No se pudo regitrar la fuente.', 'primary');
        });
  }
  cancelar() {
    this.archivos = new Set();
    this.fuenteForm.reset;
    this.uploading = false;
  }
  public changeSuccessMessage(mensaje: string, tipo: string) {
    this.tipoAlert = tipo;
    this._success.next(mensaje);
  }
}
