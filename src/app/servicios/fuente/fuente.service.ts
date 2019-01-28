import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpRequest, HttpEventType, HttpResponse } from '@angular/common/http';
import { Observable, of, Subject } from 'rxjs';
import { fuente_Modelo } from '../../modelo/fuente/fuente-modelo';
import { respuesta_cdc_Modelo } from '../../modelo/respuestaServicio/respuesta-cdc';
import { catchError, map, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json', 'No-Auth': 'True' })
};
@Injectable({
  providedIn: 'root'
})
export class FuenteService {
  readonly rootUrl = 'http://localhost:8080/cdc/rs';

  constructor(private http: HttpClient) { }

  /*
    Obtener Fuente por codigofuente, naturaleza del documento
    cita, archivado o una clave
   */
  getFuentes(a: String, b: String, c: String, d: String, e: String): Observable<fuente_Modelo> {
    return this.http.get<fuente_Modelo>(this.rootUrl + '/fuente/buscar/' + a + '/' + b + '/' + c + '/' + d + '/' + e);
  }
  addFuente(fuente: fuente_Modelo, jti: Number): Observable<fuente_Modelo> {
    return this.http.post<fuente_Modelo>(this.rootUrl + '/fuente/registro/' + jti, fuente, httpOptions)
      .pipe(
        catchError(this.handleError<fuente_Modelo>('addFuente'))
      );
  }
  editarFuente(fuente: fuente_Modelo, jti: Number): Observable<fuente_Modelo> {
    return this.http.post<fuente_Modelo>(this.rootUrl + '/fuente/editar/' + jti, fuente, httpOptions);
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
}
