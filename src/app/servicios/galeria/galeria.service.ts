import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpRequest, HttpEventType, HttpResponse } from '@angular/common/http';
import { Observable, of, Subject } from 'rxjs';
import { foto_Modelo } from '../../modelo/fotoDatos/foto-datos';
import { respuesta_cdc_Modelo } from '../../modelo/respuestaServicio/respuesta-cdc';
import { FechaService } from '../../servicios/fecha/fecha.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json', 'No-Auth': 'True' })
};
@Injectable({
  providedIn: 'root'
})
export class GaleriaService {
  readonly rootUrl = 'http://localhost:8080/cdc/rs';

  constructor(private http: HttpClient, private fechaServicio: FechaService) { }

  getDatosFotos(elementoId: String): Observable<foto_Modelo> {
    return this.http.get<foto_Modelo>(this.rootUrl + '/elemento/buscarFotos/' + elementoId);
  }
  cargarFotos(archivos: Set<File>, datosFotos: any, elemento_id: Number) {
    var posicion = 0;
    const estado = {};
    var fechaCreacion = null;
    archivos.forEach(archivo => {
      var formData: FormData = new FormData();
      var baseFotoModelo = new foto_Modelo();
      baseFotoModelo = datosFotos[posicion];
      if (baseFotoModelo.fecha) {
        fechaCreacion = this.fechaServicio.toFormato2(baseFotoModelo.fecha);
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
    console.log('actualizando fotos:');
    if (tam_Final_ListaFotos == tam_Inicial_ListaFotos) {
      tipo = 1;
      console.log('tipo1');
    }
    if (tam_Final_ListaFotos > tam_Inicial_ListaFotos) {
      tipo = 2;
      console.log('tipo2');
    }
    if (tam_Final_ListaFotos < tam_Inicial_ListaFotos && tam_Final_ListaFotos >= 1) {
      tipo = 3;
      console.log('tipo3');
    }
    if (tam_Final_ListaFotos == 0 && tam_Inicial_ListaFotos >= 1) {
      tipo = 4;
      console.log('tipo4');
    }
    if (tam_Inicial_ListaFotos == 0 && tam_Final_ListaFotos >= 1) {
      tipo = 5;
      console.log('tipo5');
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
            fechaCreacion = this.fechaServicio.toFormato2(baseFotoModelo.fecha);
          }
          formData.append('file', archivo, archivo.name);
          formData.append('descripcion', baseFotoModelo.descripcion);
          formData.append('comentario', baseFotoModelo.comentario);
          formData.append('autor', baseFotoModelo.autor);
          formData.append('fecha', fechaCreacion);
          formData.append('posicion', '' + posicion);
          var fotoId = fotoId_Lista[posicion];
          posicion = posicion + 1;
          console.log('fotoId:', fotoId);
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
            fechaCreacion = this.fechaServicio.toFormato2(baseFotoModelo.fecha);
          }
          formData.append('file', archivo, archivo.name);
          formData.append('descripcion', baseFotoModelo.descripcion);
          formData.append('comentario', baseFotoModelo.comentario);
          formData.append('autor', baseFotoModelo.autor);
          formData.append('fecha', fechaCreacion);
          formData.append('posicion', '' + posicion);
          var fotoId = fotoId_Lista[posicion];
          if (posicion <= tam_Inicial_ListaFotos - 1) {//se actualizan las fotosId, pueden ser nuevas que estan dentro del rango tamaño inicial
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
            fechaCreacion = this.fechaServicio.toFormato2(baseFotoModelo.fecha);
          }
          formData.append('file', archivo, archivo.name);
          formData.append('descripcion', baseFotoModelo.descripcion);
          formData.append('comentario', baseFotoModelo.comentario);
          formData.append('autor', baseFotoModelo.autor);
          formData.append('fecha', fechaCreacion);
          formData.append('posicion', '' + posicion);
          var fotoId = fotoId_Lista[posicion];
          if (posicion <= tam_Inicial_ListaFotos - 1) {
            var req = new HttpRequest('POST', this.rootUrl + '/elemento/updateFoto/' + elemento_id + '/' + fotoId, formData, {
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
        break;
      }

      case 4: {
        for (let i = 0; i < fotoId_Lista.length; i++) {
          var fotoId = fotoId_Lista[i];
          this.http.post(this.rootUrl + '/elemento/delete/' + fotoId, httpOptions).subscribe();
        }
      } break;
      case 5: {
        var posicion = 0;
        const estado = {};
        var fechaCreacion = null;
        archivos.forEach(archivo => {
          var formData: FormData = new FormData();
          var baseFotoModelo = new foto_Modelo();
          baseFotoModelo = datosFotos[posicion];
          if (baseFotoModelo.fecha) {
            fechaCreacion = this.fechaServicio.toFormato2(baseFotoModelo.fecha);
          }
          formData.append('file', archivo, archivo.name);
          formData.append('descripcion', baseFotoModelo.descripcion);
          formData.append('comentario', baseFotoModelo.comentario);
          formData.append('autor', baseFotoModelo.autor);
          formData.append('fecha', fechaCreacion);
          formData.append('posicion', '' + posicion);
          var fotoId = fotoId_Lista[posicion];
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
          posicion = posicion + 1;
        });
      }
        break;
      default: { break; }
    }
  }
}
