import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { criterio_Sitio } from '../../../modelo/select/overview-sitio';
import { debounceTime } from 'rxjs/operators';
import { SitioService } from '../../../servicios/sitio/sitio.service';
import { FechaService } from '../../../servicios/fecha/fecha.service';
import { sitio_Modelo } from '../../../modelo/sitio/sitio-modelo';
import { respuesta_cdc_Modelo } from '../../../modelo/respuestaServicio/respuesta-cdc';
import { macsitio_Modelo } from '../../../modelo/sitio/macsitio-modelo';
import { subdivision_Modelo } from '../../../modelo/sitio/subdivision-modelo';
import { ConfirmacionComponent } from '../../../componentes/dialogo/confirmacion/confirmacion.component';
import { sitio_FormGroup } from '../../../modelo/formGroup/sitio';
import { MatPaginator, MatSort, MatTableDataSource, MatSelectModule, MatDialog } from '@angular/material';
import { sitio_Dato } from '../../../modelo/tabla/sitio-dato';
import { LocalDataSource } from 'ng2-smart-table';
import { GaleriaComponent } from '../../../componentes/galeria/galeria.component';
import { foto_Modelo } from '../../../modelo/fotoDatos/foto-datos';
import { GaleriaService } from '../../../servicios/galeria/galeria.service';

@Component({
  selector: 'app-registro-sitio',
  templateUrl: './registro-sitio.component.html',
  styleUrls: ['./registro-sitio.component.scss']
})
export class RegistroSitioComponent implements OnInit {
  data_macsitio_DataSource: LocalDataSource = new LocalDataSource();
  data_subdivision_DataSource: LocalDataSource = new LocalDataSource();
  sitioForm: FormGroup;   //formulario de sitio
  buscarForm: FormGroup;   //formulario de sitio
  criterio_Sitio = new criterio_Sitio();
  criterio_mapasitio = this.criterio_Sitio.mapasitio;
  criterio_rangoant = this.criterio_Sitio.rangoant;
  criterio_impdivbiol = this.criterio_Sitio.impdivbiol;
  criterio_impnodivbiol = this.criterio_Sitio.impnodivbiol;
  criterio_urgencia = this.criterio_Sitio.urgencia;
  private _success = new Subject<string>();
  staticAlertClosed = false;
  successMessage: string;
  tipoAlert: string;
  loading: boolean;
  settings_Identificadores_Sitio = {
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
      codmacsitio: {
        title: 'CODMACSITIO'
      },
      nommacsitio: {
        title: 'NOMMACSITIO'
      }
    }
  };
  settings_Localizadores_Sitio = {
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
      codsubdiv: {
        title: 'CODSUBDIV'
      },
      nomsubdiv: {
        title: 'NOMSUBDIV'
      },
      nommapa: {
        title: 'NOMMAPA'
      },
      codmapa: {
        title: 'CODMAPA'
      },
    }
  };
  selected = new FormControl(0);
  //---------------------------------tabla
  displayedColumns: string[] = ['numero', 'codigoSitio', 'nombreSitio', 'sinonimoSitio', 'nacion', 'depto'];
  dataSource: MatTableDataSource<sitio_Dato>;
  lista_Sitio: Array<sitio_Dato> = new Array();
  dataSitio: any;
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
    private sitioServicio: SitioService,
    private galeriaServicio: GaleriaService,
    private fechaServicio: FechaService,
    private dialog: MatDialog) {
    this.crearFormSitio(new sitio_Modelo());
    this.crearFormBuscar();
    this.dataSource = new MatTableDataSource(this.lista_Sitio);

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
  crearFormSitio(sitio: sitio_Modelo) {
    this.sitioForm = new sitio_FormGroup().getSitioFormGrup(sitio);
  }
  crearFormBuscar() {
    this.buscarForm = this.fb.group({
      'codigoSitio': '',
      'nombreSitio': '',
      'sinonimoSitio': '',
      'nacion': '',
      'depto': ''
    });
  }
  guardarSitio() {
    if (this.sitioForm.get('codsitio').value) {
      var sitioBase = this.setSitio(this.sitioForm.value);
      var macsitio: Array<macsitio_Modelo> = new Array();
      var subdivision: Array<subdivision_Modelo> = new Array();
      this.data_macsitio_DataSource.getAll().then(value => {
        value.forEach(elemento => {
          var macsitioBase = new macsitio_Modelo();
          macsitioBase.codmacsitio = elemento.codmacsitio;
          macsitioBase.nommacsitio = elemento.nommacsitio;
          macsitio.push(macsitioBase);
        });
        this.data_subdivision_DataSource.getAll().then(value => {
          value.forEach(elemento => {
            var subdivisionBase = new subdivision_Modelo();
            subdivisionBase.codsubdiv = elemento.codsubdiv;
            subdivisionBase.nomsubdiv = elemento.nomsubdiv;
            subdivisionBase.nommapa = elemento.nommapa;
            subdivisionBase.codmapa = elemento.codmapa;
            subdivision.push(subdivisionBase);
          });
          sitioBase.macsitioList = macsitio;
          sitioBase.subdivisionList = subdivision;
          this.addSitio(sitioBase);
        });
      });
    }
    else
      this.changeSuccessMessage('No se pudo regitrar el Sitio. El codigo del sitio es obligatorio', 'warning');
  }
  setSitio(datos: sitio_Modelo): sitio_Modelo {
    datos.fechamapa = this.fechaServicio.toFormatoDateTime(this.sitioForm.get('fechamapa').value);
    datos.actualizar = this.fechaServicio.toFormatoDateTime(this.sitioForm.get('actualizar').value);
    return datos;
  }
  //agrega un nuevo registro de sitio 
  addSitio(sitio: sitio_Modelo): void {
    this.loading = true;
    this.sitioServicio.addSitio(sitio)
      .subscribe(
        resSitio => {
          if (this.galeria.archivos.size > 0) {
            var sitio_id = resSitio.sitioId;
            this.galeriaServicio.cargarFotos(this.galeria.archivos, this.galeria.datosFotografias, sitio_id, 2);
          }
          this.loading = false;
          this.changeSuccessMessage(`Se registro el sitio  :${resSitio.codsitio}.`, 'success');
        }, err => {
          this.loading = false;
          this.changeSuccessMessage('No se pudo regitrar el Sitio.', 'primary');
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
  openDialogo(): void {
    const dialogRef = this.dialog.open(ConfirmacionComponent, {
      width: '250px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result)
        this.guardarSitio();
    });
  }
  openDialogoEditar(): void {
    const dialogRef = this.dialog.open(ConfirmacionComponent, {
      width: '250px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result)
        this.editarSitio();
    });
  }
  editarSitio() {
    if (this.sitioForm.get('codsitio').value)
      this.updateSitio(this.setSitio(this.sitioForm.value));
    else
      this.changeSuccessMessage('El código de sitio es obligatorio para editar.', 'warning');
  }
  buscarSitio() {
    this.fotoId_Lista = [];
    this.tam_Inicial_ListaFotos = 0;
    this.lista_Sitio = new Array();
    this.loading = true;
    var a = "¬";
    var b = "¬";
    var c = "¬";
    var d = "¬";
    var e = "¬";
    if (this.buscarForm.get('codigoSitio').value)
      a = this.buscarForm.get('codigoSitio').value;
    if (this.buscarForm.get('nombreSitio').value)
      b = this.buscarForm.get('nombreSitio').value;
    if (this.buscarForm.get('sinonimoSitio').value)
      c = this.buscarForm.get('sinonimoSitio').value;
    if (this.buscarForm.get('nacion').value)
      d = this.buscarForm.get('nacion').value;
    if (this.buscarForm.get('depto').value)
      e = this.buscarForm.get('depto').value;
    this.sitioServicio.getSitios(a, b, c, d, e)
      .subscribe(
        data => {
          this.dataSitio = data;
          var k = 0;
          for (let val of this.dataSitio) {
            k = k + 1;
            this.lista_Sitio.push(crearSitio(k, val.sitioId, val.codsitio, val.nomsitio, val.sinsitio, val.nacion, val.subnacion));
          }
          this.dataSource = new MatTableDataSource(this.lista_Sitio);
          this.loading = false;
        }, err => {
          this.loading = false;
          this.changeSuccessMessage('No se encontro información.', 'warning');
        });
  }
  mostrar_Sito_Busqueda(row: sitio_Dato) {
    this.crearFormSitio(this.getSitio_id(row.sitioId));
    this.tabPagina1();
    this.editar = false;
    this.guardar = true;
    this.getMacsitio(this.sitioForm.get('sitioId').value);
    this.getSubdivision(this.sitioForm.get('sitioId').value);
    this.getFoto_Datos(row.sitioId);
  }
  getSitio_id(id: Number): sitio_Modelo {
    var base_sitioBusqueda = new sitio_Modelo();
    this.dataSitio.forEach(dataSitio => {
      var sitioBusqueda: sitio_Modelo = dataSitio;
      if (id == sitioBusqueda.sitioId) {
        base_sitioBusqueda = sitioBusqueda;
      }
    });
    return base_sitioBusqueda;
  }
  updateSitio(sitio: sitio_Modelo): void {
    this.loading = true;
    this.sitioServicio.updateSitio(sitio)
      .subscribe(
        resSitio => {
          this.galeriaServicio.update_FotoId_Lista(
            this.galeria.archivos,
            this.galeria.datosFotografias,
            sitio.sitioId,
            this.fotoId_Lista,
            this.tam_Inicial_ListaFotos,
            this.galeria.getTam_final_ListaFotos(), 2);
          this.loading = false;
          this.changeSuccessMessage(`Editado exitoso, código del sitio:${resSitio.codsitio}.`, 'success');
          this.lista_Sitio = new Array();
          this.dataSource = new MatTableDataSource(this.lista_Sitio);
        }, err => {
          this.loading = false;
          this.changeSuccessMessage('Error  no se pudo editar, el codigo sitio debe ser valido', 'primary');
        });
  }
  nuevo() {
    this.editar = true;
    this.guardar = false;
    this.crearFormSitio(new sitio_Modelo());
    this.crearFormBuscar();
    this.tabPagina1();
    this.data_macsitio_DataSource = new LocalDataSource();
    this.data_subdivision_DataSource = new LocalDataSource();
    this.fotoId_Lista = [];
    this.galeria.nuevo();
    this.tam_Inicial_ListaFotos = 0;
  }

  // --------------MACSITIO------------------
  resMacsitioLista: any;
  getMacsitio(sitioId: Number) {
    this.data_macsitio_DataSource = new LocalDataSource();
    this.sitioServicio.getMacsitio(sitioId)
      .subscribe(
        resMacsitio => {
          this.resMacsitioLista = resMacsitio;
          for (let valMacsitio of this.resMacsitioLista) {
            var macsitioBase = new macsitio_Modelo();
            macsitioBase = valMacsitio;
            this.data_macsitio_DataSource.add(macsitioBase);
            this.data_macsitio_DataSource.refresh();
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
      var macsitioBase = new macsitio_Modelo();
      macsitioBase.codmacsitio = event.newData.codmacsitio;
      macsitioBase.nommacsitio = event.newData.nommacsitio;
      macsitioBase.macsitioId = event.newData.macsitioId;
      this.sitioServicio.addMacsitio(this.sitioForm.get('sitioId').value, macsitioBase)
        .subscribe(
          resMacsitio => {
            event.confirm.resolve(event.newData);
            this.getMacsitio(this.sitioForm.get('sitioId').value);
          }, err => {
          });
    }
  }

  onUpdateConfirm(event): void {
    if (this.editar) { //nuevo
      event.confirm.resolve(event.newData);
    }
    else { //editar uno existente
      var macsitioBase = new macsitio_Modelo();
      macsitioBase.codmacsitio = event.newData.codmacsitio;
      macsitioBase.nommacsitio = event.newData.nommacsitio;
      macsitioBase.macsitioId = event.newData.macsitioId;
      this.sitioServicio.updateMacsitio(this.sitioForm.get('sitioId').value, macsitioBase)
        .subscribe(
          resMacsitio => {
            event.confirm.resolve(event.newData);
            this.getMacsitio(this.sitioForm.get('sitioId').value);
          }, err => {
          });
    }
  }
  onDeleteConfirm(event): void {
    if (window.confirm('¿Estás seguro de querer borrar el Macsitio?')) {
      if (this.editar) { //nuevo
        event.confirm.resolve(event.newData);
      } else { //editar uno existente
        this.sitioServicio.deleteMacsitio(event.data.macsitioId)
          .subscribe(
            resMacsitio => {
              event.confirm.resolve(event.newData);
              this.getMacsitio(this.sitioForm.get('sitioId').value);
            }, err => {
            });
      }
    } else {
      event.confirm.reject();
    }
  }
  // ----------------SUBDIVISON------------------
  resSubdivisionLista: any;
  getSubdivision(sitioId: Number) {
    this.data_subdivision_DataSource = new LocalDataSource();
    this.sitioServicio.getSubdivision(sitioId)
      .subscribe(
        resSubdivisio => {
          this.resSubdivisionLista = resSubdivisio;
          for (let valSubdivision of this.resSubdivisionLista) {
            var subdivisionBase = new subdivision_Modelo();
            subdivisionBase = valSubdivision;
            this.data_subdivision_DataSource.add(subdivisionBase);
            this.data_subdivision_DataSource.refresh();
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
      var subdivisionBase = new subdivision_Modelo();
      subdivisionBase.codsubdiv = event.newData.codsubdiv;
      subdivisionBase.nomsubdiv = event.newData.nomsubdiv;
      subdivisionBase.nommapa = event.newData.nommapa;
      subdivisionBase.codmapa = event.newData.codmapa;
      subdivisionBase.subdivisionId = event.newData.subdivisionId;
      this.sitioServicio.addSubdivision(this.sitioForm.get('sitioId').value, subdivisionBase)
        .subscribe(
          resMacsitio => {
            event.confirm.resolve(event.newData);
            this.getSubdivision(this.sitioForm.get('sitioId').value);
          }, err => {
          });
    }
  }

  onUpdateConfirm2(event): void {
    if (this.editar) { //nuevo
      event.confirm.resolve(event.newData);
    }
    else { //editar uno existente
      var subdivisionBase = new subdivision_Modelo();
      subdivisionBase.codsubdiv = event.newData.codsubdiv;
      subdivisionBase.nomsubdiv = event.newData.nomsubdiv;
      subdivisionBase.nommapa = event.newData.nommapa;
      subdivisionBase.codmapa = event.newData.codmapa;
      subdivisionBase.subdivisionId = event.newData.subdivisionId;
      this.sitioServicio.updateSubdivision(this.sitioForm.get('sitioId').value, subdivisionBase)
        .subscribe(
          resMacsitio => {
            event.confirm.resolve(event.newData);
            this.getSubdivision(this.sitioForm.get('sitioId').value);
          }, err => {
          });
    }
  }
  onDeleteConfirm2(event): void {
    if (window.confirm('¿Estás seguro de querer borrar la subdivisión?')) {
      if (this.editar) { //eliminar nuevo
        event.confirm.resolve(event.newData);
      } else { //eliminar uno existente
        this.sitioServicio.deleteSubdivision(event.data.subdivisionId)
          .subscribe(
            reSubdivision => {
              event.confirm.resolve(event.newData);
              this.getSubdivision(this.sitioForm.get('sitioId').value);
            }, err => {
            });
      }
    } else {
      event.confirm.reject();
    }
  }
  getFoto_Datos(sitioId: Number) {
    const date = new Date().valueOf();
    this.galeriaServicio.getDatosFotos(sitioId, 2).subscribe(
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
function crearSitio(k: Number, sitioId: Number, codigoSitio, nombreSitio, sinonimoSitio, nacion, depto): sitio_Dato {
  return {
    numero: k,
    sitioId: sitioId,
    codigoSitio: codigoSitio,
    nombreSitio: nombreSitio,
    sinonimoSitio: sinonimoSitio,
    nacion: nacion,
    depto: depto
  };
}