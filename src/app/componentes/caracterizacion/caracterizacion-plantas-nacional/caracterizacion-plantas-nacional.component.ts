import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { caracterizacion_Modelo } from '../../../modelo/resumen/caracterizacion-modelo';
import { planta_Modelo } from '../../../modelo/resumen/planta-modelo';
import { distribucion_Modelo } from '../../../modelo/resumen/distribucion-modelo';
import { distribucion2_Modelo } from '../../../modelo/resumen/distribucion2-modelo';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { CaracterizacionService } from '../../../servicios/caracterizacion/caracterizacion.service';
import { FechaService } from '../../../servicios/fecha/fecha.service';
import { ConfirmacionComponent } from '../../../componentes/dialogo/confirmacion/confirmacion.component';
import { LocalDataSource } from 'ng2-smart-table';
import { planta_FormGroup } from '../../../modelo/formGroup/planta';
import { MatPaginator, MatSort, MatTableDataSource, MatDialog } from '@angular/material';
import { planta_Dato } from '../../../modelo/tabla/planta-dato';
import { GaleriaComponent } from '../../../componentes/galeria/galeria.component';
import { foto_Modelo } from '../../../modelo/fotoDatos/foto-datos';
import { GaleriaService } from '../../../servicios/galeria/galeria.service';
import { ElementoService } from '../../../servicios/elemento/elemento.service';

@Component({
  selector: 'app-caracterizacion-plantas-nacional',
  templateUrl: './caracterizacion-plantas-nacional.component.html',
  styleUrls: ['./caracterizacion-plantas-nacional.component.scss']
})
export class CaracterizacionPlantasNacionalComponent implements OnInit {
  caracterizacionPlantasNacionalForm: FormGroup;
  buscarForm: FormGroup;
  private _success = new Subject<string>();
  staticAlertClosed = false;
  successMessage: string;
  tipoAlert: string;
  loading: boolean;
  selected = new FormControl(0);
  settings_distribucion1 = {
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
  settings_distribucion2 = {
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
        title: 'CODECOREGN'
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

  data_distribucion1_DataSource: LocalDataSource = new LocalDataSource();
  data_distribucion2_DataSource: LocalDataSource = new LocalDataSource();
  //---------------------------------tabla
  displayedColumns: string[] = ['numero', 'codigoe', 'nacion', 'nombren', 'nombrecomunn'];
  dataSource: MatTableDataSource<planta_Dato>;
  lista_Planta: Array<planta_Dato> = new Array();
  dataPlanta: any;
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
    private caracterizacionServicio: CaracterizacionService,
    private fechaServicio: FechaService,
    private galeriaServicio: GaleriaService,
    private elementoServicio: ElementoService,
    private dialog: MatDialog) {
    this.crearForm_CaracterizacionPlantasNacional(new planta_Modelo);
    this.crearForm_Buscar();
    this.dataSource = new MatTableDataSource(this.lista_Planta);
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
  crearForm_CaracterizacionPlantasNacional(planta: planta_Modelo) {
    this.caracterizacionPlantasNacionalForm = new planta_FormGroup().getPlantaFormGrup(planta);
  }
  guardarCPlanta() {
    if (this.caracterizacionPlantasNacionalForm.get('codigoe').value && this.caracterizacionPlantasNacionalForm.valid) {
      var cplanta = new caracterizacion_Modelo();
      var plantaBase = this.setPlanta(this.caracterizacionPlantasNacionalForm.value);
      var planta: Array<planta_Modelo> = new Array();
      var distribucion: Array<distribucion_Modelo> = new Array();
      var distribucion2: Array<distribucion2_Modelo> = new Array();
      this.data_distribucion1_DataSource.getAll().then(value => {
        value.forEach(elemento => {
          var distribucionBase = new distribucion_Modelo();
          distribucionBase.codsubnac = elemento.codsubnac;
          distribucionBase.nomsubnac = elemento.nomsubnac;
          distribucionBase.statsubnac = elemento.statsubnac;
          distribucion.push(distribucionBase);
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
          plantaBase.distribucionList = distribucion;
          plantaBase.distribucion2List = distribucion2;
          planta.push(plantaBase);
          cplanta.plantaList = planta;
          this.addCaracterizacionPlanta(cplanta);
        });
      });
    }
    else
      this.changeSuccessMessage('No se pudo registrar el codigoe es obligatorio ó valida que los campos esten correctos donde se te indica..', 'primary');
  }

  setPlanta(datos: planta_Modelo): planta_Modelo {
    datos.edicionn = this.fechaServicio.toFormatoDateTime(this.caracterizacionPlantasNacionalForm.get('edicionn').value);
    datos.actualizan = this.fechaServicio.toFormatoDateTime(this.caracterizacionPlantasNacionalForm.get('actualizan').value);
    return datos;
  }
  //agrega un nuevo registro de caracterizacion de planta
  addCaracterizacionPlanta(caracterizacion: caracterizacion_Modelo): void {
    this.loading = true;
    this.caracterizacionServicio.addCaracterizacionPlanta(caracterizacion)
      .subscribe(
        resPlanta => {
          if (this.galeria.archivos.size > 0) {
            var planta_id = resPlanta.plantaId;
            this.galeriaServicio.cargarFotos(this.galeria.archivos, this.galeria.datosFotografias, planta_id, 4);
          }
          this.loading = false;
          this.changeSuccessMessage(`Se registro la caracterizacion de la planta :${resPlanta.codigoe}.`, 'success');
        }, err => {
          this.loading = false;
          this.changeSuccessMessage('Error no se pudo registrar, el códigoe de la planta debe ser valido ó comprueba que el servicio esté disponible.', 'primary');
        });
  }

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
  tabPagina3() {
    this.selected.setValue(2);

  }
  tabPagina4() {
    this.selected.setValue(3);

  }
  openDialogo(): void {
    const dialogRef = this.dialog.open(ConfirmacionComponent, {
      width: '250px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result)
        this.guardarCPlanta();
    });
  }
  openDialogoEditar(): void {
    const dialogRef = this.dialog.open(ConfirmacionComponent, {
      width: '250px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result)
        this.editarPlanta();
    });
  }

  crearForm_Buscar() {
    this.buscarForm = this.fb.group({
      'codigoe': '',
      'nacion': '',
      'nombren': '',
      'nombrecomunn': '',

    });
  }
  buscarPlanta() {
    this.fotoId_Lista = [];
    this.tam_Inicial_ListaFotos = 0;
    this.lista_Planta = new Array();
    this.loading = true;
    var a = "¬";
    var b = "¬";
    var c = "¬";
    var d = "¬";
    if (this.buscarForm.get('codigoe').value)
      a = this.buscarForm.get('codigoe').value;
    if (this.buscarForm.get('nacion').value)
      b = this.buscarForm.get('nacion').value;
    if (this.buscarForm.get('nombren').value)
      c = this.buscarForm.get('nombren').value;
    if (this.buscarForm.get('nombrecomunn').value)
      d = this.buscarForm.get('nombrecomunn').value;
    this.caracterizacionServicio.getPlantas(a, b, c, d)
      .subscribe(
        data => {
          this.dataPlanta = data;
          var k = 0;
          for (let val of this.dataPlanta) {
            k = k + 1;
            this.lista_Planta.push(crearPlanta(k,
              val.plantaId,
              val.codigoe,
              val.nacion,
              val.nombren,
              val.nombrecomunn));
          }
          this.dataSource = new MatTableDataSource(this.lista_Planta);
          this.loading = false;
        }, err => {
          this.loading = false;
          this.changeSuccessMessage('No se encontro información.', 'warning');
        });
  }
  getPlanta_id(id: Number): planta_Modelo {
    var base_plantaBusqueda = new planta_Modelo();
    this.dataPlanta.forEach(dataPlanta => {
      var plantaBusqueda: planta_Modelo = dataPlanta;
      if (id == plantaBusqueda.plantaId) {
        base_plantaBusqueda = plantaBusqueda;
        this.caracterizacion_Aux = base_plantaBusqueda;
        this.caracterizacionId = this.caracterizacion_Aux.caracterizacioncaracterizacionid.caracterizacionId;//al obtener lo pasa todo a minisculas
        this.editar = false;
      }
    });
    return base_plantaBusqueda;
  }
  mostrar_Planta_Busqueda(row: planta_Dato) {
    this.crearForm_CaracterizacionPlantasNacional(this.getPlanta_id(row.plantaId));
    this.tabPagina1();
    this.guardar = true;
    this.getDistribucion1_Planta(this.caracterizacionPlantasNacionalForm.get('plantaId').value);
    this.getDistribucion2_Planta(this.caracterizacionPlantasNacionalForm.get('plantaId').value);
    this.getFoto_Datos(row.plantaId);
  }
  updatePlanta(planta: planta_Modelo): void {
    this.loading = true;
    this.caracterizacionServicio.updatePlanta(planta, this.caracterizacionId)
      .subscribe(
        resPlanta => {
          this.galeriaServicio.update_FotoId_Lista(
            this.galeria.archivos,
            this.galeria.datosFotografias,
            planta.plantaId,
            this.fotoId_Lista,
            this.tam_Inicial_ListaFotos,
            this.galeria.getTam_final_ListaFotos(), 4);
          this.loading = false;
          this.changeSuccessMessage(`Editado exitoso, código de la planta:${resPlanta.codigoe}.`, 'success');
          this.lista_Planta = new Array();
          this.dataSource = new MatTableDataSource(this.lista_Planta);
        }, err => {
          this.loading = false;
          this.changeSuccessMessage('Error no se pudo editar, el codigo de la planta debe ser valido', 'primary');
        });
  }
  editarPlanta() {
    if (this.caracterizacionPlantasNacionalForm.get('codigoe').value && this.caracterizacionPlantasNacionalForm.valid)
      this.updatePlanta(this.setPlanta(this.caracterizacionPlantasNacionalForm.value));
    else
      this.changeSuccessMessage('Valida que los campos estén correctos donde se te indica..', 'primary');
  }
  nuevo() {
    this.editar = true;
    this.guardar = false;
    this.crearForm_CaracterizacionPlantasNacional(new planta_Modelo());
    this.crearForm_Buscar();
    this.tabPagina1();
    this.lista_Planta = new Array();
    this.dataSource = new MatTableDataSource(this.lista_Planta);
    this.data_distribucion1_DataSource = new LocalDataSource();
    this.data_distribucion2_DataSource = new LocalDataSource();
    this.fotoId_Lista = [];
    this.galeria.nuevo();
    this.tam_Inicial_ListaFotos = 0;
  }
  // --------------Distribucion1------------------
  resDistribucion1: any;
  getDistribucion1_Planta(plantaId: Number) {
    this.data_distribucion1_DataSource = new LocalDataSource();
    this.caracterizacionServicio.getDistribucion1_Planta(plantaId)
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
    if (this.editar) { // se esta guardando un nuevo registro, aqui es verdadero por que se usa como disabled
      event.confirm.resolve(event.newData);
    }
    else // se esta editando un registro
    {
      var distribucion1Base = new distribucion_Modelo();
      distribucion1Base.codsubnac = event.newData.codsubnac;
      distribucion1Base.nomsubnac = event.newData.nomsubnac;
      distribucion1Base.statsubnac = event.newDatastatsubnac;
      distribucion1Base.distribucionId = event.newData.distribucionId;
      this.caracterizacionServicio.addDistribucion1_Planta(this.caracterizacionPlantasNacionalForm.get('plantaId').value, distribucion1Base)
        .subscribe(
          resMacsitio => {
            event.confirm.resolve(event.newData);
            this.getDistribucion1_Planta(this.caracterizacionPlantasNacionalForm.get('plantaId').value);
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
      this.caracterizacionServicio.updateDistribucion1_Planta(this.caracterizacionPlantasNacionalForm.get('plantaId').value, distribucion1Base)
        .subscribe(
          resDistribucion1 => {
            event.confirm.resolve(event.newData);
            this.getDistribucion1_Planta(this.caracterizacionPlantasNacionalForm.get('plantaId').value);
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
              this.getDistribucion1_Planta(this.caracterizacionPlantasNacionalForm.get('plantaId').value);
            }, err => {
            });
      }
    } else {
      event.confirm.reject();
    }
  }
  // ----------------DISTRIBUCIÓN 2------------------
  resDistribucion2: any;
  getDistribucion2_Planta(plantaId: Number) {
    this.data_distribucion2_DataSource = new LocalDataSource();
    this.caracterizacionServicio.getDistribucion2_Planta(plantaId)
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
    if (this.editar) { // se esta guardando un nuevo registro, aqui es verdadero por que se usa como disabled
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
      this.caracterizacionServicio.addDistribucion2_Planta(this.caracterizacionPlantasNacionalForm.get('plantaId').value, distribucion2Base)
        .subscribe(
          resDistribucion2 => {
            event.confirm.resolve(event.newData);
            this.getDistribucion2_Planta(this.caracterizacionPlantasNacionalForm.get('plantaId').value);
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
      this.caracterizacionServicio.updateDistribucion2_Planta(this.caracterizacionPlantasNacionalForm.get('plantaId').value, distribucion2Base)
        .subscribe(
          resDistribucion2 => {
            event.confirm.resolve(event.newData);
            this.getDistribucion2_Planta(this.caracterizacionPlantasNacionalForm.get('plantaId').value);
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
              this.getDistribucion2_Planta(this.caracterizacionPlantasNacionalForm.get('plantaId').value);
            }, err => {
            });
      }
    } else {
      event.confirm.reject();
    }
  }
  getFoto_Datos(plantaId: Number) {
    const date = new Date().valueOf();
    this.galeriaServicio.getDatosFotos(plantaId, 4).subscribe(
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
    this.elementoServicio.validarElementoCodigoe(this.caracterizacionPlantasNacionalForm.get('codigoe').value)
      .subscribe(
        resElemento => {
          this.loading = false;
          this.changeSuccessMessage(`Si existe el elemento:${resElemento.codigoe}.`, 'success');
        }, err => {
          this.loading = false;
          this.changeSuccessMessage('No existe el elemento, por favor ingresa un código valido.', 'primary');
        });
  }
  //Lleva el control de los errores
  //página 1
  //identificadores
  get input_codigoe() { return this.caracterizacionPlantasNacionalForm.get('codigoe'); }
  get input_nacion() { return this.caracterizacionPlantasNacionalForm.get('nacion'); }
  get input_nombren() { return this.caracterizacionPlantasNacionalForm.get('nombren'); }
  get input_nomcomunn() { return this.caracterizacionPlantasNacionalForm.get('nomcomunn'); }
  //taxonomía
  get input_comsubespn() { return this.caracterizacionPlantasNacionalForm.get('comsubespn'); }
  get input_taxasimiln() { return this.caracterizacionPlantasNacionalForm.get('taxasimiln'); }
  get input_comidentn() { return this.caracterizacionPlantasNacionalForm.get('comidentn'); }
  get input_comtaxn() { return this.caracterizacionPlantasNacionalForm.get('comtaxn'); }
  //status
  get input_rangog() { return this.caracterizacionPlantasNacionalForm.get('rangog'); }
  get input_rangon() { return this.caracterizacionPlantasNacionalForm.get('rangon'); }
  get input_aepeu() { return this.caracterizacionPlantasNacionalForm.get('aepeu'); }
  get input_cites() { return this.caracterizacionPlantasNacionalForm.get('cites'); }
  get input_uicn() { return this.caracterizacionPlantasNacionalForm.get('uicn'); }
  get input_rastreolen() { return this.caracterizacionPlantasNacionalForm.get('rastreolen'); }
  get input_protnacion() { return this.caracterizacionPlantasNacionalForm.get('protnacion'); }
  get input_malezan() { return this.caracterizacionPlantasNacionalForm.get('malezan'); }
  get input_clasifinstn() { return this.caracterizacionPlantasNacionalForm.get('clasifinstn'); }
  get input_comstatn() { return this.caracterizacionPlantasNacionalForm.get('comstatn'); }
  //inventario
  get input_priinventn() { return this.caracterizacionPlantasNacionalForm.get('priinventn'); }
  get input_necinventn() { return this.caracterizacionPlantasNacionalForm.get('necinventn'); }
  get input_cominventn() { return this.caracterizacionPlantasNacionalForm.get('cominventn'); }
  get input_respropn() { return this.caracterizacionPlantasNacionalForm.get('respropn'); }
  //páginga 2
  //distribución
  get input_elevminn() { return this.caracterizacionPlantasNacionalForm.get('elevminn'); }
  get input_elevmaxn() { return this.caracterizacionPlantasNacionalForm.get('elevmaxn'); }
  get input_disyuntn() { return this.caracterizacionPlantasNacionalForm.get('disyuntn'); }
  get input_periferican() { return this.caracterizacionPlantasNacionalForm.get('periferican'); }
  get input_comdistn() { return this.caracterizacionPlantasNacionalForm.get('comdistn'); }
  //habitat
  get input_marinon() { return this.caracterizacionPlantasNacionalForm.get('marinon'); }
  get input_estuarinon() { return this.caracterizacionPlantasNacionalForm.get('estuarinon'); }
  get input_fluvialn() { return this.caracterizacionPlantasNacionalForm.get('fluvialn'); }
  get input_lacustren() { return this.caracterizacionPlantasNacionalForm.get('lacustren'); }
  get input_palustren() { return this.caracterizacionPlantasNacionalForm.get('palustren'); }
  get input_terrestren() { return this.caracterizacionPlantasNacionalForm.get('terrestren'); }
  get input_comhabn() { return this.caracterizacionPlantasNacionalForm.get('comhabn'); }
  //ecologia
  get input_comecoln() { return this.caracterizacionPlantasNacionalForm.get('comecoln'); }
  /*** páginga 3
       fenelogía
       1 línea   lo mejor aqui seria una matriz 6 x 16 ***/
  get input_nenea1() { return this.caracterizacionPlantasNacionalForm.get('nenea1'); }
  get input_nenea2() { return this.caracterizacionPlantasNacionalForm.get('nenea2'); }
  get input_nenea3() { return this.caracterizacionPlantasNacionalForm.get('nenea3'); }
  get input_nenea4() { return this.caracterizacionPlantasNacionalForm.get('nenea4'); }

  get input_nmara1() { return this.caracterizacionPlantasNacionalForm.get('nmara1'); }
  get input_nmara2() { return this.caracterizacionPlantasNacionalForm.get('nmara2'); }
  get input_nmara3() { return this.caracterizacionPlantasNacionalForm.get('nmara3'); }
  get input_nmara4() { return this.caracterizacionPlantasNacionalForm.get('nmara4'); }

  get input_nmaya1() { return this.caracterizacionPlantasNacionalForm.get('nmaya1'); }
  get input_nmaya2() { return this.caracterizacionPlantasNacionalForm.get('nmaya2'); }
  get input_nmaya3() { return this.caracterizacionPlantasNacionalForm.get('nmaya3'); }
  get input_nmaya4() { return this.caracterizacionPlantasNacionalForm.get('nmaya4'); }

  get input_njula1() { return this.caracterizacionPlantasNacionalForm.get('njula1'); }
  get input_njula2() { return this.caracterizacionPlantasNacionalForm.get('njula2'); }
  get input_njula3() { return this.caracterizacionPlantasNacionalForm.get('njula3'); }
  get input_njula4() { return this.caracterizacionPlantasNacionalForm.get('njula4'); }

  get input_nseta1() { return this.caracterizacionPlantasNacionalForm.get('nseta1'); }
  get input_nseta2() { return this.caracterizacionPlantasNacionalForm.get('nseta2'); }
  get input_nseta3() { return this.caracterizacionPlantasNacionalForm.get('nseta3'); }
  get input_nseta4() { return this.caracterizacionPlantasNacionalForm.get('nseta4'); }

  get input_nnova1() { return this.caracterizacionPlantasNacionalForm.get('nnova1'); }
  get input_nnova2() { return this.caracterizacionPlantasNacionalForm.get('nnova2'); }
  get input_nnova3() { return this.caracterizacionPlantasNacionalForm.get('nnova3'); }
  get input_nnova4() { return this.caracterizacionPlantasNacionalForm.get('nnova4'); }

  //2 línea
  get input_neneb1() { return this.caracterizacionPlantasNacionalForm.get('neneb1'); }
  get input_neneb2() { return this.caracterizacionPlantasNacionalForm.get('neneb2'); }
  get input_neneb3() { return this.caracterizacionPlantasNacionalForm.get('neneb3'); }
  get input_neneb4() { return this.caracterizacionPlantasNacionalForm.get('neneb4'); }

  get input_nmarb1() { return this.caracterizacionPlantasNacionalForm.get('nmarb1'); }
  get input_nmarb2() { return this.caracterizacionPlantasNacionalForm.get('nmarb2'); }
  get input_nmarb3() { return this.caracterizacionPlantasNacionalForm.get('nmarb3'); }
  get input_nmarb4() { return this.caracterizacionPlantasNacionalForm.get('nmarb4'); }

  get input_nmayb1() { return this.caracterizacionPlantasNacionalForm.get('nmayb1'); }
  get input_nmayb2() { return this.caracterizacionPlantasNacionalForm.get('nmayb2'); }
  get input_nmayb3() { return this.caracterizacionPlantasNacionalForm.get('nmayb3'); }
  get input_nmayb4() { return this.caracterizacionPlantasNacionalForm.get('nmayb4'); }

  get input_njulb1() { return this.caracterizacionPlantasNacionalForm.get('njulb1'); }
  get input_njulb2() { return this.caracterizacionPlantasNacionalForm.get('njulb2'); }
  get input_njulb3() { return this.caracterizacionPlantasNacionalForm.get('njulb3'); }
  get input_njulb4() { return this.caracterizacionPlantasNacionalForm.get('njulb4'); }

  get input_nsetb1() { return this.caracterizacionPlantasNacionalForm.get('nsetb1'); }
  get input_nsetb2() { return this.caracterizacionPlantasNacionalForm.get('nsetb2'); }
  get input_nsetb3() { return this.caracterizacionPlantasNacionalForm.get('nsetb3'); }
  get input_nsetb4() { return this.caracterizacionPlantasNacionalForm.get('nsetb4'); }

  get input_nnovb1() { return this.caracterizacionPlantasNacionalForm.get('nnovb1'); }
  get input_nnovb2() { return this.caracterizacionPlantasNacionalForm.get('nnovb2'); }
  get input_nnovb3() { return this.caracterizacionPlantasNacionalForm.get('nnovb3'); }
  get input_nnovb4() { return this.caracterizacionPlantasNacionalForm.get('nnovb4'); }

  //3 línea
  get input_nfeba1() { return this.caracterizacionPlantasNacionalForm.get('nfeba1'); }
  get input_nfeba2() { return this.caracterizacionPlantasNacionalForm.get('nfeba2'); }
  get input_nfeba3() { return this.caracterizacionPlantasNacionalForm.get('nfeba3'); }
  get input_nfeba4() { return this.caracterizacionPlantasNacionalForm.get('nfeba4'); }

  get input_nabra1() { return this.caracterizacionPlantasNacionalForm.get('nabra1'); }
  get input_nabra2() { return this.caracterizacionPlantasNacionalForm.get('nabra2'); }
  get input_nabra3() { return this.caracterizacionPlantasNacionalForm.get('nabra3'); }
  get input_nabra4() { return this.caracterizacionPlantasNacionalForm.get('nabra4'); }

  get input_njuna1() { return this.caracterizacionPlantasNacionalForm.get('njuna1'); }
  get input_njuna2() { return this.caracterizacionPlantasNacionalForm.get('njuna2'); }
  get input_njuna3() { return this.caracterizacionPlantasNacionalForm.get('njuna3'); }
  get input_njuna4() { return this.caracterizacionPlantasNacionalForm.get('njuna4'); }

  get input_nagoa1() { return this.caracterizacionPlantasNacionalForm.get('nagoa1'); }
  get input_nagoa2() { return this.caracterizacionPlantasNacionalForm.get('nagoa2'); }
  get input_nagoa3() { return this.caracterizacionPlantasNacionalForm.get('nagoa3'); }
  get input_nagoa4() { return this.caracterizacionPlantasNacionalForm.get('nagoa4'); }

  get input_nocta1() { return this.caracterizacionPlantasNacionalForm.get('nocta1'); }
  get input_nocta2() { return this.caracterizacionPlantasNacionalForm.get('nocta2'); }
  get input_nocta3() { return this.caracterizacionPlantasNacionalForm.get('nocta3'); }
  get input_nocta4() { return this.caracterizacionPlantasNacionalForm.get('nocta4'); }

  get input_ndica1() { return this.caracterizacionPlantasNacionalForm.get('ndica1'); }
  get input_ndica2() { return this.caracterizacionPlantasNacionalForm.get('ndica2'); }
  get input_ndica3() { return this.caracterizacionPlantasNacionalForm.get('ndica3'); }
  get input_ndica4() { return this.caracterizacionPlantasNacionalForm.get('ndica4'); }

  //4 línea
  get input_nfebb1() { return this.caracterizacionPlantasNacionalForm.get('nfebb1'); }
  get input_nfebb2() { return this.caracterizacionPlantasNacionalForm.get('nfebb2'); }
  get input_nfebb3() { return this.caracterizacionPlantasNacionalForm.get('nfebb3'); }
  get input_nfebb4() { return this.caracterizacionPlantasNacionalForm.get('nfebb4'); }

  get input_nabrb1() { return this.caracterizacionPlantasNacionalForm.get('nabrb1'); }
  get input_nabrb2() { return this.caracterizacionPlantasNacionalForm.get('nabrb2'); }
  get input_nabrb3() { return this.caracterizacionPlantasNacionalForm.get('nabrb3'); }
  get input_nabrb4() { return this.caracterizacionPlantasNacionalForm.get('nabrb4'); }

  get input_njunb1() { return this.caracterizacionPlantasNacionalForm.get('njunb1'); }
  get input_njunb2() { return this.caracterizacionPlantasNacionalForm.get('njunb2'); }
  get input_njunb3() { return this.caracterizacionPlantasNacionalForm.get('njunb3'); }
  get input_njunb4() { return this.caracterizacionPlantasNacionalForm.get('njunb4'); }

  get input_nagob1() { return this.caracterizacionPlantasNacionalForm.get('nagob1'); }
  get input_nagob2() { return this.caracterizacionPlantasNacionalForm.get('nagob2'); }
  get input_nagob3() { return this.caracterizacionPlantasNacionalForm.get('nagob3'); }
  get input_nagob4() { return this.caracterizacionPlantasNacionalForm.get('nagob4'); }

  get input_noctb1() { return this.caracterizacionPlantasNacionalForm.get('noctb1'); }
  get input_noctb2() { return this.caracterizacionPlantasNacionalForm.get('noctb2'); }
  get input_noctb3() { return this.caracterizacionPlantasNacionalForm.get('noctb3'); }
  get input_noctb4() { return this.caracterizacionPlantasNacionalForm.get('noctb4'); }

  get input_ndicb1() { return this.caracterizacionPlantasNacionalForm.get('ndicb1'); }
  get input_ndicb2() { return this.caracterizacionPlantasNacionalForm.get('ndicb2'); }
  get input_ndicb3() { return this.caracterizacionPlantasNacionalForm.get('ndicb3'); }
  get input_ndicb4() { return this.caracterizacionPlantasNacionalForm.get('ndicb4'); }

  get input_comfenoln() { return this.caracterizacionPlantasNacionalForm.get('comfenoln'); }

  //Reproducción
  get input_comrepn() { return this.caracterizacionPlantasNacionalForm.get('comrepn'); }

  //Manejo
  get input_commanejon() { return this.caracterizacionPlantasNacionalForm.get('commanejon'); }

  /*** Campos opcionales 
   *   Página 4 ***/
  get input_rcpnopc1() { return this.caracterizacionPlantasNacionalForm.get('rcpnopc1'); }
  get input_rcpnopc2() { return this.caracterizacionPlantasNacionalForm.get('rcpnopc2'); }
  get input_rcpnopc3() { return this.caracterizacionPlantasNacionalForm.get('rcpnopc3'); }
  get input_rcpnopc4() { return this.caracterizacionPlantasNacionalForm.get('rcpnopc4'); }
  get input_rcpnopc5() { return this.caracterizacionPlantasNacionalForm.get('rcpnopc5'); }

  //Mantenimiento del registro
  get input_codfuente() { return this.caracterizacionPlantasNacionalForm.get('codfuente'); }
  get input_cita() { return this.caracterizacionPlantasNacionalForm.get('cita'); }
  get input_transparen() { return this.caracterizacionPlantasNacionalForm.get('transparen'); }
  get input_refg() { return this.caracterizacionPlantasNacionalForm.get('refg'); }
  get input_refn() { return this.caracterizacionPlantasNacionalForm.get('refn'); }
  get input_edicionn() { return this.caracterizacionPlantasNacionalForm.get('edicionn'); }
  get input_autoredn() { return this.caracterizacionPlantasNacionalForm.get('autoredn'); }
  get input_actualizan() { return this.caracterizacionPlantasNacionalForm.get('actualizan'); }

}
function crearPlanta(k: Number, plantaId: Number, codigoe, nacion, nombren, nombrecomunn): planta_Dato {
  return {
    numero: k,
    plantaId: plantaId,
    codigoe: codigoe,
    nacion: nacion,
    nombren: nombren,
    nombrecomunn: nombrecomunn
  };
}