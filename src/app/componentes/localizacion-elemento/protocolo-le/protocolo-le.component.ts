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
  data_dispersion = [];
  settings_Protocolo = {
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

  constructor(private fb: FormBuilder,
    private localizacionServicio: LocalizacionService,
    private fechaServicio: FechaService,
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
    this.data_dispersion.forEach(data_dispersion => {
      var dispersionBase = new dispersion_Modelo();
      dispersionBase.le = data_dispersion.le;
      dispersionBase.nommapanummarg = data_dispersion.nommapanummarg;
      dispersionBase.prov = data_dispersion.prov;
      dispersionBase.direccion = data_dispersion.direccion;
      dispersionBase.ultobs = data_dispersion.ultobs;
      dispersionLista.push(dispersionBase);
    });

    protocoloLE_Base.dispersionList = dispersionLista;
    this.addProtocoloLocalizacionElemento(protocoloLE_Base);
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
          this.changeSuccessMessage(`Se registro la localización del elemento :${resProtocoloLE.codigoe}.`, 'success');
        }, err => {
          this.loading = false;
          this.changeSuccessMessage(`No se pudo regitrar el protocolo de localización del elemento. Comprueba que exista CODIGOE:${protocoloLE.codigoe}.`,
            'primary');
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
    console.log('buscar:', a, b, c);
    this.localizacionServicio.getProtocoloLE(a, b, c)
      .subscribe(
        data => {
          this.dataProtocoloLE = data;
          console.log(this.dataProtocoloLE);
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
      }
    });
    return base_protocoloLEBusqueda;
  }
  mostrar_ProtocoloLE_Busqueda(row: protocoloLE_Dato) {
    console.log('protocoloId:', row.protocoloId);
    this.crearForm_ProtocoloLe(this.getProtocoloLE_id(row.protocoloId));
    this.tabPagina1();
    this.editar = false;
    this.guardar = true;
  }
  tabPagina1() {
    this.selected.setValue(0);
  }
  updatePrtocoloLE(protocoloLE: protocolo_LE_Modelo): void {
    this.loading = true;

    this.localizacionServicio.updateProtocoloLE(protocoloLE)
      .subscribe(
        resPrtocoLE => {
          this.loading = false;
          this.changeSuccessMessage(`Editado exitoso, código del elemento:${resPrtocoLE.codigoe}.`, 'success');
          this.lista_ProtocoloLE = new Array();
          this.dataSource = new MatTableDataSource(this.lista_ProtocoloLE);
        }, err => {
          this.loading = false;
          this.changeSuccessMessage('Error no se pudo editar, el código del elemento debe ser valido', 'primary');
        });
  }
  editarProtocoloLE() {
    if (this.protocoloLeForm.get('codigoe').value)
      this.updatePrtocoloLE(this.setProtocoloLE(this.protocoloLeForm.value));
    else
      this.changeSuccessMessage('El código del elemento  es obligatorio para editar.', 'warning');
  }
  nuevo() {
    this.editar = true;
    this.guardar = false;
    this.crearForm_ProtocoloLe(new protocolo_LE_Modelo());
    this.crearForm_Buscar();
    this.tabPagina1();
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