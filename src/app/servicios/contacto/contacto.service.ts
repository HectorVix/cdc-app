import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, Subject } from 'rxjs';
import { contacto_Modelo } from '../../modelo/contacto/contacto-modelo';
import { respuesta_cdc_Modelo } from '../../modelo/respuestaServicio/respuesta-cdc';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json', 'No-Auth': 'True' })
};
@Injectable({
  providedIn: 'root'
})
export class ContactoService {
  readonly rootUrl = 'http://localhost:8080/cdc/rs';
  constructor(private http: HttpClient) { }

  addContacto(contacto: contacto_Modelo, jti: Number): Observable<contacto_Modelo> {
    return this.http.post<contacto_Modelo>(this.rootUrl + '/contacto/registro/' + jti, contacto, httpOptions);
  }
}
