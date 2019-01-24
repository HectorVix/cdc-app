import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, Subject } from 'rxjs';
import { caracterizacion_Modelo } from '../../modelo/resumen/caracterizacion-modelo';
import { respuesta_cdc_Modelo } from '../../modelo/respuestaServicio/respuesta-cdc';
import { planta_Modelo } from '../../modelo/resumen/planta-modelo';
import { vertebrado_Modelo } from '../../modelo/resumen/vertebrado-modelo';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json', 'No-Auth': 'True' })
};
@Injectable({
  providedIn: 'root'
})
export class CaracterizacionService {
  readonly rootUrl = 'http://localhost:8080/cdc/rs';
  constructor(private http: HttpClient) { }

  addCaracterizacionPlanta(caracterizacion: caracterizacion_Modelo): Observable<caracterizacion_Modelo> {
    return this.http.post<caracterizacion_Modelo>(this.rootUrl + '/caracterizacion/registro/planta', caracterizacion, httpOptions);
  }
  addCaracterizacionVertebrado(caracterizacion: caracterizacion_Modelo): Observable<caracterizacion_Modelo> {
    return this.http.post<caracterizacion_Modelo>(this.rootUrl + '/caracterizacion/registro/vertebrado', caracterizacion, httpOptions);
  }
  //Obtener plantas por codigoe, nacion, nombren, nomcomunn
  getPlantas(a: String, b: String, c: String, d: String): Observable<planta_Modelo> {
    return this.http.get<planta_Modelo>(this.rootUrl + '/caracterizacion/buscar/planta/' + a + '/' + b + '/' + c + '/' + d);
  }
  //Obtener vertebrados por codigoe, nacion, nombreg, autor, nombren, nomcomunn
  getVertebrados(a: String, b: String, c: String, d: String, e: String, f: String): Observable<vertebrado_Modelo> {
    return this.http.get<vertebrado_Modelo>(this.rootUrl + '/caracterizacion/buscar/vertebrado/' + a + '/' + b + '/' + c + '/' + d + '/' + e + '/' + f);
  }
  updatePlanta(planta: planta_Modelo): Observable<respuesta_cdc_Modelo> {
    return this.http.post<respuesta_cdc_Modelo>(this.rootUrl + '/caracterizacion/editar/planta', planta, httpOptions);
  }
  updateVertebrado(vertebrado: vertebrado_Modelo): Observable<respuesta_cdc_Modelo> {
    return this.http.post<respuesta_cdc_Modelo>(this.rootUrl + '/caracterizacion/editar/vertebrado', vertebrado, httpOptions);
  }
}
