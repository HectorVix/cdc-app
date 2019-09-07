import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpRequest, HttpEventType, HttpResponse } from '@angular/common/http';
import { Observable, of, Subject } from 'rxjs';
import { fuente_Modelo } from '../../modelo/fuente/fuente-modelo';
import { respuesta_cdc_Modelo } from '../../modelo/respuestaServicio/respuesta-cdc';
import { catchError, map, tap } from 'rxjs/operators';
import { archivo_Modelo } from '../../modelo/archivoDatos/archivo-datos';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json', 'No-Auth': 'True' })
};
@Injectable({
  providedIn: 'root'
})
export class FuenteService {

  constructor(private http: HttpClient) { }

  /*
    Obtener Fuente por codigofuente, naturaleza del documento
    cita, archivado o una clave
   */
  getFuentes(a: String, b: String, c: String, d: String, e: String): Observable<fuente_Modelo> {
    return this.http.get<fuente_Modelo>('/cecon/fuente/buscar/' + a + '/' + b + '/' + c + '/' + d + '/' + e);
  }
  get All() { return this.http.get<fuente_Modelo>('/cecon/fuente/all'); }
  getDatosArchivos(fuenteId: Number): Observable<archivo_Modelo> {
    return this.http.get<archivo_Modelo>('/cecon/fuente/buscarArchivos/' + fuenteId);
  }
  descargarArchivo(nombre: String, archivoId: Number): Observable<archivo_Modelo> {
    return this.http.get<archivo_Modelo>('/cecon/fuente/descargarArchivo/' + nombre + '/' + archivoId);
  }
  addFuente(fuente: fuente_Modelo, jti: Number): Observable<respuesta_cdc_Modelo> {
    return this.http.post<respuesta_cdc_Modelo>('/cecon/fuente/registro/' + jti, fuente, httpOptions);
  }
  editarFuente(fuente: fuente_Modelo, jti: Number): Observable<respuesta_cdc_Modelo> {
    return this.http.post<respuesta_cdc_Modelo>('/cecon/fuente/editar/' + jti, fuente, httpOptions);
  }

  //cargar archivos
  public cargarArchivos(archivos: Set<File>, fuenteid: Number): { [key: string]: Observable<number> } {
    const estado = {};
    archivos.forEach(archivo => {
      var formData: FormData = new FormData();
      formData.append('file', archivo, archivo.name);
      var req = new HttpRequest('POST', '/cecon/fuente/cargarArchivos/' + fuenteid, formData, {
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
}
