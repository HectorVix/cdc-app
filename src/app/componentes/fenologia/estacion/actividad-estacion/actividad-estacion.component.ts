import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material';
//reutilizando el modelo en este caso solo el valor 
import { fenologia_Modelo } from '../../../../modelo/resumen/fenologia-modelo';
@Component({
  selector: 'app-actividad-estacion',
  templateUrl: './actividad-estacion.component.html',
  styleUrls: ['./actividad-estacion.component.scss']
})
export class ActividadEstacionComponent implements OnInit {
  //Campos
  valor_Campo: fenologia_Modelo[] = new Array(20);

  constructor(public dialogRef: MatDialogRef<ActividadEstacionComponent>) {
    this.asignar_Valores_Campos()
  }

  ngOnInit() {
  }

  asignar_Valores_Campos() {
    var cont = 0;
    for (let i = 0; i < this.valor_Campo.length; i++) {
      var modeloAux = new fenologia_Modelo();
      this.valor_Campo[i] = modeloAux
    }

  }
  public actividadCambiosEstacion() {
    console.log("ok actividades fenologia  por estacion:")
  }
}
