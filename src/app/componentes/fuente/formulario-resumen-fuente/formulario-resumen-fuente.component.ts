import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { fuente_Modelo } from '../../../modelo/fuente/fuente-modelo';
import { archivo_Modelo } from '../../../modelo/fuente/archivo-modelo';
import { criterio_ResumenesFuente } from '../../../modelo/select/overview-fuente';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { forkJoin, Subject } from 'rxjs';
import { FuenteService } from '../../../servicios/fuente/fuente.service';
import { FechaService } from '../../../servicios/fecha/fecha.service';
import { debounceTime } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ConfirmacionComponent } from '../../../componentes/dialogo/confirmacion/confirmacion.component';
//--------------tabla------------------------------------
import { MatPaginator, MatSort, MatTableDataSource, MatSelectModule, MatDialog } from '@angular/material';
import { fuente_Dato } from '../../../modelo/tabla/fuente-dato'
import { fuente_FormGroup } from '../../../modelo/formGroup/fuente';
import { ArchivosDisponiblesComponent } from '../../fuente/archivos-disponibles/archivos-disponibles.component';

@Component({
  selector: 'app-formulario-resumen-fuente',
  templateUrl: './formulario-resumen-fuente.component.html',
  styleUrls: ['./formulario-resumen-fuente.component.scss']
})
export class FormularioResumenFuenteComponent implements OnInit {
  //archivos
  @ViewChild('file') archivo;
  public archivos: Set<File> = new Set();
  progreso: any;
  cargado = false;
  //mensajes
  private _success = new Subject<string>();
  staticAlertClosed = false;
  successMessage: string;
  tipoAlert: string;
  //formulario
  fuenteForm: FormGroup;
  buscarForm: FormGroup;
  criterio_ResumenesFuente = new criterio_ResumenesFuente();
  criterio_codfuente = this.criterio_ResumenesFuente.codfuente;
  criterio_publicacion_cdc = this.criterio_ResumenesFuente.publicacion_cdc;
  criterio_valor = this.criterio_ResumenesFuente.valor;
  //loading
  loading: boolean;
  //---------------------------------tabla
  displayedColumns: string[] = ['numero', 'naturalezaDocumento', 'codigoFuente', 'cita', 'clave'];
  dataSource: MatTableDataSource<fuente_Dato>;
  lista_Fuente: Array<fuente_Dato> = new Array();
  dataFuente: any;
  private paginator: MatPaginator;
  @ViewChild(MatPaginator) set matPaginator(mp: MatPaginator) {
    this.paginator = mp;
    this.setDataSourceAttributes();
  }
  @ViewChild(MatSort) sort: MatSort;
  //------------------------------------------
  selected = new FormControl(0);
  selectedArchivos = new FormControl(0);
  editar = true;
  guardar = false;
  //--------------------------
  //componente archivos disponibles
  @ViewChild(ArchivosDisponiblesComponent)
  private archivos_Disponibles: ArchivosDisponiblesComponent;
  constructor(private fb: FormBuilder,
    private fuenteServicio: FuenteService,
    private fechaServicio: FechaService,
    private dialog: MatDialog,
    private fb2: FormBuilder) {
    this.crearForm_ResumenesFuente(new fuente_Modelo);
    this.crearForm_Buscar();
    this.dataSource = new MatTableDataSource(this.lista_Fuente);
  }

  ngOnInit() {
    setTimeout(() => this.staticAlertClosed = true, 20000);
    this._success.subscribe((message) => this.successMessage = message);
    this._success.pipe(
      debounceTime(30000)
    ).subscribe(() => this.successMessage = null);
  }
  setDataSourceAttributes() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    if (this.paginator && this.sort) {
      this.applyFilter('');
    }
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  crearForm_ResumenesFuente(row: fuente_Modelo) {
    this.fuenteForm = new fuente_FormGroup().getFuente_FormGrup(row);
  }
  resetForm() {
    this.fuenteForm.reset();
  }
  agregarArchivos() {
    this.archivo.nativeElement.click();
  }
  onFilesAdded() {
    var archivos: { [key: string]: File } = this.archivo.nativeElement.files;
    for (let key in archivos) {
      if (!isNaN(parseInt(key))) {
        this.archivos.add(archivos[key]);
        this.tabArchivos(0);
      }
    }
  }
  cargarArchivos(fuenteId: Number) {
    this.progreso = this.fuenteServicio.cargarArchivos(this.archivos, fuenteId);
    let allProgressObservables = [];
    for (let key in this.progreso) {
      allProgressObservables.push(this.progreso[key].progreso);
    }
    forkJoin(allProgressObservables).subscribe(end => {
      this.cargado = true;
    });

  }
  guardarFuente() {
    if (this.fuenteForm.get('codfuente').value && this.fuenteForm.valid) {
      var fuenteBase = this.setFuente(this.fuenteForm.value);
      this.addFuente(fuenteBase);
    }
    else
      this.changeSuccessMessage('No se pudo regitrar, comprueba que estén bien los campos donde se te indica.', 'primary');
  }
  setFuente(fuente: fuente_Modelo): fuente_Modelo {
    fuente.actualizar = this.fechaServicio.toFormatoDateTime(this.fuenteForm.get('actualizar').value);
    fuente.control = this.fechaServicio.toFormatoDateTime(this.fuenteForm.get('control').value);
    return fuente;
  }
  //agrega una nueva fuente
  addFuente(fuente: fuente_Modelo): void {
    this.loading = true;
    var jwthelper = new JwtHelperService();
    var decodedToken = jwthelper.decodeToken(localStorage.getItem('userToken'));
    this.fuenteServicio.addFuente(fuente, decodedToken.jti)
      .subscribe(
        resFuente => {
          this.cargarArchivos(resFuente.fuenteId);
          this.loading = false;
          this.changeSuccessMessage(`Se registro la fuente  :${resFuente.codfuente}.`, 'success');
        }, err => {
          this.loading = false;
          this.changeSuccessMessage('No se pudo regitrar la fuente, el CÓDIGO DE LA FUENTE debe ser único ó comprueba que esté disponible el servicio.', 'primary');
        });
  }
  cancelar() {
    this.archivos = new Set();
    this.fuenteForm.reset;
    this.cargado = false;
    this.progreso = {};
  }
  public changeSuccessMessage(mensaje: string, tipo: string) {
    this.tipoAlert = tipo;
    this._success.next(mensaje);
  }
  openDialogo(): void {
    const dialogRef = this.dialog.open(ConfirmacionComponent, {
      width: '250px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result)
        this.guardarFuente();
    });
  }
  openDialogoEditar(): void {
    const dialogRef = this.dialog.open(ConfirmacionComponent, {
      width: '250px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result)
        this.editar_Fuente();
    });
  }
  buscarFuente() {
    this.lista_Fuente = new Array();
    this.loading = true;
    var a = "¬";
    var b = "¬";
    var c = "¬";
    var d = "¬";
    var e = "¬";
    if (this.buscarForm.get('codigoFuente').value)
      a = this.buscarForm.get('codigoFuente').value;
    if (this.buscarForm.get('naturalezaDocumento').value)
      b = this.buscarForm.get('naturalezaDocumento').value;
    if (this.buscarForm.get('cita').value)
      c = this.buscarForm.get('cita').value;
    if (this.buscarForm.get('cita').value)
      d = this.buscarForm.get('archivado').value;
    if (this.buscarForm.get('clave').value)
      e = this.buscarForm.get('clave').value;
    this.fuenteServicio.getFuentes(b, a, c, d, e)
      .subscribe(
        data => {
          this.dataFuente = data;
          var k = 0;
          for (let val of this.dataFuente) {
            k = k + 1;
            this.lista_Fuente.push(crearFuente(k, val.fuenteId, val.naturalezadocumento, val.codfuente, val.cita, val.clave));
          }
          this.dataSource = new MatTableDataSource(this.lista_Fuente);
          this.loading = false;
        }, err => {
          this.loading = false;
          this.changeSuccessMessage('No se encontro información.', 'warning');
        });
  }
  crearForm_Buscar() {
    this.buscarForm = this.fb2.group({
      'codigoFuente': '',
      'naturalezaDocumento': '',
      'cita': '',
      'archivado': '',
      'clave': ''
    });
  }
  mostrar_Fuente_Busqueda(row: fuente_Dato) {
    this.crearForm_ResumenesFuente(this.getFuente_id(row.fuenteId));
    this.tabPagina1();
    this.guardar = true;
    this.archivo.nativeElement.value = "";
    this.progreso = null;
    this.archivos = new Set();
    this.archivos_Disponibles.buscarArchivos(this.fuenteForm.get('fuenteId').value);
    this.tabArchivos(1);
    this.cargado = false;
  }
  getFuente_id(id: Number): fuente_Modelo {
    var fuenteBusqueda = new fuente_Modelo();
    this.dataFuente.forEach(dataFuente => {
      var fuente_Busqueda_Aux = new fuente_Modelo();// necesario dado que si reutiliza conserva la primera asignación
      fuente_Busqueda_Aux = dataFuente;
      if (id == fuente_Busqueda_Aux.fuenteId) {
        fuenteBusqueda = fuente_Busqueda_Aux;
        this.editar = false;
      }
    });
    return fuenteBusqueda;
  }
  tabPagina1() {
    this.selected.setValue(0);
  }
  tabArchivos(pag: Number) {
    this.selectedArchivos.setValue(pag);
  }
  nuevo() {
    this.editar = true;
    this.guardar = false;
    this.crearForm_ResumenesFuente(new fuente_Modelo);
    this.crearForm_Buscar();
    this.tabPagina1();
    this.resetForm();
    this.archivos = new Set();
    this.archivo.nativeElement.value = "";
    this.progreso = null;
    this.cargado = false;
    this.tabArchivos(0);
    this.archivos_Disponibles.nuevo();
  }
  editar_Fuente() {
    if (this.fuenteForm.get('codfuente').value && this.fuenteForm.valid)
      this.updateFuente(this.setFuente(this.fuenteForm.value));
    else
      this.changeSuccessMessage('No se pudo editar, comprueba que los campos estén correctos donde se te indica.', 'primary');
  }
  updateFuente(fuente: fuente_Modelo): void {
    this.loading = true;
    var jwthelper = new JwtHelperService();
    var decodedToken = jwthelper.decodeToken(localStorage.getItem('userToken'));
    this.fuenteServicio.editarFuente(fuente, decodedToken.jti)
      .subscribe(
        resFuente => {
          this.loading = false;
          this.cargarArchivos(fuente.fuenteId);
          this.changeSuccessMessage(`Editado exitoso ,código de la fuente:${resFuente.codfuente}.`, 'success');
          this.lista_Fuente = new Array();
          this.dataSource = new MatTableDataSource(this.lista_Fuente);
          this.editar = false;
        }, err => {
          this.loading = false;
          this.changeSuccessMessage('Error no se pudo editar, comprueba que esté disponible el servicio.', 'primary');
        });
  }
  //Lleva el control de los errores
  get input_codfuente() { return this.fuenteForm.get('codfuente'); }
  get input_cita() { return this.fuenteForm.get('cita'); }
  get input_archivado() { return this.fuenteForm.get('archivado'); }
  get input_cobgeo() { return this.fuenteForm.get('cobgeo'); }
  get input_coords() { return this.fuenteForm.get('coords'); }
  get input_coordn() { return this.fuenteForm.get('coordn'); }
  get input_coorde() { return this.fuenteForm.get('coorde'); }
  get input_coordo() { return this.fuenteForm.get('coordo'); }
  get input_resumen() { return this.fuenteForm.get('resumen'); }
  get input_clave() { return this.fuenteForm.get('clave'); }
  get input_comentario() { return this.fuenteForm.get('comentario'); }
  get input_notadigest() { return this.fuenteForm.get('notadigest'); }
  get input_bcd() { return this.fuenteForm.get('bcd'); }
  get input_actualizar() { return this.fuenteForm.get('actualizar'); }
  get input_control() { return this.fuenteForm.get('control'); }
}
function crearFuente(k: Number, fuenteId: Number, naturalezaDocumento: String, codigoFuente, cita, clave): fuente_Dato {
  if (naturalezaDocumento == "A")
    naturalezaDocumento = "Articulo";
  if (naturalezaDocumento == "C")
    naturalezaDocumento = "Trabajo de campo";
  if (naturalezaDocumento == "F")
    naturalezaDocumento = "Fotos o ilustraciones";
  if (naturalezaDocumento == "I")
    naturalezaDocumento = "Inédito";
  if (naturalezaDocumento == "L")
    naturalezaDocumento = "Libro";
  if (naturalezaDocumento == "M")
    naturalezaDocumento = "Mapas e imágenes";
  if (naturalezaDocumento == "O")
    naturalezaDocumento = "Organizaciones";
  if (naturalezaDocumento == "P")
    naturalezaDocumento = "Comunicaciones personales";
  if (naturalezaDocumento == "R")
    naturalezaDocumento = "Revistas, periódicos y publicaciones";
  return {
    numero: k,
    fuenteId: fuenteId,
    naturalezaDocumento: naturalezaDocumento,
    codigoFuente: codigoFuente,
    cita: cita,
    clave: clave
  };
}