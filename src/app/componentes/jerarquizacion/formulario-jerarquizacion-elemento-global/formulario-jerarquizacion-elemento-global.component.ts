import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { DatePipe } from '@angular/common'
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { criterio_Jerarquizacion } from '../../../modelo/select/overview-jerarquia';
import { jerarquizacion_Global_Modelo } from '../../../modelo/jerarquizacion/jerarquizacion-global-modelo';
import { JerarquizacionService } from '../../../servicios/jerarquizacion/jerarquizacion.service';
import { FechaService } from '../../../servicios/fecha/fecha.service';
import { ElementoService } from '../../../servicios/elemento/elemento.service';
import { ConfirmacionComponent } from '../../../componentes/dialogo/confirmacion/confirmacion.component';
import { JwtHelperService } from '@auth0/angular-jwt';
import { clase_Elemento } from '../../../modelo/jerarquizacion/clase-elemento';
import { criterio_elemento } from '../../../modelo/select/overview-elemento';
import { Valor } from '../../../modelo/select/overwiew-valor';
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
  criterio_elemento = new criterio_elemento();
  criterio_clase = this.criterio_elemento.clase;
  criterio_tipo_comunidad = this.criterio_elemento.tipo_comunidad;
  jerarquizacion_Global_Form: FormGroup;
  buscar_Form: FormGroup;
  private _success = new Subject<string>();
  staticAlertClosed = false;
  successMessage: string;
  tipoAlert: string;
  loading: boolean;
  selected = new FormControl(0);
  //---------------------------------tabla
  displayedColumns: string[] = ['numero', 'codigoe', 'nombren', 'nombrecomunn', 'clase'];
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
  elemento_Id: Number;

  constructor(private fb: FormBuilder, public datepipe: DatePipe,
    private jerarquizacionServicio: JerarquizacionService,
    private fechaServicio: FechaService,
    private elementoServicio: ElementoService,
    private dialog: MatDialog) {
    this.crear_Jerarquizacion_Global(new jerarquizacion_Global_Modelo);
    this.crearForm_Buscar();
    this.dataSource = new MatTableDataSource(this.lista_Global);
    this.obtener_rangog();
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
      this.addJerarquizacionGlobal(this.setDatosJerarquizacionGlobal(this.jerarquizacion_Global_Form.value));
    }
    else
      this.changeSuccessMessage('No se pudo registrar el codigoe es obligatorio ó valida que los campos esten correctos donde se te indica..', 'primary');
  }
  setDatosJerarquizacionGlobal(datos: jerarquizacion_Global_Modelo): jerarquizacion_Global_Modelo {
    return datos;
  }
  //agrega un nuevo registro jerarquizacion global
  addJerarquizacionGlobal(jer_global: jerarquizacion_Global_Modelo): void {
    this.loading = true;
    this.jerarquizacionServicio.addJerarquizacionGlobal(jer_global)
      .subscribe(
        resElemento => {
          this.loading = false;
          this.changeSuccessMessage(`Si registro la jerarquización  del elemento:${resElemento.codigoe}.`, 'success');
        }, err => {
          this.loading = false;
          if (err.status === 404)
            this.changeSuccessMessage(`Error no se pudo registrar el CODIGOE del elemento no existe, por favor ingresa uno valido.`, 'primary');
          else
            this.changeSuccessMessage(`No se pudo regitrar, el elemento con CODIGOE:${this.jerarquizacion_Global_Form.get('codigoe').value} ya está jerarquizado globalmente ó comprueba que esté disponible el servicio.`, 'primary');
        });
  }

  //mensajes
  public changeSuccessMessage(mensaje: string, tipo: string) {
    this.tipoAlert = tipo;
    this._success.next(mensaje);
  }
  tabPagina1() {
    this.selected.setValue(0);
    window.scrollTo(0, 0);
  }
  tabPagina2() {
    this.selected.setValue(1);
    window.scrollTo(0, 0);
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
      'nombren': '',
      'nombrecomunn': '',
      'clase': '',
      'comunidad':''
    });
  }
  buscarJerarquizacionGlobal() {
    this.lista_Global = new Array();
    this.loading = true;
    var a = "¬";
    var b = "¬";
    var c = "¬";
    var jwthelper = new JwtHelperService();
    var decodedToken = jwthelper.decodeToken(localStorage.getItem('userToken'));
    if (this.buscar_Form.get('codigoe').value)
      a = this.buscar_Form.get('codigoe').value;
    if (this.buscar_Form.get('nombren').value)
      b = this.buscar_Form.get('nombren').value;
    if (this.buscar_Form.get('nombrecomunn').value)
      c = this.buscar_Form.get('nombrecomunn').value;
    this.jerarquizacionServicio.getJerarquizacionesGlobal(a, b, c, decodedToken.sub)
      .subscribe(
        data => {
          this.dataJerarquizacionGlobal = data;
          var k = 0;
          for (let val of this.dataJerarquizacionGlobal) {
            k = k + 1;
            this.lista_Global.push(crearGlobal(k, val));
          }
          this.dataSource = new MatTableDataSource(this.lista_Global);
          this.loading = false;
        }, err => {
          this.loading = false;
          this.changeSuccessMessage('No se encontro información.', 'warning');
        });
  }
  buscarTodos() {
    this.lista_Global = new Array();
    this.loading = true;
    var jwthelper = new JwtHelperService();
    var decodedToken = jwthelper.decodeToken(localStorage.getItem('userToken'));
    this.jerarquizacionServicio.get_All_Global(decodedToken.sub)
      .subscribe(
        data => {
          this.dataJerarquizacionGlobal = data;
          var k = 0;
          for (let val of this.dataJerarquizacionGlobal) {
            k = k + 1;
            this.lista_Global.push(crearGlobal(k, val));
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
        this.elemento_Id = this.jerarquia_Aux.elementoelementoid.elementoId;//al obtener lo pasa todo a minisculas
        this.editar = false;
      }
    });
    return base_jerarquizacioGlobalBusqueda;
  }
  mostrar_JerarquizacionGlobal_Busqueda(row: global_Dato) {
    this.crear_Jerarquizacion_Global(this.getJerarquizacionGlobal_id(row.globalId));
    this.tabPagina1();
    this.guardar = true;
    window.scrollTo(0, 0);
  }
  updateJerarquizacionGlobal(global: jerarquizacion_Global_Modelo): void {
    this.loading = true;
    this.jerarquizacionServicio.updateGlobal(global, this.elemento_Id)
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
    window.scrollTo(0, 0);
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

  //Catalogo de rango global
  obtener_rangog() {
    this.jerarquizacionServicio.rangog.subscribe(
      (resRangog: any[]) => {
        resRangog.forEach(rangog => {
          var modelo_Valor = new Valor();
          modelo_Valor.value = rangog.rangog;
          modelo_Valor.viewValue = rangog.rangog;
          this.criterio_rangog.push(modelo_Valor);
        });
      }, err => {
        this.changeSuccessMessage('Error no se pudo obtener los rangos globales, comprueba que esté disponible el servicio.', 'primary');
      });
  }
  //clasificación de comunidades buscador
  get clasificacion_comunidad_Buscador() {
    var val = false;
    if (this.buscar_Form.get('clase').value == 'C')
      val = true;
    else
      val = false;
    return val;
  }
}
function crearGlobal(k: Number, datos_global): global_Dato {
  var clase = new clase_Elemento();
  clase.clase_Nombre(datos_global.elementoelementoid.clase);
  return {
    numero: k,
    globalId: datos_global.globalId,
    codigoe: datos_global.codigoe,
    nombren: datos_global.elementoelementoid.nombren,
    nombrecomunn: datos_global.elementoelementoid.nombrecomunn,
    clase: clase.valor_Clase
  };
}