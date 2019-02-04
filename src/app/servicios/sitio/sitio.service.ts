import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, Subject } from 'rxjs';
import { sitio_Modelo } from '../../modelo/sitio/sitio-modelo';
import { respuesta_cdc_Modelo } from '../../modelo/respuestaServicio/respuesta-cdc';
import { macsitio_Modelo } from '../../modelo/sitio/macsitio-modelo';
import { subdivision_Modelo } from '../../modelo/sitio/subdivision-modelo';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json', 'No-Auth': 'True' })
};

@Injectable({
  providedIn: 'root'
})
export class SitioService {
  readonly rootUrl = 'http://localhost:8080/cdc/rs';

  constructor(private http: HttpClient) { }

  //Obtener Sitios por codigoSitio, nombreSitio, sinonimoSitio, nación y departamento
  getSitios(a: String, b: String, c: String, d: String, e: String): Observable<sitio_Modelo> {
    return this.http.get<sitio_Modelo>(this.rootUrl + '/sitio/buscar/' + a + '/' + b + '/' + c + '/' + d + '/' + e);
  }
  getMacsitio(sitio_id: Number): Observable<macsitio_Modelo> {
    return this.http.get<macsitio_Modelo>(this.rootUrl + '/sitio/macsitio/' + sitio_id);
  }
  getSubdivision(sitio_id: Number): Observable<subdivision_Modelo> {
    return this.http.get<subdivision_Modelo>(this.rootUrl + '/sitio/subdivision/' + sitio_id);
  }
  addSitio(sitio: sitio_Modelo): Observable<respuesta_cdc_Modelo> {
    return this.http.post<respuesta_cdc_Modelo>(this.rootUrl + '/sitio/registro', sitio, httpOptions);
  }
  addMacsitio(sitio_id: Number, macsitio: macsitio_Modelo) {
    return this.http.post(this.rootUrl + '/sitio/registrar/macsitio/' + sitio_id, macsitio, httpOptions);
  }
  addSubdivision(sitio_id: Number, subdivision: subdivision_Modelo) {
    return this.http.post(this.rootUrl + '/sitio/registrar/subdivision/' + sitio_id, subdivision, httpOptions);
  }
  updateSitio(sitio: sitio_Modelo): Observable<respuesta_cdc_Modelo> {
    return this.http.post<respuesta_cdc_Modelo>(this.rootUrl + '/sitio/editar', sitio, httpOptions);
  }
  updateMacsitio(sitio_id: Number, macsitio: macsitio_Modelo) {
    return this.http.post(this.rootUrl + '/sitio/update/macsitio/' + sitio_id, macsitio, httpOptions);
  }
  updateSubdivision(sitio_id: Number, subdivision: subdivision_Modelo) {
    return this.http.post(this.rootUrl + '/sitio/update/subdivision/' + sitio_id, subdivision, httpOptions);
  }
  deleteMacsitio(macsitio_id: Number) {
    return this.http.post(this.rootUrl + '/sitio/delete/macsitio/' + macsitio_id, httpOptions);
  }
  deleteSubdivision(subdivision_id: Number) {
    return this.http.post(this.rootUrl + '/sitio/delete/subdivision/' + subdivision_id, httpOptions);
  }
}
