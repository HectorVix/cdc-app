import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common'
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import {Proteccion} from '../../../modelo/tabla';
const now = new Date();
@Component({
  selector: 'app-formulario-le',
  templateUrl: './formulario-le.component.html',
  styleUrls: ['./formulario-le.component.scss']
})
export class FormularioLeComponent implements OnInit {
  lident = ['','S','N','?'];
  date: { year: number, month: number };
  modelDate: NgbDateStruct;
  characters: Proteccion[];
  settings = {
    columns: {
      id: {
        title: 'CODIGOAM'
      },
      name: {
        title: 'NOMBREAM'
      },
      age: {
        title: 'CONTENIDO'
      }
    }
  };
  constructor() { }

  ngOnInit() {
  }

  selectToday() {
    this.modelDate = { year: now.getFullYear(), month: now.getMonth() + 1, day: now.getDate() };
  }
}
