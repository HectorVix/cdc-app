import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { criterio_Jerarquizacion } from '../../../modelo/select/overview-jerarquia';
import { JerarquizacionService } from '../../../servicios/jerarquizacion/jerarquizacion.service';
import { FechaService } from '../../../servicios/fecha/fecha.service';
import { ElementoService } from '../../../servicios/elemento/elemento.service';
import { jerarquizacion_Nacional_Modelo } from '../../../modelo/jerarquizacion/jerarquizacion-nacional-modelo';
import { ConfirmacionComponent } from '../../../componentes/dialogo/confirmacion/confirmacion.component';
import { Valor } from '../../../modelo/select/overwiew-valor';
import { JwtHelperService } from '@auth0/angular-jwt';
import { criterio_elemento } from '../../../modelo/select/overview-elemento';
import { clase_Elemento } from '../../../modelo/jerarquizacion/clase-elemento';
//--------------tabla------------------------------------
import { jerarquizacion_Nacional_FormGroup } from '../../../modelo/formGroup/jerarquizacionNacional';
import { MatPaginator, MatSort, MatTableDataSource, MatDialog } from '@angular/material';
import { nacional_Dato } from '../../../modelo/tabla/nacional-dato';


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
  criterio_Nacion = [];
  criterio_elemento = new criterio_elemento();
  criterio_clase = this.criterio_elemento.clase;
  criterio_tipo_comunidad = this.criterio_elemento.tipo_comunidad;
  jerarquizacion_Nacional_Form: FormGroup;
  buscar_Form: FormGroup;
  private _success = new Subject<string>();
  staticAlertClosed = false;
  successMessage: string;
  tipoAlert: string;
  loading: boolean;
  selected = new FormControl(0);
  //---------------------------------tabla
  displayedColumns: string[] = ['numero', 'codigoe', 'nombren', 'nombrecomunn', 'clase'];
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
  elemento_Id: Number;

  constructor(private fb: FormBuilder,
    private jerarquizacionServicio: JerarquizacionService,
    private fechaServicio: FechaService,
    private elementoServicio: ElementoService,
    private dialog: MatDialog) {
    this.createFormJerarquizacionNacional(new jerarquizacion_Nacional_Modelo());
    this.crearForm_Buscar();
    this.dataSource = new MatTableDataSource(this.lista_Nacional);
    this.obtener_rangon();
    this.obtener_nacion();
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
  createFormJerarquizacionNacional(jerarquizacionNacional: jerarquizacion_Nacional_Modelo) {
    var temporalJerarquizacionNacionalFormGroup = new jerarquizacion_Nacional_FormGroup();
    this.jerarquizacion_Nacional_Form = temporalJerarquizacionNacionalFormGroup.getJerarquizacion_Nacional_FormGrup(jerarquizacionNacional);
  }
  //guarda un registro de jerarquizacion nacional
  guardarRegistroJerarquiazacionNacional() {
    if (this.jerarquizacion_Nacional_Form.get('codigoe').value && this.jerarquizacion_Nacional_Form.valid) {
      this.addJerarquizacionNacional(this.setDatosJerarquizacionNacional(this.jerarquizacion_Nacional_Form.value));
    }
    else
      this.changeSuccessMessage('No se pudo registrar el codigoe es obligatorio ó valida que los campos estén correctos donde se te indica..', 'primary');
  }
  //setear datos jerarquizacion nacional
  setDatosJerarquizacionNacional(datos: jerarquizacion_Nacional_Modelo): jerarquizacion_Nacional_Modelo {
    return datos;
  }
  //agrega un nuevo registro jerarquizacion global
  addJerarquizacionNacional(jer_Nacional: jerarquizacion_Nacional_Modelo): void {
    this.loading = true;
    this.jerarquizacionServicio.addJerarquizacionNacional(jer_Nacional)
      .subscribe(
        resElemento => {
          this.loading = false;
          this.changeSuccessMessage(`Se registro la jerarquización nacional del elemento :${resElemento.codigoe}.`, 'success');
        }, err => {
          this.loading = false;
          if (err.status === 404)
            this.changeSuccessMessage(`Error no se pudo registrar el CODIGOE del elemento no existe, por favor ingresa uno valido.`, 'primary');
          else
            this.changeSuccessMessage(`No se pudo regitrar, el elemento con CODIGOE:${this.jerarquizacion_Nacional_Form.get('codigoe').value} ya está jerarquizado nacionalmente ó comprueba que esté disponible el servicio.`, 'primary');
        });
  }
  //validar codigoe 
  validarCodigoe() {
    this.loading = true;
    this.elementoServicio.validarElementoCodigoe(this.jerarquizacion_Nacional_Form.get('codigoe').value)
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
  public changeSuccessMessage(mensaje: string, tipo: string) {
    this.tipoAlert = tipo;
    this._success.next(mensaje);
  }
  tabPagina2() {
    this.selected.setValue(1);
    window.scrollTo(0, 0);
  }
  tabPagina1() {
    this.selected.setValue(0);
    window.scrollTo(0, 0);
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
      'nombrecomunn': '',
      'clase': '',
      'comunidad': ''
    });
  }
  buscarJerarquizacionNacional() {
    this.lista_Nacional = new Array();
    this.loading = true;
    var codigoe = "¬";
    var nombren = "¬";
    var nombrecomunn = "¬";
    var clase = "¬";
    var comunidad = "¬";
    var jwthelper = new JwtHelperService();
    var decodedToken = jwthelper.decodeToken(localStorage.getItem('userToken'));

    if (this.buscar_Form.get('codigoe').value)
      codigoe = this.buscar_Form.get('codigoe').value;
    if (this.buscar_Form.get('nombren').value)
      nombren = this.buscar_Form.get('nombren').value;
    if (this.buscar_Form.get('nombrecomunn').value)
      nombrecomunn = this.buscar_Form.get('nombrecomunn').value;
    if (this.buscar_Form.get('clase').value)
      clase = this.buscar_Form.get('clase').value;
    if (this.buscar_Form.get('comunidad').value)
      comunidad = this.buscar_Form.get('comunidad').value;

    this.jerarquizacionServicio.getJerarquizacionesNacional(codigoe,
      nombren, nombrecomunn, clase, comunidad,
      decodedToken.sub)
      .subscribe(
        data => {
          this.dataJerarquizacionNacional = data;
          var k = 0;
          for (let val of this.dataJerarquizacionNacional) {
            k = k + 1;
            this.lista_Nacional.push(crearNacional(k, val));
          }
          this.dataSource = new MatTableDataSource(this.lista_Nacional);
          this.loading = false;
        }, err => {
          this.loading = false;
          this.changeSuccessMessage('No se encontro información.', 'warning');
        });
  }
  buscarTodos() {
    this.lista_Nacional = new Array();
    this.loading = true;
    var jwthelper = new JwtHelperService();
    var decodedToken = jwthelper.decodeToken(localStorage.getItem('userToken'));
    this.jerarquizacionServicio.get_All_Nacional(decodedToken.sub)
      .subscribe(
        data => {
          this.dataJerarquizacionNacional = data;
          var k = 0;
          for (let val of this.dataJerarquizacionNacional) {
            k = k + 1;
            this.lista_Nacional.push(crearNacional(k, val));
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
        this.elemento_Id = this.jerarquia_Aux.elementoelementoid.elementoId;//al obtener lo pasa todo a minisculas
        this.editar = false;
      }
    });
    return base_jerarquizacionNacionallBusqueda;
  }
  mostrar_JerarquizacionNacional_Busqueda(row: nacional_Dato) {
    this.createFormJerarquizacionNacional(this.getJerarquizacionNacional_id(row.nacionalId));
    this.tabPagina1();
    this.guardar = true;
    window.scrollTo(0, 0);
  }
  updateJerarquizacionNacional(nacional: jerarquizacion_Nacional_Modelo): void {
    this.loading = true;
    this.jerarquizacionServicio.updateNacional(nacional, this.elemento_Id)
      .subscribe(
        resNacional => {
          this.loading = false;
          this.changeSuccessMessage(`Editado exitoso, código del elemento:${resNacional.codigoe}.`, 'success');
          this.lista_Nacional = new Array();
          this.dataSource = new MatTableDataSource(this.lista_Nacional);
          this.editar = false;
        }, err => {
          this.loading = false;
          this.changeSuccessMessage('Error no se pudo editar, comprueba que esté disponible el servicio.', 'primary');
        });
  }
  editarJerarquizacionNacional() {
    if (this.jerarquizacion_Nacional_Form.get('codigoe').value && this.jerarquizacion_Nacional_Form.valid)
      this.updateJerarquizacionNacional(this.setDatosJerarquizacionNacional(this.jerarquizacion_Nacional_Form.value));
    else
      this.changeSuccessMessage('Valida que los campos estén correctos donde se te indica..', 'primary');
  }
  nuevo() {
    this.editar = true;
    this.guardar = false;
    this.createFormJerarquizacionNacional(new jerarquizacion_Nacional_Modelo());
    this.crearForm_Buscar();
    this.tabPagina1();
    window.scrollTo(0, 0);
  }

  //lleva el control de los errores
  //página 1
  get input_codigoe() { return this.jerarquizacion_Nacional_Form.get('codigoe'); }
  get input_nombren() { return this.jerarquizacion_Nacional_Form.get('nombren'); }
  get input_nacion() { return this.jerarquizacion_Nacional_Form.get('nacion'); }
  get input_nloctip() { return this.jerarquizacion_Nacional_Form.get('nloctip'); }
  get input_nlestimcom() { return this.jerarquizacion_Nacional_Form.get('nlestimcom'); }
  get input_nabundcom() { return this.jerarquizacion_Nacional_Form.get('nabundcom'); }
  get input_ndistcom() { return this.jerarquizacion_Nacional_Form.get('ndistcom'); }
  get input_nleprotcom() { return this.jerarquizacion_Nacional_Form.get('nleprotcom'); }
  get input_namenazcom() { return this.jerarquizacion_Nacional_Form.get('namenazcom'); }
  //página 2
  get input_notroconsi() { return this.jerarquizacion_Nacional_Form.get('notroconsi'); }
  get input_fecharn() { return this.jerarquizacion_Nacional_Form.get('fecharn'); }
  get input_nranrzon() { return this.jerarquizacion_Nacional_Form.get('nranrzon'); }
  get input_nnecprotec() { return this.jerarquizacion_Nacional_Form.get('nnecprotec'); }
  get input_nnecinvent() { return this.jerarquizacion_Nacional_Form.get('nnecinvent'); }
  get input_nnecestudi() { return this.jerarquizacion_Nacional_Form.get('nnecestudi'); }
  get input_nnecmaejo() { return this.jerarquizacion_Nacional_Form.get('nnecmaejo'); }
  get input_resrn() { return this.jerarquizacion_Nacional_Form.get('resrn'); }
  get input_edautor() { return this.jerarquizacion_Nacional_Form.get('edautor'); }
  get input_actualizar() { return this.jerarquizacion_Nacional_Form.get('actualizar'); }
  get input_edicion() { return this.jerarquizacion_Nacional_Form.get('edicion'); }

  //Catalogo de rango nacional
  obtener_rangon() {
    this.jerarquizacionServicio.rangon.subscribe(
      (resRangon: any[]) => {
        resRangon.forEach(rangon => {
          var modelo_Valor = new Valor();
          modelo_Valor.value = rangon.rangon;
          modelo_Valor.viewValue = rangon.rangon;
          this.criterio_rangon.push(modelo_Valor);
        });
      }, err => {
        this.changeSuccessMessage('Error no se pudo obtener los rangos nacionales, comprueba que esté disponible el servicio.', 'primary');
      });
  }
  //Catalogo de nación
  obtener_nacion() {
    this.jerarquizacionServicio.obtener_nacion();
    this.criterio_Nacion = this.jerarquizacionServicio.nacion_Valor;
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
function crearNacional(k: Number, datos_nacional): nacional_Dato {
  var clase = new clase_Elemento();
  clase.clase_Nombre(datos_nacional.elementoelementoid.clase);
  return {
    numero: k,
    nacionalId: datos_nacional.nacionalId,
    codigoe: datos_nacional.codigoe,
    nombren: datos_nacional.elementoelementoid.nombren,
    nombrecomunn: datos_nacional.elementoelementoid.nombrecomunn,
    clase: clase.valor_Clase
  };
}