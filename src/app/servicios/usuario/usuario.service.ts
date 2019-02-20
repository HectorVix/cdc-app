import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, Subject } from 'rxjs';
import { usuario_Modelo } from '../../modelo/usuario/usuario-modelo';
import { respuesta_cdc_Modelo } from '../../modelo/respuestaServicio/respuesta-cdc';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json', 'No-Auth': 'True', "Access-Control-Allow-Origin": "*" })
};
@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient) { }

  userAuthentication(userName, password) {
    var data = "username=" + userName + "&password=" + password + "&grant_type=password";
    var reqHeader = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded', 'No-Auth': 'True' });
    return this.http.post('/cecon/usuario/token', data, { headers: reqHeader });
  }
  addUsuario(us: usuario_Modelo): Observable<respuesta_cdc_Modelo> {
    return this.http.post<respuesta_cdc_Modelo>('/cecon/usuario/registrar', us, httpOptions);
  }
  getUsuarioDatos(jti: String): Observable<usuario_Modelo> {
    return this.http.get<usuario_Modelo>('/cecon/usuario/' + jti);
  }

}
