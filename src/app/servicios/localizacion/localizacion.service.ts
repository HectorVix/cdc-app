import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, Subject } from 'rxjs';
import { Localizacion_Modelo } from '../../modelo/localizacion/localizacion-modelo';
import { protocolo_LE_Modelo } from '../../modelo/localizacion/protocolo-le-modelo';
import { respuesta_cdc_Modelo } from '../../modelo/respuestaServicio/respuesta-cdc';
import { proteccion_Modelo } from '../../modelo/localizacion/proteccion-modelo';
import { dispersion_Modelo } from '../../modelo/localizacion/dispersion-modelo';
import { catchError, map, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json', 'No-Auth': 'True' })
};
@Injectable({
  providedIn: 'root'
})
export class LocalizacionService {

  constructor(private http: HttpClient) { }


  addLocalizacionElemento(localizacion: Localizacion_Modelo): Observable<respuesta_cdc_Modelo> {
    return this.http.post<respuesta_cdc_Modelo>('/cecon/localizacion/registro', localizacion, httpOptions);
  }
  addProteccion(proteccion: proteccion_Modelo, id: Number) {
    return this.http.post('/cecon/localizacion/registrar/proteccion/' + id, proteccion, httpOptions);
  }
  addDispersion(dispersion: dispersion_Modelo, id: Number) {
    return this.http.post('/cecon/protocolo/registrar/dispersion/' + id, dispersion, httpOptions);
  }
  addProtocoloLE(protocoloLE: protocolo_LE_Modelo): Observable<respuesta_cdc_Modelo> {
    return this.http.post<respuesta_cdc_Modelo>('/cecon/protocolo/registro', protocoloLE, httpOptions);
  }
  //Obtener Localización del Elemento por codigole, nombres, nomcomuns
  getLocalizacionesElementos(a: String): Observable<Localizacion_Modelo> {
    return this.http.get<Localizacion_Modelo>('/cecon/localizacion/buscar/' + a);
  }
  //Obtener Protocolo Localización del Elemento por codigoe, nombre, nomcomun
  getProtocoloLE(a: String, b: String, c: String): Observable<protocolo_LE_Modelo> {
    return this.http.get<protocolo_LE_Modelo>('/cecon/protocolo/buscar/' + a + '/' + b + '/' + c);
  }
  // Obtener protección 
  getProteccion(localizacion_id: Number): Observable<proteccion_Modelo> {
    return this.http.get<proteccion_Modelo>('/cecon/localizacion/proteccion/' + localizacion_id);
  }
  getDispersion(protocolo_id: Number): Observable<dispersion_Modelo> {
    return this.http.get<dispersion_Modelo>('/cecon/protocolo/dispersion/' + protocolo_id);
  }
  updateLocalizacionElemento(le: Localizacion_Modelo, rastreoId: Number): Observable<respuesta_cdc_Modelo> {
    return this.http.post<respuesta_cdc_Modelo>('/cecon/localizacion/editar/' + rastreoId, le, httpOptions);
  }
  updateProtocoloLE(protocoloLE: protocolo_LE_Modelo): Observable<respuesta_cdc_Modelo> {
    return this.http.post<respuesta_cdc_Modelo>('/cecon/protocolo/editar', protocoloLE, httpOptions);
  }
  updateProteccion(id: String, proteccion: proteccion_Modelo) {
    return this.http.post('/cecon/localizacion/update/proteccion/' + id, proteccion, httpOptions);
  }
  updateDispersion(id: String, dispersion: dispersion_Modelo) {
    return this.http.post('/cecon/protocolo/update/dispersion/' + id, dispersion, httpOptions);
  }
  deleteProteccion(id: String) {
    return this.http.post('/cecon/localizacion/delete/proteccion/' + id, httpOptions);
  }
  deleteDispersion(id: String) {
    return this.http.post('/cecon/protocolo/delete/dispersion/' + id, httpOptions);
  }

}
