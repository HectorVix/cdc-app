import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { caracterizacion_Modelo } from '../../../modelo/resumen/caracterizacion-modelo';
import { vertebrado_Modelo } from '../../../modelo/resumen/vertebrado-modelo';
import { distribucion_Modelo } from '../../../modelo/resumen/distribucion-modelo';
import { distribucion2_Modelo } from '../../../modelo/resumen/distribucion2-modelo';
import { ConfirmacionComponent } from '../../../componentes/dialogo/confirmacion/confirmacion.component';
import { CaracterizacionService } from '../../../servicios/caracterizacion/caracterizacion.service';
import { FechaService } from '../../../servicios/fecha/fecha.service';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
//--------------tabla------------------------------------
import { vertebrado_FormGroup } from '../../../modelo/formGroup/vertebrado';
import { MatPaginator, MatSort, MatTableDataSource, MatSelectModule, MatDialog } from '@angular/material';
import { vertebrado_Dato } from '../../../modelo/tabla/vertebrado-dato'

@Component({
  selector: 'app-caracterizacion-vertebrados-nacional',
  templateUrl: './caracterizacion-vertebrados-nacional.component.html',
  styleUrls: ['./caracterizacion-vertebrados-nacional.component.scss']
})
export class CaracterizacionVertebradosNacionalComponent implements OnInit {
  caracterizacionVertebradosNacionalForm: FormGroup;
  buscarForm: FormGroup;
  data_Distribucion1 = [];
  data_Distribucion2 = [];

  private _success = new Subject<string>();
  staticAlertClosed = false;
  successMessage: string;
  tipoAlert: string;
  loading: boolean;
  settings_Distribucion1 = {
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
  constructor(private fb: FormBuilder,
    private dialog: MatDialog,
    private caracterizacionServicio: CaracterizacionService,
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
    this.caracterizacionVertebradosNacionalForm = new vertebrado_FormGroup().getPVertebradoFormGrup(vertebrado);
  }
  guardar_Caracterizacion_Vertebrado() {
    var caracterizacion_Vertebrado = new caracterizacion_Modelo();
    var vertebradoLista: Array<vertebrado_Modelo> = new Array();
    var distribucion1: Array<distribucion_Modelo> = new Array();
    var distribucion2: Array<distribucion2_Modelo> = new Array();

    var vertebradoBase = this.setVertebrado(this.caracterizacionVertebradosNacionalForm.value);
    this.data_Distribucion1.forEach(data_distribucion1 => {
      var distribucionBase = new distribucion_Modelo();
      distribucionBase.codsubnac = data_distribucion1.codsubnac;
      distribucionBase.nomsubnac = data_distribucion1.nomsubnac;
      distribucionBase.statsubnac = data_distribucion1.statsubnac;
      distribucion1.push(distribucionBase);
    });

    this.data_Distribucion2.forEach(data_distribucion2 => {
      var distribucionBase2 = new distribucion2_Modelo();
      distribucionBase2.codecoregn = data_distribucion2.codecoregn;
      distribucionBase2.statecoregn = data_distribucion2.statecoregn;
      distribucionBase2.codcuencan = data_distribucion2.codcuencan;
      distribucionBase2.statcuencan = data_distribucion2.statcuencan;
      distribucion2.push(distribucionBase2);
    });
    vertebradoBase.distribucionList = distribucion1;
    vertebradoBase.distribucion2List = distribucion2;
    vertebradoLista.push(vertebradoBase);
    caracterizacion_Vertebrado.vertebradoList = vertebradoLista;
    this.addCaracterizacionVertebrado(caracterizacion_Vertebrado);
  }
  setVertebrado(datos: vertebrado_Modelo): vertebrado_Modelo {
    datos.fechaaepeu = this.fechaServicio.toFormatoDateTime(this.caracterizacionVertebradosNacionalForm.get('fechaaepeu').value);
    datos.ediciong = this.fechaServicio.toFormatoDateTime(this.caracterizacionVertebradosNacionalForm.get('ediciong').value);
    datos.actualizag = this.fechaServicio.toFormatoDateTime(this.caracterizacionVertebradosNacionalForm.get('actualizag').value);
    datos.edicionn = this.fechaServicio.toFormatoDateTime(this.caracterizacionVertebradosNacionalForm.get('edicionn').value);
    datos.actualizan = this.fechaServicio.toFormatoDateTime(this.caracterizacionVertebradosNacionalForm.get('actualizan').value);
    return datos;
  }
  //agrega un nuevo registro de caracterizacion de vertebrado nacional
  addCaracterizacionVertebrado(caracterizacion: caracterizacion_Modelo): void {
    this.loading = true;
    this.caracterizacionServicio.addCaracterizacionVertebrado(caracterizacion)
      .subscribe(
        resVertebrado => {
          this.loading = false;
          this.changeSuccessMessage(`Se registro la caracterizacion del vertebrado :${resVertebrado.codigoe}.`, 'success');
        }, err => {
          this.loading = false;
          this.changeSuccessMessage('No se pudo regitrar la caracterizacion del vertebrado. Comprueba que exista el elemento, verifica que el servidor este disponible , tiene que estar activo CORS Toggle',
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
  getVertebrado_id(id: Number): vertebrado_Modelo {
    var base_vertebradoBusqueda = new vertebrado_Modelo();
    this.dataVertebrado.forEach(dataVertebrado => {
      var vertebradoBusqueda: vertebrado_Modelo = dataVertebrado;
      if (id == vertebradoBusqueda.vertebradoId) {
        base_vertebradoBusqueda = vertebradoBusqueda;
      }
    });
    return base_vertebradoBusqueda;
  }
  mostrar_Vertebrado_Busqueda(row: vertebrado_Dato) {
    this.crearForm_caracterizacionVertebradosNacional(this.getVertebrado_id(row.vertebradoId));
    this.tabPagina1();
    this.editar = false;
    this.guardar = true;
  }
  updateVertebrado(vertebrado: vertebrado_Modelo): void {
    this.loading = true;
    this.caracterizacionServicio.updateVertebrado(vertebrado)
      .subscribe(
        resVertebrado => {
          this.loading = false;
          this.changeSuccessMessage(`Editado exitoso, código de la planta:${resVertebrado.codigoe}.`, 'success');
          this.lista_Vertebrado = new Array();
          this.dataSource = new MatTableDataSource(this.lista_Vertebrado);
        }, err => {
          this.loading = false;
          this.changeSuccessMessage('Error no se pudo editar, el codigo de la planta debe ser valido', 'primary');
        });
  }
  editarVertebrado() {
    if (this.caracterizacionVertebradosNacionalForm.get('codigoe').value)
      this.updateVertebrado(this.setVertebrado(this.caracterizacionVertebradosNacionalForm.value));
    else
      this.changeSuccessMessage('El código del vertebrado es obligatorio para editar.', 'warning');
  }
  nuevo() {
    this.editar = true;
    this.guardar = false;
    this.crearForm_caracterizacionVertebradosNacional(new vertebrado_Modelo());
    this.crearForm_Buscar();
    this.tabPagina1();
  }
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