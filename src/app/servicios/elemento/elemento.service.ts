import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, Subject } from 'rxjs';
import { elemento_Modelo } from '../../modelo/elemento/elemento-modelo';
import { respuesta_cdc_Modelo } from '../../modelo/respuestaServicio/respuesta-cdc';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json', 'No-Auth': 'True' })
};

@Injectable({
  providedIn: 'root'
})
export class ElementoService {
  readonly rootUrl = 'http://localhost:8080/cdc/rs';
  constructor(private http: HttpClient) { }

  validarElementoCodigoe(codigoe: String) {
    return this.http.get<elemento_Modelo>(this.rootUrl + '/elemento/validar/' + codigoe);
  }
  getElementos(codigo: String, nombrecomun, nombrecientifico): Observable<elemento_Modelo> {
    return this.http.get<elemento_Modelo>(this.rootUrl + '/elemento/buscar/' + codigo + '/' + nombrecomun + '/' + nombrecientifico);
  }
  addElemento(elemento: elemento_Modelo, jti: String): Observable<respuesta_cdc_Modelo> {
    return this.http.post<respuesta_cdc_Modelo>(this.rootUrl + '/elemento/registro/' + jti, elemento, httpOptions);
  }
  editarElemento(elemento: elemento_Modelo, jti: String): Observable<respuesta_cdc_Modelo> {
    return this.http.post<respuesta_cdc_Modelo>(this.rootUrl + '/elemento/editar/' + jti, elemento, httpOptions);
  }
}
