import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common'
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { DISABLED } from '@angular/forms/src/model';
import { disableDebugTools } from '@angular/platform-browser';
import { criterio_re } from '../../../modelo/select/overview-rastreo';
import { UsuarioService } from '../../../servicios/usuario.service';
import { elemento_Modelo } from '../../../modelo/jerarquizacion/elemento-modelo';
import { rastreo_Elemento_Modelo } from '../../../modelo/rastreo/rastreo-elemento-modelo';
import { ConfirmacionComponent } from '../../../componentes/dialogo/confirmacion/confirmacion.component';
//--------------tabla------------------------------------
import { MatPaginator, MatSort, MatTableDataSource, MatSelectModule, MatDialog } from '@angular/material';
import { ratreoElemento_Dato } from '../../../modelo/tabla/rastreo-elemento-dato'

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

  constructor(
    private fb: FormBuilder, private usuarioService: UsuarioService,
    private dialog: MatDialog, private fb2: FormBuilder) {
    this.crearFormRastreoElemento();
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
    if (this.reForm.get('codigoe').value
      && this.reForm.get('fecharevrg').value
      && this.reForm.get('fechaaepeu').value
      && this.reForm.get('fecharevrn').value
      && this.reForm.get('fecharevrs').value
      && this.reForm.get('actualizag').value
      && this.reForm.get('actualizan').value
      && this.reForm.get('actualizas').value) {
      this.addRastroeElemento(this.setRastreoElemento(this.reForm.value));
    }
    else
      this.changeSuccessMessage('No se pudo regitrar.Todas las fechas son obligatorias.', 'primary');
  }
  setRastreoElemento(datos): rastreo_Elemento_Modelo {
    datos.fecharevrg = this.usuarioService.toFormatoDateTime(datos.fecharevrg);
    datos.fechaaepeu = this.usuarioService.toFormatoDateTime(datos.fechaaepeu);
    datos.fecharevrn = this.usuarioService.toFormatoDateTime(datos.fecharevrn);
    datos.fecharevrs = this.usuarioService.toFormatoDateTime(datos.fecharevrs);
    datos.actualizag = this.usuarioService.toFormatoDateTime(datos.actualizag);
    datos.actualizan = this.usuarioService.toFormatoDateTime(datos.actualizan);
    datos.actualizas = this.usuarioService.toFormatoDateTime(datos.actualizas);
    return datos;
  }

  //agrega un nuevo registro rastreo elemento
  addRastroeElemento(rastreoElemento: rastreo_Elemento_Modelo): void {
    this.loading = true;
    this.usuarioService.addRastreoElemento(rastreoElemento)
      .subscribe(
        resElemento => {
          this.loading = false;
          this.changeSuccessMessage(`Se registro el ratreo del elemento :${resElemento.codigoe}.`, 'success');
         // this.crearFormRastreoElemento();
        }, err => {
          this.loading = false;
          this.changeSuccessMessage('No se pudo regitrar.El codigoe debe ser valido', 'primary');
        });
  }
  //crear formulario Rastreo Elemento
  crearFormRastreoElemento() {
    this.reForm = this.fb.group({
      //pagina1
      //identificadores
      'codigoe': ['', Validators.required],
      'tropicos': '',
      'nacion': '',
      'subnacion': '',
      //taxonomia (global)
      'clasetax': '',
      'orden': '',
      'familia': '',
      'genero': '',
      'nombreg': '',
      'autor': '',
      'fuentenom': '',
      'refnombreg': '',
      'disttax': '',
      'dudatax': '',
      'nomcomung': '',
      'comtaxg': '',
      //taxonomia (nacional)
      'nombren': '',
      'numsinn': '',
      'nomcomunn': '',
      'comtaxn': '',
      //status (global)
      'rangog': '',
      'fecharevrg': null,
      'formularg': '',
      'resprg': '',
      'aepeu': '',
      'fechaaepeu': null,
      'cites': '',
      'iucn': '',
      'planscons': '',
      'resplan': '',
      'resumenman': '',
      'resresumen': '',
      'exsitu': null,
      'instexsitu': '',
      'endemismo': '',
      //status (nacional)
      'rangon': '',
      'fecharevrn': null,
      'formularn': '',
      'rastreolen': '',
      'lestimn': '',
      'leprotn': '',
      'abundn': '',
      'protnacion': '',
      'refnombren': '',
      'transparencian': null,
      //status (subnacional)
      'rangos': '',
      'fecharevrs': null,
      'formulars': '',
      'rastreoles': '',
      'lestims': '',
      'leprots': '',
      'abunds': '',
      'protsubnac': '',
      'refnombres': '',
      'transparencias': null,
      //campos opcionales
      'reopc1': '',
      'reopc2': '',
      'reopc3': '',
      'reopc4': '',
      'reopc5': '',
      // manteniiento del registro
      'codfuenten': '',
      'codfuentes': '',
      'actualizag': null,
      'actualizan': null,
      'actualizas': null
    });
  }
  //validar codigoe 
  validarCodigoe(): Boolean {
    return this.ValidarElementoCodigoe(this.reForm.get('codigoe').value);
  }
  ValidarElementoCodigoe(codigoe: String): Boolean {
    var valido = false;
    this.usuarioService.validarElementoCodigoe(codigoe)
      .subscribe(
        resElemento => {
          this.changeSuccessMessage(`Si existe el elemento:${codigoe}.`, 'success');
          valido = true;
        }, err => {
          this.changeSuccessMessage('No existe el elemento, por favor ingresa un codigo valido.', 'primary');
        });

    return valido;
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
    this.loading = true;
    var a = "a";
    var b = "b";
    var c = "c";
    var d = "d";
    var e = "e";
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

    console.log(' busquedas', a, b, c, d, e);
    this.usuarioService.getRastreoElemento(a, b, c, d, e)
      .subscribe(
        data => {
          this.dataRatreoElemento = data;
          this.loading = false;
          console.log(this.dataRatreoElemento);
          var k = 0;
          for (let reVal of this.dataRatreoElemento) {
            k = k + 1;
            this.listaRatreoElementos.push(crearRastreoElemento(k, reVal));
          }
          this.dataSource = new MatTableDataSource(this.listaRatreoElementos);
        }, err => {
          this.loading = false;
          this.changeSuccessMessage('No se encontro información. Comprueba que este activo CORB.', 'warning ');
        });
  }

  getRastreoElemento_id(id: Number): rastreo_Elemento_Modelo {
    var rastreoElementoBusqueda = new rastreo_Elemento_Modelo();
    this.dataRatreoElemento.forEach(dataRatreoElemento => {
      var ratreoElemento_Busqueda = new rastreo_Elemento_Modelo();// necesario dado que si reutiliza conserva la primera asignación
      ratreoElemento_Busqueda = dataRatreoElemento;
      if (id == ratreoElemento_Busqueda.rastreoId)
        rastreoElementoBusqueda = ratreoElemento_Busqueda;
    });
    return rastreoElementoBusqueda;
  }

  mostrar_RastreoElemento_Busqueda(row) {
    var rastreoElemento_Busqueda = this.getRastreoElemento_id(row.rastreoId);
    console.log(rastreoElemento_Busqueda);
    this.crearFormRastreoElementoo_Buscado(this.getRastreoElemento_id(row.rastreoId));
    this.listaRatreoElementos = [];
    this.dataSource = new MatTableDataSource(this.listaRatreoElementos);
    this.editar = false;
    this.guardar = true;
  }
  //crear formulario Rastreo Ellemento busqueda para editarlo
  crearFormRastreoElementoo_Buscado(re: rastreo_Elemento_Modelo) {
    this.reForm = this.fb.group({
      //pagina1
      //identificadores
      'codigoe': re.codigoe,
      'tropicos': re.tropicos,
      'nacion': re.nacion,
      'subnacion': re.subnacion,
      //taxonomia (global)
      'clasetax': re.clasetax,
      'orden': re.orden,
      'familia': re.familia,
      'genero': re.genero,
      'nombreg': re.nombreg,
      'autor': re.autor,
      'fuentenom': re.fuentenom,
      'refnombreg': re.refnombreg,
      'disttax': re.disttax,
      'dudatax': re.dudatax,
      'nomcomung': re.nomcomung,
      'comtaxg': re.comtaxg,
      //taxonomia (nacional)
      'nombren': re.nombren,
      'numsinn': re.numsinn,
      'nomcomunn': re.nomcomunn,
      'comtaxn': re.comtaxn,
      //status (global)
      'rangog': re.rangog,
      'fecharevrg': this.usuarioService.getFecha(re.fecharevrg),
      'formularg': re.formularg,
      'resprg': re.resprg,
      'aepeu': re.aepeu,
      'fechaaepeu': this.usuarioService.getFecha(re.fechaaepeu),
      'cites': re.cites,
      'iucn': re.iucn,
      'planscons': re.planscons,
      'resplan': re.resplan,
      'resumenman': re.resumenman,
      'resresumen': re.resresumen,
      'exsitu': '' + re.exsitu,
      'instexsitu': re.instexsitu,
      'endemismo': re.endemismo,
      //status (nacional)
      'rangon': re.rangon,
      'fecharevrn': this.usuarioService.getFecha(re.fecharevrn),
      'formularn': re.formularn,
      'rastreolen': re.rastreolen,
      'lestimn': re.lestimn,
      'leprotn': re.leprotn,
      'abundn': re.abundn,
      'protnacion': re.protnacion,
      'refnombren': re.refnombren,
      'transparencian': '' + re.transparencian,
      //status (subnacional)
      'rangos': re.rangos,
      'fecharevrs': this.usuarioService.getFecha(re.fecharevrs),
      'formulars': re.formulars,
      'rastreoles': re.rastreoles,
      'lestims': re.lestims,
      'leprots': re.leprots,
      'abunds': re.abunds,
      'protsubnac': re.protsubnac,
      'refnombres': re.refnombres,
      'transparencias': '' + re.transparencias,
      //campos opcionales
      'reopc1': re.reopc1,
      'reopc2': re.reopc2,
      'reopc3': re.reopc3,
      'reopc4': re.reopc4,
      'reopc5': re.reopc5,
      // manteniiento del registro
      'codfuenten': re.codfuenten,
      'codfuentes': re.codfuentes,
      'actualizag': this.usuarioService.getFecha(re.actualizag),
      'actualizan': this.usuarioService.getFecha(re.actualizan),
      'actualizas': this.usuarioService.getFecha(re.actualizas)
    });
  }
  nuevo() {
    this.editar = true;
    this.guardar = false;
    this.crearFormRastreoElemento();
    this.crearForm_Buscar();
    this.tabPagina1();
  }
}
function crearRastreoElemento(k: number, re: rastreo_Elemento_Modelo): ratreoElemento_Dato {
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