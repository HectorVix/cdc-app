import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, Subject } from 'rxjs';
import { Localizacion_Modelo } from '../../modelo/localizacion/localizacion-modelo';
import { protocolo_LE_Modelo } from '../../modelo/localizacion/protocolo-le-modelo';
import { respuesta_cdc_Modelo } from '../../modelo/respuestaServicio/respuesta-cdc';
import { proteccion_Modelo } from '../../modelo/localizacion/proteccion-modelo';
import { catchError, map, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json', 'No-Auth': 'True' })
};
@Injectable({
  providedIn: 'root'
})
export class LocalizacionService {
  readonly rootUrl = 'http://localhost:8080/cdc/rs';
  constructor(private http: HttpClient) { }


  addLocalizacionElemento(localizacion: Localizacion_Modelo): Observable<Localizacion_Modelo> {
    return this.http.post<Localizacion_Modelo>(this.rootUrl + '/localizacion/registro', localizacion, httpOptions);
  }
  addProteccion(proteccion: proteccion_Modelo, id: Number): Observable<proteccion_Modelo> {
    return this.http.post<proteccion_Modelo>(this.rootUrl + '/localizacion/registrar/proteccion/' + id, proteccion, httpOptions)
      .pipe(
        catchError(this.handleError<proteccion_Modelo>('addProteccion'))
      );
  }
  addProtocoloLE(protocoloLE: protocolo_LE_Modelo): Observable<protocolo_LE_Modelo> {
    return this.http.post<protocolo_LE_Modelo>(this.rootUrl + '/protocolo/registro', protocoloLE, httpOptions);
  }
  //Obtener Localización del Elemento por codigole, nombres, nomcomuns
  getLocalizacionesElementos(a: String): Observable<Localizacion_Modelo> {
    return this.http.get<Localizacion_Modelo>(this.rootUrl + '/localizacion/buscar/' + a);
  }
  //Obtener Protocolo Localización del Elemento por codigoe, nombre, nomcomun
  getProtocoloLE(a: String, b: String, c: String): Observable<protocolo_LE_Modelo> {
    return this.http.get<protocolo_LE_Modelo>(this.rootUrl + '/protocolo/buscar/' + a + '/' + b + '/' + c);
  }
  // Obtener protección 
  getProteccion(localizacion_id: Number): Observable<proteccion_Modelo> {
    return this.http.get<proteccion_Modelo>(this.rootUrl + '/localizacion/proteccion/' + localizacion_id);
  }

  updateLocalizacionElemento(le: Localizacion_Modelo): Observable<Localizacion_Modelo> {
    return this.http.post<Localizacion_Modelo>(this.rootUrl + '/localizacion/editar', le, httpOptions);
  }
  updateProtocoloLE(protocoloLE: protocolo_LE_Modelo): Observable<respuesta_cdc_Modelo> {
    return this.http.post<respuesta_cdc_Modelo>(this.rootUrl + '/protocolo/editar', protocoloLE, httpOptions);
  }
  updateProteccion(id: String, proteccion: proteccion_Modelo) {
    return this.http.post(this.rootUrl + '/localizacion/update/proteccion/' + id, proteccion, httpOptions);
  }
  deleteProteccion(id: String) {
    return this.http.post(this.rootUrl + '/localizacion/delete/proteccion/' + id, httpOptions);
  }

  //para capturar los errores con HttpClient
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
  private log(message: string) {
    console.log(`CDC Servicio: ${message}`);
    //  this.mensajeErrores = (`CDC Servicio: ${message}`);
  }
}
