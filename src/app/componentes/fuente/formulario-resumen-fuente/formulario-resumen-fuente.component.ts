import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { fuente_Modelo } from '../../../modelo/fuente/fuente-modelo';
import { tema_Modelo } from '../../../modelo/fuente/tema-modelo';
import { archivo_Modelo } from '../../../modelo/fuente/archivo-modelo';
import { criterio_ResumenesFuente } from '../../../modelo/select/overview-fuente';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { forkJoin } from 'rxjs/observable/forkJoin';
import { UsuarioService } from '../../../servicios/usuario.service';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ConfirmacionComponent } from '../../../componentes/dialogo/confirmacion/confirmacion.component';
//--------------tabla------------------------------------
import { MatPaginator, MatSort, MatTableDataSource, MatSelectModule, MatDialog } from '@angular/material';
//import { localizacionElemento_Dato } from '../../../modelo/tabla/localizacion-elemento-dato'
@Component({
  selector: 'app-formulario-resumen-fuente',
  templateUrl: './formulario-resumen-fuente.component.html',
  styleUrls: ['./formulario-resumen-fuente.component.scss']
})
export class FormularioResumenFuenteComponent implements OnInit {
  //archivos
  @ViewChild('file') archivo;
  public archivos: Set<File> = new Set();
  progreso;
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
  displayedColumns: string[] = ['numero', 'codigole'];
  //dataSource: MatTableDataSource<localizacionElemento_Dato>;
  //lista_LE: Array<localizacionElemento_Dato> = new Array();
  dataFuente: any;
  private paginator: MatPaginator;
  @ViewChild(MatPaginator) set matPaginator(mp: MatPaginator) {
    this.paginator = mp;
    // this.setDataSourceAttributes();
  }
  @ViewChild(MatSort) sort: MatSort;
  //------------------------------------------
  constructor(private fb: FormBuilder, private usuarioServicio: UsuarioService,
    private dialog: MatDialog,
    private fb2: FormBuilder) {
    this.crearForm_ResumenesFuente();
    this.crearForm_Buscar();
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
    this.progreso = this.usuarioServicio.cargarArchivos(this.archivos, fuenteId);
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
    var temaList: Array<tema_Modelo> = new Array();
    var varios = this.fuenteForm.get('varios').value;
    var flora = this.fuenteForm.get('flora').value;
    var fauna = this.fuenteForm.get('fauna').value;
    var otros = this.fuenteForm.get('otros').value;
    var fuenteBase = this.setFuente(this.fuenteForm.value);
    if (varios) {
      for (let tema of varios) {
        var temaModelo = new tema_Modelo();
        temaModelo.nombre = tema;
        temaModelo.tipo = 1;
        temaList.push(temaModelo);
      }
    }
    if (flora) {
      for (let tema of flora) {
        var temaModelo = new tema_Modelo();
        temaModelo.nombre = tema;
        temaModelo.tipo = 2;
        temaList.push(temaModelo);
      }
    }
    if (fauna) {
      for (let tema of fauna) {
        var temaModelo = new tema_Modelo();
        temaModelo.nombre = tema;
        temaModelo.tipo = 3;
        temaList.push(temaModelo);
      }
    }
    if (otros) {
      for (let tema of otros) {
        var temaModelo = new tema_Modelo();
        temaModelo.nombre = tema;
        temaModelo.tipo = 4;
        temaList.push(temaModelo);
      }
    }
    fuenteBase.temaList = temaList;
    this.addFuente(fuenteBase);
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
  addFuente(fuente: fuente_Modelo): void {
    this.loading = true;
    var jwthelper = new JwtHelperService();
    var decodedToken = jwthelper.decodeToken(localStorage.getItem('userToken'));
    this.usuarioServicio.addFuente(fuente, decodedToken.jti)
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
  buscarFuente() {
    //this.lista_LE = new Array();
    this.loading = true;
    var a = "~^ªº~†⑦→∞¬¬";
    var b = "~^ªº~†⑦→∞¬¬";
    var c = "~^ªº~†⑦→∞¬¬";
    var d = "~^ªº~†⑦→∞¬¬";
    var e = "~^ªº~†⑦→∞¬¬";
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

    this.usuarioServicio.getFuente(b, a, c, d, e)
      .subscribe(
        data => {
          this.dataFuente = data;
          var k = 0;
          for (let fuenteVal of this.dataFuente) {
            k = k + 1;
            console.log('data:', fuenteVal);
            //this.lista_LE.push(crearLocalizacionElemento(k, elementoVal.localizacionId, elementoVal.codigole));
          }
          // this.dataSource = new MatTableDataSource(this.lista_LE);
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
}
