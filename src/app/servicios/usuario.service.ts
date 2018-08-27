import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Response } from "@angular/http";
import { Observable, of } from 'rxjs';
import { UsuarioModelo } from '../modelo/usuario-modelo';
import { elemento_Modelo } from '../modelo/elemento-modelo';
import { catchError, map, tap } from 'rxjs/operators';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Jerarquizacion } from '../modelo/jerarquizacion-modelo';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json', 'No-Auth': 'True' })
};


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  readonly rootUrl = 'http://localhost:8080/cdc/rs';
  data: any;
  constructor(private http: HttpClient) {

  }



  userAuthentication(userName, password) {
    var data = "username=" + userName + "&password=" + password + "&grant_type=password";
    var reqHeader = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded', 'No-Auth': 'True' });
    return this.http.post(this.rootUrl + '/us/token', data, { headers: reqHeader });

  }

  getUsuarioDatos(jti: String) {
    return this.http.get<UsuarioModelo>(this.rootUrl + '/us/' + jti);

  }
  //obtener elementos
  getElementos(codigo: String, nombrecomun, nombrecientifico) {
    return this.http.get(this.rootUrl + '/elemento/buscar/' + codigo + '/' + nombrecomun + '/' + nombrecientifico);
  }
  //validar y obtener elemento id
  validarElementoCodigoe(codigoe: String) {
    return this.http.get<elemento_Modelo>(this.rootUrl + '/elemento/validar/'+codigoe);
  }

  //agregar un nuevo usuario
  addUsuario(us: UsuarioModelo): Observable<UsuarioModelo> {
    return this.http.post<UsuarioModelo>(this.rootUrl + '/us/reg', us, httpOptions);
  }
  //agregar un nuevo elemento
  addElemento(elemento: elemento_Modelo, jti: String): Observable<elemento_Modelo> {
    console.log(jti);
    return this.http.post<elemento_Modelo>(this.rootUrl + '/elemento/registro/' + jti, elemento, httpOptions);
  }
  //agregar una nueva jerarquizacion
  addJerarquizacionGlobal(jerarquizacion: Jerarquizacion): Observable<Jerarquizacion> {
    return this.http.post<Jerarquizacion>(this.rootUrl + '/jerarquizacion/registro/global',jerarquizacion , httpOptions);
  }

  //para capturar los errores con HttpClient
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }
  //Cambiar formato de la fecha
  toFormato(date: NgbDateStruct): Date {
    return date ? new Date('' + date.year + '-' + date.month + '-' + date.day) : null;
  }
  fromModel(date: Date): NgbDateStruct {
    return date ? {
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      day: date.getDate()
    } : null;
  }
}

