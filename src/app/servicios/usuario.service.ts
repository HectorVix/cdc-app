import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Response } from "@angular/http";
import { Observable, of } from 'rxjs';
import { UsuarioModelo } from '../modelo/usuario-modelo';
import { elemento_Modelo } from '../modelo/elemento-modelo';
import { catchError, map, tap } from 'rxjs/operators';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json', 'No-Auth': 'True' })
};


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  readonly rootUrl = 'http://localhost:8080/cdc/rs';
  data: any;

  constructor(private http: HttpClient) { }



  userAuthentication(userName, password) {
    var data = "username=" + userName + "&password=" + password + "&grant_type=password";
    var reqHeader = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded', 'No-Auth': 'True' });
    return this.http.post(this.rootUrl + '/us/token', data, { headers: reqHeader });

  }

  getUsuarioDatos() {
    return this.http.get(this.rootUrl + '/us/');

  }
  //agregar un nuevo usuario
  addUsuario(us: UsuarioModelo): Observable<UsuarioModelo> {
    return this.http.post<UsuarioModelo>(this.rootUrl + '/us/reg', us, httpOptions);
  }
  //agregar un nuevo elemento
  addElemento(elemento: elemento_Modelo): Observable<elemento_Modelo> {
    return this.http.post<elemento_Modelo>(this.rootUrl + '/us/regelemento', elemento, httpOptions);
  }


  //para capturar los errores con HttpClient
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }

}

