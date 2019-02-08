import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
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
import { MatPaginator, MatSort, MatTableDataSource, MatSelectModule, MatDialog } from '@angular/material';
import { planta_Dato } from '../../../modelo/tabla/planta-dato';
import { GaleriaComponent } from '../../../componentes/galeria/galeria.component';
import { foto_Modelo } from '../../../modelo/fotoDatos/foto-datos';
import { GaleriaService } from '../../../servicios/galeria/galeria.service';

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
          this.changeSuccessMessage('No se pudo regitrar la caracterizacion de la planta.', 'primary');
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
      }
    });
    return base_plantaBusqueda;
  }
  mostrar_Planta_Busqueda(row: planta_Dato) {
    this.crearForm_CaracterizacionPlantasNacional(this.getPlanta_id(row.plantaId));
    this.tabPagina1();
    this.editar = false;
    this.guardar = true;
    this.getDistribucion1_Planta(this.caracterizacionPlantasNacionalForm.get('plantaId').value);
    this.getDistribucion2_Planta(this.caracterizacionPlantasNacionalForm.get('plantaId').value);
    this.getFoto_Datos(row.plantaId);
  }
  updatePlanta(planta: planta_Modelo): void {
    this.loading = true;
    this.caracterizacionServicio.updatePlanta(planta)
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
    if (this.caracterizacionPlantasNacionalForm.get('codigoe').value)
      this.updatePlanta(this.setPlanta(this.caracterizacionPlantasNacionalForm.value));
    else
      this.changeSuccessMessage('El código de la planta es obligatorio para editar.', 'warning');
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