import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
//import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
//import { DatePipe } from '@angular/common'
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { criterio_le } from '../../../modelo/select/overview-localizacion';
import { LocalizacionService } from '../../../servicios/localizacion/localizacion.service';
//import { ElementoService } from '../../../servicios/elemento/elemento.service';
import { FechaService } from '../../../servicios/fecha/fecha.service';
import { Localizacion_Modelo } from '../../../modelo/localizacion/localizacion-modelo';
import { proteccion_Modelo } from '../../../modelo/localizacion/proteccion-modelo';
import { ConfirmacionComponent } from '../../../componentes/dialogo/confirmacion/confirmacion.component';
//--------------tabla------------------------------------
import { MatPaginator, MatSort, MatTableDataSource, MatDialog } from '@angular/material';
import { localizacionElemento_Dato } from '../../../modelo/tabla/localizacion-elemento-dato'
import { localizacion_FormGroup } from '../../../modelo/formGroup/localizacion';
import { LocalDataSource } from 'ng2-smart-table';
//import { ratreoElemento_Dato } from '../../../modelo/tabla/rastreo-elemento-dato';

@Component({
  selector: 'app-formulario-le',
  templateUrl: './formulario-le.component.html',
  styleUrls: ['./formulario-le.component.scss']
})
export class FormularioLeComponent implements OnInit {
  data_proteccion_DataSource: LocalDataSource = new LocalDataSource();
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
    add: {
      addButtonContent: '<i class="fa  fa-plus prefix"></i> Nuevo',
      createButtonContent: '<i class="fa fa-check"></i> Crear',
      cancelButtonContent: ' <i class="fa fa-times"></i> Cancelar',
      confirmCreate: true,
    },
    edit: {
      editButtonContent: '<i class="fa fa-pencil"></i> Editar',
      saveButtonContent: '<i class="fa fa-check"></i> Guardar',
      cancelButtonContent: ' <i class="fa fa-times"></i> Cancelar',
      confirmSave: true,
    },
    delete: {
      deleteButtonContent: '<i class="fa fa-trash"></i> Borrar',
      confirmDelete: true,
    },
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
  editar = true;
  guardar = false;
  rastreo_Aux: any;
  rastreoId: Number;

  constructor(private fb: FormBuilder,
    private localizacionServicio: LocalizacionService,
    //private elementoServicio: ElementoService,
    private fechaServicio: FechaService,
    private dialog: MatDialog) {
    this.crearFormLocalizacion_Elemento(new Localizacion_Modelo);
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
  crearFormLocalizacion_Elemento(le: Localizacion_Modelo) {
    this.leForm = new localizacion_FormGroup().getLocalizacion_FormGrup(le);
  }

  guardarLocalizacion() {
    if (this.leForm.get('codigole').value && this.leForm.valid) {
      var localizacionElementoBase = this.setLocalizacionElemento(this.leForm.value);
      var proteccion: Array<proteccion_Modelo> = new Array();
      this.data_proteccion_DataSource.getAll().then(value => {
        value.forEach(elemento => {
          var proteccionBase = new proteccion_Modelo();
          proteccionBase.codigoam = elemento.codigoam;
          proteccionBase.nombream = elemento.nombream;
          proteccionBase.contenido = elemento.contenido;
          proteccion.push(proteccionBase);
        });
        localizacionElementoBase.proteccionList = proteccion;
        this.addLocalizacionElemento(localizacionElementoBase);
      });
    }
    else
      this.changeSuccessMessage('No se pudo registrar el codigole es obligatorio ó valida que los campos esten correctos donde se te indica..', 'primary');
  }
  setLocalizacionElemento(datos: Localizacion_Modelo): Localizacion_Modelo {
    datos.fechaeva = this.fechaServicio.toFormatoDateTime(this.leForm.get('fechaeva').value);
    datos.ultobs = this.fechaServicio.toFormatoDateTime(this.leForm.get('ultobs').value);
    datos.fecharangole = this.fechaServicio.toFormatoDateTime(this.leForm.get('fecharangole').value);
    datos.transcrito = this.fechaServicio.toFormatoDateTime(this.leForm.get('transcrito').value);
    datos.cartografo = this.fechaServicio.toFormatoDateTime(this.leForm.get('cartografo').value);
    datos.actualizar = this.fechaServicio.toFormatoDateTime(this.leForm.get('actualizar').value);
    return datos;
  }

  //agrega un nuevo registro localización elemento
  addLocalizacionElemento(localizacion: Localizacion_Modelo): void {
    this.loading = true;
    this.localizacionServicio.addLocalizacionElemento(localizacion)
      .subscribe(
        resElemento => {
          this.loading = false;
          this.changeSuccessMessage(`Se registro la localización del elemento :${resElemento.codigole}.`, 'success');
        }, err => {
          this.loading = false;
          if (err.status === 404)
            this.changeSuccessMessage(`Error no pudo registrar el CODIGOE del elemento no existe, por favor ingresa uno valido.`, 'primary');
          else if (err.status === 406)
            this.changeSuccessMessage('No se pudo regitrar, no existe un registro de Rastreo para este elemento, porfavor registra un Ratreo con el CODIGOE de este elemento. ', 'primary');
          else
            this.changeSuccessMessage('No se pudo regitrar, comprueba que esté disponible el servicio.', 'primary');
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
    if (this.leForm.get('codigole').value && this.leForm.valid)
      this.updateLocalizacionElemento(this.setLocalizacionElemento(this.leForm.value));
    else
      this.changeSuccessMessage('Valida que los campos estén correctos donde se te indica.', 'primary');
  }
  buscarLE() {
    this.lista_LE = new Array();
    this.data_proteccion_DataSource = new LocalDataSource();
    this.loading = true;
    //variables necesarias para recuperarse de errores
    var codigole = "¬";
    var nombres = "¬";
    var nomcomuns = "¬";
    if (this.buscarForm.get('codigole').value)
      codigole = this.buscarForm.get('codigole').value;
    if (this.buscarForm.get('nombres').value)
      nombres = this.buscarForm.get('nombres').value;
    if (this.buscarForm.get('nomcomuns').value)
      nomcomuns = this.buscarForm.get('nomcomuns').value;
    this.localizacionServicio.getLocalizacionesElementos(codigole)
      .subscribe(
        data => {
          this.dataLE = data;
          var k = 0;
          for (let elementoVal of this.dataLE) {
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
    this.buscarForm = this.fb.group({
      'codigole': '',
      'nombres': '',
      'nomcomuns': ''
    });
  }
  mostrar_LocalizacionElemento_Busqueda(row: localizacionElemento_Dato) {
    this.crearFormLocalizacion_Elemento(this.getLocalizacionElemento_id(row.LocalizacionId));
    this.tabPagina1();
    this.guardar = true;
    this.getProteccion(row.LocalizacionId);
  }

  getLocalizacionElemento_id(id: Number): Localizacion_Modelo {
    var localizacionElementoBusqueda = new Localizacion_Modelo();
    this.dataLE.forEach(dataLE => {
      var localizacionElemento_Busqueda = new Localizacion_Modelo();// necesario dado que si reutiliza conserva la primera asignación
      localizacionElemento_Busqueda = dataLE;
      if (id == localizacionElemento_Busqueda.localizacionId) {
        localizacionElementoBusqueda = localizacionElemento_Busqueda;
        this.rastreo_Aux = localizacionElementoBusqueda;
        this.rastreoId = this.rastreo_Aux.rastreorastreoid.rastreoId;
        this.editar = false;
      }
    });
    return localizacionElementoBusqueda;
  }
  nuevo() {
    this.editar = true;
    this.guardar = false;
    this.crearFormLocalizacion_Elemento(new Localizacion_Modelo);
    this.tabPagina1();
    this.data_proteccion_DataSource = new LocalDataSource();
  }
  updateLocalizacionElemento(le: Localizacion_Modelo): void {
    this.loading = true;
    this.localizacionServicio.updateLocalizacionElemento(le, this.rastreoId)
      .subscribe(
        resLe => {
          this.loading = false;
          this.changeSuccessMessage(`Editado exitoso ,codigo de localización del elemento:${resLe.codigole}.`, 'success');
          this.lista_LE = new Array();
          this.dataSource = new MatTableDataSource(this.lista_LE);
        }, err => {
          this.loading = false;
          this.changeSuccessMessage('Error no se pudo editar, el codigole no se puede repetir ó comprueba que esté disponible el servicio', 'primary');
        });
  }
  resProteccionLista: any;
  getProteccion(LocalizacionId: Number) {
    this.data_proteccion_DataSource = new LocalDataSource();
    this.localizacionServicio.getProteccion(LocalizacionId)
      .subscribe(
        resProteccion => {
          this.resProteccionLista = resProteccion;
          for (let valProteccion of this.resProteccionLista) {
            var proteccionBase = new proteccion_Modelo();
            proteccionBase = valProteccion;
            this.data_proteccion_DataSource.add(proteccionBase);
            this.data_proteccion_DataSource.refresh();
          }
        }, err => {
        });
  }

  onCreateConfirm(event): void {
    if (this.editar) { // se esta guardando un nuevo registro, aqui es verdadero por que se usa como disabled
      event.confirm.resolve(event.newData);
    }
    else // se esta editando un registro
    {
      var proteccion = new proteccion_Modelo();
      proteccion.codigoam = event.newData.codigoam;
      proteccion.nombream = event.newData.nombream;
      proteccion.contenido = event.newData.contenido;
      this.localizacionServicio.addProteccion(proteccion, this.leForm.get('localizacionId').value)
        .subscribe(
          resProteccion => {
            event.confirm.resolve(event.newData);
            this.getProteccion(this.leForm.get('localizacionId').value);
          }, err => {
          });
    }
  }

  onUpdateConfirm(event): void {
    if (this.editar) { //nuevo
      event.confirm.resolve(event.newData);
    }
    else { //editar uno existente
      var proteccion = new proteccion_Modelo();
      proteccion.codigoam = event.newData.codigoam;
      proteccion.nombream = event.newData.nombream;
      proteccion.contenido = event.newData.contenido;
      proteccion.proteccionId = event.newData.proteccionId;
      this.localizacionServicio.updateProteccion(this.leForm.get('localizacionId').value, proteccion)
        .subscribe(
          resProteccion => {
            event.confirm.resolve(event.newData);
            this.getProteccion(this.leForm.get('localizacionId').value);
          }, err => {
          });
    }
  }
  onDeleteConfirm(event): void {
    if (window.confirm('¿Estás seguro de querer borrar la protección?')) {
      if (this.editar) { //nuevo
        event.confirm.resolve(event.newData);
      } else { //editar uno existente
        this.localizacionServicio.deleteProteccion(event.data.proteccionId)
          .subscribe(
            resProteccion => {
              event.confirm.resolve(event.newData);
              this.getProteccion(this.leForm.get('localizacionId').value);
            }, err => {
            });
      }
    } else {
      event.confirm.reject();
    }
  }
  /**
   * Lleva el control de los errores al validar los 56 campos
   * Identificadores
   */
  get input_codigole() { return this.leForm.get('codigole'); }
  get input_nombres() { return this.leForm.get('nombres'); }
  get input_nomcomuns() { return this.leForm.get('nomcomuns'); }
  get input_rangog() { return this.leForm.get('rangog'); }
  get input_rangon() { return this.leForm.get('rangon'); }
  get input_rangos() { return this.leForm.get('rangos'); }
  //localizadores
  get input_subnacion() { return this.leForm.get('subnacion'); }
  get input_subdivision() { return this.leForm.get('subdivision'); }
  get input_codsitio() { return this.leForm.get('codsitio'); }
  get input_nomsitio() { return this.leForm.get('nomsitio'); }
  get input_sitioeva() { return this.leForm.get('sitioeva'); }
  get input_precisionl() { return this.leForm.get('precisionl'); }
  get input_nommapa() { return this.leForm.get('nommapa'); }
  get input_codmapa() { return this.leForm.get('codmapa'); }
  get input_nummarg() { return this.leForm.get('nummarg'); }
  get input_numpunto() { return this.leForm.get('numpunto'); }
  get input_diezdiez() { return this.leForm.get('diezdiez'); }
  /**
   * Campos para integrar con el mapa
   */
  get input_latitud() { return this.leForm.get('latitud'); }
  get input_longitud() { return this.leForm.get('longitud'); }
  get input_coords() { return this.leForm.get('coords'); }
  get input_coordn() { return this.leForm.get('coordn'); }
  get input_coorde() { return this.leForm.get('coorde'); }
  get input_coordo() { return this.leForm.get('coordo'); }

  get input_direccion() { return this.leForm.get('direccion'); }
  get input_ecoregion() { return this.leForm.get('ecoregion'); }
  get input_cuenca() { return this.leForm.get('cuenca'); }
  // Status
  get input_priobs() { return this.leForm.get('priobs'); }
  get input_fechaeva() { return this.leForm.get('fechaeva'); }
  get input_ultobs() { return this.leForm.get('ultobs'); }
  get input_fecharangole() { return this.leForm.get('fecharangole'); }
  get input_comrangole() { return this.leForm.get('comrangole'); }
  get input_datosle() { return this.leForm.get('datosle'); }
  get input_contacto() { return this.leForm.get('contacto'); }
  get input_numcontacto() { return this.leForm.get('numcontacto'); }
  /**
   * Página 2
   * Descripción
   */
  get input_desgen() { return this.leForm.get('desgen'); }
  //Protección
  get input_commanejo() { return this.leForm.get('commanejo'); }
  get input_comprot() { return this.leForm.get('comprot'); }
  //Propietario
  get input_prop() { return this.leForm.get('prop'); }
  get input_comprop() { return this.leForm.get('comprop'); }
  //Campos opcionales
  get input_leopc1() { return this.leForm.get('leopc1'); }
  get input_leopc2() { return this.leForm.get('leopc2'); }
  get input_leopc3() { return this.leForm.get('leopc3'); }
  get input_leopc4() { return this.leForm.get('leopc4'); }
  get input_leopc5() { return this.leForm.get('leopc5'); }
  get input_leopc6() { return this.leForm.get('leopc6'); }
  get input_leopc7() { return this.leForm.get('leopc7'); }
  get input_leopc8() { return this.leForm.get('leopc8'); }
  get input_leopc9() { return this.leForm.get('leopc9'); }
  get input_leopc10() { return this.leForm.get('leopc10'); }
  /**
   * Página 3
   * Comentarios generales
   */
  get input_comentario() { return this.leForm.get('comentario'); }
  //Documentación y mantenimiento
  get input_mejorfuente() { return this.leForm.get('mejorfuente'); }
  get input_codfuente() { return this.leForm.get('codfuente'); }
  get input_transcrito() { return this.leForm.get('transcrito'); }
  get input_cartografo() { return this.leForm.get('cartografo'); }
  get input_respdatos() { return this.leForm.get('respdatos'); }
  get input_actualizar() { return this.leForm.get('actualizar'); }
}
function crearLocalizacionElemento(k: Number, localizacionId: Number, codigole): localizacionElemento_Dato {
  return {
    numero: k,
    LocalizacionId: localizacionId,
    codigole: codigole
  };
}