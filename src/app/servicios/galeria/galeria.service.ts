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

  constructor(private http: HttpClient, private fechaServicio: FechaService) { }

  getDatosFotos(elementoId: Number, tipo: Number): Observable<foto_Modelo> {
    return this.http.get<foto_Modelo>('/cecon/elemento/buscarFotos/' + elementoId + '/' + tipo);
  }
  cargarFotos(archivos: Set<File>, datosFotos: any, elemento_id: Number, tipos: Number) {
    var posicion = 0;
    const estado = {};
    var fechaCreacion = null;
    archivos.forEach(archivo => {
      var formData: FormData = new FormData();
      var baseFotoModelo = new foto_Modelo();
      // baseFotoModelo = datosFotos[posicion];
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
      var req = new HttpRequest('POST', '/cecon/elemento/cargarFoto/' + elemento_id + '/' + tipos, formData, {
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
    tam_Final_ListaFotos: number,
    tipos: Number) {
    //console.log("Tamaño final lista fotos:", tam_Final_ListaFotos)
    var tipo = -1;
    if (tam_Final_ListaFotos == tam_Inicial_ListaFotos) {
      tipo = 1;
    }
    if (tam_Final_ListaFotos > tam_Inicial_ListaFotos && tam_Inicial_ListaFotos >= 1) {
      tipo = 2;
    }
    if (tam_Final_ListaFotos < tam_Inicial_ListaFotos && tam_Final_ListaFotos >= 1) {
      tipo = 3;
    }
    if (tam_Final_ListaFotos == 0 && tam_Inicial_ListaFotos >= 1) {
      tipo = 4;
    }
    if (tam_Inicial_ListaFotos == 0 && tam_Final_ListaFotos >= 1) {
      tipo = 5;
    }
    switch (tipo) {
      case 1: { //listas final igual a la inicial
        //console.log("La lista final igual a la inicial")
        var posicion = 0;
        const estado = {};
        var fechaCreacion = null;
        archivos.forEach(archivo => {
          var formData: FormData = new FormData();
          var baseFotoModelo = new foto_Modelo();
          // baseFotoModelo = datosFotos[posicion];
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
          var req = new HttpRequest('POST', '/cecon/elemento/updateFoto/' + elemento_id + '/' + fotoId + '/' + tipos, formData, {
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
        //console.log("La lista final es mayor a la inicial")
        var posicion = 0;
        const estado = {};
        var fechaCreacion = null;
        archivos.forEach(archivo => {
          var formData: FormData = new FormData();
          var baseFotoModelo = new foto_Modelo();
          //baseFotoModelo = datosFotos[posicion];
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
            var req = new HttpRequest('POST', '/cecon/elemento/updateFoto/' + elemento_id + '/' + fotoId + '/' + tipos, formData, {
              reportProgress: true
            });
          }
          else {//se cargan las nuevas fotos que están fuera del tamaño inicial
            var req = new HttpRequest('POST', '/cecon/elemento/cargarFoto/' + elemento_id + '/' + tipos, formData, {
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
        //lista menor a la inicial
        //console.log("La lista es menor a la inicial")
        var posicion = 0;
        const estado = {};
        var fechaCreacion = null;
        archivos.forEach(archivo => {
          var formData: FormData = new FormData();
          var baseFotoModelo = new foto_Modelo();
          //baseFotoModelo = datosFotos[posicion];
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
            var req = new HttpRequest('POST', '/cecon/elemento/updateFoto/' + elemento_id + '/' + fotoId + '/' + tipos, formData, {
              reportProgress: true
            });
          }
          for (let i = tam_Final_ListaFotos; i < tam_Inicial_ListaFotos; i++) {
            var fotoId = fotoId_Lista[i];
            this.http.delete('/cecon/elemento/delete/' + fotoId, httpOptions).subscribe();
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
        //console.log("Se borra la lista")
        for (let i = 0; i < fotoId_Lista.length; i++) {
          var fotoId = fotoId_Lista[i];
          this.http.delete('/cecon/elemento/delete/' + fotoId, httpOptions).subscribe();
        }
      } break;
      case 5: {
        //console.log("Se carga una nueva lista")
        var posicion = 0;
        const estado = {};
        var fechaCreacion = null;
        archivos.forEach(archivo => {
          var formData: FormData = new FormData();
          var baseFotoModelo = new foto_Modelo();
          //baseFotoModelo = datosFotos[posicion];
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
          var req = new HttpRequest('POST', '/cecon/elemento/cargarFoto/' + elemento_id + '/' + tipos, formData, {
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
