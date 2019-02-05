import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, Subject } from 'rxjs';
import { caracterizacion_Modelo } from '../../modelo/resumen/caracterizacion-modelo';
import { respuesta_cdc_Modelo } from '../../modelo/respuestaServicio/respuesta-cdc';
import { planta_Modelo } from '../../modelo/resumen/planta-modelo';
import { vertebrado_Modelo } from '../../modelo/resumen/vertebrado-modelo';
import { distribucion_Modelo } from '../../modelo/resumen/distribucion-modelo';
import { distribucion2_Modelo } from '../../modelo/resumen/distribucion2-modelo';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json', 'No-Auth': 'True' })
};
@Injectable({
  providedIn: 'root'
})
export class CaracterizacionService {
  readonly rootUrl = 'http://localhost:8080/cdc/rs';
  constructor(private http: HttpClient) { }
  //Registrar
  addCaracterizacionPlanta(caracterizacion: caracterizacion_Modelo): Observable<caracterizacion_Modelo> {
    return this.http.post<caracterizacion_Modelo>(this.rootUrl + '/caracterizacion/registro/planta', caracterizacion, httpOptions);
  }
  addCaracterizacionVertebrado(caracterizacion: caracterizacion_Modelo): Observable<caracterizacion_Modelo> {
    return this.http.post<caracterizacion_Modelo>(this.rootUrl + '/caracterizacion/registro/vertebrado', caracterizacion, httpOptions);
  }
  addDistribucion1_Planta(plantaId: Number, distribucion1: distribucion_Modelo) {
    return this.http.post(this.rootUrl + '/caracterizacion/planta/registrar/distribucion1/' + plantaId, distribucion1, httpOptions);
  }
  addDistribucion2_Planta(plantaId: Number, distribucion1: distribucion2_Modelo) {
    return this.http.post(this.rootUrl + '/caracterizacion/planta/registrar/distribucion2/' + plantaId, distribucion1, httpOptions);
  }
  addDistribucion1_Vertebrado(vertebradoId: Number, distribucion1: distribucion_Modelo) {
    return this.http.post(this.rootUrl + '/caracterizacion/vertebrado/registrar/distribucion1/' + vertebradoId, distribucion1, httpOptions);
  }
  addDistribucion2_Vertebrado(vertebradoId: Number, distribucion1: distribucion2_Modelo) {
    return this.http.post(this.rootUrl + '/caracterizacion/vertebrado/registrar/distribucion2/' + vertebradoId, distribucion1, httpOptions);
  }
  //Get
  //Obtener plantas por codigoe, nacion, nombren, nomcomunn
  getPlantas(a: String, b: String, c: String, d: String): Observable<planta_Modelo> {
    return this.http.get<planta_Modelo>(this.rootUrl + '/caracterizacion/buscar/planta/' + a + '/' + b + '/' + c + '/' + d);
  }
  getDistribucion1_Planta(plantaId: Number): Observable<distribucion_Modelo> {
    return this.http.get<distribucion_Modelo>(this.rootUrl + '/caracterizacion/planta/distribucion1/' + plantaId);
  }
  getDistribucion2_Planta(plantaId: Number): Observable<distribucion2_Modelo> {
    return this.http.get<distribucion2_Modelo>(this.rootUrl + '/caracterizacion/planta/distribucion2/' + plantaId);
  }
  getDistribucion1_Vertebrado(plantaId: Number): Observable<distribucion_Modelo> {
    return this.http.get<distribucion_Modelo>(this.rootUrl + '/caracterizacion/vertebrado/distribucion1/' + plantaId);
  }
  getDistribucion2_Vertebrado(plantaId: Number): Observable<distribucion2_Modelo> {
    return this.http.get<distribucion2_Modelo>(this.rootUrl + '/caracterizacion/vertebrado/distribucion2/' + plantaId);
  }
  //Obtener vertebrados por codigoe, nacion, nombreg, autor, nombren, nomcomunn
  getVertebrados(a: String, b: String, c: String, d: String, e: String, f: String): Observable<vertebrado_Modelo> {
    return this.http.get<vertebrado_Modelo>(this.rootUrl + '/caracterizacion/buscar/vertebrado/' + a + '/' + b + '/' + c + '/' + d + '/' + e + '/' + f);
  }
  //Actualizar
  updatePlanta(planta: planta_Modelo): Observable<respuesta_cdc_Modelo> {
    return this.http.post<respuesta_cdc_Modelo>(this.rootUrl + '/caracterizacion/editar/planta', planta, httpOptions);
  }
  updateVertebrado(vertebrado: vertebrado_Modelo): Observable<respuesta_cdc_Modelo> {
    return this.http.post<respuesta_cdc_Modelo>(this.rootUrl + '/caracterizacion/editar/vertebrado', vertebrado, httpOptions);
  }
  updateDistribucion1_Planta(plantaId: Number, distribucion1: distribucion_Modelo) {
    return this.http.post(this.rootUrl + '/caracterizacion/planta/update/distribucion1/' + plantaId, distribucion1, httpOptions);
  }
  updateDistribucion2_Planta(plantaId: Number, distribucion2: distribucion2_Modelo) {
    return this.http.post(this.rootUrl + '/caracterizacion/planta/update/distribucion2/' + plantaId, distribucion2, httpOptions);
  }
  updateDistribucion1_Vertebrado(vertebradoId: Number, distribucion1: distribucion_Modelo) {
    return this.http.post(this.rootUrl + '/caracterizacion/vertebrado/update/distribucion1/' + vertebradoId, distribucion1, httpOptions);
  }
  updateDistribucion2_Vertebrado(vertebradoId: Number, distribucion2: distribucion2_Modelo) {
    return this.http.post(this.rootUrl + '/caracterizacion/vertebrado/update/distribucion2/' + vertebradoId, distribucion2, httpOptions);
  }
  //Delete
  deleteDistribucion1(distribucion1_Id: Number) {
    return this.http.post(this.rootUrl + '/caracterizacion/delete/distribucion1/' + distribucion1_Id, httpOptions);
  }
  deleteDistribucion2(distribucion2_Id: Number) {
    return this.http.post(this.rootUrl + '/caracterizacion/delete/distribucion2/' + distribucion2_Id, httpOptions);
  }
}
