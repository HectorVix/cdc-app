import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, Subject } from 'rxjs';
import { contacto_Modelo } from '../../modelo/contacto/contacto-modelo';
import { respuesta_cdc_Modelo } from '../../modelo/respuestaServicio/respuesta-cdc';
import { catchError, map, tap } from 'rxjs/operators';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json', 'No-Auth': 'True' })
};
@Injectable({
  providedIn: 'root'
})
export class ContactoService {

  constructor(private http: HttpClient) { }

  addContacto(contacto: contacto_Modelo, jti: Number): Observable<respuesta_cdc_Modelo> {
    return this.http.post<respuesta_cdc_Modelo>('/cecon/contacto/registro/' + jti, contacto, httpOptions);
  }
  //Obtener contacto por numident, nombreident, nombre, apellido1, apellido2, email
  getContactos(a: String, b: String, c: String, d: String, e: String, f: String): Observable<contacto_Modelo> {
    return this.http.get<contacto_Modelo>('/cecon/contacto/buscar/' + a + '/' + b + '/' + c + '/' + d + '/' + e + '/' + f);
  }
  updateContacto(contacto: contacto_Modelo, jti: Number): Observable<respuesta_cdc_Modelo> {
    return this.http.post<respuesta_cdc_Modelo>('/cecon/contacto/editar/' + jti, contacto, httpOptions);
  }
}
