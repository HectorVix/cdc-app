import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, Subject } from 'rxjs';
import { rastreo_Elemento_Modelo } from '../../modelo/rastreo/rastreo-elemento-modelo';
import { respuesta_cdc_Modelo } from '../../modelo/respuestaServicio/respuesta-cdc';
import { statusGlobal_Modelo } from '../../modelo/respuestaServicio/re-status-global';
import { statusNacional_Modelo } from '../../modelo/respuestaServicio/re-status-nacional';
import { statusSubnacional_Modelo } from '../../modelo/respuestaServicio/re-status-subnacional';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json', 'No-Auth': 'True' })
};
@Injectable({
  providedIn: 'root'
})
export class RastreoService {

  constructor(private http: HttpClient) { }

  //Obtener Rastreo del Elemento por codigoe, subnacion, nombreg, nombrecomunnn
  getRastreosElementos(a: String, b: String, c: String, d: String, e: String): Observable<rastreo_Elemento_Modelo> {
    return this.http.get<rastreo_Elemento_Modelo>('/cecon/rastreo/buscar/' + a + '/' + b + '/' + c + '/' + d + '/' + e);
  }

  get all_Rastreo() { return this.http.get<rastreo_Elemento_Modelo>('/cecon/rastreo/all'); 
}
  //Obtener Status Global
  get_Status_Global(codigoe: String) {
    return this.http.get<statusGlobal_Modelo>('/cecon/rastreo/status/global/' + codigoe);
  }
  //Obtener Status Nacional
  get_Status_Nacional(codigoe: String) {
    return this.http.get<statusNacional_Modelo>('/cecon/rastreo/status/nacional/' + codigoe);
  }
  //Obtener Status Subnacional
  get_Status_Subnacional(codigoe: String, subnacion: String) {
    return this.http.get<statusSubnacional_Modelo>('/cecon/rastreo/status/subnacional/' + codigoe + '/' + subnacion);
  }
  addRastreoElemento(rastreoElemento: rastreo_Elemento_Modelo): Observable<respuesta_cdc_Modelo> {
    return this.http.post<respuesta_cdc_Modelo>('/cecon/rastreo/registro', rastreoElemento, httpOptions);
  }
  editarRastreoElemento(re: rastreo_Elemento_Modelo, elemento_id: Number): Observable<respuesta_cdc_Modelo> {
    return this.http.post<respuesta_cdc_Modelo>('/cecon/rastreo/editar/' + elemento_id, re, httpOptions);
  }
}
