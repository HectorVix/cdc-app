import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { caracterizacion_Modelo } from '../../../modelo/resumen/caracterizacion-modelo';
import { vertebrado_Modelo } from '../../../modelo/resumen/vertebrado-modelo';
import { distribucion_Modelo } from '../../../modelo/resumen/distribucion-modelo';
import { distribucion2_Modelo } from '../../../modelo/resumen/distribucion2-modelo';
import { ConfirmacionComponent } from '../../../componentes/dialogo/confirmacion/confirmacion.component';
import { CaracterizacionService } from '../../../servicios/caracterizacion/caracterizacion.service';
import { FechaService } from '../../../servicios/fecha/fecha.service';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { vertebrado_FormGroup } from '../../../modelo/formGroup/vertebrado';
import { MatPaginator, MatSort, MatTableDataSource, MatDialog } from '@angular/material';
import { vertebrado_Dato } from '../../../modelo/tabla/vertebrado-dato';
import { LocalDataSource } from 'ng2-smart-table';
import { GaleriaComponent } from '../../../componentes/galeria/galeria.component';
import { foto_Modelo } from '../../../modelo/fotoDatos/foto-datos';
import { GaleriaService } from '../../../servicios/galeria/galeria.service';
import { ElementoService } from '../../../servicios/elemento/elemento.service';

@Component({
  selector: 'app-caracterizacion-vertebrados-nacional',
  templateUrl: './caracterizacion-vertebrados-nacional.component.html',
  styleUrls: ['./caracterizacion-vertebrados-nacional.component.scss']
})
export class CaracterizacionVertebradosNacionalComponent implements OnInit {
  caracterizacionVertebradosNacionalForm: FormGroup;
  buscarForm: FormGroup;
  data_distribucion1_DataSource: LocalDataSource = new LocalDataSource();
  data_distribucion2_DataSource: LocalDataSource = new LocalDataSource();
  private _success = new Subject<string>();
  staticAlertClosed = false;
  successMessage: string;
  tipoAlert: string;
  loading: boolean;
  settings_Distribucion1 = {
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
      codsubnac: {
        title: 'CODSUBNAC'
      },
      nomsubnac: {
        title: 'NOMSUBNAC'
      },
      statsubnac: {
        title: 'STATSUBNAC'
      }
    }
  };
  settings_Distribucion2 = {
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
      codecoregn: {
        title: 'CODECORGN'
      },
      statecoregn: {
        title: 'STATECOREGN'
      },
      codcuencan: {
        title: 'CODCUENCAN'
      },
      statcuencan: {
        title: 'STATCUENCAN'
      }
    }
  };
  selected = new FormControl(0);
  //---------------------------------tabla
  displayedColumns: string[] = ['numero', 'codigoe', 'nombreg', 'nombren', 'nombrecomunn'];
  dataSource: MatTableDataSource<vertebrado_Dato>;
  lista_Vertebrado: Array<vertebrado_Dato> = new Array();
  dataVertebrado: any;
  private paginator: MatPaginator;
  @ViewChild(MatPaginator) set matPaginator(mp: MatPaginator) {
    this.paginator = mp;
    this.setDataSourceAttributes();
  }
  @ViewChild(MatSort) sort: MatSort;
  //------------------------------------------
  editar = true;
  guardar = false;
  caracterizacionId: Number;
  caracterizacion_Aux: any;
  //---------Galeria
  @ViewChild(GaleriaComponent)
  private galeria: GaleriaComponent;
  data_resFoto: any;
  tam_Inicial_ListaFotos = 0;
  fotoId_Lista = [];

  constructor(private fb: FormBuilder,
    private dialog: MatDialog,
    private caracterizacionServicio: CaracterizacionService,
    private galeriaServicio: GaleriaService,
    private elementoServicio: ElementoService,
    private fechaServicio: FechaService) {
    this.crearForm_caracterizacionVertebradosNacional(new vertebrado_Modelo);
    this.crearForm_Buscar();
    this.dataSource = new MatTableDataSource(this.lista_Vertebrado);
  }

  ngOnInit() {
    setTimeout(() => this.staticAlertClosed = true, 50000);
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
  crearForm_caracterizacionVertebradosNacional(vertebrado: vertebrado_Modelo) {
    this.caracterizacionVertebradosNacionalForm = new vertebrado_FormGroup().getVertebradoFormGrup(vertebrado);
  }
  guardar_Caracterizacion_Vertebrado() {
    if (this.caracterizacionVertebradosNacionalForm.get('codigoe').value && this.caracterizacionVertebradosNacionalForm.valid) {
      var caracterizacion_Vertebrado = new caracterizacion_Modelo();
      var vertebradoBase = this.setVertebrado(this.caracterizacionVertebradosNacionalForm.value);
      var vertebrado: Array<vertebrado_Modelo> = new Array();
      var distribucion1: Array<distribucion_Modelo> = new Array();
      var distribucion2: Array<distribucion2_Modelo> = new Array();

      this.data_distribucion1_DataSource.getAll().then(value => {
        value.forEach(elemento => {
          var distribucion1Base = new distribucion_Modelo();
          distribucion1Base.codsubnac = elemento.codsubnac;
          distribucion1Base.nomsubnac = elemento.nomsubnac;
          distribucion1Base.statsubnac = elemento.statsubnac;
          distribucion1.push(distribucion1Base);
        });
        this.data_distribucion2_DataSource.getAll().then(value => {
          value.forEach(elemento => {
            var distribucion2Base = new distribucion2_Modelo();
            distribucion2Base.codecoregn = elemento.codecoregn;
            distribucion2Base.statecoregn = elemento.statecoregn;
            distribucion2Base.codcuencan = elemento.codcuencan;
            distribucion2Base.statcuencan = elemento.statcuencan;
            distribucion2.push(distribucion2Base);
          });
          vertebradoBase.distribucionList = distribucion1;
          vertebradoBase.distribucion2List = distribucion2;
          vertebrado.push(vertebradoBase);
          caracterizacion_Vertebrado.vertebradoList = vertebrado;
          this.addCaracterizacionVertebrado(caracterizacion_Vertebrado);
        });
      });
    }
    else
      this.changeSuccessMessage('No se pudo registrar el codigoe es obligatorio ó valida que los campos esten correctos donde se te indica..', 'primary');
  }

  setVertebrado(datos: vertebrado_Modelo): vertebrado_Modelo {
    return datos;
  }
  //agrega un nuevo registro de caracterizacion de vertebrado nacional
  addCaracterizacionVertebrado(caracterizacion: caracterizacion_Modelo): void {
    this.loading = true;
    this.caracterizacionServicio.addCaracterizacionVertebrado(caracterizacion)
      .subscribe(
        resVertebrado => {
          if (this.galeria.archivos.size > 0) {
            var vertebrado_id = resVertebrado.vertebradoId;
            this.galeriaServicio.cargarFotos(this.galeria.archivos, this.galeria.datosFotografias, vertebrado_id, 5);
          }
          this.loading = false;
          this.changeSuccessMessage(`Se registro la caracterizacion del vertebrado :${resVertebrado.codigoe}.`, 'success');
        }, err => {
          this.loading = false;
          this.changeSuccessMessage('No se pudo regitrar la caracterizacion del vertebrado. Comprueba que exista el codigoe del elemento ó comprueba que esté disponible el servicio.',
            'primary');
        });
  }

  tabPagina1() {
    this.selected.setValue(0);
  }
  tabPagina2() {
    this.selected.setValue(1);
  }
  tabPagina3() {
    this.selected.setValue(2);
  }
  tabPagina4() {
    this.selected.setValue(3);
  }
  tabPagina5() {
    this.selected.setValue(4);
  }
  openDialogo(): void {
    const dialogRef = this.dialog.open(ConfirmacionComponent, {
      width: '250px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result)
        this.guardar_Caracterizacion_Vertebrado();
    });
  }
  openDialogoEditar(): void {
    const dialogRef = this.dialog.open(ConfirmacionComponent, {
      width: '250px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result)
        this.editarVertebrado();
    });
  }
  public changeSuccessMessage(mensaje: string, tipo: string) {
    this.tipoAlert = tipo;
    this._success.next(mensaje);
  }
  crearForm_Buscar() {
    this.buscarForm = this.fb.group({
      'codigoe': '',
      'nacion': '',
      'nombreg': '',
      'autor': '',
      'nombren': '',
      'nombrecomunn': ''
    });
  }
  buscarVertebrado() {
    this.fotoId_Lista = [];
    this.tam_Inicial_ListaFotos = 0;
    this.lista_Vertebrado = new Array();
    this.loading = true;
    var a = "¬";
    var b = "¬";
    var c = "¬";
    var d = "¬";
    var e = "¬";
    var f = "¬";
    if (this.buscarForm.get('codigoe').value)
      a = this.buscarForm.get('codigoe').value;
    if (this.buscarForm.get('nacion').value)
      b = this.buscarForm.get('nacion').value;
    if (this.buscarForm.get('nombreg').value)
      c = this.buscarForm.get('nombreg').value;
    if (this.buscarForm.get('autor').value)
      d = this.buscarForm.get('autor').value;
    if (this.buscarForm.get('nombren').value)
      e = this.buscarForm.get('nombren').value;
    if (this.buscarForm.get('nombrecomunn').value)
      f = this.buscarForm.get('nombrecomunn').value;
    this.caracterizacionServicio.getVertebrados(a, b, c, d, e, f)
      .subscribe(
        data => {
          this.dataVertebrado = data;
          var k = 0;
          for (let val of this.dataVertebrado) {
            k = k + 1;
            this.lista_Vertebrado.push(crearVertebrado(k,
              val.vertebradoId,
              val.codigoe,
              val.nombreg,
              val.nombren,
              val.nomcomunn));
          }
          this.dataSource = new MatTableDataSource(this.lista_Vertebrado);
          this.loading = false;
        }, err => {
          this.loading = false;
          this.changeSuccessMessage('No se encontro información.', 'warning');
        });
  }
  buscarTodos() {
    this.fotoId_Lista = [];
    this.tam_Inicial_ListaFotos = 0;
    this.lista_Vertebrado = new Array();
    this.loading = true;
    this.caracterizacionServicio.all_Vertebrado
      .subscribe(
        data => {
          this.dataVertebrado = data;
          var k = 0;
          for (let val of this.dataVertebrado) {
            k = k + 1;
            this.lista_Vertebrado.push(crearVertebrado(k,
              val.vertebradoId,
              val.codigoe,
              val.nombreg,
              val.nombren,
              val.nomcomunn));
          }
          this.dataSource = new MatTableDataSource(this.lista_Vertebrado);
          this.loading = false;
        }, err => {
          this.loading = false;
          this.changeSuccessMessage('No se encontro información.', 'warning');
        });
  }
  getVertebrado_id(id: Number): vertebrado_Modelo {
    var base_vertebradoBusqueda = new vertebrado_Modelo();
    this.dataVertebrado.forEach(dataVertebrado => {
      var vertebradoBusqueda: vertebrado_Modelo = dataVertebrado;
      if (id == vertebradoBusqueda.vertebradoId) {
        base_vertebradoBusqueda = vertebradoBusqueda;
        this.caracterizacion_Aux = base_vertebradoBusqueda;
        this.caracterizacionId = this.caracterizacion_Aux.caracterizacioncaracterizacionid.caracterizacionId;//al obtener lo pasa todo a minisculas
        this.editar = false;
      }
    });
    return base_vertebradoBusqueda;
  }
  mostrar_Vertebrado_Busqueda(row: vertebrado_Dato) {
    this.crearForm_caracterizacionVertebradosNacional(this.getVertebrado_id(row.vertebradoId));
    this.tabPagina1();
    this.guardar = true;
    this.getDistribucion1_Vertebrado(this.caracterizacionVertebradosNacionalForm.get('vertebradoId').value);
    this.getDistribucion2_Vertebrado(this.caracterizacionVertebradosNacionalForm.get('vertebradoId').value);
    this.getFoto_Datos(row.vertebradoId);
  }
  updateVertebrado(vertebrado: vertebrado_Modelo): void {
    this.loading = true;
    this.caracterizacionServicio.updateVertebrado(vertebrado, this.caracterizacionId)
      .subscribe(
        resVertebrado => {
          this.galeriaServicio.update_FotoId_Lista(
            this.galeria.archivos,
            this.galeria.datosFotografias,
            vertebrado.vertebradoId,
            this.fotoId_Lista,
            this.tam_Inicial_ListaFotos,
            this.galeria.getTam_final_ListaFotos(), 5);
          this.loading = false;
          this.changeSuccessMessage(`Editado exitoso, código del Vertebrado:${resVertebrado.codigoe}.`, 'success');
          this.lista_Vertebrado = new Array();
          this.dataSource = new MatTableDataSource(this.lista_Vertebrado);
        }, err => {
          this.loading = false;
          this.changeSuccessMessage('Error no se pudo editar, comprueba que esté disponible el servicio', 'primary');
        });
  }
  editarVertebrado() {
    if (this.caracterizacionVertebradosNacionalForm.get('codigoe').value && this.caracterizacionVertebradosNacionalForm.valid)
      this.updateVertebrado(this.setVertebrado(this.caracterizacionVertebradosNacionalForm.value));
    else
      this.changeSuccessMessage('Valida que los campos estén correctos donde se te indica..', 'primary');
  }
  nuevo() {
    this.editar = true;
    this.guardar = false;
    this.crearForm_caracterizacionVertebradosNacional(new vertebrado_Modelo());
    this.crearForm_Buscar();
    this.tabPagina1();
    this.lista_Vertebrado = new Array();
    this.dataSource = new MatTableDataSource(this.lista_Vertebrado);
    this.fotoId_Lista = [];
    this.galeria.nuevo();
    this.tam_Inicial_ListaFotos = 0;
  }
  // --------------Distribucion1------------------
  resDistribucion1: any;
  getDistribucion1_Vertebrado(vertebradoId: Number) {
    this.data_distribucion1_DataSource = new LocalDataSource();
    this.caracterizacionServicio.getDistribucion1_Vertebrado(vertebradoId)
      .subscribe(
        resDistribucion1 => {
          this.resDistribucion1 = resDistribucion1;
          for (let valresDistribucion1 of this.resDistribucion1) {
            var valresDistribucion1Base = new distribucion_Modelo();
            valresDistribucion1Base = valresDistribucion1;
            this.data_distribucion1_DataSource.add(valresDistribucion1Base);
            this.data_distribucion1_DataSource.refresh();
          }
        }, err => {
        });
  }
  onCreateConfirm(event): void {
    if (this.editar) { // se esta guardando un nuevo registro
      event.confirm.resolve(event.newData);
    }
    else // se esta editando un registro
    {
      var distribucion1Base = new distribucion_Modelo();
      distribucion1Base.codsubnac = event.newData.codsubnac;
      distribucion1Base.nomsubnac = event.newData.nomsubnac;
      distribucion1Base.statsubnac = event.newDatastatsubnac;
      distribucion1Base.distribucionId = event.newData.distribucionId;
      this.caracterizacionServicio.addDistribucion1_Vertebrado(this.caracterizacionVertebradosNacionalForm.get('vertebradoId').value, distribucion1Base)
        .subscribe(
          resMacsitio => {
            event.confirm.resolve(event.newData);
            this.getDistribucion1_Vertebrado(this.caracterizacionVertebradosNacionalForm.get('vertebradoId').value);
          }, err => {
          });
    }
  }

  onUpdateConfirm(event): void {
    if (this.editar) { //nuevo
      event.confirm.resolve(event.newData);
    }
    else { //editar uno existente
      var distribucion1Base = new distribucion_Modelo();
      distribucion1Base.codsubnac = event.newData.codsubnac;
      distribucion1Base.nomsubnac = event.newData.nomsubnac;
      distribucion1Base.statsubnac = event.newDatastatsubnac;
      distribucion1Base.distribucionId = event.newData.distribucionId;
      this.caracterizacionServicio.updateDistribucion1_Vertebrado(this.caracterizacionVertebradosNacionalForm.get('vertebradoId').value, distribucion1Base)
        .subscribe(
          resDistribucion1 => {
            event.confirm.resolve(event.newData);
            this.getDistribucion1_Vertebrado(this.caracterizacionVertebradosNacionalForm.get('vertebradoId').value);
          }, err => {
          });
    }
  }
  onDeleteConfirm(event): void {
    if (window.confirm('¿Estás seguro de querer borrar la distribución subnacional?')) {
      if (this.editar) { //nuevo
        event.confirm.resolve(event.newData);
      } else { //editar uno existente
        this.caracterizacionServicio.deleteDistribucion1(event.data.distribucionId)
          .subscribe(
            resDistribucion1 => {
              event.confirm.resolve(event.newData);
              this.getDistribucion1_Vertebrado(this.caracterizacionVertebradosNacionalForm.get('vertebradoId').value);
            }, err => {
            });
      }
    } else {
      event.confirm.reject();
    }
  }
  // ----------------DISTRIBUCIÓN 2------------------
  resDistribucion2: any;
  getDistribucion2_Vertebrado(vertebradoId: Number) {
    this.data_distribucion2_DataSource = new LocalDataSource();
    this.caracterizacionServicio.getDistribucion2_Vertebrado(vertebradoId)
      .subscribe(
        resDistribucion2 => {
          this.resDistribucion2 = resDistribucion2;
          for (let valresDistribucion2 of this.resDistribucion2) {
            var valresDistribucion2Base = new distribucion2_Modelo();
            valresDistribucion2Base = valresDistribucion2;
            this.data_distribucion2_DataSource.add(valresDistribucion2Base);
            this.data_distribucion2_DataSource.refresh();
          }
        }, err => {
        });
  }
  onCreateConfirm2(event): void {
    if (this.editar) { // se esta guardando un nuevo registro
      event.confirm.resolve(event.newData);
    }
    else // se esta editando un registro
    {
      var distribucion2Base = new distribucion2_Modelo();
      distribucion2Base.codecoregn = event.newData.codecoregn;
      distribucion2Base.statecoregn = event.newData.statecoregn;
      distribucion2Base.codcuencan = event.newData.codcuencan;
      distribucion2Base.statcuencan = event.newData.statcuencan;
      distribucion2Base.distribucion2Id = event.newData.distribucion2Id;
      this.caracterizacionServicio.addDistribucion2_Vertebrado(this.caracterizacionVertebradosNacionalForm.get('vertebradoId').value, distribucion2Base)
        .subscribe(
          resDistribucion2 => {
            event.confirm.resolve(event.newData);
            this.getDistribucion2_Vertebrado(this.caracterizacionVertebradosNacionalForm.get('vertebradoId').value);
          }, err => {
          });
    }
  }

  onUpdateConfirm2(event): void {
    if (this.editar) { //nuevo
      event.confirm.resolve(event.newData);
    }
    else { //editar uno existente
      var distribucion2Base = new distribucion2_Modelo();
      distribucion2Base.codecoregn = event.newData.codecoregn;
      distribucion2Base.statecoregn = event.newData.statecoregn;
      distribucion2Base.codcuencan = event.newData.codcuencan;
      distribucion2Base.statcuencan = event.newData.statcuencan;
      distribucion2Base.distribucion2Id = event.newData.distribucion2Id;
      this.caracterizacionServicio.updateDistribucion2_Vertebrado(this.caracterizacionVertebradosNacionalForm.get('vertebradoId').value, distribucion2Base)
        .subscribe(
          resDistribucion2 => {
            event.confirm.resolve(event.newData);
            this.getDistribucion2_Vertebrado(this.caracterizacionVertebradosNacionalForm.get('vertebradoId').value);
          }, err => {
          });
    }
  }
  onDeleteConfirm2(event): void {
    if (window.confirm('¿Estás seguro de querer borrar la ecoregión?')) {
      if (this.editar) { //eliminar nuevo
        event.confirm.resolve(event.newData);
      } else { //eliminar uno existente
        this.caracterizacionServicio.deleteDistribucion2(event.data.distribucion2Id)
          .subscribe(
            reDistribucion2 => {
              event.confirm.resolve(event.newData);
              this.getDistribucion2_Vertebrado(this.caracterizacionVertebradosNacionalForm.get('vertebradoId').value);
            }, err => {
            });
      }
    } else {
      event.confirm.reject();
    }
  }
  getFoto_Datos(vertebradoId: Number) {
    const date = new Date().valueOf();
    this.galeriaServicio.getDatosFotos(vertebradoId, 5).subscribe(
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
  validarCodigoe() {
    this.loading = true;
    this.elementoServicio.validarElementoCodigoe(this.caracterizacionVertebradosNacionalForm.get('codigoe').value)
      .subscribe(
        resElemento => {
          this.loading = false;
          this.changeSuccessMessage(`Si existe el elemento:${resElemento.codigoe}.`, 'success');
        }, err => {
          this.loading = false;
          this.changeSuccessMessage('No existe el elemento, por favor ingresa un código valido.', 'primary');
        });
  }

  /*** Lleva el control de los errores
   *  Página 1
   *  Identificadores
   */
  get input_codigoe() { return this.caracterizacionVertebradosNacionalForm.get('codigoe'); }
  get input_nacion() { return this.caracterizacionVertebradosNacionalForm.get('nacion'); }
  get input_nombreg() { return this.caracterizacionVertebradosNacionalForm.get('nombreg'); }
  get input_autor() { return this.caracterizacionVertebradosNacionalForm.get('autor'); }
  get input_nombren() { return this.caracterizacionVertebradosNacionalForm.get('nombren'); }
  get input_nomcomunn() { return this.caracterizacionVertebradosNacionalForm.get('nomcomunn'); }
  //taxonomía
  get input_clasetax() { return this.caracterizacionVertebradosNacionalForm.get('clasetax'); }
  get input_orden() { return this.caracterizacionVertebradosNacionalForm.get('orden'); }
  get input_familia() { return this.caracterizacionVertebradosNacionalForm.get('familia'); }
  get input_genero() { return this.caracterizacionVertebradosNacionalForm.get('genero'); }
  get input_comtaxg() { return this.caracterizacionVertebradosNacionalForm.get('comtaxg'); }
  get input_comsubespn() { return this.caracterizacionVertebradosNacionalForm.get('comsubespn'); }
  //status
  get input_rangog() { return this.caracterizacionVertebradosNacionalForm.get('rangog'); }
  get input_cites() { return this.caracterizacionVertebradosNacionalForm.get('cites'); }
  get input_uicn() { return this.caracterizacionVertebradosNacionalForm.get('uicn'); }
  get input_aepeu() { return this.caracterizacionVertebradosNacionalForm.get('aepeu'); }
  get input_fechaaepeu() { return this.caracterizacionVertebradosNacionalForm.get('fechaaepeu'); }
  get input_endemismo() { return this.caracterizacionVertebradosNacionalForm.get('endemismo'); }
  get input_comstatg() { return this.caracterizacionVertebradosNacionalForm.get('comstatg'); }
  get input_rangon() { return this.caracterizacionVertebradosNacionalForm.get('rangon'); }
  get input_protnacion() { return this.caracterizacionVertebradosNacionalForm.get('protnacion'); }
  get input_rastreolen() { return this.caracterizacionVertebradosNacionalForm.get('rastreolen'); }
  get input_espdeportn() { return this.caracterizacionVertebradosNacionalForm.get('espdeportn'); }
  get input_espcomern() { return this.caracterizacionVertebradosNacionalForm.get('espcomern'); }
  get input_pezdeport() { return this.caracterizacionVertebradosNacionalForm.get('pezdeport'); }
  get input_ndeportpro() { return this.caracterizacionVertebradosNacionalForm.get('ndeportpro'); }
  get input_cazapieln() { return this.caracterizacionVertebradosNacionalForm.get('cazapieln'); }
  get input_pesten() { return this.caracterizacionVertebradosNacionalForm.get('pesten'); }
  get input_comstatn() { return this.caracterizacionVertebradosNacionalForm.get('comstatn'); }
  //distribución
  get input_elevminn() { return this.caracterizacionVertebradosNacionalForm.get('elevminn'); }
  get input_elevmaxn() { return this.caracterizacionVertebradosNacionalForm.get('elevmaxn'); }
  get input_comdistg() { return this.caracterizacionVertebradosNacionalForm.get('comdistg'); }
  get input_comdistn() { return this.caracterizacionVertebradosNacionalForm.get('comdistn'); }
  /* Página 2
   * migración */
  get input_residente() { return this.caracterizacionVertebradosNacionalForm.get('residente'); }
  get input_miglocal() { return this.caracterizacionVertebradosNacionalForm.get('miglocal'); }
  get input_migdist() { return this.caracterizacionVertebradosNacionalForm.get('migdist'); }
  get input_repn() { return this.caracterizacionVertebradosNacionalForm.get('repn'); }
  get input_norepn() { return this.caracterizacionVertebradosNacionalForm.get('norepn'); }
  get input_transmign() { return this.caracterizacionVertebradosNacionalForm.get('transmign'); }
  get input_aparirregn() { return this.caracterizacionVertebradosNacionalForm.get('aparirregn'); }
  get input_mign() { return this.caracterizacionVertebradosNacionalForm.get('mign'); }
  get input_commigg() { return this.caracterizacionVertebradosNacionalForm.get('commigg'); }
  get input_commign() { return this.caracterizacionVertebradosNacionalForm.get('commign'); }
  //habitat 
  get input_marino() { return this.caracterizacionVertebradosNacionalForm.get('marino'); }
  get input_estuarino() { return this.caracterizacionVertebradosNacionalForm.get('estuarino'); }
  get input_fluvial() { return this.caracterizacionVertebradosNacionalForm.get('fluvial'); }
  get input_lacustre() { return this.caracterizacionVertebradosNacionalForm.get('lacustre'); }
  get input_palustre() { return this.caracterizacionVertebradosNacionalForm.get('palustre'); }
  get input_terrestre() { return this.caracterizacionVertebradosNacionalForm.get('terrestre'); }
  get input_subterran() { return this.caracterizacionVertebradosNacionalForm.get('subterran'); }
  get input_factorespe() { return this.caracterizacionVertebradosNacionalForm.get('factorespe'); }
  get input_comhabg() { return this.caracterizacionVertebradosNacionalForm.get('comhabg'); }
  get input_comhabrep() { return this.caracterizacionVertebradosNacionalForm.get('comhabrep'); }
  get input_comhabn() { return this.caracterizacionVertebradosNacionalForm.get('comhabn'); }
  /* Página 3
    *hábitos alimenticios
  */
  get input_habitosalim() { return this.caracterizacionVertebradosNacionalForm.get('habitosalim'); }
  get input_comalimg() { return this.caracterizacionVertebradosNacionalForm.get('comalimg'); }
  get input_comalimn() { return this.caracterizacionVertebradosNacionalForm.get('comalimn'); }
  //ecología
  get input_comecolg() { return this.caracterizacionVertebradosNacionalForm.get('comecolg'); }
  get input_comecoln() { return this.caracterizacionVertebradosNacionalForm.get('comecoln'); }
  /* Página 4 
   *fenología-Estacionalidad
    */
  get input_fenologia() { return this.caracterizacionVertebradosNacionalForm.get('fenologia'); }
  get input_nenea() { return this.caracterizacionVertebradosNacionalForm.get('nenea'); }
  get input_nabra() { return this.caracterizacionVertebradosNacionalForm.get('nabra'); }
  get input_njula() { return this.caracterizacionVertebradosNacionalForm.get('njula'); }
  get input_nocta() { return this.caracterizacionVertebradosNacionalForm.get('nocta'); }

  get input_neneb() { return this.caracterizacionVertebradosNacionalForm.get('neneb'); }
  get input_nabrb() { return this.caracterizacionVertebradosNacionalForm.get('nabrb'); }
  get input_njulb() { return this.caracterizacionVertebradosNacionalForm.get('njulb'); }
  get input_noctb() { return this.caracterizacionVertebradosNacionalForm.get('noctb'); }

  get input_nfeba() { return this.caracterizacionVertebradosNacionalForm.get('nfeba'); }
  get input_nmaya() { return this.caracterizacionVertebradosNacionalForm.get('nmaya'); }
  get input_nagoa() { return this.caracterizacionVertebradosNacionalForm.get('nagoa'); }
  get input_nnova() { return this.caracterizacionVertebradosNacionalForm.get('nnova'); }

  get input_nfebb() { return this.caracterizacionVertebradosNacionalForm.get('nfebb'); }
  get input_nmayb() { return this.caracterizacionVertebradosNacionalForm.get('nmayb'); }
  get input_nagob() { return this.caracterizacionVertebradosNacionalForm.get('nagob'); }
  get input_nnovb() { return this.caracterizacionVertebradosNacionalForm.get('nnovb'); }

  get input_nmara() { return this.caracterizacionVertebradosNacionalForm.get('nmara'); }
  get input_njuna() { return this.caracterizacionVertebradosNacionalForm.get('njuna'); }
  get input_nseta() { return this.caracterizacionVertebradosNacionalForm.get('nseta'); }
  get input_ndica() { return this.caracterizacionVertebradosNacionalForm.get('ndica'); }

  get input_nmarb() { return this.caracterizacionVertebradosNacionalForm.get('nmarb'); }
  get input_njunb() { return this.caracterizacionVertebradosNacionalForm.get('njunb'); }
  get input_nsetb() { return this.caracterizacionVertebradosNacionalForm.get('nsetb'); }
  get input_ndicb() { return this.caracterizacionVertebradosNacionalForm.get('ndicb'); }

  get input_comfenolg() { return this.caracterizacionVertebradosNacionalForm.get('comfenolg'); }
  get input_comfenoln() { return this.caracterizacionVertebradosNacionalForm.get('comfenoln'); }

  //Reproducción
  get input_colrep() { return this.caracterizacionVertebradosNacionalForm.get('colrep'); }
  get input_comrepg() { return this.caracterizacionVertebradosNacionalForm.get('comrepg'); }
  get input_comrepn() { return this.caracterizacionVertebradosNacionalForm.get('comrepn'); }

  /*  Página 5
   *  Manejo
   */
  get input_commanejog() { return this.caracterizacionVertebradosNacionalForm.get('commanejog'); }
  get input_commanejon() { return this.caracterizacionVertebradosNacionalForm.get('commanejon'); }
  //atributos misceláneos
  get input_usoeconom() { return this.caracterizacionVertebradosNacionalForm.get('usoeconom'); }
  get input_longitud() { return this.caracterizacionVertebradosNacionalForm.get('longitud'); }
  get input_peso() { return this.caracterizacionVertebradosNacionalForm.get('peso'); }
  //campos opcionales
  get input_rcvnopc1() { return this.caracterizacionVertebradosNacionalForm.get('rcvnopc1'); }
  get input_rcvnopc2() { return this.caracterizacionVertebradosNacionalForm.get('rcvnopc2'); }
  get input_rcvnopc3() { return this.caracterizacionVertebradosNacionalForm.get('rcvnopc3'); }
  get input_rcvnopc4() { return this.caracterizacionVertebradosNacionalForm.get('rcvnopc4'); }
  get input_rcvnopc5() { return this.caracterizacionVertebradosNacionalForm.get('rcvnopc5'); }
  //referencias
  get input_refg() { return this.caracterizacionVertebradosNacionalForm.get('refg'); }
  get input_refn() { return this.caracterizacionVertebradosNacionalForm.get('refn'); }
  //matenimiento del registro
  get input_ediciong() { return this.caracterizacionVertebradosNacionalForm.get('ediciong'); }
  get input_actualizag() { return this.caracterizacionVertebradosNacionalForm.get('actualizag'); }
  get input_edicionn() { return this.caracterizacionVertebradosNacionalForm.get('edicionn'); }
  get input_actualizan() { return this.caracterizacionVertebradosNacionalForm.get('actualizan'); }

}
function crearVertebrado(k: Number, vertebradoId: Number, codigoe, nombreg, nombren, nombrecomunn): vertebrado_Dato {
  return {
    numero: k,
    vertebradoId: vertebradoId,
    codigoe: codigoe,
    nombreg: nombreg,
    nombren: nombren,
    nombrecomunn: nombrecomunn
  };
}