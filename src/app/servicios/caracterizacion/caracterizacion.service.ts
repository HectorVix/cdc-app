import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, Subject } from 'rxjs';
import { caracterizacion_Modelo } from '../../modelo/resumen/caracterizacion-modelo';
import { respuesta_cdc_Modelo } from '../../modelo/respuestaServicio/respuesta-cdc';

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
}
