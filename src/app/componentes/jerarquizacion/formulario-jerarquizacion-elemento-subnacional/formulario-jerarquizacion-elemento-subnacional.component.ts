import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { criterio_Jerarquizacion } from '../../../modelo/select/overview-jerarquia';
import { Jerarquizacion } from '../../../modelo/jerarquizacion/jerarquizacion-modelo';
import { JerarquizacionService } from '../../../servicios/jerarquizacion/jerarquizacion.service';
import { FechaService } from '../../../servicios/fecha/fecha.service';
import { ElementoService } from '../../../servicios/elemento/elemento.service';
import { elemento_Modelo } from '../../../modelo/jerarquizacion/elemento-modelo';
import { jerarquizacion_Subnacional_Modelo } from '../../../modelo/jerarquizacion/jerarquizacion-subnacional-modelo';
import { ConfirmacionComponent } from '../../../componentes/dialogo/confirmacion/confirmacion.component';
//--------------tabla------------------------------------
import { jerarquizacion_Subnacional_FormGroup } from '../../../modelo/formGroup/jerarquizacionSubnacional';
import { MatPaginator, MatSort, MatTableDataSource, MatSelectModule, MatDialog } from '@angular/material';
//import { jerarquizacion_Global_Dato } from '../../../modelo/tabla/vertebrado-dato'

@Component({
  selector: 'app-formulario-jerarquizacion-elemento-subnacional',
  templateUrl: './formulario-jerarquizacion-elemento-subnacional.component.html',
  styleUrls: ['./formulario-jerarquizacion-elemento-subnacional.component.scss']
})
export class FormularioJerarquizacionElementoSubnacionalComponent implements OnInit {
  criterio_Jeraquizacion = new criterio_Jerarquizacion();
  criterio_lestims = this.criterio_Jeraquizacion.lgn_lestim;
  criterio_abunds = this.criterio_Jeraquizacion.lgn_abund;
  criterio_dists = this.criterio_Jeraquizacion.ln_dist;
  criterio_leprots = this.criterio_Jeraquizacion.lgn_leprot;
  criterio_amenazs = this.criterio_Jeraquizacion.lgn_amenaz;
  criterio_rangos = this.criterio_Jeraquizacion.ln_rango;
  jerarquizacion_SubnacionalForm: FormGroup;
  private _success = new Subject<string>();
  staticAlertClosed = false;
  successMessage: string;
  tipoAlert: string;
  loading: boolean;
  constructor(private fb: FormBuilder,
    private jerarquizacionServicio: JerarquizacionService,
    private elementoServicio: ElementoService,
    private fechaServicio: FechaService,
    private dialog: MatDialog) {
    this.crear_Jerarquizacion_Subnacional(new jerarquizacion_Subnacional_Modelo());
  }

  ngOnInit() {
    setTimeout(() => this.staticAlertClosed = true, 20000);
    this._success.subscribe((message) => this.successMessage = message);
    this._success.pipe(
      debounceTime(5000)
    ).subscribe(() => this.successMessage = null);
  }
  onSubmit() {
    {

    }
  }
  crear_Jerarquizacion_Subnacional(jerarquizacionSubnacional:jerarquizacion_Subnacional_Modelo) {
    this.jerarquizacion_SubnacionalForm 
    =new jerarquizacion_Subnacional_FormGroup().getJerarquizacion_Subnacional_FormGrup(jerarquizacionSubnacional);
  }

  //guardar registro jerarquizacion subnancional
  guardarRegistroJerarquizacionSubnacional() {
    console.log(this.jerarquizacion_SubnacionalForm.value);
    var jerarquizacionBase = new Jerarquizacion();
    var jerarquizacionSubnacional = new jerarquizacion_Subnacional_Modelo();
    var subnacionalList: Array<jerarquizacion_Subnacional_Modelo> = new Array();
    jerarquizacionBase.codigoe = this.jerarquizacion_SubnacionalForm.get('codigoe').value;
    jerarquizacionSubnacional = this.setDatosJerarquizacionSubnacional(this.jerarquizacion_SubnacionalForm.value);
    subnacionalList.push(jerarquizacionSubnacional);
    jerarquizacionBase.subnacionalList = subnacionalList;
    this.addJerarquizacionNacional(jerarquizacionBase)
  }
  //setear datos jerarquizacion subnacioal
  setDatosJerarquizacionSubnacional(datos: jerarquizacion_Subnacional_Modelo): jerarquizacion_Subnacional_Modelo {
    datos.fecharevrs = this.fechaServicio.toFormatoDateTime(this.jerarquizacion_SubnacionalForm.get('fecharevrs').value);
    datos.edicion = this.fechaServicio.toFormatoDateTime(this.jerarquizacion_SubnacionalForm.get('edicion').value);
    datos.actualizar = this.fechaServicio.toFormatoDateTime(this.jerarquizacion_SubnacionalForm.get('actualizar').value);
    return datos;
  }
  //agrega un nuevo registro jerarquizacion subnacional
  addJerarquizacionNacional(jerarquizacion: Jerarquizacion): void {
    this.loading = true;
    this.jerarquizacionServicio.addJerarquizacionSubnacional(jerarquizacion)
      .subscribe(
        resElemento => {
          this.loading = false;
          this.changeSuccessMessage(`Se registro la jerarquización subnacional del elemento :${resElemento.codigoe}.`, 'success');
        }, err => {
          this.loading = false;
          this.changeSuccessMessage('No se pudo regitrar.', 'primary');
        });
  }
  //validar codigoe 
  validarCodigoe() {
    this.ValidarElementoCodigoe(this.jerarquizacion_SubnacionalForm.get('codigoe').value);
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
  openDialogo(): void {
    const dialogRef = this.dialog.open(ConfirmacionComponent, {
      width: '250px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result)
        this.guardarRegistroJerarquizacionSubnacional();
    });
  }
}