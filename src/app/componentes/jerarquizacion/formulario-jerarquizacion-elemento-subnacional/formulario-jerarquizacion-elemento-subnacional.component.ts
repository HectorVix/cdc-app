import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { criterio_Jerarquizacion } from '../../../modelo/select/overview-jerarquia';
import { Jerarquizacion } from '../../../modelo/jerarquizacion/jerarquizacion-modelo';
import { JerarquizacionService } from '../../../servicios/jerarquizacion/jerarquizacion.service';
import { FechaService } from '../../../servicios/fecha/fecha.service';
import { ElementoService } from '../../../servicios/elemento/elemento.service';
import { departamento_Nombre } from '../../../modelo/jerarquizacion/departamento-nombre';
import { jerarquizacion_Subnacional_Modelo } from '../../../modelo/jerarquizacion/jerarquizacion-subnacional-modelo';
import { ConfirmacionComponent } from '../../../componentes/dialogo/confirmacion/confirmacion.component';
import { Valor } from '../../../modelo/select/overwiew-valor';
//--------------tabla------------------------------------
import { jerarquizacion_Subnacional_FormGroup } from '../../../modelo/formGroup/jerarquizacionSubnacional';
import { MatPaginator, MatSort, MatTableDataSource, MatDialog } from '@angular/material';
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
  criterio_rangos = this.criterio_Jeraquizacion.ls_rango;
  criterio_Nacion = [];
  criterio_Subnacion = this.criterio_Jeraquizacion.ls_Subnacion;
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
    this.obtener_rangos();
    this.obtener_nacion();
    this.obtener_subnacion();
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
  crear_Jerarquizacion_Subnacional(jerarquizacionSubnacional: jerarquizacion_Subnacional_Modelo) {
    var jerarquizacion_Subnacional_Form = new jerarquizacion_Subnacional_FormGroup();
    this.jerarquizacion_SubnacionalForm = jerarquizacion_Subnacional_Form.getJerarquizacion_Subnacional_FormGrup(jerarquizacionSubnacional);
  }

  //guardar registro jerarquizacion subnancional
  guardarRegistroJerarquizacionSubnacional() {
    if (this.jerarquizacion_SubnacionalForm.get('codigoe').value) {
      if (this.jerarquizacion_SubnacionalForm.valid) {
        if (this.jerarquizacion_SubnacionalForm.get('subnacion').value) {
          var jerarquizacionBase = new Jerarquizacion();
          var jerarquizacionSubnacional = new jerarquizacion_Subnacional_Modelo();
          var subnacionalList: Array<jerarquizacion_Subnacional_Modelo> = new Array();
          jerarquizacionBase.codigoe = this.jerarquizacion_SubnacionalForm.get('codigoe').value;
          jerarquizacionSubnacional = this.setDatosJerarquizacionSubnacional(this.jerarquizacion_SubnacionalForm.value);
          subnacionalList.push(jerarquizacionSubnacional);
          jerarquizacionBase.subnacionalList = subnacionalList;
          this.addJerarquizacionNacional(jerarquizacionBase)
        }
        else
          this.changeSuccessMessage('Por favor debes seleccionar un departamento de Guatemala para poder registrar la jerarquizacón subnacional.', 'primary');
      }
      else
        this.changeSuccessMessage('Valida que los campos estén correctos donde se te indica.', 'primary');
    }
    else
      this.changeSuccessMessage('No se pudo registrar, el código del elemento (CODIGOE) es obligatorio.', 'primary');
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
          if (err.status === 404)
            this.changeSuccessMessage(`Error no se pudo registrar el CODIGOE del elemento no existe, por favor ingresa uno valido.`, 'primary');
          else {
            var depto = new departamento_Nombre();
            depto.departamentoNombre(this.jerarquizacion_SubnacionalForm.get('subnacion').value);
            this.changeSuccessMessage(`No se pudo regitrar, el elemento con el CODIGOE: \"${this.jerarquizacion_SubnacionalForm.get('codigoe').value}\"
            asociado al departamento: \"${depto.valor_Depto}\" esté ya está jerarquizado subnacionalmente ó comprueba que esté disponible el servicio.`, 'primary');
          }
        });
  }
  //validar codigoe 
  validarCodigoe() {
    this.loading = true;
    this.elementoServicio.validarElementoCodigoe(this.jerarquizacion_SubnacionalForm.get('codigoe').value)
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
      'nacion': 'GT',
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
  buscarTodos() {
    this.lista_Subnacional = new Array();
    this.loading = true;
    this.jerarquizacionServicio.all_Subnacional
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
  tabPagina2() {
    this.selected.setValue(1);
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
          this.editar = false;
        }, err => {
          this.loading = false;
          this.changeSuccessMessage('Error no se pudo editar, comprueba que esté disponible el servicio.', 'primary');
        });
  }
  editarJerarquizacionSubnacional() {
    if (this.jerarquizacion_SubnacionalForm.get('codigoe').value && this.jerarquizacion_SubnacionalForm.valid)
      this.updateJerarquizacionSubnacional(this.setDatosJerarquizacionSubnacional(this.jerarquizacion_SubnacionalForm.value));
    else
      this.changeSuccessMessage('Valida que los campos estén correctos donde se te indica..', 'primary');
  }
  nuevo() {
    this.editar = true;
    this.guardar = false;
    this.crear_Jerarquizacion_Subnacional(new jerarquizacion_Subnacional_Modelo());
    this.crearForm_Buscar();
    this.tabPagina1();
  }

  //lleva el control de los errores
  get input_codigoe() { return this.jerarquizacion_SubnacionalForm.get('codigoe'); }
  get input_nacion() { return this.jerarquizacion_SubnacionalForm.get('nacion'); }
  get input_subnacion() { return this.jerarquizacion_SubnacionalForm.get('subnacion'); }
  get input_nombres() { return this.jerarquizacion_SubnacionalForm.get('nombres'); }
  get input_loctips() { return this.jerarquizacion_SubnacionalForm.get('loctips'); }
  get input_comlestims() { return this.jerarquizacion_SubnacionalForm.get('comlestims'); }
  get input_comabunds() { return this.jerarquizacion_SubnacionalForm.get('comabunds'); }
  get input_comdists() { return this.jerarquizacion_SubnacionalForm.get('comdists'); }
  get input_comleprots() { return this.jerarquizacion_SubnacionalForm.get('comleprots'); }
  get input_comamenazs() { return this.jerarquizacion_SubnacionalForm.get('comamenazs'); }
  get input_otraconsids() { return this.jerarquizacion_SubnacionalForm.get('otraconsids'); }
  get input_razonrs() { return this.jerarquizacion_SubnacionalForm.get('razonrs'); }
  get input_necprotecs() { return this.jerarquizacion_SubnacionalForm.get('necprotecs'); }
  get input_necinvents() { return this.jerarquizacion_SubnacionalForm.get('necinvents'); }
  get input_necmanejos() { return this.jerarquizacion_SubnacionalForm.get('necmanejos'); }
  get input_autored() { return this.jerarquizacion_SubnacionalForm.get('autored'); }
  get input_edicion() { return this.jerarquizacion_SubnacionalForm.get('edicion'); }
  get input_actualizar() { return this.jerarquizacion_SubnacionalForm.get('actualizar'); }

  //Catalogo de rango subnacional
  obtener_rangos() {
    this.jerarquizacionServicio.rangos.subscribe(
      (resRangos: any[]) => {
        resRangos.forEach(rangos => {
          var modelo_Valor = new Valor();
          modelo_Valor.value = rangos.rangos;
          modelo_Valor.viewValue = rangos.rangos;
          this.criterio_rangos.push(modelo_Valor);
        });
      }, err => {
        this.changeSuccessMessage('Error no se pudo obtener los rangos subnacionales, comprueba que esté disponible el servicio.', 'primary');
      });
  }
  //Catalogo de nación
  obtener_nacion() {
    this.jerarquizacionServicio.obtener_nacion();
    this.criterio_Nacion = this.jerarquizacionServicio.nacion_Valor;
  }
  //Catalogo de subnación (Depto)
  obtener_subnacion() {
    this.jerarquizacionServicio.obtener_subnacion();
    this.criterio_Subnacion = this.jerarquizacionServicio.subnacion_Valor;
  }
}
function crearSubnacional(k: Number, subnacionalId: Number, codigoe, subnacion, nombres): subnacional_Dato {
  var depto = new departamento_Nombre();
  depto.departamentoNombre(subnacion);
  return {
    numero: k,
    subnacionalId: subnacionalId,
    codigoe: codigoe,
    subnacion: depto.valor_Depto,
    nombres: nombres
  };
}