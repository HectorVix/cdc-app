import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, Subject } from 'rxjs';
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


  addJerarquizacionGlobal(jer_global: jerarquizacion_Global_Modelo) {
    return this.http.post<respuesta_cdc_Modelo>('/cecon/jerarquizacion/registro/global', jer_global, httpOptions);
  }

  addJerarquizacionNacional(jer_nacional: jerarquizacion_Nacional_Modelo): Observable<respuesta_cdc_Modelo> {
    return this.http.post<respuesta_cdc_Modelo>('/cecon/jerarquizacion/registro/nacional', jer_nacional, httpOptions);
  }

  addJerarquizacionSubnacional(jer_subNacional: jerarquizacion_Subnacional_Modelo): Observable<respuesta_cdc_Modelo> {
    return this.http.post<respuesta_cdc_Modelo>('/cecon/jerarquizacion/registro/subnacional', jer_subNacional, httpOptions);
  }

  getJerarquizacionesGlobal(codigoe: String,
    nombren: String, nombrecomunn: String, clase: String, comunidad: String,
    rol: String) {
    return this.http.get<jerarquizacion_Global_Modelo>('/cecon/jerarquizacion/buscar/global/' + codigoe + '/'
      + nombren + '/' + nombrecomunn + '/' + clase + '/' + comunidad + '/'
      + rol);
  }

  getJerarquizacionesNacional(codigoe: String,
    nombren: String, nombrecomunn: String, clase: String, comunidad: String,
    rol: String) {
    return this.http.get<jerarquizacion_Nacional_Modelo>('/cecon/jerarquizacion/buscar/nacional/' + codigoe + '/'
      + nombren + '/' + nombrecomunn + '/' + '/' + clase + '/' + comunidad + '/' +
      rol);
  }

  getJerarquizacionesSubnacional(codigoe: String,
    depto: String, nombres: String,
    nombren: String, nombrecomunn: String, clase: String, comunidad: String,
    rol: String) {
    return this.http.get<jerarquizacion_Subnacional_Modelo>('/cecon/jerarquizacion/buscar/subnacional/' + codigoe + '/'
      + depto + '/' + nombres + '/'
      + nombren + '/' + nombrecomunn + '/' + clase + '/' + comunidad + '/'
      + rol);
  }

  get_All_Global(rol: String) { return this.http.get<jerarquizacion_Global_Modelo>('/cecon/jerarquizacion/global/all/' + rol); }
  get_All_Nacional(rol: String) { return this.http.get<jerarquizacion_Nacional_Modelo>('/cecon/jerarquizacion/nacional/all/' + rol); }
  get_All_Subnacional(rol: String) { return this.http.get<jerarquizacion_Nacional_Modelo>('/cecon/jerarquizacion/subnacional/all/' + rol); }

  //Obtener catalogos de los rangos globaln, nacional y subnacional
  get rangog() { return this.http.get('/cecon/jerarquizacion/rangog'); }
  get rangon() { return this.http.get('/cecon/jerarquizacion/rangon'); }
  get rangos() { return this.http.get('/cecon/jerarquizacion/rangos'); }

  //Obtener catalogos de nación, subnación(depto.) y municipio
  get nacion() { return this.http.get('/cecon/jerarquizacion/nacion'); }
  get subnacion() { return this.http.get('/cecon/jerarquizacion/subnacion'); }

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
