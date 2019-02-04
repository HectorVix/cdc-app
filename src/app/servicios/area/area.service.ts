import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, Subject } from 'rxjs';
import { area_Modelo } from '../../modelo/area/area-modelo';
import { respuesta_cdc_Modelo } from '../../modelo/respuestaServicio/respuesta-cdc';
import { listaElemento_Modelo } from '../../modelo/area/listaElemento-modelo';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json', 'No-Auth': 'True' })
};
@Injectable({
  providedIn: 'root'
})
export class AreaService {
  readonly rootUrl = 'http://localhost:8080/cdc/rs';
  constructor(private http: HttpClient) { }

  addArea(area: area_Modelo): Observable<respuesta_cdc_Modelo> {
    return this.http.post<respuesta_cdc_Modelo>(this.rootUrl + '/area/registro', area, httpOptions);
  }
  addListaElemento(areaId: Number, listaElemento: listaElemento_Modelo) {
    return this.http.post(this.rootUrl + '/area/registrar/listaElemento/' + areaId, listaElemento, httpOptions);
  }
  //Obtener áreas por codigoam, nombream, sinam, codsitio, nomsitio, nación, subnación y subdivisión
  getAreas(a: String, b: String, c: String, d: String, e: String, f: String, g: String, h: String): Observable<area_Modelo> {
    return this.http.get<area_Modelo>(this.rootUrl + '/area/buscar/' + a + '/' + b + '/' + c + '/' + d + '/' + e + '/' + f + '/' + g + '/' + h);
  }
  getListaElemento(areaId: Number): Observable<listaElemento_Modelo> {
    return this.http.get<listaElemento_Modelo>(this.rootUrl + '/area/listaElemento/' + areaId);
  }
  updateArea(area: area_Modelo): Observable<respuesta_cdc_Modelo> {
    return this.http.post<respuesta_cdc_Modelo>(this.rootUrl + '/area/editar', area, httpOptions);
  }
  updateListaElemento(areaId: Number, listaElemento: listaElemento_Modelo) {
    return this.http.post(this.rootUrl + '/area/update/listaElemento/' + areaId, listaElemento, httpOptions);
  }
  deleteListaElemento(listaElemento_Id: Number) {
    return this.http.post(this.rootUrl + '/area/delete/listaElemento/' + listaElemento_Id, httpOptions);
  }
}
