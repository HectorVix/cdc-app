import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, Subject } from 'rxjs';
import { rastreo_Elemento_Modelo } from '../../modelo/rastreo/rastreo-elemento-modelo';
import { respuesta_cdc_Modelo } from '../../modelo/respuestaServicio/respuesta-cdc';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json', 'No-Auth': 'True' })
};
@Injectable({
  providedIn: 'root'
})
export class RastreoService {
  readonly rootUrl = 'http://localhost:8080/cdc/rs';
  constructor(private http: HttpClient) { }

  //Obtener Rastreo del Elemento por codigoe, subnacion, nombreg, nombrecomunnn
  getRastreoElemento(a: String, b: String, c: String, d: String, e: String): Observable<rastreo_Elemento_Modelo> {
    return this.http.get<rastreo_Elemento_Modelo>(this.rootUrl + '/rastreo/buscar/' + a + '/' + b + '/' + c + '/' + d + '/' + e);
  }
  addRastreoElemento(rastreoElemento: rastreo_Elemento_Modelo): Observable<rastreo_Elemento_Modelo> {
    return this.http.post<rastreo_Elemento_Modelo>(this.rootUrl + '/rastreo/registro', rastreoElemento, httpOptions);
  }
  editarRastreoElemento(re: rastreo_Elemento_Modelo): Observable<rastreo_Elemento_Modelo> {
    return this.http.post<rastreo_Elemento_Modelo>(this.rootUrl + '/rastreo/editar', re, httpOptions);
  }
}
