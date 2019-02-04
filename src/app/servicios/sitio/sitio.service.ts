import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, Subject } from 'rxjs';
import { sitio_Modelo } from '../../modelo/sitio/sitio-modelo';
import { respuesta_cdc_Modelo } from '../../modelo/respuestaServicio/respuesta-cdc';
import { macsitio_Modelo } from '../../modelo/sitio/macsitio-modelo';

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
  addSitio(sitio: sitio_Modelo): Observable<respuesta_cdc_Modelo> {
    return this.http.post<respuesta_cdc_Modelo>(this.rootUrl + '/sitio/registro', sitio, httpOptions);
  }
  addMacsitio(sitio_id: Number, macsitio: macsitio_Modelo) {
    return this.http.post(this.rootUrl + '/sitio/registrar/macsitio/' + sitio_id, macsitio, httpOptions);
  }
  updateSitio(sitio: sitio_Modelo): Observable<respuesta_cdc_Modelo> {
    return this.http.post<respuesta_cdc_Modelo>(this.rootUrl + '/sitio/editar', sitio, httpOptions);
  }
  updateMacsitio(sitio_id: Number, macsitio: macsitio_Modelo) {
    return this.http.post(this.rootUrl + '/sitio/update/macsitio/' + sitio_id, macsitio, httpOptions);
  }
  deleteMacsitio(macsitio_id: Number) {
    return this.http.post(this.rootUrl + '/sitio/delete/macsitio/' + macsitio_id, httpOptions);
  }
}
