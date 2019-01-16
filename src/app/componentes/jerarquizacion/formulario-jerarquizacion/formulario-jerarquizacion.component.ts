import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common'
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { criterio_Jerarquizacion } from '../../../modelo/select/overview-jerarquia';
import { Jerarquizacion } from '../../../modelo/jerarquizacion/jerarquizacion-modelo';
import { JerarquizacionService } from '../../../servicios/jerarquizacion/jerarquizacion.service';
import { FechaService } from '../../../servicios/fecha/fecha.service';
import { ElementoService } from '../../../servicios/elemento/elemento.service';
import { elemento_Modelo } from '../../../modelo/jerarquizacion/elemento-modelo';
import { jerarquizacion_Nacional_Modelo } from '../../../modelo/jerarquizacion/jerarquizacion-nacional-modelo';
import { ConfirmacionComponent } from '../../../componentes/dialogo/confirmacion/confirmacion.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-formulario-jerarquizacion',
  templateUrl: './formulario-jerarquizacion.component.html',
  styleUrls: ['./formulario-jerarquizacion.component.scss']
})
export class FormularioJerarquizacionComponent implements OnInit {

  criterio_Jeraquizacion = new criterio_Jerarquizacion();
  criterio_nlestim = this.criterio_Jeraquizacion.lgn_lestim;
  criterio_nabund = this.criterio_Jeraquizacion.lgn_abund;
  criterio_ndist = this.criterio_Jeraquizacion.ln_dist;
  criterio_nleprot = this.criterio_Jeraquizacion.lgn_leprot;
  criterio_namenaz = this.criterio_Jeraquizacion.lgn_amenaz;
  criterio_rangon = this.criterio_Jeraquizacion.ln_rango;
  jerarquizacionForm: FormGroup;
  private _success = new Subject<string>();
  staticAlertClosed = false;
  successMessage: string;
  tipoAlert: string;
  loading: boolean;
  selected = new FormControl(0);
  constructor(private fb: FormBuilder,
    private jerarquizacionServicio: JerarquizacionService,
    private fechaServicio: FechaService,
    private elementoServicio: ElementoService,
    private dialog: MatDialog) {
    this.createFormJerarquizacionNacional();
  }

  ngOnInit() {
    setTimeout(() => this.staticAlertClosed = true, 20000);
    this._success.subscribe((message) => this.successMessage = message);
    this._success.pipe(
      debounceTime(5000)
    ).subscribe(() => this.successMessage = null);
  }
  createFormJerarquizacionNacional() {
    this.jerarquizacionForm = this.fb.group({
      //pagina1
      'codigoe': ['', Validators.required],
      'nombren': '',
      'nacion': '',
      'nloctip': '',
      'nlestim': '',
      'nlestimcom': '',
      'nabund': '',
      'nabundcom': '',
      'ndist': '',
      'ndistcom': '',
      'nleprot': '',
      'nleprotcom': '',
      'namenaz': '',
      'namenazcom': '',
      //pagina2
      'notroconsi': '',
      'rangon': '',
      'fecharn': '',
      'nranrzon': '',
      'nnecprotec': '',
      'nnecinvent': '',
      'nnecestudi': '',
      'nnecmaejo': '',
      'resrn': '',
      'edautor': '',
      'edicion': '',
      'actualizar': ''
    });
  }
  onSubmit() {
  }
  //guardar registro jerarquizacion nacional
  guardarRegistroJerarquiazacionNacional() {
    var jerarquizacionBase = new Jerarquizacion();
    var jerarquizacionNacional = new jerarquizacion_Nacional_Modelo();
    var nacionalList: Array<jerarquizacion_Nacional_Modelo> = new Array();
    jerarquizacionBase.codigoe = this.jerarquizacionForm.get('codigoe').value;
    jerarquizacionNacional = this.setDatosJerarquizacionNacional(this.jerarquizacionForm.value);
    nacionalList.push(jerarquizacionNacional);
    jerarquizacionBase.nacionalList = nacionalList;
    this.addJerarquizacionNacional(jerarquizacionBase)
  }
  //setear datos jerarquizacion nacional
  setDatosJerarquizacionNacional(datos: jerarquizacion_Nacional_Modelo): jerarquizacion_Nacional_Modelo {
    datos.fecharn = this.fechaServicio.toFormatoDateTime(this.jerarquizacionForm.get('fecharn').value);
    datos.edicion = this.fechaServicio.toFormatoDateTime(this.jerarquizacionForm.get('edicion').value);
    datos.actualizar = this.fechaServicio.toFormatoDateTime(this.jerarquizacionForm.get('actualizar').value);
    return datos;
  }
  //agrega un nuevo registro jerarquizacion global

  addJerarquizacionNacional(jerarquizacion: Jerarquizacion): void {
    this.loading = true;
    this.jerarquizacionServicio.addJerarquizacionNacional(jerarquizacion)
      .subscribe(
        resElemento => {
          this.loading = false;
          this.changeSuccessMessage(`Se registro la jerarquización nacional del elemento :${resElemento.codigoe}.`, 'success');
          this.createFormJerarquizacionNacional();
        }, err => {
          this.loading = false;
          this.changeSuccessMessage('No se pudo regitrar.', 'primary');
        });
  }
  //validar codigoe 
  validarCodigoe() {
    this.ValidarElementoCodigoe(this.jerarquizacionForm.get('codigoe').value);
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

  public changeSuccessMessage(mensaje: string, tipo: string) {
    this.tipoAlert = tipo;
    this._success.next(mensaje);
  }
  tabPagina2() {
    this.selected.setValue(1);
  }
  tabPagina1() {
    this.selected.setValue(0);
  }
  openDialogo(): void {
    const dialogRef = this.dialog.open(ConfirmacionComponent, {
      width: '250px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result)
        this.guardarRegistroJerarquiazacionNacional();
    });
  }
}
