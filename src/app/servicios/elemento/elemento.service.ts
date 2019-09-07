import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, Subject } from 'rxjs';
import { elemento_Modelo } from '../../modelo/jerarquizacion/elemento-modelo';
import { respuesta_cdc_Modelo } from '../../modelo/respuestaServicio/respuesta-cdc';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json', 'No-Auth': 'True' })
};

@Injectable({
  providedIn: 'root'
})
export class ElementoService {

  constructor(private http: HttpClient) { }

  validarElementoCodigoe(codigoe: String): Observable<respuesta_cdc_Modelo> {
    return this.http.get<respuesta_cdc_Modelo>('/cecon/elemento/validar/' + codigoe);
  }
  getElementos(codigo: String, nombrecomun, nombrecientifico, clase, comunidad): Observable<elemento_Modelo> {
    return this.http.get<elemento_Modelo>('/cecon/elemento/buscar/' + codigo + '/' + nombrecomun + '/' + nombrecientifico + '/' + clase + '/' + comunidad);
  }
  get All() { return this.http.get<elemento_Modelo>('/cecon/elemento/all'); }
  addElemento(elemento: elemento_Modelo, jti: String): Observable<respuesta_cdc_Modelo> {
    return this.http.post<respuesta_cdc_Modelo>('/cecon/elemento/registro/' + jti, elemento, httpOptions);
  }
  editarElemento(elemento: elemento_Modelo, jti: String): Observable<respuesta_cdc_Modelo> {
    return this.http.post<respuesta_cdc_Modelo>('/cecon/elemento/editar/' + jti, elemento, httpOptions);
  }
}
