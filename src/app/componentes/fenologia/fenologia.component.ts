import { Component, OnInit } from '@angular/core';
import { fenologia_Modelo } from '../../modelo/resumen/fenologia-modelo';

@Component({
  selector: 'app-fenologia',
  templateUrl: './fenologia.component.html',
  styleUrls: ['./fenologia.component.scss']
})
export class FenologiaComponent implements OnInit {
  modelo_Fenologia: fenologia_Modelo[] = new Array(96);
  constructor() {
    this.ordenar_Fenologia()
  }

  ngOnInit() {
  }
  onChanges(posicion:number) {
    console.log("Cambios en:",posicion)
  }
  ordenar_Fenologia() {
    console.log("...")
    var cont = 0;
    for (let i = 0; i < this.modelo_Fenologia.length; i++) {
      console.log("valores asignados..", i)
      var modeloAux = new fenologia_Modelo();
      modeloAux.posicion = i
      modeloAux.id = "fenologia" + i
      this.modelo_Fenologia[i] = modeloAux
    }

  }
}
