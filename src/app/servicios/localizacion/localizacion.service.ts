import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Localizacion_Modelo } from '../../modelo/localizacion/localizacion-modelo';
import { protocolo_LE_Modelo } from '../../modelo/localizacion/protocolo-le-modelo';
import { proteccion_Modelo } from '../../modelo/localizacion/proteccion-modelo';
import { dispersion_Modelo } from '../../modelo/localizacion/dispersion-modelo';
import { identificadores_Modelo } from '../../modelo/respuestaServicio/identificadores-le';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json', 'No-Auth': 'True' })
};
@Injectable({
  providedIn: 'root'
})
export class LocalizacionService {

  constructor(private http: HttpClient) { }


  addLocalizacionElemento(localizacion: Localizacion_Modelo) {
    return this.http.post<identificadores_Modelo>('/cecon/localizacion/registro', localizacion, httpOptions);
  }
  addProteccion(proteccion: proteccion_Modelo, id: Number) {
    return this.http.post('/cecon/localizacion/registrar/proteccion/' + id, proteccion, httpOptions);
  }
  addDispersion(dispersion: dispersion_Modelo, id: Number) {
    return this.http.post('/cecon/protocolo/registrar/dispersion/' + id, dispersion, httpOptions);
  }
  addProtocoloLE(protocoloLE: protocolo_LE_Modelo) {
    return this.http.post<identificadores_Modelo>('/cecon/protocolo/registro', protocoloLE, httpOptions);
  }
  //Obtener Localización del Elemento por codigole, nombres, nomcomuns
  getLocalizacionesElementos(a: String): Observable<Localizacion_Modelo> {
    return this.http.get<Localizacion_Modelo>('/cecon/localizacion/buscar/' + a);
  }
  get all_Localizacion() { return this.http.get<Localizacion_Modelo>('/cecon/localizacion/all'); }
  
  //Obtener Protocolo Localización del Elemento por codigoe, nombre, nomcomun
  getProtocoloLE(a: String, b: String, c: String): Observable<protocolo_LE_Modelo> {
    return this.http.get<protocolo_LE_Modelo>('/cecon/protocolo/buscar/' + a + '/' + b + '/' + c);
  }
  // Obtener protección 
  getProteccion(localizacion_id: Number): Observable<proteccion_Modelo> {
    return this.http.get<proteccion_Modelo>('/cecon/localizacion/proteccion/' + localizacion_id);
  }
  getDispersion(protocolo_id: Number): Observable<dispersion_Modelo> {
    return this.http.get<dispersion_Modelo>('/cecon/protocolo/dispersion/' + protocolo_id);
  }
  // Validar CodigoLE
  get_ValidarCodigoLE(codigoLE: String) {
    return this.http.get<identificadores_Modelo>('/cecon/localizacion/validar/' + codigoLE);
  }
  get_Identificadores_NombreS_RangoS(codigoe: String, departamento: String) {
    return this.http.get<identificadores_Modelo>('/cecon/localizacion/identificadores/NombreS/RangoS/' + codigoe + '/' + departamento);
  }
  get_Identificadores_RangoN(codigoe: String) {
    return this.http.get<identificadores_Modelo>('/cecon/localizacion/identificadores/RangoN/' + codigoe);
  }
  get_Identificadores_RangoG(codigoe: String) {
    return this.http.get<identificadores_Modelo>('/cecon/localizacion/identificadores/RangoG/' + codigoe);
  }
  get_Identificadores_NombreComunN(codigoe: String) {
    return this.http.get<identificadores_Modelo>('/cecon/localizacion/identificadores/NombreComunN/' + codigoe);
  }
  updateLocalizacionElemento(le: Localizacion_Modelo, rastreoId: Number) {
    return this.http.post<identificadores_Modelo>('/cecon/localizacion/editar/' + rastreoId, le, httpOptions);
  }
  updateProtocoloLE(protocoloLE: protocolo_LE_Modelo, elementoId: Number) {
    return this.http.post<identificadores_Modelo>('/cecon/protocolo/editar/' + elementoId, protocoloLE, httpOptions);
  }
  updateProteccion(id: String, proteccion: proteccion_Modelo) {
    return this.http.post('/cecon/localizacion/update/proteccion/' + id, proteccion, httpOptions);
  }
  updateDispersion(id: String, dispersion: dispersion_Modelo) {
    return this.http.post('/cecon/protocolo/update/dispersion/' + id, dispersion, httpOptions);
  }
  deleteProteccion(id: String) {
    return this.http.post('/cecon/localizacion/delete/proteccion/' + id, httpOptions);
  }
  deleteDispersion(id: String) {
    return this.http.post('/cecon/protocolo/delete/dispersion/' + id, httpOptions);
  }

}
