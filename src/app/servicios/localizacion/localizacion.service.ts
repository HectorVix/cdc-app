import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, Subject } from 'rxjs';
import { Localizacion_Modelo } from '../../modelo/localizacion/localizacion-modelo';
import { protocolo_LE_Modelo } from '../../modelo/localizacion/protocolo-le-modelo';
import { respuesta_cdc_Modelo } from '../../modelo/respuestaServicio/respuesta-cdc';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json', 'No-Auth': 'True' })
};
@Injectable({
  providedIn: 'root'
})
export class LocalizacionService {
  readonly rootUrl = 'http://localhost:8080/cdc/rs';
  constructor(private http: HttpClient) { }

  //Obtener Localización del Elemento por codigole, nombres, nomcomuns
  getLocalizacionElemento(a: String): Observable<Localizacion_Modelo> {
    return this.http.get<Localizacion_Modelo>(this.rootUrl + '/localizacion/buscar/' + a);
  }
  addLocalizacionElemento(localizacion: Localizacion_Modelo): Observable<Localizacion_Modelo> {
    return this.http.post<Localizacion_Modelo>(this.rootUrl + '/localizacion/registro', localizacion, httpOptions);
  }
  addProtocoloLE(protocoloLE: protocolo_LE_Modelo): Observable<protocolo_LE_Modelo> {
    return this.http.post<protocolo_LE_Modelo>(this.rootUrl + '/protocolo/registro', protocoloLE, httpOptions);
  }
  editarLocalizacionElemento(le: Localizacion_Modelo): Observable<Localizacion_Modelo> {
    return this.http.post<Localizacion_Modelo>(this.rootUrl + '/localizacion/editar', le, httpOptions);
  }
}
