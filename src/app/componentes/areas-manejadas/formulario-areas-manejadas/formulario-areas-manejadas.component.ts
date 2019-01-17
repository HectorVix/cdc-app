import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { criterio_areasManejadas } from '../../../modelo/select/overview-area';
import { AreaService } from '../../../servicios/area/area.service';
import { FechaService } from '../../../servicios/fecha/fecha.service';
import { debounceTime } from 'rxjs/operators';
import { area_Modelo } from '../../../modelo/area/area-modelo';
import { listaElemento_Modelo } from '../../../modelo/area/listaElemento-modelo';
import { ConfirmacionComponent } from '../../../componentes/dialogo/confirmacion/confirmacion.component';
import { MatDialog } from '@angular/material';
@Component({
  selector: 'app-formulario-areas-manejadas',
  templateUrl: './formulario-areas-manejadas.component.html',
  styleUrls: ['./formulario-areas-manejadas.component.scss']
})
export class FormularioAreasManejadasComponent implements OnInit {
  data_listaElemento = [];
  areaManejoForm: FormGroup;
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
  constructor(private fb: FormBuilder,
    private areaServicio: AreaService,
    private fechaServicio: FechaService,
    private dialog: MatDialog) {
    this.crear_areaManejoForm();
  }

  ngOnInit() {
    setTimeout(() => this.staticAlertClosed = true, 20000);
    this._success.subscribe((message) => this.successMessage = message);
    this._success.pipe(
      debounceTime(5000)
    ).subscribe(() => this.successMessage = null);
  }
  crear_areaManejoForm() {
    this.areaManejoForm = this.fb.group({
      //página1
      //identificadores
      'codigoam': ['', Validators.required],
      'nombream': '',
      'sinam': '',
      'ammayor': '',
      'coddueno': '',
      'codsitio': '',
      'nomsitio': '',
      //localizadores
      'nacion': '',
      'subnacion': '',
      'subdivision': '',
      'nommapa': '',
      'codmapa': '',
      'nummarg': '',
      'lat': '',
      'long1': '',
      'coords': '',
      'coordn': '',
      'coorde': '',
      'coordo': '',
      //decriptores
      'descripcion': '',
      'areatot1': '', //number
      'areatot2': '', //number
      'areasubnac1': '',//number
      'areasubnac2': '',//number
      'multisubnac': null, //boolean
      'limites': null,//boolean
      'continua': null,//boolean
      'involtnc': null, //boolean
      'comentario': '',
      //status
      'fechaesta': '',
      'protasign': '', //varchar(1)
      //manejo
      'administrador': '',
      'instadmin': '',
      'diradmin1': '',
      'diradmin2': '',
      'ciudadadmin': '',
      'subnacadmin': '',
      'codpostaladmin': '',
      'telefadminist': '',
      'accesopub': '', //varchar(1)
      'instcoop': '',
      'commanejo': '',
      //elementos
      // 'lista_elementos': '',// lista de codigoe,nombres, status y codfuente
      //campos opcionales
      'amopc1': '',
      'amopc2': '',
      'amopc3': '',
      'amopc4': '',
      'amopc5': '',
      //mantenimiento del registro
      'respdatos': '',
      'actualizar': ''
    });

  }
  guardarArea() {
    var areasManejadasBase = this.setAreasManejadas(this.areaManejoForm.value);
    var listaElemento: Array<listaElemento_Modelo> = new Array();

    this.data_listaElemento.forEach(data_listaElemento => {
      var listaElementoBase = new listaElemento_Modelo();
      listaElementoBase.codigoe = data_listaElemento.codigoe;
      listaElementoBase.nombres = data_listaElemento.nombres;
      listaElementoBase.status = data_listaElemento.status;
      listaElementoBase.codfuente = data_listaElemento.codfuente;
      listaElemento.push(listaElementoBase);
    });

    areasManejadasBase.listaElementoList = listaElemento;
    this.addArea(areasManejadasBase);

  }
  setAreasManejadas(datos: area_Modelo): area_Modelo {
    datos.fechaesta = this.fechaServicio.toFormato(this.areaManejoForm.get('fechaesta').value);
    datos.actualizar = this.fechaServicio.toFormato(this.areaManejoForm.get('actualizar').value);
    return datos;
  }
  //agrega una nueva area
  addArea(area: area_Modelo): void {
    this.loading = true;
    this.areaServicio.addArea(area)
      .subscribe(
        resElemento => {
          this.loading = false;
          this.changeSuccessMessage(`Se registro el area  :${resElemento.codigoam}.`, 'success');
        }, err => {
          this.loading = false;
          this.changeSuccessMessage('No se pudo regitrar el area.', 'primary');
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
  openDialogo(): void {
    const dialogRef = this.dialog.open(ConfirmacionComponent, {
      width: '250px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result)
        this.guardarArea();
    });
  }
}