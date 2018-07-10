import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-formulario-le',
  templateUrl: './formulario-le.component.html',
  styleUrls: ['./formulario-le.component.scss']
})
export class FormularioLeComponent implements OnInit {
  lident = ['','S','N','?'];
  constructor() { }

  ngOnInit() {
  }

}
