import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common'
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { DISABLED } from '@angular/forms/src/model';
import { disableDebugTools } from '@angular/platform-browser';
import { criterio_re } from '../../../modelo/select/overview-rastreo';
import { RastreoService } from '../../../servicios/rastreo/rastreo.service';
import { ElementoService } from '../../../servicios/elemento/elemento.service';
import { FechaService } from '../../../servicios/fecha/fecha.service';
import { elemento_Modelo } from '../../../modelo/jerarquizacion/elemento-modelo';
import { rastreo_Elemento_Modelo } from '../../../modelo/rastreo/rastreo-elemento-modelo';
import { ConfirmacionComponent } from '../../../componentes/dialogo/confirmacion/confirmacion.component';
//--------------tabla------------------------------------
import { MatPaginator, MatSort, MatTableDataSource, MatSelectModule, MatDialog } from '@angular/material';
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
  criterio_rangog = this.criterio_re.rangog;
  criterio_compu_manual = this.criterio_re.compu_manual;//formularg, plancons, resplan, resumenman, formularn, formulars
  criterio_endemismo = this.criterio_re.endemismo;
  criterio_rangon = this.criterio_re.rangon;
  criterio_cites = this.criterio_re.cites;
  criterio_iucn = this.criterio_re.iucn;
  criterio_si_no = this.criterio_re.si_no;// exsitu, transparen  
  criterio_listacdc = this.criterio_re.listacdc;
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
    private fechaServicio: FechaService,
    private elementoServicio: ElementoService,
    private dialog: MatDialog, private fb2: FormBuilder) {
    this.crearFormRastreoElemento(new rastreo_Elemento_Modelo);
    this.crearForm_Buscar();
    this.dataSource = new MatTableDataSource(this.listaRatreoElementos);
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
    if (this.reForm.get('codigoe').value) {
      this.addRastroeElemento(this.setRastreoElemento(this.reForm.value));
    }
    else
      this.changeSuccessMessage('El codigoe es obligatorio', 'primary');
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
    this.elementoServicio.validarElementoCodigoe(this.reForm.get('codigoe').value)
      .subscribe(
        resElemento => {
          this.changeSuccessMessage(`Si existe el elemento:${resElemento.codigoe}.`, 'success');
        }, err => {
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
    this.buscarForm = this.fb2.group({
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
    if (this.reForm.get('codigoe').value)
      this.updateRastreoElemento(this.setRastreoElemento(this.reForm.value));
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