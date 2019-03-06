import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ConfirmacionComponent } from '../../../componentes/dialogo/confirmacion/confirmacion.component';
import { LocalizacionService } from '../../../servicios/localizacion/localizacion.service';
import { FechaService } from '../../../servicios/fecha/fecha.service';
// import { DatePipe } from '@angular/common'
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { protocolo_LE_Modelo } from '../../../modelo/localizacion/protocolo-le-modelo';
import { dispersion_Modelo } from '../../../modelo/localizacion/dispersion-modelo';
//--------------tabla------------------------------------
import { protocolo_LE_FormGroup } from '../../../modelo/formGroup/protocoloLE';
import { MatPaginator, MatSort, MatTableDataSource, MatSelectModule, MatDialog } from '@angular/material';
import { protocoloLE_Dato } from '../../../modelo/tabla/protocoloLE-dato';
import { LocalDataSource } from 'ng2-smart-table';
import { ElementoService } from '../../../servicios/elemento/elemento.service';

@Component({
  selector: 'app-protocolo-le',
  templateUrl: './protocolo-le.component.html',
  styleUrls: ['./protocolo-le.component.scss']
})
export class ProtocoloLeComponent implements OnInit {
  protocoloLeForm: FormGroup;
  buscar_Form: FormGroup;
  private _success = new Subject<string>();
  staticAlertClosed = false;
  successMessage: string;
  tipoAlert: string;
  loading: boolean;
  data_dispersion_DataSource: LocalDataSource = new LocalDataSource();
  settings_Protocolo = {
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
      le: {
        title: 'LE'
      },
      nommapanummarg: {
        title: 'MAPA'
      },
      prov: {
        title: 'PROV'
      },
      direccion: {
        title: 'DIRECCION'
      },
      ultobs: {
        title: 'ULTOBS'
      }

    }
  };
  //---------------------------------tabla
  displayedColumns: string[] = ['numero', 'codigoe', 'nombre', 'nomcomun'];
  dataSource: MatTableDataSource<protocoloLE_Dato>;
  lista_ProtocoloLE: Array<protocoloLE_Dato> = new Array();
  dataProtocoloLE: any;
  private paginator: MatPaginator;
  @ViewChild(MatPaginator) set matPaginator(mp: MatPaginator) {
    this.paginator = mp;
    this.setDataSourceAttributes();
  }
  @ViewChild(MatSort) sort: MatSort;
  //------------------------------------------
  editar = true;
  guardar = false;
  selected = new FormControl(0);
  elementoId: Number;
  elemento_Aux: any;

  constructor(private fb: FormBuilder,
    private localizacionServicio: LocalizacionService,
    private fechaServicio: FechaService,
    private elementoServicio: ElementoService,
    private dialog: MatDialog) {
    this.crearForm_ProtocoloLe(new protocolo_LE_Modelo);
    this.crearForm_Buscar();
    this.dataSource = new MatTableDataSource(this.lista_ProtocoloLE);
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
  crearForm_ProtocoloLe(row: protocolo_LE_Modelo) {
    this.protocoloLeForm = new protocolo_LE_FormGroup().getProtocolo_LE_FormGrup(row);
  }
  guardarProtocolo() {
    var protocoloLE_Base = this.setProtocoloLE(this.protocoloLeForm.value);
    var dispersionLista: Array<dispersion_Modelo> = new Array();
    this.data_dispersion_DataSource.getAll().then(value => {
      value.forEach(elemento => {
        var dispersionBase = new dispersion_Modelo();
        dispersionBase.le = elemento.le;
        dispersionBase.nommapanummarg = elemento.nommapanummarg;
        dispersionBase.prov = elemento.prov;
        dispersionBase.direccion = elemento.direccion;
        dispersionBase.ultobs = elemento.ultobs;
        dispersionLista.push(dispersionBase);
      });
      protocoloLE_Base.dispersionList = dispersionLista;
      this.addProtocoloLocalizacionElemento(protocoloLE_Base);
    });
  }
  setProtocoloLE(protocoloLe): protocolo_LE_Modelo {
    protocoloLe.fecha = this.fechaServicio.toFormatoDateTime(protocoloLe.fecha);
    return protocoloLe;
  }
  //agrega un nuevo registro localización elemento
  addProtocoloLocalizacionElemento(protocoloLE: protocolo_LE_Modelo): void {
    this.loading = true;
    this.localizacionServicio.addProtocoloLE(protocoloLE)
      .subscribe(
        resProtocoloLE => {
          this.loading = false;
          this.changeSuccessMessage(`Se registro el protocolo localización del elemento :${resProtocoloLE.codigoe}.`, 'success');
        }, err => {
          this.loading = false;
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
  openDialogo(): void {
    const dialogRef = this.dialog.open(ConfirmacionComponent, {
      width: '250px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result)
        this.guardarProtocolo();
    });
  }
  openDialogoEditar(): void {
    const dialogRef = this.dialog.open(ConfirmacionComponent, {
      width: '250px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result)
        this.editarProtocoloLE();
    });
  }
  crearForm_Buscar() {
    this.buscar_Form = this.fb.group({
      'codigoe': '',
      'nombre': '',
      'nomcomun': ''
    });
  }
  buscarProtocolo_LE() {
    this.lista_ProtocoloLE = new Array();
    this.dataSource = new MatTableDataSource(this.lista_ProtocoloLE);
    this.loading = true;
    var a = "¬";
    var b = "¬";
    var c = "¬";
    if (this.buscar_Form.get('codigoe').value)
      a = this.buscar_Form.get('codigoe').value;
    if (this.buscar_Form.get('nombre').value)
      b = this.buscar_Form.get('nombre').value;
    if (this.buscar_Form.get('nomcomun').value)
      c = this.buscar_Form.get('nomcomun').value;
    this.localizacionServicio.getProtocoloLE(a, b, c)
      .subscribe(
        data => {
          this.dataProtocoloLE = data;
          var k = 0;
          for (let val of this.dataProtocoloLE) {
            k = k + 1;
            this.lista_ProtocoloLE.push(crearProtocoloLE(k,
              val.protocoloId,
              val.codigoe,
              val.nombre,
              val.nomcomun));
          }
          this.dataSource = new MatTableDataSource(this.lista_ProtocoloLE);
          this.loading = false;
        }, err => {
          this.loading = false;
          this.changeSuccessMessage('No se encontro información.', 'warning');
        });
  }
  getProtocoloLE_id(id: Number): protocolo_LE_Modelo {
    var base_protocoloLEBusqueda = new protocolo_LE_Modelo();
    this.dataProtocoloLE.forEach(dataProtocoloLE => {
      var protocoloLEBusqueda: protocolo_LE_Modelo = dataProtocoloLE;
      if (id == protocoloLEBusqueda.protocoloId) {
        base_protocoloLEBusqueda = protocoloLEBusqueda;
        this.elemento_Aux = base_protocoloLEBusqueda;
        this.elementoId = this.elemento_Aux.elementoelementoid.elementoId;
        this.editar = false;
      }
    });
    return base_protocoloLEBusqueda;
  }
  mostrar_ProtocoloLE_Busqueda(row: protocoloLE_Dato) {
    this.crearForm_ProtocoloLe(this.getProtocoloLE_id(row.protocoloId));
    this.tabPagina1();
    this.guardar = true;
    this.getDispersion(row.protocoloId);
  }
  tabPagina1() {
    this.selected.setValue(0);
  }
  updatePrtocoloLE(protocoloLE: protocolo_LE_Modelo): void {
    this.loading = true;

    this.localizacionServicio.updateProtocoloLE(protocoloLE, this.elementoId)
      .subscribe(
        resPrtocoLE => {
          this.loading = false;
          this.changeSuccessMessage(`Editado exitoso, código del elemento:${resPrtocoLE.codigoe}.`, 'success');
          this.lista_ProtocoloLE = new Array();
          this.dataSource = new MatTableDataSource(this.lista_ProtocoloLE);
        }, err => {
          this.loading = false;
          this.changeSuccessMessage('Error no se pudo editar, comprueba que esté disponible el servicio.', 'primary');
        });
  }
  editarProtocoloLE() {
    if (this.protocoloLeForm.get('codigoe').value)
      this.updatePrtocoloLE(this.setProtocoloLE(this.protocoloLeForm.value));
  }
  nuevo() {
    this.editar = true;
    this.guardar = false;
    this.crearForm_ProtocoloLe(new protocolo_LE_Modelo());
    this.crearForm_Buscar();
    this.tabPagina1();
    this.data_dispersion_DataSource = new LocalDataSource();
    this.lista_ProtocoloLE = new Array();
    this.dataSource = new MatTableDataSource(this.lista_ProtocoloLE);
  }
  resDispersionLista: any;
  getDispersion(protocoloId: Number) {
    this.data_dispersion_DataSource = new LocalDataSource();
    this.localizacionServicio.getDispersion(protocoloId)
      .subscribe(
        resDispersion => {
          this.resDispersionLista = resDispersion;
          for (let valDispersion of this.resDispersionLista) {
            var dispersionBase = new dispersion_Modelo();
            dispersionBase = valDispersion;
            this.data_dispersion_DataSource.add(dispersionBase);
            this.data_dispersion_DataSource.refresh();
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
      var dispersion = new dispersion_Modelo();
      dispersion.le = event.newData.le;
      dispersion.nommapanummarg = event.newData.nommapanummarg;
      dispersion.prov = event.newData.prov;
      dispersion.direccion = event.newData.direccion;
      dispersion.ultobs = event.newData.ultobs;
      dispersion.dispersionId = event.newData.dispersionId;
      this.localizacionServicio.addDispersion(dispersion, this.protocoloLeForm.get('protocoloId').value)
        .subscribe(
          resProteccion => {
            event.confirm.resolve(event.newData);
            this.getDispersion(this.protocoloLeForm.get('protocoloId').value);
          }, err => {
          });
    }
  }

  onUpdateConfirm(event): void {
    if (this.editar) { //nuevo
      event.confirm.resolve(event.newData);
    }
    else { //editar uno existente
      var dispersion = new dispersion_Modelo();
      dispersion.le = event.newData.le;
      dispersion.nommapanummarg = event.newData.nommapanummarg;
      dispersion.prov = event.newData.prov;
      dispersion.direccion = event.newData.direccion;
      dispersion.ultobs = event.newData.ultobs;
      dispersion.dispersionId = event.newData.dispersionId;
      this.localizacionServicio.updateDispersion(this.protocoloLeForm.get('protocoloId').value, dispersion)
        .subscribe(
          resDispersion => {
            event.confirm.resolve(event.newData);
            this.getDispersion(this.protocoloLeForm.get('protocoloId').value);
          }, err => {
          });

    }
  }
  onDeleteConfirm(event): void {
    if (window.confirm('¿Estás seguro de querer borrar?')) {
      if (this.editar) { //nuevo
        event.confirm.resolve(event.newData);
      } else { //editar uno existente
        this.localizacionServicio.deleteDispersion(event.data.dispersionId)
          .subscribe(
            resDispersion => {
              event.confirm.resolve(event.newData);
              this.getDispersion(this.protocoloLeForm.get('protocoloId').value);
            }, err => {
            });
      }

    } else {
      event.confirm.reject();
    }
  }
  validarCodigoe() {
    this.elementoServicio.validarElementoCodigoe(this.protocoloLeForm.get('codigoe').value)
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
}
function crearProtocoloLE(k: Number, protocoloId: Number, codigoe, nombre, nomcomun): protocoloLE_Dato {
  return {
    numero: k,
    protocoloId: protocoloId,
    codigoe: codigoe,
    nombre: nombre,
    nomcomun: nomcomun
  };
}