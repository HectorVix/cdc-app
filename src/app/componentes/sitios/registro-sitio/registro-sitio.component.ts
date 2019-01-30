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
//--------------tabla------------------------------------
import { MatPaginator, MatSort, MatTableDataSource, MatSelectModule, MatDialog } from '@angular/material';
import { sitio_Dato } from '../../../modelo/tabla/sitio-dato'

@Component({
  selector: 'app-registro-sitio',
  templateUrl: './registro-sitio.component.html',
  styleUrls: ['./registro-sitio.component.scss']
})
export class RegistroSitioComponent implements OnInit {
  data_macsitio = [];
  data_subdivision = [];
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

  constructor(private fb: FormBuilder,
    private sitioServicio: SitioService,
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
      this.data_macsitio.forEach(data_macsitio => {
        var macsitioBase = new macsitio_Modelo();
        macsitioBase.codmacsitio = data_macsitio.codmacsitio;
        macsitioBase.nommacsitio = data_macsitio.nommacsitio;
        macsitio.push(macsitioBase);
      });
      this.data_subdivision.forEach(data_subdivision => {
        var subdivisionBase = new subdivision_Modelo();
        subdivisionBase.codsubdiv = data_subdivision.codsubdiv;
        subdivisionBase.nomsubdiv = data_subdivision.nomsubdiv;
        subdivisionBase.nommapa = data_subdivision.nommapa;
        subdivisionBase.codmapa = data_subdivision.codmapa;
        subdivision.push(subdivisionBase);
      });
      sitioBase.macsitioList = macsitio;
      sitioBase.subdivisionList = subdivision;
      this.addSitio(sitioBase);
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