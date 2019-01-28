import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { fuente_Modelo } from '../../../modelo/fuente/fuente-modelo';
import { archivo_Modelo } from '../../../modelo/fuente/archivo-modelo';
import { criterio_ResumenesFuente } from '../../../modelo/select/overview-fuente';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { forkJoin } from 'rxjs/observable/forkJoin';
import { FuenteService } from '../../../servicios/fuente/fuente.service';
import { FechaService } from '../../../servicios/fecha/fecha.service';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ConfirmacionComponent } from '../../../componentes/dialogo/confirmacion/confirmacion.component';
//--------------tabla------------------------------------
import { MatPaginator, MatSort, MatTableDataSource, MatSelectModule, MatDialog } from '@angular/material';
import { fuente_Dato } from '../../../modelo/tabla/fuente-dato'
import { fuente_FormGroup } from '../../../modelo/formGroup/fuente';
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
  cargando = false;
  cargadoExitoso = false;
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
  variosList: string[] = ['Comunat', 'Comunterr', 'Bosque', 'Sabana', 'Prado', 'Chaparral', 'Alpino', 'Otroterr', 'Comunac', 'Palustre', 'Lacustre', 'Fluvial', 'Estuarino', 'Maritimo', 'Subterp'];
  floraList: string[] = ['Flora', 'Floraac', 'Floraterp', 'Plnovasc', 'Microorg', 'Infositio'];
  faunaList: string[] = ['Fauna', 'Faunaac', 'Faunaterr', 'Moluscos', 'Insectos', 'Crustaceos', 'Otroartrop', 'otroinvert', 'Peces', 'Anfibios', 'reptiles', 'Aves', 'Mamiferos', 'Cienfisic', 'Fisiotopo'];
  otrosList: string[] = ['Hidrol', 'Geologia', 'Suelos', 'Clima', 'Biologia', 'Ecologia', 'Funecol', 'Diversnat', 'Inventario', 'Tecinvest', 'Am', 'Planmanejo', 'Tecmanejo', 'Estimpamb', 'Organprot', 'Herrprot'];
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
  editar = true;
  guardar = false;
  private codigoFuente: String;
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
      debounceTime(5000)
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
      }
    }
  }
  cargarArchivos(fuenteId: Number) {
    this.cargando = true;
    this.progreso = this.fuenteServicio.cargarArchivos(this.archivos, fuenteId);
    let allProgressObservables = [];
    for (let key in this.progreso) {
      allProgressObservables.push(this.progreso[key].progreso);
    }
    forkJoin(allProgressObservables).subscribe(end => {
      this.cargadoExitoso = true;
      this.cargando = false;
    });

  }
  guardarFuente() {
    if (this.fuenteForm.get('codfuente').value) {
      var fuenteBase = this.setFuente(this.fuenteForm.value);
      this.addFuente(fuenteBase);
    }
    else
      this.changeSuccessMessage('No se pudo regitrar. El código de la fuente es obligatorio.', 'primary');
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
          //  this.crearFormFuente();
        }, err => {
          this.loading = false;
          this.changeSuccessMessage('No se pudo regitrar la fuente.', 'primary');
        });
  }
  cancelar() {
    this.archivos = new Set();
    this.fuenteForm.reset;
    this.cargando = false;
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
    console.log('buscar:', a, b, c, d, e);

    this.fuenteServicio.getFuentes(b, a, c, d, e)
      .subscribe(
        data => {
          this.dataFuente = data;
          var k = 0;
          for (let val of this.dataFuente) {
            k = k + 1;
            console.log('data:', val);
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
    this.editar = false;
    this.guardar = true;
  }
  getFuente_id(id: Number): fuente_Modelo {
    var fuenteBusqueda = new fuente_Modelo();
    this.dataFuente.forEach(dataFuente => {
      var fuente_Busqueda_Aux = new fuente_Modelo();// necesario dado que si reutiliza conserva la primera asignación
      fuente_Busqueda_Aux = dataFuente;
      if (id == fuente_Busqueda_Aux.fuenteId) {
        this.codigoFuente = fuente_Busqueda_Aux.codfuente;
        fuenteBusqueda = fuente_Busqueda_Aux;
      }
    });
    return fuenteBusqueda;
  }
  tabPagina1() {
    this.selected.setValue(0);
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
    this.codigoFuente = "";
  }
  editar_Fuente() {
    console.log('listo para editar');
    this.updateFuente(this.setFuente(this.fuenteForm.value));
  }
  updateFuente(fuente: fuente_Modelo): void {
    this.loading = true;
    var jwthelper = new JwtHelperService();
    var decodedToken = jwthelper.decodeToken(localStorage.getItem('userToken'));
    fuente.codfuente = this.codigoFuente; // en caso de ser modificado el código inicial
    this.fuenteServicio.editarFuente(fuente, decodedToken.jti)
      .subscribe(
        resFuente => {
          this.loading = false;
          this.changeSuccessMessage(`Editado exitoso ,codigo de la fuente:${resFuente.codfuente}.`, 'success');
          this.lista_Fuente = new Array();
          this.dataSource = new MatTableDataSource(this.lista_Fuente);
        }, err => {
          this.loading = false;
          this.changeSuccessMessage('Error  no se pudo editar, el codigo de la fuente debe ser valido', 'primary');
        });
  }

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