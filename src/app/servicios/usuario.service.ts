import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpRequest, HttpEventType, HttpResponse } from '@angular/common/http';
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
import { fuente_Modelo } from '../modelo/fuente/fuente-modelo';
import { foto_Modelo } from '../modelo/fotoDatos/foto-datos';
import { formatDate } from '@angular/common';
import { contacto_Modelo } from '../modelo/contacto/contacto-modelo';

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
  //agregar un contacto
  addContacto(contacto: contacto_Modelo, jti: Number): Observable<contacto_Modelo> {
    return this.http.post<contacto_Modelo>(this.rootUrl + '/contacto/registro/' + jti, contacto, httpOptions)
    .pipe(
      catchError(this.handleError<contacto_Modelo>('addContacto'))
    );
  }
  //agregar una caracterizacion planta
  addCaracterizacionPlanta(caracterizacion: caracterizacion_Modelo): Observable<caracterizacion_Modelo> {
    return this.http.post<caracterizacion_Modelo>(this.rootUrl + '/caracterizacion/registro/planta', caracterizacion, httpOptions);
  }
  //agregar una caracterizacion vertebrados
  addCaracterizacionVertebrado(caracterizacion: caracterizacion_Modelo): Observable<caracterizacion_Modelo> {
    return this.http.post<caracterizacion_Modelo>(this.rootUrl + '/caracterizacion/registro/vertebrado', caracterizacion, httpOptions);
  }
  //agregar un resumen de fuente
  addFuente(fuente: fuente_Modelo, jti: Number): Observable<fuente_Modelo> {
    return this.http.post<fuente_Modelo>(this.rootUrl + '/fuente/registro/' + jti, fuente, httpOptions);
  }
  //cargar archivos
  public cargarArchivos(archivos: Set<File>, fuenteid: Number): { [key: string]: Observable<number> } {
    const estado = {};
    archivos.forEach(archivo => {
      var formData: FormData = new FormData();
      formData.append('file', archivo, archivo.name);
      var req = new HttpRequest('POST', this.rootUrl + '/fuente/cargarArchivos/' + fuenteid, formData, {
        reportProgress: true
      });
      var progreso = new Subject<number>();
      this.http.request(req).subscribe(event => {
        if (event.type === HttpEventType.UploadProgress) {
          const porcentajeCargado = Math.round(100 * event.loaded / event.total);
          progreso.next(porcentajeCargado);
        } else if (event instanceof HttpResponse) {
          progreso.complete();
        }
      });
      estado[archivo.name] = {
        progreso: progreso.asObservable()
      };
    });
    return estado;
  }
  cargarFotos(archivos: Set<File>, datosFotos: any, elemento_id: Number) {
    var cont = 0;
    const estado = {};
    var fechaCreacion;
    archivos.forEach(archivo => {
      var formData: FormData = new FormData();
      var baseFotoModelo = new foto_Modelo();
      baseFotoModelo = datosFotos[cont];
      if (baseFotoModelo.fecha) {
        fechaCreacion = this.toFormato2(baseFotoModelo.fecha);
        console.log('estado1:', fechaCreacion);
      }
      formData.append('file', archivo, archivo.name);
      formData.append('descripcion', baseFotoModelo.descripcion);
      formData.append('comentario', baseFotoModelo.comentario);
      formData.append('autor', baseFotoModelo.autor);
      formData.append('fecha', fechaCreacion);
      var req = new HttpRequest('POST', this.rootUrl + '/elemento/cargarFoto/' + elemento_id, formData, {
        reportProgress: true
      });
      var progreso = new Subject<number>();
      this.http.request(req).subscribe(event => {
        if (event.type === HttpEventType.UploadProgress) {
          const porcentajeCargado = Math.round(100 * event.loaded / event.total);
          progreso.next(porcentajeCargado);
        } else if (event instanceof HttpResponse) {
          progreso.complete();
        }
      });
      estado[archivo.name] = {
        progreso: progreso.asObservable()
      };
      cont = cont + 1;
    });
    return estado;
  }
  //obtener foto por id
  public getFoto(id: Number): Observable<Blob> {
    return this.http.get(this.rootUrl + '/elemento/imagen/' + id, { responseType: "blob" });
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
    var dia = date.day;
    dia = dia + 1;
    return date ? new Date('' + date.year + '-' + date.month + '-' + dia) : null;
  }
  fromModel(date: Date): NgbDateStruct {
    return date ? {
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      day: date.getDate()
    } : null;
  }
  toFormato2(date): string {
    return '' + date.day + '/' + date.month + '/' + date.year;
  }
}