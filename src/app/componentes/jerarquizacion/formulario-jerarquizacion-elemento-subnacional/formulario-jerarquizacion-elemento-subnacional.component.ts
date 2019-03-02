import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { criterio_Jerarquizacion } from '../../../modelo/select/overview-jerarquia';
import { Jerarquizacion } from '../../../modelo/jerarquizacion/jerarquizacion-modelo';
import { JerarquizacionService } from '../../../servicios/jerarquizacion/jerarquizacion.service';
import { FechaService } from '../../../servicios/fecha/fecha.service';
import { ElementoService } from '../../../servicios/elemento/elemento.service';
import { elemento_Modelo } from '../../../modelo/jerarquizacion/elemento-modelo';
import { jerarquizacion_Subnacional_Modelo } from '../../../modelo/jerarquizacion/jerarquizacion-subnacional-modelo';
import { ConfirmacionComponent } from '../../../componentes/dialogo/confirmacion/confirmacion.component';
//--------------tabla------------------------------------
import { jerarquizacion_Subnacional_FormGroup } from '../../../modelo/formGroup/jerarquizacionSubnacional';
import { MatPaginator, MatSort, MatTableDataSource, MatSelectModule, MatDialog } from '@angular/material';
import { subnacional_Dato } from '../../../modelo/tabla/subnacional-dato';

@Component({
  selector: 'app-formulario-jerarquizacion-elemento-subnacional',
  templateUrl: './formulario-jerarquizacion-elemento-subnacional.component.html',
  styleUrls: ['./formulario-jerarquizacion-elemento-subnacional.component.scss']
})
export class FormularioJerarquizacionElementoSubnacionalComponent implements OnInit {
  criterio_Jeraquizacion = new criterio_Jerarquizacion();
  criterio_lestims = this.criterio_Jeraquizacion.lgn_lestim;
  criterio_abunds = this.criterio_Jeraquizacion.lgn_abund;
  criterio_dists = this.criterio_Jeraquizacion.ln_dist;
  criterio_leprots = this.criterio_Jeraquizacion.lgn_leprot;
  criterio_amenazs = this.criterio_Jeraquizacion.lgn_amenaz;
  criterio_rangos = this.criterio_Jeraquizacion.ln_rango;
  jerarquizacion_SubnacionalForm: FormGroup;
  buscar_Form: FormGroup;
  jerarquizacionId: Number;
  private _success = new Subject<string>();
  staticAlertClosed = false;
  successMessage: string;
  tipoAlert: string;
  loading: boolean;
  selected = new FormControl(0);
  //---------------------------------tabla
  displayedColumns: string[] = ['numero', 'codigoe', 'subnacion', 'nombres'];
  dataSource: MatTableDataSource<subnacional_Dato>;
  lista_Subnacional: Array<subnacional_Dato> = new Array();
  dataJerarquizacionSubnacional: any;
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
    private elementoServicio: ElementoService,
    private fechaServicio: FechaService,
    private dialog: MatDialog) {
    this.crear_Jerarquizacion_Subnacional(new jerarquizacion_Subnacional_Modelo());
    this.crearForm_Buscar();
    this.dataSource = new MatTableDataSource(this.lista_Subnacional);
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
  crear_Jerarquizacion_Subnacional(jerarquizacionSubnacional: jerarquizacion_Subnacional_Modelo) {
    var jerarquizacion_Subnacional_Form = new jerarquizacion_Subnacional_FormGroup();
    this.jerarquizacion_SubnacionalForm = jerarquizacion_Subnacional_Form.getJerarquizacion_Subnacional_FormGrup(jerarquizacionSubnacional);
  }

  //guardar registro jerarquizacion subnancional
  guardarRegistroJerarquizacionSubnacional() {
    var jerarquizacionBase = new Jerarquizacion();
    var jerarquizacionSubnacional = new jerarquizacion_Subnacional_Modelo();
    var subnacionalList: Array<jerarquizacion_Subnacional_Modelo> = new Array();
    jerarquizacionBase.codigoe = this.jerarquizacion_SubnacionalForm.get('codigoe').value;
    jerarquizacionSubnacional = this.setDatosJerarquizacionSubnacional(this.jerarquizacion_SubnacionalForm.value);
    subnacionalList.push(jerarquizacionSubnacional);
    jerarquizacionBase.subnacionalList = subnacionalList;
    this.addJerarquizacionNacional(jerarquizacionBase)
  }
  //setear datos jerarquizacion subnacioal
  setDatosJerarquizacionSubnacional(datos: jerarquizacion_Subnacional_Modelo): jerarquizacion_Subnacional_Modelo {
    datos.fecharevrs = this.fechaServicio.toFormatoDateTime(this.jerarquizacion_SubnacionalForm.get('fecharevrs').value);
    datos.edicion = this.fechaServicio.toFormatoDateTime(this.jerarquizacion_SubnacionalForm.get('edicion').value);
    datos.actualizar = this.fechaServicio.toFormatoDateTime(this.jerarquizacion_SubnacionalForm.get('actualizar').value);
    return datos;
  }
  //agrega un nuevo registro jerarquizacion subnacional
  addJerarquizacionNacional(jerarquizacion: Jerarquizacion): void {
    this.loading = true;
    this.jerarquizacionServicio.addJerarquizacionSubnacional(jerarquizacion)
      .subscribe(
        resElemento => {
          this.loading = false;
          this.changeSuccessMessage(`Se registro la jerarquización subnacional del elemento :${resElemento.codigoe}.`, 'success');
        }, err => {
          this.loading = false;
          this.changeSuccessMessage('No se pudo regitrar. Comprueba que esté disponible el servicio.', 'primary');
        });
  }
  //validar codigoe 
  validarCodigoe() {
    this.elementoServicio.validarElementoCodigoe(this.jerarquizacion_SubnacionalForm.get('codigoe').value)
      .subscribe(
        resElemento => {
          this.changeSuccessMessage(`Si existe el elemento:${resElemento.codigoe}.`, 'success');
        }, err => {
          if (err.status === 404)
            this.changeSuccessMessage('No existe el CODIGOE del elemento, por favor ingresa un código valido.', 'primary');
          else
            this.changeSuccessMessage('No se pudo validar, comprueba que esté disponible el servicio.', 'primary');
        })
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
        this.guardarRegistroJerarquizacionSubnacional();
    });
  }
  openDialogoEditar(): void {
    const dialogRef = this.dialog.open(ConfirmacionComponent, {
      width: '250px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result)
        this.editarJerarquizacionSubnacional();
    });
  }
  crearForm_Buscar() {
    this.buscar_Form = this.fb.group({
      'codigoe': '',
      'nacion': '',
      'subnacion': '',
      'nombres': '',
      'loctips': ''
    });
  }
  buscarJerarquizacionSubnacional() {
    this.lista_Subnacional = new Array();
    this.loading = true;
    var a = "¬";
    var b = "¬";
    var c = "¬";
    var d = "¬";
    var e = "¬";
    if (this.buscar_Form.get('codigoe').value)
      a = this.buscar_Form.get('codigoe').value;
    if (this.buscar_Form.get('nacion').value)
      b = this.buscar_Form.get('nacion').value;
    if (this.buscar_Form.get('subnacion').value)
      c = this.buscar_Form.get('subnacion').value;
    if (this.buscar_Form.get('nombres').value)
      d = this.buscar_Form.get('nombres').value;
    if (this.buscar_Form.get('loctips').value)
      e = this.buscar_Form.get('loctips').value;
    this.jerarquizacionServicio.getJerarquizacionesSubnacional(a, b, c, d, e)
      .subscribe(
        data => {
          this.dataJerarquizacionSubnacional = data;
          var k = 0;
          for (let val of this.dataJerarquizacionSubnacional) {
            k = k + 1;
            this.lista_Subnacional.push(crearSubnacional(k,
              val.subnacionalId,
              val.codigoe,
              val.subnacion,
              val.nombres));
          }
          this.dataSource = new MatTableDataSource(this.lista_Subnacional);
          this.loading = false;
        }, err => {
          this.loading = false;
          this.changeSuccessMessage('No se encontro información.', 'warning');
        });
  }
  getJerarquizacionSubnacional_id(id: Number): jerarquizacion_Subnacional_Modelo {
    var base_jerarquizacionSubnacionallBusqueda = new jerarquizacion_Subnacional_Modelo();
    this.dataJerarquizacionSubnacional.forEach(dataJerarquizacionSubnacional => {
      var jerarquizacionSubnacionalBusqueda: jerarquizacion_Subnacional_Modelo = dataJerarquizacionSubnacional;
      if (id == dataJerarquizacionSubnacional.subnacionalId) {
        base_jerarquizacionSubnacionallBusqueda = jerarquizacionSubnacionalBusqueda;
        this.jerarquia_Aux = base_jerarquizacionSubnacionallBusqueda;
        this.jerarquizacionId = this.jerarquia_Aux.jerarquizacionjerarquizacionid.jerarquizacionId;//al obtener lo pasa todo a minisculas
        this.editar = false;
      }
    });
    return base_jerarquizacionSubnacionallBusqueda;
  }
  mostrar_JerarquizacionSubnacional_Busqueda(row: subnacional_Dato) {
    this.crear_Jerarquizacion_Subnacional(this.getJerarquizacionSubnacional_id(row.subnacionalId));
    this.tabPagina1();
    this.guardar = true;
  }
  tabPagina1() {
    this.selected.setValue(0);
  }
  updateJerarquizacionSubnacional(subnacional: jerarquizacion_Subnacional_Modelo): void {
    this.loading = true;
    this.jerarquizacionServicio.updateSubnacional(subnacional, this.jerarquizacionId)
      .subscribe(
        resSubnacional => {
          this.loading = false;
          this.changeSuccessMessage(`Editado exitoso, código del elemento:${resSubnacional.codigoe}.`, 'success');
          this.lista_Subnacional = new Array();
          this.dataSource = new MatTableDataSource(this.lista_Subnacional);
        }, err => {
          this.loading = false;
          this.changeSuccessMessage('Error no se pudo editar, comprueba que esté disponible el servicio.', 'primary');
        });
  }
  editarJerarquizacionSubnacional() {
    if (this.jerarquizacion_SubnacionalForm.get('codigoe').value)
      this.updateJerarquizacionSubnacional(this.setDatosJerarquizacionSubnacional(this.jerarquizacion_SubnacionalForm.value));
  }
  nuevo() {
    this.editar = true;
    this.guardar = false;
    this.crear_Jerarquizacion_Subnacional(new jerarquizacion_Subnacional_Modelo());
    this.crearForm_Buscar();
    this.tabPagina1();
  }
}
function crearSubnacional(k: Number, subnacionalId: Number, codigoe, subnacion, nombres): subnacional_Dato {
  return {
    numero: k,
    subnacionalId: subnacionalId,
    codigoe: codigoe,
    subnacion: subnacion,
    nombres: nombres
  };
}