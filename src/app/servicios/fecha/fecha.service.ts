import { Injectable } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Injectable({
  providedIn: 'root'
})
export class FechaService {

  constructor() { }
  //Cambiar formato de la fecha
  toFormato(date: NgbDateStruct): Date {
    var dia = date.day;
    // dia = dia + 1;
    return date ? new Date('' + date.year + '-' + date.month + '-' + dia) : null;
  }
  //Cambiar formato de la fecha y tiempo
  toFormatoDateTime(date: NgbDateStruct): Date {
    if (date) {
      var elAhora = new Date();
      var dia = date.day;
      // dia = dia + 1;
      return date ? new Date('' + date.year + '-' + date.month + '-' + dia + ' ' + elAhora.getHours() + ':' + elAhora.getMinutes() + ':' + elAhora.getSeconds()) : null;
    }
    else
      return null;
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
    var dateElemento: NgbDateStruct = null;
    if (fecha != null) {
      let d = new Date();
      d = new Date(fecha);
      return this.fromModel(d);
    }
    return dateElemento;
  }
}
