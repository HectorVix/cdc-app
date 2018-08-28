import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { criterio_Jerarquizacion } from '../../../modelo/select/overview-jerarquia';
import { Jerarquizacion } from '../../../modelo/jerarquizacion-modelo';
import { UsuarioService } from '../../../servicios/usuario.service';
import { elemento_Modelo } from '../../../modelo/elemento-modelo';
import { jerarquizacion_Subnacional_Modelo } from '../../../modelo/jerarquizacion-subnacional-modelo';

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
  constructor(private fb: FormBuilder, private usuarioService: UsuarioService) {
    this.crear_Jerarquizacion_Subnacional();
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
  crear_Jerarquizacion_Subnacional() {
    this.jerarquizacion_SubnacionalForm = this.fb.group({
      'codigoe': ['', Validators.required],
      'nacion': '',
      'subnacion': '',
      'nombres': '',
      'loctips': '',
      'lestims': '',
      'comlestims': '',
      'abunds': '',
      'comabunds': '',
      'dists': '',
      'comdists': '',
      'leprots': '',
      'comleprots': '',
      'amenazs': '',
      'comamenazs': '',
      'otraconsids': '',
      'rangos': '',
      'fecharevrs': '',
      'razonrs': '',
      'necprotecs': '',
      'necinvents': '',
      'necmanejos': '',
      'autored': '',
      'edicion': '',
      'actualizar': '',
    });

  }

  //guardar registro jerarquizacion subnancional
  guardarRegistroJerarquizacionSubnacional(){
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
  setDatosJerarquizacionSubnacional(datos: jerarquizacion_Subnacional_Modelo):jerarquizacion_Subnacional_Modelo {
    datos.fecharevrs=this.usuarioService.toFormato(this.jerarquizacion_SubnacionalForm.get('fecharevrs').value);
    datos.edicion=this.usuarioService.toFormato(this.jerarquizacion_SubnacionalForm.get('edicion').value);
    datos.actualizar=this.usuarioService.toFormato(this.jerarquizacion_SubnacionalForm.get('actualizar').value);
    return datos;
  }
  //agrega un nuevo registro jerarquizacion subnacional
  addJerarquizacionNacional(jerarquizacion: Jerarquizacion): void {
    this.usuarioService.addJerarquizacionSubnacional(jerarquizacion)
      .subscribe(
        resElemento => {
          this.changeSuccessMessage(`Se registro la jerarquización subnacional del elemento :${resElemento.codigoe}.`, 'success');
          this.crear_Jerarquizacion_Subnacional();
        }, err => {
          this.changeSuccessMessage('No se pudo regitrar.', 'primary');
        });
  }
  //validar codigoe 
  validarCodigoe (){
    this.ValidarElementoCodigoe(this.jerarquizacion_SubnacionalForm.get('codigoe').value);
  }
  ValidarElementoCodigoe(codigoe:String):elemento_Modelo
  {
    var elemento:elemento_Modelo;
    this.usuarioService.validarElementoCodigoe(codigoe)
    .subscribe(
      resElemento => {
        elemento=resElemento;
        console.log("validado elemento ok:"+resElemento.elementoId);
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
}
 
