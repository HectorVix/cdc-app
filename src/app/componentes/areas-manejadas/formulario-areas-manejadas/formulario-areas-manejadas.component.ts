import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { criterio_areasManejadas } from '../../../modelo/select/overview-area';
import { AreaService } from '../../../servicios/area/area.service';
import { FechaService } from '../../../servicios/fecha/fecha.service';
import { debounceTime } from 'rxjs/operators';
import { area_Modelo } from '../../../modelo/area/area-modelo';
import { listaElemento_Modelo } from '../../../modelo/area/listaElemento-modelo';
import { ConfirmacionComponent } from '../../../componentes/dialogo/confirmacion/confirmacion.component';
import { area_FormGroup } from '../../../modelo/formGroup/area';
import { MatPaginator, MatSort, MatTableDataSource, MatDialog } from '@angular/material';
import { area_Dato } from '../../../modelo/tabla/area-dato';
import { LocalDataSource } from 'ng2-smart-table';
import { GaleriaComponent } from '../../../componentes/galeria/galeria.component';
import { foto_Modelo } from '../../../modelo/fotoDatos/foto-datos';
import { GaleriaService } from '../../../servicios/galeria/galeria.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-formulario-areas-manejadas',
  templateUrl: './formulario-areas-manejadas.component.html',
  styleUrls: ['./formulario-areas-manejadas.component.scss']
})
export class FormularioAreasManejadasComponent implements OnInit {
  data_listaElemento_DataSource: LocalDataSource = new LocalDataSource();
  areaManejoForm: FormGroup;
  areaManejoFormBuscar: FormGroup;
  criterio_areasManejadas = new criterio_areasManejadas();
  criterio_protasign = this.criterio_areasManejadas.protasign;
  criterio_accesopub = this.criterio_areasManejadas.accesopub;
  criterio_status = this.criterio_areasManejadas.status;
  criterio_si_no = this.criterio_areasManejadas.si_no;
  private _success = new Subject<string>();
  staticAlertClosed = false;
  successMessage: string;
  tipoAlert: string;
  loading: boolean;

  settings_Elementos_AreasManejadas = {
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
      codigoe: {
        title: 'CODIGOE'
      },
      nombres: {
        title: 'NOMBRES'
      },
      status: {
        title: 'STATUS'
      },
      codfuente: {
        title: 'CODFUENTE'
      }
    }
  };
  settings_CamposOpcionales_AreasManejadas = {
    columns: {
      datos: {
        title: 'DATOS'
      }
    }
  };
  selected = new FormControl(0);
  //---------------------------------tabla
  displayedColumns: string[] = ['numero', 'codigoam', 'nombream', 'codsitio', 'nomsitio'];
  dataSource: MatTableDataSource<area_Dato>;
  lista_Area: Array<area_Dato> = new Array();
  dataArea: any;
  private paginator: MatPaginator;
  @ViewChild(MatPaginator) set matPaginator(mp: MatPaginator) {
    this.paginator = mp;
    this.setDataSourceAttributes();
  }
  @ViewChild(MatSort) sort: MatSort;
  //------------------------------------------
  editar = true;
  guardar = false;
  //---------Galeria
  @ViewChild(GaleriaComponent)
  private galeria: GaleriaComponent;
  data_resFoto: any;
  tam_Inicial_ListaFotos = 0;
  fotoId_Lista = [];


  constructor(private fb: FormBuilder,
    private areaServicio: AreaService,
    private fechaServicio: FechaService,
    private galeriaServicio: GaleriaService,
    private dialog: MatDialog) {
    this.crear_areaManejoForm(new area_Modelo());
    this.crear_areaManejoForm_Buscar();
    this.dataSource = new MatTableDataSource(this.lista_Area);
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
  crear_areaManejoForm(area: area_Modelo) {
    this.areaManejoForm = new area_FormGroup().getAreaFormGrup(area);
  }
  guardarArea() {
    if (this.areaManejoForm.get('codigoam').value && this.areaManejoForm.valid) {
      var areasManejadasBase = this.setAreasManejadas(this.areaManejoForm.value);
      var listaElemento: Array<listaElemento_Modelo> = new Array();
      this.data_listaElemento_DataSource.getAll().then(value => {
        value.forEach(elemento => {
          var listaElementoBase = new listaElemento_Modelo();
          listaElementoBase.codigoe = elemento.codigoe;
          listaElementoBase.nombres = elemento.nombres;
          listaElementoBase.status = elemento.status;
          listaElementoBase.codfuente = elemento.codfuente;
          listaElemento.push(listaElementoBase);
        });
        areasManejadasBase.listaElementoList = listaElemento;
        this.addArea(areasManejadasBase);
      });
    }
    else
      this.changeSuccessMessage('No se pudo registrar el código del área es obligatorio ó valida que los campos estén correctos donde se te indica.', 'primary');
  }
  setAreasManejadas(datos: area_Modelo): area_Modelo {
    return datos;
  }
  //agrega una nueva area
  addArea(area: area_Modelo): void {
    this.loading = true;
    var jwthelper = new JwtHelperService();
    var decodedToken = jwthelper.decodeToken(localStorage.getItem('userToken'));
    this.areaServicio.addArea(area, decodedToken.jti)
      .subscribe(
        resArea => {
          if (this.galeria.archivos.size > 0) {
            var area_id = resArea.areaId;
            this.galeriaServicio.cargarFotos(this.galeria.archivos, this.galeria.datosFotografias, area_id, 3);
          }
          this.loading = false;
          this.changeSuccessMessage(`Se registro el área  :${resArea.codigoam}.`, 'success');
        }, err => {
          this.loading = false;
          this.changeSuccessMessage('No se pudo regitrar el área, el CODIGOAM es único no se puede repetir ó comprueba que esté disponible el servicio.', 'primary');
        });
  }

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
        this.guardarArea();
    });
  }
  openDialogoEditar(): void {
    const dialogRef = this.dialog.open(ConfirmacionComponent, {
      width: '250px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result)
        this.editarArea();
    });
  }
  crear_areaManejoForm_Buscar() {
    this.areaManejoFormBuscar = this.fb.group({
      'codigoam': '',
      'nombream': '',
      'sinam': '',
      'codsitio': '',
      'nomsitio': '',
      'nacion': '',
      'subnacion': '',
      'subdivision': ''
    });
  }
  buscarArea() {
    this.fotoId_Lista = [];
    this.tam_Inicial_ListaFotos = 0;
    this.lista_Area = new Array();
    this.loading = true;
    var a = "¬";
    var b = "¬";
    var c = "¬";
    var d = "¬";
    var e = "¬";
    var f = "¬";
    var g = "¬";
    var h = "¬";
    if (this.areaManejoFormBuscar.get('codigoam').value)
      a = this.areaManejoFormBuscar.get('codigoam').value;
    if (this.areaManejoFormBuscar.get('nombream').value)
      b = this.areaManejoFormBuscar.get('nombream').value;
    if (this.areaManejoFormBuscar.get('sinam').value)
      c = this.areaManejoFormBuscar.get('sinam').value;
    if (this.areaManejoFormBuscar.get('codsitio').value)
      d = this.areaManejoFormBuscar.get('codsitio').value;
    if (this.areaManejoFormBuscar.get('nomsitio').value)
      e = this.areaManejoFormBuscar.get('nomsitio').value;
    if (this.areaManejoFormBuscar.get('nacion').value)
      f = this.areaManejoFormBuscar.get('nacion').value;
    if (this.areaManejoFormBuscar.get('subnacion').value)
      g = this.areaManejoFormBuscar.get('subnacion').value;
    if (this.areaManejoFormBuscar.get('subdivision').value)
      h = this.areaManejoFormBuscar.get('subdivision').value;
    this.areaServicio.getAreas(a, b, c, d, e, f, g, h)
      .subscribe(
        data => {
          this.dataArea = data;
          var k = 0;
          for (let val of this.dataArea) {
            k = k + 1;
            this.lista_Area.push(crearArea(k, val.areaId, val.codigoam, val.nomsitio, val.codsitio, val.nomsitio));
          }
          this.dataSource = new MatTableDataSource(this.lista_Area);
          this.loading = false;
        }, err => {
          this.loading = false;
          this.changeSuccessMessage('No se encontro información.', 'warning');
        });
  }
  buscarTodos() {
    this.fotoId_Lista = [];
    this.tam_Inicial_ListaFotos = 0;
    this.lista_Area = new Array();
    this.loading = true;
    this.areaServicio.all_Area
      .subscribe(
        data => {
          this.dataArea = data;
          var k = 0;
          for (let val of this.dataArea) {
            k = k + 1;
            this.lista_Area.push(crearArea(k, val.areaId, val.codigoam, val.nomsitio, val.codsitio, val.nomsitio));
          }
          this.dataSource = new MatTableDataSource(this.lista_Area);
          this.loading = false;
        }, err => {
          this.loading = false;
          this.changeSuccessMessage('No se encontro información.', 'warning');
        });
  }
  getArea_id(id: Number): area_Modelo {
    var base_areaBusqueda = new area_Modelo();
    this.dataArea.forEach(dataArea => {
      var areaBusqueda: area_Modelo = dataArea;
      if (id == areaBusqueda.areaId) {
        base_areaBusqueda = areaBusqueda;
        this.editar = false;
      }
    });
    return base_areaBusqueda;
  }
  mostrar_Area_Busqueda(row: area_Dato) {
    this.crear_areaManejoForm(this.getArea_id(row.areaId));
    this.tabPagina1();
    window.scrollTo(0, 0);
    this.guardar = true;
    this.getListaElementos(this.areaManejoForm.get('areaId').value);
    this.getFoto_Datos(row.areaId);
  }
  updateArea(area: area_Modelo): void {
    this.loading = true;
    var jwthelper = new JwtHelperService();
    var decodedToken = jwthelper.decodeToken(localStorage.getItem('userToken'));
    this.areaServicio.updateArea(area, decodedToken.jti)
      .subscribe(
        resSitio => {
          this.galeriaServicio.update_FotoId_Lista(
            this.galeria.archivos,
            this.galeria.datosFotografias,
            area.areaId,
            this.fotoId_Lista,
            this.tam_Inicial_ListaFotos,
            this.galeria.getTam_final_ListaFotos(), 3);
          this.loading = false;
          this.changeSuccessMessage(`Editado exitoso, código del área: ${resSitio.codigoam}.`, 'success');
          this.lista_Area = new Array();
          this.dataSource = new MatTableDataSource(this.lista_Area);
        }, err => {
          this.loading = false;
          this.changeSuccessMessage('Error no se pudo editar, comprueba que esté disponible el servicio.', 'primary');
        });
  }
  editarArea() {
    if (this.areaManejoForm.get('codigoam').value && this.areaManejoForm.valid)
      this.updateArea(this.setAreasManejadas(this.areaManejoForm.value));
    else
      this.changeSuccessMessage('Valida que los campos estén correctos donde se te indica.', 'primary');
  }
  nuevo() {
    this.editar = true;
    this.guardar = false;
    this.crear_areaManejoForm(new area_Modelo());
    this.crear_areaManejoForm_Buscar();
    this.tabPagina1();
    window.scrollTo(0, 0);
    this.data_listaElemento_DataSource = new LocalDataSource();
    this.lista_Area = new Array();
    this.dataSource = new MatTableDataSource(this.lista_Area);
    this.fotoId_Lista = [];
    this.galeria.nuevo();
    this.tam_Inicial_ListaFotos = 0;
  }
  // -----------------Lista elementos---------
  resListaElementos: any;
  getListaElementos(areaId: Number) {
    this.data_listaElemento_DataSource = new LocalDataSource();
    this.areaServicio.getListaElemento(areaId)
      .subscribe(
        resListaElementos => {
          this.resListaElementos = resListaElementos;
          for (let valListaElemento of this.resListaElementos) {
            var listaElementoBase = new listaElemento_Modelo();
            listaElementoBase = valListaElemento;
            this.data_listaElemento_DataSource.add(listaElementoBase);
            this.data_listaElemento_DataSource.refresh();
          }
        }, err => {
        });
  }
  onCreateConfirm(event): void {
    if (this.editar) { // se esta guardando un nuevo registro
      event.confirm.resolve(event.newData);
    }
    else // se esta guardando en  un registro existente
    {
      var listaElementoBase = new listaElemento_Modelo();
      listaElementoBase.codigoe = event.newData.codigoe;
      listaElementoBase.nombres = event.newData.nombres;
      listaElementoBase.status = event.newData.status;
      listaElementoBase.codfuente = event.newData.codfuente;
      listaElementoBase.listaElementoId = event.newData.listaElementoId;
      this.areaServicio.addListaElemento(this.areaManejoForm.get('areaId').value, listaElementoBase)
        .subscribe(
          resListaElemento => {
            event.confirm.resolve(event.newData);
            this.getListaElementos(this.areaManejoForm.get('areaId').value);
          }, err => {
          });
    }
  }

  onUpdateConfirm(event): void {
    if (this.editar) { //nuevo
      event.confirm.resolve(event.newData);
    }
    else { //actualizar uno existente
      var listaElementoBase = new listaElemento_Modelo();
      listaElementoBase.codigoe = event.newData.codigoe;
      listaElementoBase.nombres = event.newData.nombres;
      listaElementoBase.status = event.newData.status;
      listaElementoBase.codfuente = event.newData.codfuente;
      listaElementoBase.listaElementoId = event.newData.listaElementoId;
      this.areaServicio.updateListaElemento(this.areaManejoForm.get('areaId').value, listaElementoBase)
        .subscribe(
          resListaElemento => {
            event.confirm.resolve(event.newData);
            this.getListaElementos(this.areaManejoForm.get('areaId').value);
          }, err => {
          });
    }
  }
  onDeleteConfirm(event): void {
    if (window.confirm('¿Estás seguro de querer borrar el elemento?')) {
      if (this.editar) { //eliminar nuevo
        event.confirm.resolve(event.newData);
      } else { //eliminar uno existente
        this.areaServicio.deleteListaElemento(event.data.listaElementoId)
          .subscribe(
            resLitaElemento => {
              event.confirm.resolve(event.newData);
              this.getListaElementos(this.areaManejoForm.get('areaId').value);
            }, err => {
            });
      }
    } else {
      event.confirm.reject();
    }
  }
  getFoto_Datos(areaId: Number) {
    // const date = new Date().valueOf();
    this.galeriaServicio.getDatosFotos(areaId, 3).subscribe(
      resFoto => {
        this.data_resFoto = resFoto;
        this.tam_Inicial_ListaFotos = this.data_resFoto.length;//tamaño inicial de la lista de fotos guardadas
        for (let fotoVal of this.data_resFoto) {
          var fotoModelo = new foto_Modelo();
          fotoModelo = fotoVal;
          this.fotoId_Lista.push(fotoModelo.fotoId);
          if (fotoModelo.posicion == 0)
            this.galeria.mostrarDatosInicio(fotoModelo.descripcion, fotoModelo.comentario, fotoModelo.autor, this.fechaServicio.getFecha(fotoModelo.fecha));
          this.galeria.agregarImagenBusqueda(fotoModelo);
        }
      });
  }
  /**
   * Lleva el control de los errores al validar los 39 campos
   * Página 1
   * Identificadores
   */
  get input_codigoam() { return this.areaManejoForm.get('codigoam'); }
  get input_nombream() { return this.areaManejoForm.get('nombream'); }
  get input_sinam() { return this.areaManejoForm.get('sinam'); }
  get input_ammayor() { return this.areaManejoForm.get('ammayor'); }
  get input_coddueno() { return this.areaManejoForm.get('coddueno'); }
  get input_codsitio() { return this.areaManejoForm.get('codsitio'); }
  get input_nomsitio() { return this.areaManejoForm.get('nomsitio'); }
  // Localizadores
  get input_nacion() { return this.areaManejoForm.get('nacion'); }
  get input_subnacion() { return this.areaManejoForm.get('subnacion'); }
  get input_subdivision() { return this.areaManejoForm.get('subdivision'); }
  get input_nommapa() { return this.areaManejoForm.get('nommapa'); }
  get input_codmapa() { return this.areaManejoForm.get('codmapa'); }
  get input_nummarg() { return this.areaManejoForm.get('nummarg'); }
  get input_lat() { return this.areaManejoForm.get('lat'); }
  get input_long1() { return this.areaManejoForm.get('long1'); }
  get input_coords() { return this.areaManejoForm.get('coords'); }
  get input_coordn() { return this.areaManejoForm.get('coordn'); }
  get input_coorde() { return this.areaManejoForm.get('coorde'); }
  get input_coordo() { return this.areaManejoForm.get('coordo'); }
  // Descriptores
  get input_descripcion() { return this.areaManejoForm.get('descripcion'); }
  get input_comentario() { return this.areaManejoForm.get('comentario'); }
  // Status
  get input_fechaesta() { return this.areaManejoForm.get('fechaesta'); }
  /**
   * Página 2
   * Manejo
   */
  get input_administrador() { return this.areaManejoForm.get('administrador'); }
  get input_instadmin() { return this.areaManejoForm.get('instadmin'); }
  get input_diradmin1() { return this.areaManejoForm.get('diradmin1'); }
  get input_diradmin2() { return this.areaManejoForm.get('diradmin2'); }
  get input_ciudadadmin() { return this.areaManejoForm.get('ciudadadmin'); }
  get input_subnacadmin() { return this.areaManejoForm.get('subnacadmin'); }
  get input_codpostaladmin() { return this.areaManejoForm.get('codpostaladmin'); }
  get input_telefadminist() { return this.areaManejoForm.get('telefadminist'); }
  get input_instcoop() { return this.areaManejoForm.get('instcoop'); }
  get input_commanejo() { return this.areaManejoForm.get('commanejo'); }
  // Campos Opcionales
  get input_amopc1() { return this.areaManejoForm.get('amopc1'); }
  get input_amopc2() { return this.areaManejoForm.get('amopc2'); }
  get input_amopc3() { return this.areaManejoForm.get('amopc3'); }
  get input_amopc4() { return this.areaManejoForm.get('amopc4'); }
  get input_amopc5() { return this.areaManejoForm.get('amopc5'); }
  // Mantenimiento del Registro
  get input_respdatos() { return this.areaManejoForm.get('respdatos'); }
  get input_actualizar() { return this.areaManejoForm.get('actualizar'); }

}
function crearArea(k: Number, areaId: Number, codigoam, nombream, codsitio, nomsitio): area_Dato {
  return {
    numero: k,
    areaId: areaId,
    codigoam: codigoam,
    nombream: nombream,
    codsitio: codsitio,
    nomsitio: nomsitio
  };
}