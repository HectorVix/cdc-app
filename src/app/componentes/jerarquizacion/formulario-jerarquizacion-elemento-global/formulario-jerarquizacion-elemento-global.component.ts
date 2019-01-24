import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common'
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { criterio_Jerarquizacion } from '../../../modelo/select/overview-jerarquia';
import { jerarquizacion_Global_Modelo } from '../../../modelo/jerarquizacion/jerarquizacion-global-modelo';
import { Jerarquizacion } from '../../../modelo/jerarquizacion/jerarquizacion-modelo';
import { JerarquizacionService } from '../../../servicios/jerarquizacion/jerarquizacion.service';
import { FechaService } from '../../../servicios/fecha/fecha.service';
import { ElementoService } from '../../../servicios/elemento/elemento.service';
import { elemento_Modelo } from '../../../modelo/jerarquizacion/elemento-modelo';
import { ConfirmacionComponent } from '../../../componentes/dialogo/confirmacion/confirmacion.component';
//--------------tabla------------------------------------
import { jerarquizacion_Global_FormGroup } from '../../../modelo/formGroup/jerarquizacionGloblal';
import { MatPaginator, MatSort, MatTableDataSource, MatSelectModule, MatDialog } from '@angular/material';
//import { jerarquizacion_Global_Dato } from '../../../modelo/tabla/vertebrado-dato'

@Component({
  selector: 'app-formulario-jerarquizacion-elemento-global',
  templateUrl: './formulario-jerarquizacion-elemento-global.component.html',
  styleUrls: ['./formulario-jerarquizacion-elemento-global.component.scss']
})
export class FormularioJerarquizacionElementoGlobalComponent implements OnInit {
  criterio_Jeraquizacion = new criterio_Jerarquizacion();
  criterio_glestim = this.criterio_Jeraquizacion.lgn_lestim;
  criterio_gabund = this.criterio_Jeraquizacion.lgn_abund;
  criterio_gdist = this.criterio_Jeraquizacion.lg_dist;
  criterio_gleprot = this.criterio_Jeraquizacion.lgn_leprot;
  criterio_gamenaz = this.criterio_Jeraquizacion.lgn_amenaz;
  criterio_gfragil = this.criterio_Jeraquizacion.lg_fragil;
  criterio_rangog = this.criterio_Jeraquizacion.lg_rango;
  jerarquizacion_Global_Form: FormGroup;
  jerarquizacionModelo: Jerarquizacion;
  jerarquizacionGlobalModelo: jerarquizacion_Global_Modelo;
  date: { year: number, month: number };
  modelDate: NgbDateStruct;
  private _success = new Subject<string>();
  staticAlertClosed = false;
  successMessage: string;
  tipoAlert: string;
  loading: boolean;
  selected = new FormControl(0);
  constructor(private fb: FormBuilder, public datepipe: DatePipe,
    private jerarquizacionServicio: JerarquizacionService,
    private fechaServicio: FechaService,
    private elementoServicio: ElementoService,
    private dialog: MatDialog) {
    this.crear_Jerarquizacion_Global(new jerarquizacion_Global_Modelo);
  }

  ngOnInit() {
    setTimeout(() => this.staticAlertClosed = true, 20000);
    this._success.subscribe((message) => this.successMessage = message);
    this._success.pipe(
      debounceTime(5000)
    ).subscribe(() => this.successMessage = null);
  }
  onSubmit() {

  }
  guardarRegistroJerarquiazacionGlobal() {

    this.registrarJerarquizacionGlobal();
  }
  crear_Jerarquizacion_Global(jerarquizacionGlobal: jerarquizacion_Global_Modelo) {
    this.jerarquizacion_Global_Form =
      new jerarquizacion_Global_FormGroup().getJerarquizacion_Global_FormGrup(jerarquizacionGlobal);
  }
  //validar codigoe 
  validarCodigoe() {
    this.ValidarElementoCodigoe(this.jerarquizacion_Global_Form.get('codigoe').value);
  }
  //registro nuevo formulario jerarquizacion global
  registrarJerarquizacionGlobal() {
    console.log(this.jerarquizacion_Global_Form.value);
    this.jerarquizacionModelo = new Jerarquizacion();
    this.jerarquizacionGlobalModelo = new jerarquizacion_Global_Modelo();
    this.jerarquizacionModelo.codigoe = this.jerarquizacion_Global_Form.get('codigoe').value;
    var globalist: Array<jerarquizacion_Global_Modelo> = new Array();
    this.setDatosJerarquizacionGlobal(this.jerarquizacion_Global_Form.value);
    globalist.push(this.jerarquizacionGlobalModelo);
    this.jerarquizacionModelo.globalList = globalist;
    this.addJerarquizacionGlobal(this.jerarquizacionModelo);
  }
  setDatosJerarquizacionGlobal(datos: jerarquizacion_Global_Modelo) {
    datos.fecharg = this.fechaServicio.toFormatoDateTime(this.jerarquizacion_Global_Form.get('fecharg').value);
    datos.edicion = this.fechaServicio.toFormatoDateTime(this.jerarquizacion_Global_Form.get('edicion').value);
    datos.actualizar = this.fechaServicio.toFormatoDateTime(this.jerarquizacion_Global_Form.get('actualizar').value);
    this.jerarquizacionGlobalModelo = datos;
  }
  //agrega un nuevo registro jerarquizacion global
  addJerarquizacionGlobal(jerarquizacion: Jerarquizacion): void {
    this.loading = true;
    this.jerarquizacionServicio.addJerarquizacionGlobal(jerarquizacion)
      .subscribe(
        resElemento => {
          this.loading = false;
          this.changeSuccessMessage(`Si registro la jerarquización  del elemento:${resElemento.codigoe}.`, 'success');
        }, err => {
          this.loading = false;
          this.changeSuccessMessage('No se pudo regitrar.', 'primary');
        });
  }
  ValidarElementoCodigoe(codigoe: String): elemento_Modelo {
    var elemento: elemento_Modelo;
    this.elementoServicio.validarElementoCodigoe(codigoe)
      .subscribe(
        resElemento => {
          elemento = resElemento;
          console.log("validado elemento ok:" + resElemento.elementoId);
          this.changeSuccessMessage(`Si existe el elemento:${codigoe}.`, 'success');
        }, err => {
          this.changeSuccessMessage('No existe el elemento, por favor ingresa un codigo valido.', 'primary');
        });

    return elemento;
  }


  //mensajes
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
        this.guardarRegistroJerarquiazacionGlobal();
    });
  }
}
