import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, Subject } from 'rxjs';
import { sitio_Modelo } from '../../modelo/sitio/sitio-modelo';
import { respuesta_cdc_Modelo } from '../../modelo/respuestaServicio/respuesta-cdc';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json', 'No-Auth': 'True' })
};

@Injectable({
  providedIn: 'root'
})
export class SitioService {
  readonly rootUrl = 'http://localhost:8080/cdc/rs';

  constructor(private http: HttpClient) { }

  getSitio(a: String, b: String, c: String, d: String): Observable<sitio_Modelo> {
    return this.http.get<sitio_Modelo>(this.rootUrl + '/sitio/buscar/' + a + '/' + b + '/' + c + '/' + d);
  }
  addSitio(sitio: sitio_Modelo): Observable<respuesta_cdc_Modelo> {
    return this.http.post<respuesta_cdc_Modelo>(this.rootUrl + '/sitio/registro', sitio, httpOptions);
  }
}
