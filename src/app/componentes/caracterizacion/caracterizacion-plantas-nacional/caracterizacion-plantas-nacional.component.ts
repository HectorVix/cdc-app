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

//--------------tabla------------------------------------
import { planta_FormGroup } from '../../../modelo/formGroup/planta';
import { MatPaginator, MatSort, MatTableDataSource, MatSelectModule, MatDialog } from '@angular/material';
import { planta_Dato } from '../../../modelo/tabla/planta-dato'

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

  data_distribucion = [];
  data_distribucion2 = [];
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
  constructor(private fb: FormBuilder,
    private caracterizacionServicio: CaracterizacionService,
    private fechaServicio: FechaService,
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

    this.data_distribucion.forEach(data_distribucion1 => {
      var distribucionBase = new distribucion_Modelo();
      distribucionBase.codsubnac = data_distribucion1.codsubnac;
      distribucionBase.nomsubnac = data_distribucion1.nomsubnac;
      distribucionBase.statsubnac = data_distribucion1.statsubnac;
      distribucion.push(distribucionBase);
    });

    this.data_distribucion2.forEach(data_distribucion2 => {
      var distribucionBase2 = new distribucion2_Modelo();
      distribucionBase2.codecoregn = data_distribucion2.codecoregn;
      distribucionBase2.statecoregn = data_distribucion2.statecoregn;
      distribucionBase2.codcuencan = data_distribucion2.codcuencan;
      distribucionBase2.statcuencan = data_distribucion2.statcuencan;
      distribucion2.push(distribucionBase2);
    });
    plantaBase.distribucionList = distribucion;
    plantaBase.distribucion2List = distribucion2;
    planta.push(plantaBase);
    cplanta.plantaList = planta;
    this.addCaracterizacionPlanta(cplanta);
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
  }
  updatePlanta(planta: planta_Modelo): void {
    this.loading = true;
    this.caracterizacionServicio.updatePlanta(planta)
      .subscribe(
        resPlanta => {
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
    this.data_distribucion = [];
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