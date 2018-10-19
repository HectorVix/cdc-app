import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Response } from "@angular/http";
import { Observable, of, Subject } from 'rxjs';
import { UsuarioModelo } from '../modelo/usuario/usuario-modelo';
import { elemento_Modelo } from '../modelo/jerarquizacion/elemento-modelo';
import { catchError, map, tap } from 'rxjs/operators';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Jerarquizacion } from '../modelo/jerarquizacion/jerarquizacion-modelo';
import { rastreo_Elemento_Modelo } from '../modelo/rastreo/rastreo-elemento-modelo';
import { Localizacion_Modelo } from '../modelo/localizacion/localizacion-modelo';
import { sitio_Modelo } from '../modelo/sitio/sitio-modelo';
import { area_Modelo } from '../modelo/area/area-modelo';
import { caracterizacion_Modelo } from '../modelo/resumen/caracterizacion-modelo';
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
    return this.http.get<elemento_Modelo>(this.rootUrl + '/elemento/validar/' + codigoe);
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
  //agregar una nueva jerarquizacion Global
  addJerarquizacionGlobal(jerarquizacion: Jerarquizacion): Observable<Jerarquizacion> {
    return this.http.post<Jerarquizacion>(this.rootUrl + '/jerarquizacion/registro/global', jerarquizacion, httpOptions);
  }
  //agregar una nueva jerarquizacion Nacional
  addJerarquizacionNacional(jerarquizacion: Jerarquizacion): Observable<Jerarquizacion> {
    return this.http.post<Jerarquizacion>(this.rootUrl + '/jerarquizacion/registro/nacional', jerarquizacion, httpOptions);
  }
  //agregar una nueva jerarquizacion Subnacional
  addJerarquizacionSubnacional(jerarquizacion: Jerarquizacion): Observable<Jerarquizacion> {
    return this.http.post<Jerarquizacion>(this.rootUrl + '/jerarquizacion/registro/subnacional', jerarquizacion, httpOptions);
  }
  //agregar una nuevo rastreo elemento
  addRastreoElemento(rastreoElemento: rastreo_Elemento_Modelo): Observable<rastreo_Elemento_Modelo> {
    return this.http.post<rastreo_Elemento_Modelo>(this.rootUrl + '/rastreo/registro', rastreoElemento, httpOptions);
  }
  //agregar una nueva localizacion
  addLocalizacionElemento(localizacion: Localizacion_Modelo): Observable<Localizacion_Modelo> {
    return this.http.post<Localizacion_Modelo>(this.rootUrl + '/localizacion/registro', localizacion, httpOptions);
  }
  //agregar un nuevo sitio
  addSitio(sitio: sitio_Modelo): Observable<sitio_Modelo> {
    return this.http.post<sitio_Modelo>(this.rootUrl + '/sitio/registro', sitio, httpOptions);
  }
  //agregar un area
  addArea(area: area_Modelo): Observable<area_Modelo> {
    return this.http.post<area_Modelo>(this.rootUrl + '/area/registro', area, httpOptions);
  }
  //agregar una caracterizacion planta
  addCaracterizacionPlanta(caracterizacion: caracterizacion_Modelo): Observable<caracterizacion_Modelo> {
    return this.http.post<caracterizacion_Modelo>(this.rootUrl + '/caracterizacion/registro/planta', caracterizacion, httpOptions);
  }
  //agregar una caracterizacion vertebrados
  addCaracterizacionVertebrado(caracterizacion: caracterizacion_Modelo): Observable<caracterizacion_Modelo> {
    return this.http.post<caracterizacion_Modelo>(this.rootUrl + '/caracterizacion/registro/veretebrado', caracterizacion, httpOptions);
  }

  public upload(files: Set<File>): { [key: string]: Observable<number> } {
    const status = {};
    files.forEach(file => {
      const formData: FormData = new FormData();
      formData.append('file', file, file.name);
      console.log('Archivo', file.name);
    });
    return status;
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

