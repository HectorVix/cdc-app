import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, Subject } from 'rxjs';
import { Jerarquizacion } from '../../modelo/jerarquizacion/jerarquizacion-modelo';
import { respuesta_cdc_Modelo } from '../../modelo/respuestaServicio/respuesta-cdc';
import { jerarquizacion_Global_Modelo } from '../../modelo/jerarquizacion/jerarquizacion-global-modelo';
import { jerarquizacion_Nacional_Modelo } from '../../modelo/jerarquizacion/jerarquizacion-nacional-modelo';
import { jerarquizacion_Subnacional_Modelo } from '../../modelo/jerarquizacion/jerarquizacion-subnacional-modelo';
import { Valor } from '../../modelo/select/overwiew-valor';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json', 'No-Auth': 'True' })
};
@Injectable({
  providedIn: 'root'
})
export class JerarquizacionService {
  criterio_Nacion = [];
  criterio_Subnacion = [];
  criterio_Municipio = [];

  constructor(private http: HttpClient) { }


  addJerarquizacionGlobal(jerarquizacion: Jerarquizacion): Observable<respuesta_cdc_Modelo> {
    return this.http.post<respuesta_cdc_Modelo>('/cecon/jerarquizacion/registro/global', jerarquizacion, httpOptions);
  }

  addJerarquizacionNacional(jerarquizacion: Jerarquizacion): Observable<respuesta_cdc_Modelo> {
    return this.http.post<respuesta_cdc_Modelo>('/cecon/jerarquizacion/registro/nacional', jerarquizacion, httpOptions);
  }

  addJerarquizacionSubnacional(jerarquizacion: Jerarquizacion): Observable<respuesta_cdc_Modelo> {
    return this.http.post<respuesta_cdc_Modelo>('/cecon/jerarquizacion/registro/subnacional', jerarquizacion, httpOptions);
  }
  //Obtener jerarquizació global por codigoe, nombreg, descrielem
  getJerarquizacionesGlobal(a: String, b: String, c: String): Observable<jerarquizacion_Global_Modelo> {
    return this.http.get<jerarquizacion_Global_Modelo>('/cecon/jerarquizacion/buscar/global/' + a + '/' + b + '/' + c);
  }
  //Obtener jerarquización nacional por codigoe, nombren, nacion
  getJerarquizacionesNacional(a: String, b: String, c: String): Observable<jerarquizacion_Nacional_Modelo> {
    return this.http.get<jerarquizacion_Nacional_Modelo>('/cecon/jerarquizacion/buscar/nacional/' + a + '/' + b + '/' + c);
  }

  //Obtener jerarquización subnacional por codigoe, nacion, subnacion, nombres, loctips
  getJerarquizacionesSubnacional(a: String, b: String, c: String, d: String, e: String): Observable<jerarquizacion_Subnacional_Modelo> {
    return this.http.get<jerarquizacion_Subnacional_Modelo>('/cecon/jerarquizacion/buscar/subnacional/' + a + '/' + b + '/' + c + '/' + d + '/' + e);
  }

  get all_Global() { return this.http.get<jerarquizacion_Global_Modelo>('/cecon/jerarquizacion/global/all'); }
  get all_Nacional() { return this.http.get<jerarquizacion_Nacional_Modelo>('/cecon/jerarquizacion/nacional/all'); }
  get all_Subnacional() { return this.http.get<jerarquizacion_Nacional_Modelo>('/cecon/jerarquizacion/subnacional/all'); }

  //Obtener catalogos de los rangos globaln, nacional y subnacional
  get rangog() {
    return this.http.get('/cecon/jerarquizacion/rangog');
  }
  get rangon() {
    return this.http.get('/cecon/jerarquizacion/rangon');
  }
  get rangos() {
    return this.http.get('/cecon/jerarquizacion/rangos');
  }

  //Obtener catalogos de nación, subnación(depto.) y municipio
  get nacion() {
    return this.http.get('/cecon/jerarquizacion/nacion');
  }
  get subnacion() {
    return this.http.get('/cecon/jerarquizacion/subnacion');
  }
  getMunicipio(departamento: Number) {
    return this.http.get('/cecon/jerarquizacion/municipio/' + departamento);
  }
  updateGlobal(global: jerarquizacion_Global_Modelo, jerarquia_id: Number): Observable<respuesta_cdc_Modelo> {
    return this.http.post<respuesta_cdc_Modelo>('/cecon/jerarquizacion/editar/global/' + jerarquia_id, global, httpOptions);
  }
  updateNacional(nacional: jerarquizacion_Nacional_Modelo, jerarquia_id: Number): Observable<respuesta_cdc_Modelo> {
    return this.http.post<respuesta_cdc_Modelo>('/cecon/jerarquizacion/editar/nacional/' + jerarquia_id, nacional, httpOptions);
  }
  updateSubnacional(subnacional: jerarquizacion_Subnacional_Modelo, jerarquia_id: Number): Observable<respuesta_cdc_Modelo> {
    return this.http.post<respuesta_cdc_Modelo>('/cecon/jerarquizacion/editar/subnacional/' + jerarquia_id, subnacional, httpOptions);
  }
  //Catalogo de nación
  obtener_nacion() {
    this.criterio_Nacion = [];
    this.nacion.subscribe(
      (resNacion: any[]) => {
        resNacion.forEach(nacion => {
          var modelo_Valor = new Valor();
          modelo_Valor.value = nacion.codigo;
          modelo_Valor.viewValue = nacion.nombre;
          this.criterio_Nacion.push(modelo_Valor);
        });
      }, err => {

      });
  }
  //Catalogo de subnación (Depto)
  obtener_subnacion() {
    this.criterio_Subnacion = [];
    this.subnacion.subscribe(
      (resSubnacion: any[]) => {
        resSubnacion.forEach(subnacion => {
          var modelo_Valor = new Valor();
          modelo_Valor.value = "" + subnacion.codigo;
          modelo_Valor.viewValue = subnacion.nombre;
          this.criterio_Subnacion.push(modelo_Valor);
        });
      }, err => {

      });
  }
  obtener_Municipios(departamento: Number) {
    this.criterio_Municipio = [];
    this.getMunicipio(departamento).subscribe(
      (resMunicipio: any[]) => {
        resMunicipio.forEach(municipio => {
          var modelo_Valor = new Valor();
          modelo_Valor.value = "" + municipio.codigo;
          modelo_Valor.viewValue = municipio.nombre;
          this.criterio_Municipio.push(modelo_Valor);
        });
      }, err => {

      });
  }
  get nacion_Valor() { return this.criterio_Nacion; }
  get subnacion_Valor() { return this.criterio_Subnacion; }
  get municipio_Valor() { return this.criterio_Municipio; }
}
