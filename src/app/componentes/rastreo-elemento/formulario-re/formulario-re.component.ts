import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { criterio_re } from '../../../modelo/select/overview-rastreo';
import { RastreoService } from '../../../servicios/rastreo/rastreo.service';
import { ElementoService } from '../../../servicios/elemento/elemento.service';
import { JerarquizacionService } from '../../../servicios/jerarquizacion/jerarquizacion.service';
import { FechaService } from '../../../servicios/fecha/fecha.service';
import { Valor } from '../../../modelo/select/overwiew-valor';
import { rastreo_Elemento_Modelo } from '../../../modelo/rastreo/rastreo-elemento-modelo';
import { ConfirmacionComponent } from '../../../componentes/dialogo/confirmacion/confirmacion.component';
//--------------tabla------------------------------------
import { MatPaginator, MatSort, MatTableDataSource, MatDialog } from '@angular/material';
import { ratreoElemento_Dato } from '../../../modelo/tabla/rastreo-elemento-dato'
import { rastreo_Elemento_FormGroup } from '../../../modelo/formGroup/rastreo';

@Component({
  selector: 'app-formulario-re',
  templateUrl: './formulario-re.component.html',
  styleUrls: ['./formulario-re.component.scss']
})
export class FormularioReComponent implements OnInit {
  reForm: FormGroup;
  criterio_re = new criterio_re();
  criterio_disttax = this.criterio_re.disttax;
  criterio_dudatax = this.criterio_re.dudatax;
  criterio_compu_manual = this.criterio_re.compu_manual;//formularg, plancons, resplan, resumenman, formularn, formulars
  criterio_endemismo = this.criterio_re.endemismo;
  criterio_cites = this.criterio_re.cites;
  criterio_iucn = this.criterio_re.iucn;
  criterio_si_no = this.criterio_re.si_no;// exsitu, transparen  
  criterio_listacdc = this.criterio_re.listacdc;
  criterio_Tropico = this.criterio_re.tropico;
  criterio_Nacion = this.criterio_re.ln_Nacion;
  criterio_Subnacion = this.criterio_re.ls_Subnacion;

  private _success = new Subject<string>();
  staticAlertClosed = false;
  successMessage: string;
  tipoAlert: string;
  loading: boolean;
  selected = new FormControl(0);
  buscarForm: FormGroup;
  //---------------------------------tabla
  displayedColumns: string[] = ['numero', 'codigoe', 'departamento', 'nombreg', 'nombren', 'nombrecomunn'];
  dataSource: MatTableDataSource<ratreoElemento_Dato>;
  listaRatreoElementos: Array<ratreoElemento_Dato> = new Array();
  private dataRatreoElemento: any;
  private paginator: MatPaginator;
  @ViewChild(MatPaginator) set matPaginator(mp: MatPaginator) {
    this.paginator = mp;
    this.setDataSourceAttributes();
  }
  @ViewChild(MatSort) sort: MatSort;
  //-----------------------------------
  editar = true;
  guardar = false;
  elementoId_Aux: any;
  elementoId: Number;

  constructor(
    private fb: FormBuilder,
    private rastreoServicio: RastreoService,
    private jerarquizacionServicio: JerarquizacionService,
    private fechaServicio: FechaService,
    private elementoServicio: ElementoService,
    private dialog: MatDialog) {
    this.crearFormRastreoElemento(new rastreo_Elemento_Modelo);
    this.crearForm_Buscar();
    this.dataSource = new MatTableDataSource(this.listaRatreoElementos);
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

  guardarRastreoElemento() {
    if (this.reForm.get('codigoe').value && this.reForm.valid) {
      this.addRastroeElemento(this.setRastreoElemento(this.reForm.value));
    }
    else
      this.changeSuccessMessage('No se pudo registrar el codigoe es obligatorio ó valida que los campos esten correctos donde se te indica..', 'primary');
  }
  setRastreoElemento(datos: rastreo_Elemento_Modelo): rastreo_Elemento_Modelo {
    datos.fecharevrg = this.fechaServicio.toFormatoDateTime(this.reForm.get('fecharevrg').value);
    datos.fechaaepeu = this.fechaServicio.toFormatoDateTime(this.reForm.get('fechaaepeu').value);
    datos.fecharevrn = this.fechaServicio.toFormatoDateTime(this.reForm.get('fecharevrn').value);
    datos.fecharevrs = this.fechaServicio.toFormatoDateTime(this.reForm.get('fecharevrs').value);
    datos.actualizag = this.fechaServicio.toFormatoDateTime(this.reForm.get('actualizag').value);
    datos.actualizan = this.fechaServicio.toFormatoDateTime(this.reForm.get('actualizan').value);
    datos.actualizas = this.fechaServicio.toFormatoDateTime(this.reForm.get('actualizas').value);
    return datos;
  }

  //agrega un nuevo registro rastreo elemento
  addRastroeElemento(rastreoElemento: rastreo_Elemento_Modelo): void {
    this.loading = true;
    this.rastreoServicio.addRastreoElemento(rastreoElemento)
      .subscribe(
        resElemento => {
          this.loading = false;
          this.changeSuccessMessage(`Se registro el ratreo del elemento :${resElemento.codigoe}.`, 'success');
        }, err => {
          this.loading = false;
          if (err.status === 404)
            this.changeSuccessMessage(`Error no pudo registrar el CODIGOE del elemento no existe, por favor ingresa uno valido.`, 'primary');
          else
            this.changeSuccessMessage('No se pudo regitrar, el CODIGOE del elemento  ya tiene un registro de rastreo de elemento, solo puede haber un registro de rastreo por elemento ó el servicio no esta disponible.', 'primary');
        });
  }
  //crear formulario Rastreo Elemento
  crearFormRastreoElemento(re: rastreo_Elemento_Modelo) {
    this.reForm = new rastreo_Elemento_FormGroup().getRastreo_Elemento_FormGrup(re);
  }
  //validar codigoe 
  validarCodigoe() {
    this.loading = true;
    this.elementoServicio.validarElementoCodigoe(this.reForm.get('codigoe').value)
      .subscribe(
        resElemento => {
          this.loading = false;
          this.changeSuccessMessage(`Si existe el elemento:${resElemento.codigoe}.
          `, 'success');
          this.get_Status_Global(resElemento.codigoe);
          this.get_Status_Nacional(resElemento.codigoe);
          if (this.reForm.get('subnacion').value)
            this.get_Status_Subnacional(resElemento.codigoe, this.reForm.get('subnacion').value);
        }, err => {
          this.loading = false;
          if (err.status === 404)
            this.changeSuccessMessage('No existe el CODIGOE del elemento, por favor ingresa un código valido.', 'primary');
          else
            this.changeSuccessMessage('No se pudo validar, comprueba que este disponible el servicio.', 'primary');
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
        this.guardarRastreoElemento();
    });
  }
  openDialogoEditar(): void {
    const dialogRef = this.dialog.open(ConfirmacionComponent, {
      width: '250px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result)
        this.editarRastreoElemento();
    });
  }
  crearForm_Buscar() {
    this.buscarForm = this.fb.group({
      'codigo': '',
      'subnacion': '',
      'nombreg': '',
      'nombren': '',
      'nombrecomunnn': ''
    });
  }
  buscar_RatreoElemento() {
    this.getRatreoElemento();

  }
  getRatreoElemento() {
    this.listaRatreoElementos = new Array();
    this.loading = true;
    var a = "¬";
    var b = "¬";
    var c = "¬";
    var d = "¬";
    var e = "¬";
    if (this.buscarForm.get('codigo').value)
      a = this.buscarForm.get('codigo').value;
    if (this.buscarForm.get('subnacion').value)
      b = this.buscarForm.get('subnacion').value;
    if (this.buscarForm.get('nombreg').value)
      c = this.buscarForm.get('nombreg').value;
    if (this.buscarForm.get('nombren').value)
      d = this.buscarForm.get('nombren').value;
    if (this.buscarForm.get('nombrecomunnn').value)
      e = this.buscarForm.get('nombrecomunnn').value;
    this.rastreoServicio.getRastreosElementos(a, b, c, d, e)
      .subscribe(
        data => {
          this.dataRatreoElemento = data;
          this.loading = false;
          var k = 0;
          for (let reVal of this.dataRatreoElemento) {
            k = k + 1;
            this.listaRatreoElementos.push(crearRastreoElemento(k, reVal));
          }
          this.dataSource = new MatTableDataSource(this.listaRatreoElementos);
        }, err => {
          this.loading = false;
          this.changeSuccessMessage('No se encontro información.', 'warning ');
        });
  }

  getRastreoElemento_id(id: Number): rastreo_Elemento_Modelo {
    var rastreoElementoBusqueda = new rastreo_Elemento_Modelo();
    this.dataRatreoElemento.forEach(dataRatreoElemento => {
      var ratreoElemento_Busqueda = new rastreo_Elemento_Modelo();// necesario dado que si reutiliza conserva la primera asignación
      ratreoElemento_Busqueda = dataRatreoElemento;
      if (id == ratreoElemento_Busqueda.rastreoId) {
        rastreoElementoBusqueda = ratreoElemento_Busqueda;
        this.elementoId_Aux = rastreoElementoBusqueda;
        this.elementoId = this.elementoId_Aux.elementoelementoid.elementoId;
        this.editar = false;
      }
    });
    return rastreoElementoBusqueda;
  }

  mostrar_RastreoElemento_Busqueda(row: ratreoElemento_Dato) {
    this.crearFormRastreoElemento(this.getRastreoElemento_id(row.rastreoId));
    this.tabPagina1();
    this.guardar = true;
    this.validarCodigoe();
  }

  nuevo() {
    this.editar = true;
    this.guardar = false;
    this.crearFormRastreoElemento(new rastreo_Elemento_Modelo);
    this.tabPagina1();
  }
  updateRastreoElemento(re: rastreo_Elemento_Modelo): void {
    this.loading = true;
    this.rastreoServicio.editarRastreoElemento(re, this.elementoId)
      .subscribe(
        resRe => {
          this.loading = false;
          this.changeSuccessMessage(`Editado exitoso, código del rastreo elemento:${resRe.codigoe}.`, 'success');
          this.listaRatreoElementos = new Array();
          this.dataSource = new MatTableDataSource(this.listaRatreoElementos);
        }, err => {
          this.loading = false;
          this.changeSuccessMessage('Error  no se pudo editar, comprueba que este disponible el servicio', 'primary');
        });
  }
  editarRastreoElemento() {
    if (this.reForm.get('codigoe').value && this.reForm.valid)
      this.updateRastreoElemento(this.setRastreoElemento(this.reForm.value));
    else
      this.changeSuccessMessage('Valida que los campos estén correctos donde se te indica..', 'primary');
  }
  /** 
   *  Lleva el control de los errores (47 campos se validan)
   *  Página 1 
   *  Identificadores
   */
  get input_codigoe() { return this.reForm.get('codigoe'); }
  get input_tropicos() { return this.reForm.get('tropicos'); }
  get input_nacion() { return this.reForm.get('nacion'); }
  get input_subnacion() { return this.reForm.get('subnacion'); }
  //taxonomia (global)
  get input_clasetax() { return this.reForm.get('clasetax'); }
  get input_orden() { return this.reForm.get('orden'); }
  get input_familia() { return this.reForm.get('familia'); }
  get input_genero() { return this.reForm.get('genero'); }
  get input_nombreg() { return this.reForm.get('nombreg'); }
  get input_autor() { return this.reForm.get('autor'); }
  get input_fuentenom() { return this.reForm.get('fuentenom'); }
  get input_refnombreg() { return this.reForm.get('refnombreg'); }
  get input_nomcomung() { return this.reForm.get('nomcomung'); }
  get input_comtaxg() { return this.reForm.get('comtaxg'); }
  //taxonomia (nacional)
  get input_nombren() { return this.reForm.get('nombren'); }
  get input_numsinn() { return this.reForm.get('numsinn'); }
  get input_nomcomunn() { return this.reForm.get('nomcomunn'); }
  get input_comtaxn() { return this.reForm.get('comtaxn'); }
  /**
   * status (global)
   * Página 2
   */
  get input_fecharevrg() { return this.reForm.get('fecharevrg'); }
  get input_resprg() { return this.reForm.get('resprg'); }
  get input_aepeu() { return this.reForm.get('aepeu'); }
  get input_fechaaepeu() { return this.reForm.get('fechaaepeu'); }
  get input_resplan() { return this.reForm.get('resplan'); }
  get input_resresumen() { return this.reForm.get('resresumen'); }
  get input_instexsitu() { return this.reForm.get('instexsitu'); }
  //status (nacional)
  get input_fecharevrn() { return this.reForm.get('fecharevrn'); }
  get input_rastreolen() { return this.reForm.get('rastreolen'); }
  get input_lestimn() { return this.reForm.get('lestimn'); }
  get input_leprotn() { return this.reForm.get('leprotn'); }
  get input_abundn() { return this.reForm.get('abundn'); }
  get input_protnacion() { return this.reForm.get('protnacion'); }
  get input_refnombren() { return this.reForm.get('refnombren'); }
  //status (subnacional)
  get input_fecharevrs() { return this.reForm.get('fecharevrs'); }
  get input_rastreoles() { return this.reForm.get('rastreoles'); }
  get input_lestims() { return this.reForm.get('lestims'); }
  get input_leprots() { return this.reForm.get('leprots'); }
  get input_abunds() { return this.reForm.get('abunds'); }
  get input_protsubnac() { return this.reForm.get('protsubnac'); }
  get input_refnombres() { return this.reForm.get('refnombres'); }
  //campos opcionales
  get input_reopc1() { return this.reForm.get('reopc1'); }
  get input_reopc2() { return this.reForm.get('reopc2'); }
  get input_reopc3() { return this.reForm.get('reopc3'); }
  get input_reopc4() { return this.reForm.get('reopc4'); }
  get input_reopc5() { return this.reForm.get('reopc5'); }
  // manteniento del registro
  get input_codfuenten() { return this.reForm.get('codfuenten'); }
  get input_codfuentes() { return this.reForm.get('codfuentes'); }
  get input_actualizag() { return this.reForm.get('actualizag'); }
  get input_actualizan() { return this.reForm.get('actualizan'); }
  get input_actualizas() { return this.reForm.get('actualizas'); }

  //Obtener Status Global
  get_Status_Global(codigoe: String) {
    this.rastreoServicio.get_Status_Global(codigoe).subscribe(
      (resStatusGlobal: any[]) => {
        this.reForm.get('nombreg').setValue(resStatusGlobal[0]);
        this.reForm.get('rangog').setValue(resStatusGlobal[1]);
        this.reForm.get('resprg').setValue(resStatusGlobal[2]);
        this.reForm.get('fecharevrg').setValue(this.fechaServicio.getFecha(resStatusGlobal[3]));
      }, err => {
        this.reForm.get('nombreg').setValue('');
        this.reForm.get('rangog').setValue('');
        this.reForm.get('resprg').setValue('');
        this.reForm.get('fecharevrg').setValue('');
      });
  }
  //Obtener Status Nacional
  get_Status_Nacional(codigoe: String) {
    this.rastreoServicio.get_Status_Nacional(codigoe).subscribe(
      (resStatusNacional: any[]) => {
        this.reForm.get('rangon').setValue(resStatusNacional[0]);
        this.reForm.get('fecharevrn').setValue(this.fechaServicio.getFecha(resStatusNacional[1]));
        this.reForm.get('lestimn').setValue(resStatusNacional[2]);
        this.reForm.get('leprotn').setValue(resStatusNacional[3]);
        this.reForm.get('abundn').setValue(resStatusNacional[3]);
      }, err => {
        this.reForm.get('rangon').setValue('');
        this.reForm.get('fecharevrn').setValue('');
        this.reForm.get('lestimn').setValue('');
        this.reForm.get('leprotn').setValue('');
        this.reForm.get('abundn').setValue('');
      });
  }
  //Obtener Status Nacional
  get_Status_Subnacional(codigoe: String, subnacion: String) {
    this.rastreoServicio.get_Status_Subnacional(codigoe, subnacion).subscribe(
      (resStatusSubnacional: any[]) => {
        this.reForm.get('rangos').setValue(resStatusSubnacional[0]);
        this.reForm.get('fecharevrs').setValue(this.fechaServicio.getFecha(resStatusSubnacional[1]));
        this.reForm.get('lestims').setValue(resStatusSubnacional[2]);
        this.reForm.get('leprots').setValue(resStatusSubnacional[3]);
        this.reForm.get('abunds').setValue(resStatusSubnacional[4]);
      }, err => {
        this.reForm.get('rangos').setValue('');
        this.reForm.get('fecharevrs').setValue('');
        this.reForm.get('lestims').setValue('');
        this.reForm.get('leprots').setValue('');
        this.reForm.get('abunds').setValue('');
      });
  }
  //Catalogo de nación
  obtener_nacion() {
    this.jerarquizacionServicio.nacion.subscribe(
      (resNacion: any[]) => {
        resNacion.forEach(nacion => {
          var modelo_Valor = new Valor();
          modelo_Valor.value = nacion.codigo;
          modelo_Valor.viewValue = nacion.nombre;
          this.criterio_Nacion.push(modelo_Valor);
        });
      }, err => {
        this.changeSuccessMessage('Error no se pudo obtener las naciones, comprueba que esté disponible el servicio.', 'primary');
      });
  }
  //Catalogo de subnación (Depto)
  obtener_subnacion() {
    this.jerarquizacionServicio.subnacion.subscribe(
      (resSubnacion: any[]) => {
        resSubnacion.forEach(subnacion => {
          var modelo_Valor = new Valor();
          modelo_Valor.value = "" + subnacion.codigo;
          modelo_Valor.viewValue = subnacion.nombre;
          this.criterio_Subnacion.push(modelo_Valor);
        });
      }, err => {
        this.changeSuccessMessage('Error no se pudo obtener los departamentos, comprueba que esté disponible el servicio.', 'primary');
      });
  }
}
function crearRastreoElemento(k: Number, re: rastreo_Elemento_Modelo): ratreoElemento_Dato {
  return {
    numero: k,
    rastreoId: re.rastreoId,
    codigoe: re.codigoe,
    departamento: re.subnacion,
    nombreg: re.nombreg,
    nombren: re.nombren,
    nombrecomunn: re.nomcomunn
  };
}