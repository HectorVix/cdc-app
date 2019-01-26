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
  readonly rootUrl = 'http://localhost:8080/cdc/rs';
  constructor(private http: HttpClient) { }

  addContacto(contacto: contacto_Modelo, jti: Number): Observable<contacto_Modelo> {
    return this.http.post<contacto_Modelo>(this.rootUrl + '/contacto/registro/' + jti, contacto, httpOptions)
      .pipe(
        catchError(this.handleError<contacto_Modelo>('addContacto'))
      );
  }
  //Obtener contacto por numident, nombreident, nombre, apellido1, apellido2, email
  getContactos(a: String, b: String, c: String, d: String, e: String, f: String): Observable<contacto_Modelo> {
    return this.http.get<contacto_Modelo>(this.rootUrl + '/contacto/buscar/' + a + '/' + b + '/' + c + '/' + d + '/' + e + '/' + f);
  }
  updateContacto(contacto: contacto_Modelo, jti: Number): Observable<respuesta_cdc_Modelo> {
    return this.http.post<respuesta_cdc_Modelo>(this.rootUrl + '/contacto/editar/' + jti, contacto, httpOptions);
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
    //this.mensajeErrores = (`CDC Servicio: ${message}`);
  }
}