import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common'
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { criterio_Jerarquizacion } from '../../../modelo/select/overview-jerarquia';
import { Jerarquizacion } from '../../../modelo/jerarquizacion/jerarquizacion-modelo';
import { JerarquizacionService } from '../../../servicios/jerarquizacion/jerarquizacion.service';
import { FechaService } from '../../../servicios/fecha/fecha.service';
import { ElementoService } from '../../../servicios/elemento/elemento.service';
import { elemento_Modelo } from '../../../modelo/jerarquizacion/elemento-modelo';
import { jerarquizacion_Nacional_Modelo } from '../../../modelo/jerarquizacion/jerarquizacion-nacional-modelo';
import { ConfirmacionComponent } from '../../../componentes/dialogo/confirmacion/confirmacion.component';
//--------------tabla------------------------------------
import { jerarquizacion_Nacional_FormGroup } from '../../../modelo/formGroup/jerarquizacionNacional';
import { MatPaginator, MatSort, MatTableDataSource, MatSelectModule, MatDialog } from '@angular/material';
import { nacional_Dato } from '../../../modelo/tabla/nacional-dato'

@Component({
  selector: 'app-formulario-jerarquizacion-elemento-nacional',
  templateUrl: './formulario-jerarquizacion-elemento-nacional.component.html',
  styleUrls: ['./formulario-jerarquizacion-elemento-nacional.component.scss']
})
export class FormularioJerarquizacionElementoNacionalComponent implements OnInit {

  criterio_Jeraquizacion = new criterio_Jerarquizacion();
  criterio_nlestim = this.criterio_Jeraquizacion.lgn_lestim;
  criterio_nabund = this.criterio_Jeraquizacion.lgn_abund;
  criterio_ndist = this.criterio_Jeraquizacion.ln_dist;
  criterio_nleprot = this.criterio_Jeraquizacion.lgn_leprot;
  criterio_namenaz = this.criterio_Jeraquizacion.lgn_amenaz;
  criterio_rangon = this.criterio_Jeraquizacion.ln_rango;
  jerarquizacion_Nacional_Form: FormGroup;
  buscar_Form: FormGroup;
  jerarquizacionId: Number;
  private _success = new Subject<string>();
  staticAlertClosed = false;
  successMessage: string;
  tipoAlert: string;
  loading: boolean;
  selected = new FormControl(0);
  //---------------------------------tabla
  displayedColumns: string[] = ['numero', 'codigoe', 'nombren', 'nacion'];
  dataSource: MatTableDataSource<nacional_Dato>;
  lista_Nacional: Array<nacional_Dato> = new Array();
  dataJerarquizacionNacional: any;
  private paginator: MatPaginator;
  @ViewChild(MatPaginator) set matPaginator(mp: MatPaginator) {
    this.paginator = mp;
    this.setDataSourceAttributes();
  }
  @ViewChild(MatSort) sort: MatSort;
  //------------------------------------------
  editar = true;
  guardar = false;
  jerarquia_Aux: any;

  constructor(private fb: FormBuilder,
    private jerarquizacionServicio: JerarquizacionService,
    private fechaServicio: FechaService,
    private elementoServicio: ElementoService,
    private dialog: MatDialog) {
    this.createFormJerarquizacionNacional(new jerarquizacion_Nacional_Modelo());
    this.crearForm_Buscar();
    this.dataSource = new MatTableDataSource(this.lista_Nacional);
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
  createFormJerarquizacionNacional(jerarquizacionNacional: jerarquizacion_Nacional_Modelo) {
    var temporalJerarquizacionNacionalFormGroup = new jerarquizacion_Nacional_FormGroup();
    this.jerarquizacion_Nacional_Form = temporalJerarquizacionNacionalFormGroup.getJerarquizacion_Nacional_FormGrup(jerarquizacionNacional);
  }
  //guardar registro jerarquizacion nacional
  guardarRegistroJerarquiazacionNacional() {
    var jerarquizacionBase = new Jerarquizacion();
    var jerarquizacionNacional = new jerarquizacion_Nacional_Modelo();
    var nacionalList: Array<jerarquizacion_Nacional_Modelo> = new Array();
    jerarquizacionBase.codigoe = this.jerarquizacion_Nacional_Form.get('codigoe').value;
    jerarquizacionNacional = this.setDatosJerarquizacionNacional(this.jerarquizacion_Nacional_Form.value);
    nacionalList.push(jerarquizacionNacional);
    jerarquizacionBase.nacionalList = nacionalList;
    this.addJerarquizacionNacional(jerarquizacionBase)
  }
  //setear datos jerarquizacion nacional
  setDatosJerarquizacionNacional(datos: jerarquizacion_Nacional_Modelo): jerarquizacion_Nacional_Modelo {
    datos.fecharn = this.fechaServicio.toFormatoDateTime(this.jerarquizacion_Nacional_Form.get('fecharn').value);
    datos.edicion = this.fechaServicio.toFormatoDateTime(this.jerarquizacion_Nacional_Form.get('edicion').value);
    datos.actualizar = this.fechaServicio.toFormatoDateTime(this.jerarquizacion_Nacional_Form.get('actualizar').value);
    return datos;
  }
  //agrega un nuevo registro jerarquizacion global

  addJerarquizacionNacional(jerarquizacion: Jerarquizacion): void {
    this.loading = true;
    this.jerarquizacionServicio.addJerarquizacionNacional(jerarquizacion)
      .subscribe(
        resElemento => {
          this.loading = false;
          this.changeSuccessMessage(`Se registro la jerarquización nacional del elemento :${resElemento.codigoe}.`, 'success');
        }, err => {
          this.loading = false;
          if (err.status === 404)
            this.changeSuccessMessage(`Error no pudo registrar el CODIGOE del elemento no existe, por favor ingresa uno valido.`, 'primary');
          else
            this.changeSuccessMessage('No se pudo regitrar, comprueba que esté disponible el servicio.', 'primary');
        });
  }
  //validar codigoe 
  validarCodigoe() {
    this.elementoServicio.validarElementoCodigoe(this.jerarquizacion_Nacional_Form.get('codigoe').value)
      .subscribe(
        resElemento => {
          this.changeSuccessMessage(`Si existe el elemento:${resElemento.codigoe}.`, 'success');
        }, err => {
          if (err.status === 404)
            this.changeSuccessMessage('No existe el CODIGOE del elemento, por favor ingresa un código valido.', 'primary');
          else
            this.changeSuccessMessage('No se pudo validar, comprueba que esté disponible el servicio.', 'primary');
        });
  }
  public changeSuccessMessage(mensaje: string, tipo: string) {
    this.tipoAlert = tipo;
    this._success.next(mensaje);
  }
  tabPagina2() {
    this.selected.setValue(1);
  }
  tabPagina1() {
    this.selected.setValue(0);
  }
  openDialogo(): void {
    const dialogRef = this.dialog.open(ConfirmacionComponent, {
      width: '250px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result)
        this.guardarRegistroJerarquiazacionNacional();
    });
  }
  openDialogoEditar(): void {
    const dialogRef = this.dialog.open(ConfirmacionComponent, {
      width: '250px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result)
        this.editarJerarquizacionNacional();
    });
  }
  crearForm_Buscar() {
    this.buscar_Form = this.fb.group({
      'codigoe': '',
      'nombren': '',
      'nacion': ''
    });
  }
  buscarJerarquizacionNacional() {
    this.lista_Nacional = new Array();
    this.loading = true;
    var a = "¬";
    var b = "¬";
    var c = "¬";
    if (this.buscar_Form.get('codigoe').value)
      a = this.buscar_Form.get('codigoe').value;
    if (this.buscar_Form.get('nombren').value)
      b = this.buscar_Form.get('nombren').value;
    if (this.buscar_Form.get('nacion').value)
      c = this.buscar_Form.get('nacion').value;
    this.jerarquizacionServicio.getJerarquizacionesNacional(a, b, c)
      .subscribe(
        data => {
          this.dataJerarquizacionNacional = data;
          var k = 0;
          for (let val of this.dataJerarquizacionNacional) {
            k = k + 1;
            this.lista_Nacional.push(crearNacional(k,
              val.nacionalId,
              val.codigoe,
              val.nombren,
              val.nacion));
          }
          this.dataSource = new MatTableDataSource(this.lista_Nacional);
          this.loading = false;
        }, err => {
          this.loading = false;
          this.changeSuccessMessage('No se encontro información.', 'warning');
        });
  }
  getJerarquizacionNacional_id(id: Number): jerarquizacion_Nacional_Modelo {
    var base_jerarquizacionNacionallBusqueda = new jerarquizacion_Nacional_Modelo();
    this.dataJerarquizacionNacional.forEach(dataJerarquizacionNacional => {
      var jerarquizacionNacionalBusqueda: jerarquizacion_Nacional_Modelo = dataJerarquizacionNacional;
      if (id == dataJerarquizacionNacional.nacionalId) {
        base_jerarquizacionNacionallBusqueda = jerarquizacionNacionalBusqueda;
        this.jerarquia_Aux = base_jerarquizacionNacionallBusqueda;
        this.jerarquizacionId = this.jerarquia_Aux.jerarquizacionjerarquizacionid.jerarquizacionId;//al obtener lo pasa todo a minisculas
        this.editar = false;
      }
    });
    return base_jerarquizacionNacionallBusqueda;
  }
  mostrar_JerarquizacionNacional_Busqueda(row: nacional_Dato) {
    this.createFormJerarquizacionNacional(this.getJerarquizacionNacional_id(row.nacionalId));
    this.tabPagina1();
    this.guardar = true;
  }
  updateJerarquizacionNacional(nacional: jerarquizacion_Nacional_Modelo): void {
    this.loading = true;
    this.jerarquizacionServicio.updateNacional(nacional, this.jerarquizacionId)
      .subscribe(
        resNacional => {
          this.loading = false;
          this.changeSuccessMessage(`Editado exitoso, código del elemento:${resNacional.codigoe}.`, 'success');
          this.lista_Nacional = new Array();
          this.dataSource = new MatTableDataSource(this.lista_Nacional);
        }, err => {
          this.loading = false;
          this.changeSuccessMessage('Error no se pudo editar, comprueba que esté disponible el servicio.', 'primary');
        });
  }
  editarJerarquizacionNacional() {
    if (this.jerarquizacion_Nacional_Form.get('codigoe').value)
      this.updateJerarquizacionNacional(this.setDatosJerarquizacionNacional(this.jerarquizacion_Nacional_Form.value));
  }
  nuevo() {
    this.editar = true;
    this.guardar = false;
    this.createFormJerarquizacionNacional(new jerarquizacion_Nacional_Modelo());
    this.crearForm_Buscar();
    this.tabPagina1();
  }
}
function crearNacional(k: Number, nacionalId: Number, codigoe, nombren, nacion): nacional_Dato {
  return {
    numero: k,
    nacionalId: nacionalId,
    codigoe: codigoe,
    nombren: nombren,
    nacion: nacion
  };
}