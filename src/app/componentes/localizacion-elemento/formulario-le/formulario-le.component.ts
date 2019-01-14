import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common'
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { criterio_le } from '../../../modelo/select/overview-localizacion';
import { UsuarioService } from '../../../servicios/usuario.service';
import { Localizacion_Modelo } from '../../../modelo/localizacion/localizacion-modelo';
import { proteccion_Modelo } from '../../../modelo/localizacion/proteccion-modelo';
import { ConfirmacionComponent } from '../../../componentes/dialogo/confirmacion/confirmacion.component';
//--------------tabla------------------------------------
import { MatPaginator, MatSort, MatTableDataSource, MatSelectModule, MatDialog } from '@angular/material';
import { localizacionElemento_Dato } from '../../../modelo/tabla/localizacion-elemento-dato'

@Component({
  selector: 'app-formulario-le',
  templateUrl: './formulario-le.component.html',
  styleUrls: ['./formulario-le.component.scss']
})
export class FormularioLeComponent implements OnInit {

  data_proteccion = [];
  leForm: FormGroup;
  buscarForm: FormGroup;
  criterio_le = new criterio_le();
  criterio_si_no = this.criterio_le.si_no;
  criterio_rango_le = this.criterio_le.rango_le;
  // criterio_rangog = this.criterio_le.rangog;
  //criterio_rangon = this.criterio_le.rangon;
  private _success = new Subject<string>();
  staticAlertClosed = false;
  successMessage: string;
  tipoAlert: string;
  loading: boolean;
  settings_proteccion = {
    columns: {
      codigoam: {
        title: 'CODIGOAM'
      },
      nombream: {
        title: 'NOMBREAM'
      },
      contenido: {
        title: 'CONTENIDO'
      }
    }
  };
  selected = new FormControl(0);
  //---------------------------------tabla
  displayedColumns: string[] = ['numero', 'codigole'];
  dataSource: MatTableDataSource<localizacionElemento_Dato>;
  lista_LE: Array<localizacionElemento_Dato> = new Array();
  dataLE: any;
  private paginator: MatPaginator;
  @ViewChild(MatPaginator) set matPaginator(mp: MatPaginator) {
    this.paginator = mp;
    this.setDataSourceAttributes();
  }
  @ViewChild(MatSort) sort: MatSort;
  //------------------------------------------
  editar = false;
  guardar = true;

  constructor(private fb: FormBuilder, private usuarioService: UsuarioService,
    private dialog: MatDialog, private fb2: FormBuilder) {
    this.crearFormLocalizacion_Elemento();
    this.crearForm_Buscar();
    this.dataSource = new MatTableDataSource(this.lista_LE);
  }

  ngOnInit() {
    setTimeout(() => this.staticAlertClosed = true, 20000);
    this._success.subscribe((message) => this.successMessage = message);
    this._success.pipe(
      debounceTime(10000)
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
  crearFormLocalizacion_Elemento() {
    this.leForm = this.fb.group({
      //página1
      //identificadores
      'codigole': ['', Validators.required],
      'ident': null,
      //  'nombres': '',
      //'nomcomuns': '',
      //'rangog': '',
      //'rangon': '',
      //'rangos': '',
      //localizadores
      'subnacion': '',
      'subdivision': '',
      'codsitio': '',
      'nomsitio': '',
      'sitioeva': '',
      'precisionl': '',
      'nommapa': '',
      'codmapa': '',
      'nummarg': '',
      'numpunto': '',
      'diezdiez': '',
      'latitud': '',
      'longitud': '',
      'coords': '',
      'coordn': '',
      'coorde': '',
      'coordo': '',
      'direccion': '',
      'ecoregion': '',
      'cuenca': '',
      //status
      'fechaeva': '',
      'ultobs': '',
      'priobs': '',
      'rangole': '',
      'fecharangole': '',
      'comrangole': '',
      //'resprg': '',
      'datosle': '',
      'contacto': '',
      'numcontacto': '',
      //descripción
      'desgen': '',
      'elev': '',
      'area': '',
      //protección
      //'lista_proteccion': '',
      'masterreno': null,
      'masprotec': null,
      'masmanejo': null,
      'involtnc': null,
      'commanejo': '',
      'comprot': '',
      //propietario
      'prop': '',
      'infprop': null,
      'comprop': '',
      //campos opcionales
      'leopc1': '',
      'leopc2': '',
      'leopc3': '',
      'leopc4': '',
      'leopc5': '',
      'leopc6': '',
      'leopc7': '',
      'leopc8': '',
      'leopc9': '',
      'leopc10': '',
      //comentarios generales
      'comentario': '',
      //documentación y mantenimiento
      'sensdatos': null,
      'limites': null,
      'fotos': null,
      'mejorfuente': '',
      'codfuente': '',

      'mdrev': null,
      'transcrito': '',
      'cc': null,
      'cartografo': '',
      'respdatos': '',
      'actualizar': ''

    });
  }

  guardarLocalizacion() {
    var localizacionElementoBase = this.setLocalizacionElemento(this.leForm.value);
    var proteccion: Array<proteccion_Modelo> = new Array();

    this.data_proteccion.forEach(data_proteccion => {
      var proteccionBase = new proteccion_Modelo();
      proteccionBase.codigoam = data_proteccion.codigoam;
      proteccionBase.nombream = data_proteccion.nombream;
      proteccionBase.contenido = data_proteccion.contenido;
      proteccion.push(proteccionBase);
    });
    localizacionElementoBase.proteccionList = proteccion;
    this.addLocalizacionElemento(localizacionElementoBase);
  }
  setLocalizacionElemento(datos: Localizacion_Modelo): Localizacion_Modelo {
    datos.fechaeva = this.usuarioService.toFormato(this.leForm.get('fechaeva').value);
    datos.ultobs = this.usuarioService.toFormato(this.leForm.get('ultobs').value);
    datos.fecharangole = this.usuarioService.toFormato(this.leForm.get('fecharangole').value);
    datos.transcrito = this.usuarioService.toFormato(this.leForm.get('transcrito').value);
    datos.cartografo = this.usuarioService.toFormato(this.leForm.get('cartografo').value);
    datos.actualizar = this.usuarioService.toFormato(this.leForm.get('actualizar').value);
    return datos;
  }

  //agrega un nuevo registro localización elemento
  addLocalizacionElemento(localizacion: Localizacion_Modelo): void {
    this.loading = true;
    this.usuarioService.addLocalizacionElemento(localizacion)
      .subscribe(
        resElemento => {
          this.loading = false;
          this.changeSuccessMessage(`Se registro la localización del elemento :${resElemento.codigole}.`, 'success');
        }, err => {
          this.loading = false;
          this.changeSuccessMessage('No se pudo regitrar.', 'primary');
        });
  }

  public changeSuccessMessage(mensaje: string, tipo: string) {
    this.tipoAlert = tipo;
    this._success.next(mensaje);
  }
  tabPagina1() {
    this.selected.setValue(0);
  }
  tabPagina2() {
    this.selected.setValue(1);
  }
  tabPagina3() {
    this.selected.setValue(2);
  }
  openDialogo(): void {
    const dialogRef = this.dialog.open(ConfirmacionComponent, {
      width: '250px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result)
        this.guardarLocalizacion();
    });
  }
  openDialogoEditar(): void {
    const dialogRef = this.dialog.open(ConfirmacionComponent, {
      width: '250px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result)
        this.editar_LocalizacionElemento();
    });
  }
  editar_LocalizacionElemento() {

  }
  buscarLE() {
    this.loading = true;
    //variables necesarias para recuperarse de errores contiente un caracter invisible
    var codigole = "~^ªº~†⑦→∞¬¬";
    var nombres = "~^ªº~†⑦→∞¬¬";
    var nomcomuns = "~^ªº~†⑦→∞¬¬";

    if (this.buscarForm.get('codigole').value)
      codigole = this.buscarForm.get('codigole').value;
    if (this.buscarForm.get('nombres').value)
      nombres = this.buscarForm.get('nombres').value;
    if (this.buscarForm.get('nomcomuns').value)
      nomcomuns = this.buscarForm.get('nomcomuns').value;
    console.log('buscar:', codigole, nombres, nomcomuns);
    this.usuarioService.getLocalizacionElemento(codigole)
      .subscribe(
        data => {
          this.dataLE = data;
          var k = 0;
          for (let elementoVal of this.dataLE) {
            var leVal = new Localizacion_Modelo();
            k = k + 1;
            this.lista_LE.push(crearLocalizacionElemento(k, elementoVal.localizacionId, elementoVal.codigole));
          }
          this.dataSource = new MatTableDataSource(this.lista_LE);
          this.loading = false;
        }, err => {
          this.loading = false;
          this.changeSuccessMessage('No se encontro información.', 'warning');
        });
  }
  crearForm_Buscar() {
    this.buscarForm = this.fb2.group({
      'codigole': '',
      'nombres': '',
      'nomcomuns': ''
    });
  }
  mostrar_LocalizacionElemento_Busqueda(row) {
    this.crearFormLocalizacionElemento_Buscado(this.getRastreoElemento_id(row.LocalizacionId));
    this.tabPagina1();
    this.editar = false;
    this.guardar = true;
  }

  crearFormLocalizacionElemento_Buscado(row) {
    this.leForm = this.fb.group({
      'localizacionId': row.localizacionId,
      //página1
      //identificadores
      'codigole': row.codigole,
      'ident': null,
      //  'nombres': '',
      //'nomcomuns': '',
      //'rangog': '',
      //'rangon': '',
      //'rangos': '',
      //localizadores
      'subnacion': '',
      'subdivision': '',
      'codsitio': '',
      'nomsitio': '',
      'sitioeva': '',
      'precisionl': '',
      'nommapa': '',
      'codmapa': '',
      'nummarg': '',
      'numpunto': '',
      'diezdiez': '',
      'latitud': '',
      'longitud': '',
      'coords': '',
      'coordn': '',
      'coorde': '',
      'coordo': '',
      'direccion': '',
      'ecoregion': '',
      'cuenca': '',
      //status
      'fechaeva': '',
      'ultobs': '',
      'priobs': '',
      'rangole': '',
      'fecharangole': '',
      'comrangole': '',
      //'resprg': '',
      'datosle': '',
      'contacto': '',
      'numcontacto': '',
      //descripción
      'desgen': '',
      'elev': '',
      'area': '',
      //protección
      //'lista_proteccion': '',
      'masterreno': null,
      'masprotec': null,
      'masmanejo': null,
      'involtnc': null,
      'commanejo': '',
      'comprot': '',
      //propietario
      'prop': '',
      'infprop': null,
      'comprop': '',
      //campos opcionales
      'leopc1': '',
      'leopc2': '',
      'leopc3': '',
      'leopc4': '',
      'leopc5': '',
      'leopc6': '',
      'leopc7': '',
      'leopc8': '',
      'leopc9': '',
      'leopc10': '',
      //comentarios generales
      'comentario': '',
      //documentación y mantenimiento
      'sensdatos': null,
      'limites': null,
      'fotos': null,
      'mejorfuente': '',
      'codfuente': '',

      'mdrev': null,
      'transcrito': '',
      'cc': null,
      'cartografo': '',
      'respdatos': '',
      'actualizar': ''

    });
  }
  getRastreoElemento_id(id: Number): Localizacion_Modelo {
    var localizacionElementoBusqueda = new Localizacion_Modelo();
    this.dataLE.forEach(dataLE => {
      var localizacionElemento_Busqueda = new Localizacion_Modelo();// necesario dado que si reutiliza conserva la primera asignación
      localizacionElemento_Busqueda = dataLE;
      if (id == localizacionElemento_Busqueda.localizacionId) {
        localizacionElementoBusqueda = localizacionElemento_Busqueda;
      }
    });
    return localizacionElementoBusqueda;
  }
}

function crearLocalizacionElemento(k: number, localizacionId: Number, codigole): localizacionElemento_Dato {
  return {
    numero: k,
    LocalizacionId: localizacionId,
    codigole: codigole
  };
}