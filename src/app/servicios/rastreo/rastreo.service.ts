import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, Subject } from 'rxjs';
import { rastreo_Elemento_Modelo } from '../../modelo/rastreo/rastreo-elemento-modelo';
import { respuesta_cdc_Modelo } from '../../modelo/respuestaServicio/respuesta-cdc';
import { statusGlobal_Modelo } from '../../modelo/respuestaServicio/re-status-global';
import { statusNacional_Modelo } from '../../modelo/respuestaServicio/re-status-nacional';
import { statusSubnacional_Modelo } from '../../modelo/respuestaServicio/re-status-subnacional';
import { Valor } from '../../modelo/select/overwiew-valor';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json', 'No-Auth': 'True' })
};
@Injectable({
  providedIn: 'root'
})
export class RastreoService {
  criterio_Reino = []
  criterio_Phylum = []
  criterio_Clase = []
  criterio_Orden = []
  criterio_Familia = []
  criterio_Genero = []
  criterio_Especie = []
  criterio_Infraspecificepithet = []

  constructor(private http: HttpClient) { }

  //Obtener Rastreo del Elemento por codigoe, subnacion, nombrenacional,nombrecomun,rol
  getRastreosElementos(a: String, b: String, c: String, d: String, e: String, f: String, g: String, ) {
    return this.http.get<rastreo_Elemento_Modelo>('/cecon/rastreo/buscar/' + a + '/' + b + '/' + c + '/' + d + '/' + e + '/' + f + '/' + g);
  }

  get_All_Rastreo(rol: String) {
    return this.http.get<rastreo_Elemento_Modelo>('/cecon/rastreo/all/' + rol);
  }
  //Obtener Status Global
  get_Status_Global(codigoe: String) {
    return this.http.get<statusGlobal_Modelo>('/cecon/rastreo/status/global/' + codigoe);
  }
  //Obtener Status Nacional
  get_Status_Nacional(codigoe: String) {
    return this.http.get<statusNacional_Modelo>('/cecon/rastreo/status/nacional/' + codigoe);
  }
  //Obtener Status Subnacional
  get_Status_Subnacional(codigoe: String, subnacion: String) {
    return this.http.get<statusSubnacional_Modelo>('/cecon/rastreo/status/subnacional/' + codigoe + '/' + subnacion);
  }
  addRastreoElemento(rastreoElemento: rastreo_Elemento_Modelo): Observable<respuesta_cdc_Modelo> {
    return this.http.post<respuesta_cdc_Modelo>('/cecon/rastreo/registro', rastreoElemento, httpOptions);
  }
  editarRastreoElemento(re: rastreo_Elemento_Modelo, elemento_id: Number): Observable<respuesta_cdc_Modelo> {
    return this.http.post<respuesta_cdc_Modelo>('/cecon/rastreo/editar/' + elemento_id, re, httpOptions);
  }

  //Obtener Taxonomia
  obtener_Reino() {
    this.criterio_Reino = []
    this.reino.subscribe(
      (resReino: any[]) => {
        resReino.forEach(reino => {
          var modelo_Valor = new Valor()
          modelo_Valor.value = reino.reinoId
          modelo_Valor.viewValue = reino.nombre
          this.criterio_Reino.push(modelo_Valor)
          
        });
      }, err => {
      });
  }
  obtener_Phylum(reino_id) {
    this.criterio_Phylum = []
    this.get_Phylum(reino_id).subscribe(
      (resPhylum: any[]) => {
        resPhylum.forEach(phylum => {
          var modelo_Valor = new Valor()
          modelo_Valor.value = phylum.phylumId
          modelo_Valor.viewValue = phylum.nombre
          this.criterio_Phylum.push(modelo_Valor)
          
        });
      }, err => {
      });
  }
  obtener_Clase(phylum_id) {
    this.criterio_Clase = []
    this.get_Clase(phylum_id).subscribe(
      (resClase: any[]) => {
        resClase.forEach(clase => {
          var modelo_Valor = new Valor()
          modelo_Valor.value = clase.claseId
          modelo_Valor.viewValue = clase.nombre
          this.criterio_Clase.push(modelo_Valor)
          
        });
      }, err => {
      });
  }
  obtener_Orden(clase_id) {
    this.criterio_Orden = []
    this.get_Orden(clase_id).subscribe(
      (resOrden: any[]) => {
        resOrden.forEach(orden => {
          var modelo_Valor = new Valor()
          modelo_Valor.value = orden.ordenId
          modelo_Valor.viewValue = orden.nombre
          this.criterio_Orden.push(modelo_Valor)
          
        });
      }, err => {
      });
  }
  obtener_Familia(orden_id) {
    this.criterio_Familia = []
    this.get_Familia(orden_id).subscribe(
      (resFamilia: any[]) => {
        resFamilia.forEach(familia => {
          var modelo_Valor = new Valor()
          modelo_Valor.value = familia.familiaId
          modelo_Valor.viewValue = familia.nombre
          this.criterio_Familia.push(modelo_Valor)
          
        });
      }, err => {
      });
  }
  obtener_Genero(familia_id) {
    this.criterio_Genero = []
    this.get_Genero(familia_id).subscribe(
      (resGenero: any[]) => {
        resGenero.forEach(genero => {
          var modelo_Valor = new Valor()
          modelo_Valor.value = genero.generoId
          modelo_Valor.viewValue = genero.nombre
          this.criterio_Genero.push(modelo_Valor)
          
        });
      }, err => {
      });
  }
  obtener_Especie(genero_id) {
    this.criterio_Especie = []
    this.get_Especie(genero_id).subscribe(
      (resEspecie: any[]) => {
        resEspecie.forEach(especie => {
          var modelo_Valor = new Valor()
          modelo_Valor.value = especie.especieId
          modelo_Valor.viewValue = especie.nombre
          this.criterio_Especie.push(modelo_Valor)
          
        });
      }, err => {
      });
  }
  obtener_Infraspecificepithet(especie_id) {
    
    this.criterio_Infraspecificepithet = []
    this.get_Infraspecificepithet(especie_id).subscribe(
      (resInfraspecificepithet: any[]) => {
        resInfraspecificepithet.forEach(infraspecificepithet => {
          var modelo_Valor = new Valor()
          modelo_Valor.value = infraspecificepithet.infraspecificepithetId
          modelo_Valor.viewValue = infraspecificepithet.nombre
          this.criterio_Infraspecificepithet.push(modelo_Valor)

        });
      }, err => {
      });
  }
  get reino() {
    return this.http.get('/cecon/rastreo/all/reino')
  }
  get_Phylum(reino_id) {
    return this.http.get('/cecon/rastreo/phylum/' + reino_id)
  }
  get_Clase(phylum_id) {
    return this.http.get('/cecon/rastreo/clase/' + phylum_id)
  }
  get_Orden(reino_id) {
    return this.http.get('/cecon/rastreo/orden/' + reino_id)
  }
  get_Familia(orden_id) {
    return this.http.get('/cecon/rastreo/familia/' + orden_id)
  }
  get_Genero(familia_id) {
    return this.http.get('/cecon/rastreo/genero/' + familia_id)
  }
  get_Especie(genero_id) {
    return this.http.get('/cecon/rastreo/especie/' + genero_id)
  }
  get_Infraspecificepithet(especie_id) {
    return this.http.get('/cecon/rastreo/infraspecificepithet/' + especie_id)
  }
  //Obtener Valores Taxonomia
  get reino_Valor() { return this.criterio_Reino }
  get phylum_Valor() { return this.criterio_Phylum }
  get clase_Valor() { return this.criterio_Clase }
  get orden_Valor() { return this.criterio_Orden }
  get familia_Valor() { return this.criterio_Familia }
  get genero_Valor() { return this.criterio_Genero }
  get especie_Valor() { return this.criterio_Especie }
  get infraspecificepithet_Valor() { return this.criterio_Infraspecificepithet }
}
