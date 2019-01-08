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
import { protocolo_LE_Modelo } from '../modelo/localizacion/protocolo-le-modelo';
import { sitio_Modelo } from '../modelo/sitio/sitio-modelo';
import { area_Modelo } from '../modelo/area/area-modelo';
import { caracterizacion_Modelo } from '../modelo/resumen/caracterizacion-modelo';
import { fuente_Modelo } from '../modelo/fuente/fuente-modelo';
import { foto_Modelo } from '../modelo/fotoDatos/foto-datos';
import { formatDate } from '@angular/common';
import { contacto_Modelo } from '../modelo/contacto/contacto-modelo';

const httpOptions = {
  //headers: new HttpHeaders({ 'Content-Type': 'application/json', 'No-Auth': 'True' })
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  readonly rootUrl = 'http://localhost:8080/cdc/rs';
  data: any;
  mensajeErrores: String;

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
  //------------------------------------------------------------------------------------------------------
  //obtener elementos
  getElementos(codigo: String, nombrecomun, nombrecientifico) {
    return this.http.get(this.rootUrl + '/elemento/buscar/' + codigo + '/' + nombrecomun + '/' + nombrecientifico);
  }
  //obtener foto por id
  public getFoto(id: Number): Observable<Blob> {
    return this.http.get(this.rootUrl + '/elemento/imagen/' + id, { responseType: "blob" });
  }
  getDatosFotos(elementoId: String): Observable<foto_Modelo> {
    return this.http.get<foto_Modelo>(this.rootUrl + '/elemento/buscarFotos/' + elementoId);
  }
  //obtener Rastreo del Elemento por codigoe, subnacion, nombreg, nombrecomunnn
  getRastreoElemento(a: String, b: String, c: String, d: String, e: String): Observable<rastreo_Elemento_Modelo> {
    return this.http.get<rastreo_Elemento_Modelo>(this.rootUrl + '/rastreo/buscar/' + a + '/' + b + '/' + c + '/' + d + '/' + e);
  }
  //--------------------------------------------------------------------------------------------------------
  //agregar un nuevo usuario
  addUsuario(us: UsuarioModelo): Observable<UsuarioModelo> {
    return this.http.post<UsuarioModelo>(this.rootUrl + '/us/reg', us, httpOptions);
  }
  //agregar un nuevo elemento
  addElemento(elemento: elemento_Modelo, jti: String): Observable<elemento_Modelo> {
    return this.http.post<elemento_Modelo>(this.rootUrl + '/elemento/registro/' + jti, elemento, httpOptions);
  }
  //editar elemento
  editarElemento(elemento: elemento_Modelo, jti: String): Observable<elemento_Modelo> {
    return this.http.post<elemento_Modelo>(this.rootUrl + '/elemento/editar/' + jti, elemento, httpOptions);
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
  //agregar una nueva localización
  addLocalizacionElemento(localizacion: Localizacion_Modelo): Observable<Localizacion_Modelo> {
    return this.http.post<Localizacion_Modelo>(this.rootUrl + '/localizacion/registro', localizacion, httpOptions);
  }

  //agregar nuevo protocolo LE
  addProtocoloLE(protocoloLE: protocolo_LE_Modelo): Observable<protocolo_LE_Modelo> {
    return this.http.post<protocolo_LE_Modelo>(this.rootUrl + '/protocolo/registro', protocoloLE, httpOptions);
    //.pipe(
    //  catchError(this.handleError<protocolo_LE_Modelo>('addProtocoloLE'))
    //  );
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
    return this.http.post<contacto_Modelo>(this.rootUrl + '/contacto/registro/' + jti, contacto, httpOptions);
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

  //------------------------------------------------------------------------------------------------------------------------
  //validar y obtener elemento id
  validarElementoCodigoe(codigoe: String) {
    return this.http.get<elemento_Modelo>(this.rootUrl + '/elemento/validar/' + codigoe);
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
  //guardar la  lista de fotos
  cargarFotos(archivos: Set<File>, datosFotos: any, elemento_id: Number) {
    var posicion = 0;
    const estado = {};
    var fechaCreacion = null;
    archivos.forEach(archivo => {
      var formData: FormData = new FormData();
      var baseFotoModelo = new foto_Modelo();
      baseFotoModelo = datosFotos[posicion];
      if (baseFotoModelo.fecha) {
        fechaCreacion = this.toFormato2(baseFotoModelo.fecha);
      }
      formData.append('file', archivo, archivo.name);
      formData.append('descripcion', baseFotoModelo.descripcion);
      formData.append('comentario', baseFotoModelo.comentario);
      formData.append('autor', baseFotoModelo.autor);
      formData.append('fecha', fechaCreacion);
      formData.append('posicion', '' + posicion);
      posicion = posicion + 1;
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
    });
    return estado;
  }
  // actualizar  lista de fotos
  update_FotoId_Lista(archivos: Set<File>,
    datosFotos: any,
    elemento_id: Number,
    fotoId_Lista,
    tam_Inicial_ListaFotos,
    tam_Final_ListaFotos: number) {
    var tipo = -1;
    if (tam_Final_ListaFotos == tam_Inicial_ListaFotos) {
      tipo = 1;
    }
    if (tam_Final_ListaFotos > tam_Inicial_ListaFotos) {
      tipo = 2;
    }
    if (tam_Final_ListaFotos < tam_Inicial_ListaFotos && tam_Final_ListaFotos >= 1) {
      tipo = 3;
    }
    if (tam_Final_ListaFotos == 0 && tam_Inicial_ListaFotos >= 1) {
      tipo = 4;
    }
    switch (tipo) {
      case 1: { //listas final igual a la inicial
        var posicion = 0;
        const estado = {};
        var fechaCreacion = null;
        archivos.forEach(archivo => {
          var formData: FormData = new FormData();
          var baseFotoModelo = new foto_Modelo();
          baseFotoModelo = datosFotos[posicion];
          if (baseFotoModelo.fecha) {
            fechaCreacion = this.toFormato2(baseFotoModelo.fecha);
          }
          formData.append('file', archivo, archivo.name);
          formData.append('descripcion', baseFotoModelo.descripcion);
          formData.append('comentario', baseFotoModelo.comentario);
          formData.append('autor', baseFotoModelo.autor);
          formData.append('fecha', fechaCreacion);
          formData.append('posicion', '' + posicion);
          var fotoId = fotoId_Lista[posicion];
          posicion = posicion + 1;
          var req = new HttpRequest('POST', this.rootUrl + '/elemento/updateFoto/' + elemento_id + '/' + fotoId, formData, {
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
      }
        break;
      case 2: { // la lista final es mayor a la inicial
        var posicion = 0;
        const estado = {};
        var fechaCreacion = null;
        archivos.forEach(archivo => {
          var formData: FormData = new FormData();
          var baseFotoModelo = new foto_Modelo();
          baseFotoModelo = datosFotos[posicion];
          if (baseFotoModelo.fecha) {
            fechaCreacion = this.toFormato2(baseFotoModelo.fecha);
          }
          formData.append('file', archivo, archivo.name);
          formData.append('descripcion', baseFotoModelo.descripcion);
          formData.append('comentario', baseFotoModelo.comentario);
          formData.append('autor', baseFotoModelo.autor);
          formData.append('fecha', fechaCreacion);
          formData.append('posicion', '' + posicion);
          var fotoId = fotoId_Lista[posicion];
          if (posicion <= tam_Inicial_ListaFotos - 1) {//se actualizan las fotosId ,pueden ser nuevas que estan dentro del rango tamaño inicial
            var req = new HttpRequest('POST', this.rootUrl + '/elemento/updateFoto/' + elemento_id + '/' + fotoId, formData, {
              reportProgress: true
            });
          }
          else {//se cargan las nuevas fotos que están fuera del tamaño inicial
            var req = new HttpRequest('POST', this.rootUrl + '/elemento/cargarFoto/' + elemento_id, formData, {
              reportProgress: true
            });
          }
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
          posicion = posicion + 1;
        });
      }
        break;
      case 3: {
        var posicion = 0;
        const estado = {};
        var fechaCreacion = null;
        archivos.forEach(archivo => {
          var formData: FormData = new FormData();
          var baseFotoModelo = new foto_Modelo();
          baseFotoModelo = datosFotos[posicion];
          if (baseFotoModelo.fecha) {
            fechaCreacion = this.toFormato2(baseFotoModelo.fecha);
          }
          formData.append('file', archivo, archivo.name);
          formData.append('descripcion', baseFotoModelo.descripcion);
          formData.append('comentario', baseFotoModelo.comentario);
          formData.append('autor', baseFotoModelo.autor);
          formData.append('fecha', fechaCreacion);
          formData.append('posicion', '' + posicion);
          var fotoId = fotoId_Lista[posicion];
          posicion = posicion + 1;
          var req = new HttpRequest('POST', this.rootUrl + '/elemento/updateFoto/' + elemento_id + '/' + fotoId, formData, {
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
        for (let i = tam_Final_ListaFotos; i < tam_Inicial_ListaFotos; i++) {
          var fotoId = fotoId_Lista[i];
          this.http.post(this.rootUrl + '/elemento/delete/' + fotoId, httpOptions).subscribe();
        }
      }
        break;
      case 4: {
        for (let i = 0; i < fotoId_Lista.length; i++) {
          var fotoId = fotoId_Lista[i];
          this.http.post(this.rootUrl + '/elemento/delete/' + fotoId, httpOptions).subscribe();
        }
      } break;
      default: { break; }
    }
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
    this.mensajeErrores = (`CDC Servicio: ${message}`);
  }
  public get mensajeError() {
    return this.mensajeError;
  }
  //Cambiar formato de la fecha
  toFormato(date: NgbDateStruct): Date {
    var dia = date.day;
    // dia = dia + 1;
    return date ? new Date('' + date.year + '-' + date.month + '-' + dia) : null;
  }
  //Cambiar formato de la fecha y tiempo
  toFormatoDateTime(date: NgbDateStruct): Date {
    var elAhora = new Date();
    var dia = date.day;
    // dia = dia + 1;
    return date ? new Date('' + date.year + '-' + date.month + '-' + dia + ' ' + elAhora.getHours() + ':' + elAhora.getMinutes() + ':' + elAhora.getSeconds()) : null;
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

  getFecha(fecha) {
    var dateElemento = null;
    if (fecha != null) {
      let d = new Date();
      d = new Date(fecha);
      dateElemento = this.fromModel(d);
    }
    return dateElemento;
  }

}