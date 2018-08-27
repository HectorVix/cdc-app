import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common'
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { criterio_Jerarquizacion } from '../../../modelo/select/overview-jerarquia';
import { jerarquizacion_Global_Modelo } from '../../../modelo/jerarquizacion-global-modelo';
import { Jerarquizacion } from '../../../modelo/jerarquizacion-modelo';
import { UsuarioService } from '../../../servicios/usuario.service';
const now = new Date();

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
  jerarquizaciongForm: FormGroup;
  jerarquizacionModelo: Jerarquizacion;
  jerarquizacionGlobalModelo: jerarquizacion_Global_Modelo;
  date: { year: number, month: number };
  modelDate: NgbDateStruct;

  constructor(private fb: FormBuilder, public datepipe: DatePipe, private usuarioService: UsuarioService) {
    this.crear_Jerarquizacion_Global();
  }

  ngOnInit() {
  }
  onSubmit() {
    this.registrarJerarquizacionGlobal();
  }
  crear_Jerarquizacion_Global() {
    this.jerarquizaciongForm = this.fb.group({
      //página1
      'codigoe': ['', Validators.required],
      'nombreg': '',
      'descrielem': '',
      'especle': '',
      'especranga': '',
      'especrangb': '',
      'especrangc': '',
      'especrangd': '',
      'habitat': '',
      'permanencia': '',
      'gloctip': '',
      'comtax': '',
      'glestim': '',
      'glestimcom': '',
      'gabund': '',
      'gabundcom': '',
      'gdist': '',
      'gdistcom': '',
      //página 2
      'gleprot': '',
      'gleprotcom': '',
      'gamenaz': '',
      'gamenazcom': '',
      'gfragil': '',
      'gfragilcom': '',
      'gotroconsi': '',
      'rangog': '',
      'fecharg': '',
      'granrazon': '',
      'gnecprotec': '',
      'gnecinvent': '',
      'gnecestudi': '',
      'gnecmanejo': '',
      'resrg': '',
      'edautor': '',
      'edicion': '',
      'actualizar': ''
    });

  }
  //registro nuevo formulario jerarquizacion global
  registrarJerarquizacionGlobal(){
    console.log(this.jerarquizaciongForm.value);
    this.jerarquizacionModelo = new Jerarquizacion();
    this.jerarquizacionGlobalModelo = new jerarquizacion_Global_Modelo();
    this.jerarquizacionModelo.codigoe = this.jerarquizaciongForm.get('codigoe').value;
    var globalist: Array<jerarquizacion_Global_Modelo> = new Array();
    this.setDatosJerarquizacionGlobal(this.jerarquizaciongForm.value);
    globalist.push(this.jerarquizacionGlobalModelo);
    this.jerarquizacionModelo.globalList = globalist;
    this.addJerarquizacionGlobal(this.jerarquizacionModelo);
  }
  setDatosJerarquizacionGlobal(datos: jerarquizacion_Global_Modelo) {
    var fecharg=this.usuarioService.toFormato(this.jerarquizaciongForm.get('fecharg').value);
    var edicion=this.usuarioService.toFormato(this.jerarquizaciongForm.get('edicion').value);
    var actualizar=this.usuarioService.toFormato(this.jerarquizaciongForm.get('actualizar').value);
    datos.fecharg=fecharg;
    datos.edicion=edicion;
    datos.actualizar=actualizar;
    this.jerarquizacionGlobalModelo = datos;
  }
  //agrega un nueo registro jerarquizacion global
  addJerarquizacionGlobal(jerarquizacion: Jerarquizacion): void {
    //elemento.id_aux=decodedToken.jti;
    this.usuarioService.addJerarquizacion(jerarquizacion)
      .subscribe(
        resElemento => {
          console.log("ok");
        }, err => {
          console.log("bad");
        });
  }
  selectToday() {
    this.modelDate = { year: now.getFullYear(), month: now.getMonth() + 1, day: now.getDate() };
  }
}
