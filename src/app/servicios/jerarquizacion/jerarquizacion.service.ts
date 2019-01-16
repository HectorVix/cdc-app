import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, Subject } from 'rxjs';
import { Jerarquizacion } from '../../modelo/jerarquizacion/jerarquizacion-modelo';
import { respuesta_cdc_Modelo } from '../../modelo/respuestaServicio/respuesta-cdc';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json', 'No-Auth': 'True' })
};
@Injectable({
  providedIn: 'root'
})
export class JerarquizacionService {
  readonly rootUrl = 'http://localhost:8080/cdc/rs';

  constructor(private http: HttpClient) { }


  addJerarquizacionGlobal(jerarquizacion: Jerarquizacion): Observable<Jerarquizacion> {
    return this.http.post<Jerarquizacion>(this.rootUrl + '/jerarquizacion/registro/global', jerarquizacion, httpOptions);
  }

  addJerarquizacionNacional(jerarquizacion: Jerarquizacion): Observable<Jerarquizacion> {
    return this.http.post<Jerarquizacion>(this.rootUrl + '/jerarquizacion/registro/nacional', jerarquizacion, httpOptions);
  }

  addJerarquizacionSubnacional(jerarquizacion: Jerarquizacion): Observable<Jerarquizacion> {
    return this.http.post<Jerarquizacion>(this.rootUrl + '/jerarquizacion/registro/subnacional', jerarquizacion, httpOptions);
  }
}
