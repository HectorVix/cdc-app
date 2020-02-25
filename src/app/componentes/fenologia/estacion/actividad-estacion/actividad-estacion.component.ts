import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-actividad-estacion',
  templateUrl: './actividad-estacion.component.html',
  styleUrls: ['./actividad-estacion.component.scss']
})
export class ActividadEstacionComponent implements OnInit {
  //Campos
  A = false //Apertura de la Yema 
  AP = false //Aparecimiento de Pétalos
  AS = false //Aparecimiento de Sépalos
  BF = false //Brotes Florales

  constructor(public dialogRef: MatDialogRef<ActividadEstacionComponent>) {

  }

  ngOnInit() {
  }


  public actividadCambiosEstacion() {
    console.log("ok actividades fenologia  por estacion:", this.A)
  }

  get actividad_A(): boolean { return this.A }
}
