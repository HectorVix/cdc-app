import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, Subject } from 'rxjs';
import { Localizacion_Modelo } from '../../modelo/localizacion/localizacion-modelo';
import { protocolo_LE_Modelo } from '../../modelo/localizacion/protocolo-le-modelo';
import { respuesta_cdc_Modelo } from '../../modelo/respuestaServicio/respuesta-cdc';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json', 'No-Auth': 'True' })
};
@Injectable({
  providedIn: 'root'
})
export class LocalizacionService {

  constructor() { }
}
