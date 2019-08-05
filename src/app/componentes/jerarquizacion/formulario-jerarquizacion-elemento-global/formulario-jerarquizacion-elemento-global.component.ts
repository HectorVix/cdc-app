import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
//import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common'
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { criterio_Jerarquizacion } from '../../../modelo/select/overview-jerarquia';
import { jerarquizacion_Global_Modelo } from '../../../modelo/jerarquizacion/jerarquizacion-global-modelo';
import { Jerarquizacion } from '../../../modelo/jerarquizacion/jerarquizacion-modelo';
import { JerarquizacionService } from '../../../servicios/jerarquizacion/jerarquizacion.service';
import { FechaService } from '../../../servicios/fecha/fecha.service';
import { ElementoService } from '../../../servicios/elemento/elemento.service';
//import { elemento_Modelo } from '../../../modelo/jerarquizacion/elemento-modelo';
import { ConfirmacionComponent } from '../../../componentes/dialogo/confirmacion/confirmacion.component';
//--------------tabla------------------------------------
import { jerarquizacion_Global_FormGroup } from '../../../modelo/formGroup/jerarquizacionGloblal';
import { MatPaginator, MatSort, MatTableDataSource, MatDialog } from '@angular/material';
import { global_Dato } from '../../../modelo/tabla/global-dato'

@Component({
  selector: 'app-formulario-jerarquizacion-elemento-global',
  templateUrl: './formulario-jerarquizacion-elemento-global.component.html',
  styleUrls: ['./formulario-jerarquizacion-elemento-global.component.scss']
})
export class FormularioJerarquizacionElementoGlobalComponent implements OnInit {
  criterio_Jeraquizacion = new criterio_Jerarquizacion();
  criterio_glestim = this.criterio_Jeraquizacion.lgn_lestim;
  criterio_gabund = this.criterio_Jeraquizacion.lgn_abund;
  criterio_gdist = this.criterio_Jeraquizacion.lg_dist;
  criterio_gleprot = this.criterio_Jeraquizacion.lgn_leprot;
  criterio_gamenaz = this.criterio_Jeraquizacion.lgn_amenaz;
  criterio_gfragil = this.criterio_Jeraquizacion.lg_fragil;
  criterio_rangog = this.criterio_Jeraquizacion.lg_rango;
  jerarquizacion_Global_Form: FormGroup;
  buscar_Form: FormGroup;
  jerarquizacionId: Number;
  private _success = new Subject<string>();
  staticAlertClosed = false;
  successMessage: string;
  tipoAlert: string;
  loading: boolean;
  selected = new FormControl(0);
  //---------------------------------tabla
  displayedColumns: string[] = ['numero', 'codigoe', 'nombreg', 'descrielem'];
  dataSource: MatTableDataSource<global_Dato>;
  lista_Global: Array<global_Dato> = new Array();
  dataJerarquizacionGlobal: any;
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

  constructor(private fb: FormBuilder, public datepipe: DatePipe,
    private jerarquizacionServicio: JerarquizacionService,
    private fechaServicio: FechaService,
    private elementoServicio: ElementoService,
    private dialog: MatDialog) {
    this.crear_Jerarquizacion_Global(new jerarquizacion_Global_Modelo);
    this.crearForm_Buscar();
    this.dataSource = new MatTableDataSource(this.lista_Global);
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
  guardarRegistroJerarquiazacionGlobal() {

    this.registrarJerarquizacionGlobal();
  }
  crear_Jerarquizacion_Global(jerarquizacionGlobal: jerarquizacion_Global_Modelo) {
    var temporalJerarquizacionGlobalFormGroup = new jerarquizacion_Global_FormGroup()
    this.jerarquizacion_Global_Form = temporalJerarquizacionGlobalFormGroup.getJerarquizacion_Global_FormGrup(jerarquizacionGlobal);
  }
  //validar codigoe 
  validarCodigoe() {
    this.loading = true;
    this.elementoServicio.validarElementoCodigoe(this.jerarquizacion_Global_Form.get('codigoe').value)
      .subscribe(
        resElemento => {
          this.loading = false;
          this.changeSuccessMessage(`Si existe el elemento:${resElemento.codigoe}.`, 'success');
        }, err => {
          this.loading = false;
          if (err.status === 404)
            this.changeSuccessMessage('No existe el CODIGOE del elemento, por favor ingresa un código valido.', 'primary');
          else
            this.changeSuccessMessage('No se pudo validar, comprueba que esté disponible el servicio.', 'primary');
        });
  }
  //registro nuevo formulario jerarquizacion global
  registrarJerarquizacionGlobal() {
    if (this.jerarquizacion_Global_Form.get('codigoe').value && this.jerarquizacion_Global_Form.valid) {
      var jerarquizacionModelo = new Jerarquizacion();
      jerarquizacionModelo.codigoe = this.jerarquizacion_Global_Form.get('codigoe').value;
      var globalist: Array<jerarquizacion_Global_Modelo> = new Array();
      globalist.push(this.setDatosJerarquizacionGlobal(this.jerarquizacion_Global_Form.value));
      jerarquizacionModelo.globalList = globalist;
      this.addJerarquizacionGlobal(jerarquizacionModelo);
    }
    else
      this.changeSuccessMessage('No se pudo registrar el codigoe es obligatorio ó valida que los campos esten correctos donde se te indica..', 'primary');
  }
  setDatosJerarquizacionGlobal(datos: jerarquizacion_Global_Modelo): jerarquizacion_Global_Modelo {
    datos.fecharg = this.fechaServicio.toFormatoDateTime(this.jerarquizacion_Global_Form.get('fecharg').value);
    datos.edicion = this.fechaServicio.toFormatoDateTime(this.jerarquizacion_Global_Form.get('edicion').value);
    datos.actualizar = this.fechaServicio.toFormatoDateTime(this.jerarquizacion_Global_Form.get('actualizar').value);
    return datos;
  }
  //agrega un nuevo registro jerarquizacion global
  addJerarquizacionGlobal(jerarquizacion: Jerarquizacion): void {
    this.loading = true;
    this.jerarquizacionServicio.addJerarquizacionGlobal(jerarquizacion)
      .subscribe(
        resElemento => {
          this.loading = false;
          this.changeSuccessMessage(`Si registro la jerarquización  del elemento:${resElemento.codigoe}.`, 'success');
        }, err => {
          this.loading = false;
          if (err.status === 404)
            this.changeSuccessMessage(`Error no se pudo registrar el CODIGOE del elemento no existe, por favor ingresa uno valido.`, 'primary');
          else
            this.changeSuccessMessage('No se pudo regitrar, comprueba que esté disponible el servicio.', 'primary');
        });
  }

  //mensajes
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
  openDialogo(): void {
    const dialogRef = this.dialog.open(ConfirmacionComponent, {
      width: '250px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result)
        this.guardarRegistroJerarquiazacionGlobal();
    });
  }
  openDialogoEditar(): void {
    const dialogRef = this.dialog.open(ConfirmacionComponent, {
      width: '250px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result)
        this.editarJerarquizacionGlobal();
    });
  }
  crearForm_Buscar() {
    this.buscar_Form = this.fb.group({
      'codigoe': '',
      'nombreg': '',
      'descrielem': ''
    });
  }
  buscarJerarquizacionGlobal() {
    this.lista_Global = new Array();
    this.loading = true;
    var a = "¬";
    var b = "¬";
    var c = "¬";
    if (this.buscar_Form.get('codigoe').value)
      a = this.buscar_Form.get('codigoe').value;
    if (this.buscar_Form.get('nombreg').value)
      b = this.buscar_Form.get('nombreg').value;
    if (this.buscar_Form.get('descrielem').value)
      c = this.buscar_Form.get('descrielem').value;
    this.jerarquizacionServicio.getJerarquizacionesGlobal(a, b, c)
      .subscribe(
        data => {
          this.dataJerarquizacionGlobal = data;
          var k = 0;
          for (let val of this.dataJerarquizacionGlobal) {
            k = k + 1;
            this.lista_Global.push(crearGlobal(k,
              val.globalId,
              val.codigoe,
              val.nombreg,
              val.descrielem));
          }
          this.dataSource = new MatTableDataSource(this.lista_Global);
          this.loading = false;
        }, err => {
          this.loading = false;
          this.changeSuccessMessage('No se encontro información.', 'warning');
        });
  }

  getJerarquizacionGlobal_id(id: Number): jerarquizacion_Global_Modelo {
    var base_jerarquizacioGlobalBusqueda = new jerarquizacion_Global_Modelo();
    this.dataJerarquizacionGlobal.forEach(dataJerarquizacionGlobal => {
      var jerarquizacionGlobalBusqueda = new jerarquizacion_Global_Modelo();
      jerarquizacionGlobalBusqueda = dataJerarquizacionGlobal;
      if (id == jerarquizacionGlobalBusqueda.globalId) {
        base_jerarquizacioGlobalBusqueda = jerarquizacionGlobalBusqueda;
        this.jerarquia_Aux = base_jerarquizacioGlobalBusqueda;
        this.jerarquizacionId = this.jerarquia_Aux.jerarquizacionjerarquizacionid.jerarquizacionId;//al obtener lo pasa todo a minisculas
        this.editar = false;
      }
    });
    return base_jerarquizacioGlobalBusqueda;
  }
  mostrar_JerarquizacionGlobal_Busqueda(row: global_Dato) {
    this.crear_Jerarquizacion_Global(this.getJerarquizacionGlobal_id(row.globalId));
    this.tabPagina1();
    this.guardar = true;
  }
  updateJerarquizacionGlobal(global: jerarquizacion_Global_Modelo): void {
    this.loading = true;
    this.jerarquizacionServicio.updateGlobal(global, this.jerarquizacionId)
      .subscribe(
        resGlobal => {
          this.loading = false;
          this.changeSuccessMessage(`Editado exitoso, código del elemento:${resGlobal.codigoe}.`, 'success');
          this.lista_Global = new Array();
          this.dataSource = new MatTableDataSource(this.lista_Global);
        }, err => {
          this.loading = false;
          this.changeSuccessMessage('Error no se pudo editar, comprueba que esté disponible el servicio', 'primary');
        });
  }
  editarJerarquizacionGlobal() {
    if (this.jerarquizacion_Global_Form.get('codigoe').value && this.jerarquizacion_Global_Form.valid)
      this.updateJerarquizacionGlobal(this.setDatosJerarquizacionGlobal(this.jerarquizacion_Global_Form.value));
    else
      this.changeSuccessMessage('Valida que los campos estén correctos donde se te indica..', 'primary');
  }
  nuevo() {
    this.editar = true;
    this.guardar = false;
    this.crear_Jerarquizacion_Global(new jerarquizacion_Global_Modelo());
    this.crearForm_Buscar();
    this.tabPagina1();
  }
  // lleva el control de los errores
  //página 1
  get input_codigoe() { return this.jerarquizacion_Global_Form.get('codigoe'); }
  get input_nombreg() { return this.jerarquizacion_Global_Form.get('nombreg'); }
  get input_descrielem() { return this.jerarquizacion_Global_Form.get('descrielem'); }
  get input_especle() { return this.jerarquizacion_Global_Form.get('especle'); }
  get input_especranga() { return this.jerarquizacion_Global_Form.get('especranga'); }
  get input_especrangb() { return this.jerarquizacion_Global_Form.get('especrangb'); }
  get input_especrangc() { return this.jerarquizacion_Global_Form.get('especrangc'); }
  get input_especrangd() { return this.jerarquizacion_Global_Form.get('especrangd'); }
  get input_habitat() { return this.jerarquizacion_Global_Form.get('habitat'); }
  get input_permanencia() { return this.jerarquizacion_Global_Form.get('permanencia'); }
  get input_gloctip() { return this.jerarquizacion_Global_Form.get('gloctip'); }
  get input_comtax() { return this.jerarquizacion_Global_Form.get('comtax'); }
  get input_glestimcom() { return this.jerarquizacion_Global_Form.get('glestimcom'); }
  get input_gabundcom() { return this.jerarquizacion_Global_Form.get('gabundcom'); }
  get input_gdistcom() { return this.jerarquizacion_Global_Form.get('gdistcom'); }
  //página 2
  get input_gleprotcom() { return this.jerarquizacion_Global_Form.get('gleprotcom'); }
  get input_gfragilcom() { return this.jerarquizacion_Global_Form.get('gfragilcom'); }
  get input_gotroconsi() { return this.jerarquizacion_Global_Form.get('gotroconsi'); }
  get input_fecharg() { return this.jerarquizacion_Global_Form.get('fecharg'); }
  get input_granrazon() { return this.jerarquizacion_Global_Form.get('granrazon'); }
  get input_gnecprotec() { return this.jerarquizacion_Global_Form.get('gnecprotec'); }
  get input_gamenazcom() { return this.jerarquizacion_Global_Form.get('gamenazcom'); }
  get input_gnecinvent() { return this.jerarquizacion_Global_Form.get('gnecinvent'); }
  get input_gnecestudi() { return this.jerarquizacion_Global_Form.get('gnecestudi'); }
  get input_gnecmanejo() { return this.jerarquizacion_Global_Form.get('gnecmanejo'); }
  get input_resrg() { return this.jerarquizacion_Global_Form.get('resrg'); }
  get input_edautor() { return this.jerarquizacion_Global_Form.get('edautor'); }
  get input_edicion() { return this.jerarquizacion_Global_Form.get('edicion'); }
  get input_actualizar() { return this.jerarquizacion_Global_Form.get('actualizar'); }

}
function crearGlobal(k: Number, globalId: Number, codigoe, nombreg, descrielem): global_Dato {
  return {
    numero: k,
    globalId: globalId,
    codigoe: codigoe,
    nombreg: nombreg,
    descrielem: descrielem
  };
}