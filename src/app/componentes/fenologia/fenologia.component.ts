import { Component, OnInit, ViewChild } from '@angular/core';
import { fenologia_Modelo } from '../../modelo/resumen/fenologia-modelo';
import { MatDialog } from '@angular/material';
import { ActividadEstacionComponent } from '../fenologia/estacion/actividad-estacion/actividad-estacion.component';

@Component({
  selector: 'app-fenologia',
  templateUrl: './fenologia.component.html',
  styleUrls: ['./fenologia.component.scss']
})
export class FenologiaComponent implements OnInit {
  modelo_Fenologia: fenologia_Modelo[] = new Array(96);
  @ViewChild(ActividadEstacionComponent)
  private actividad_Estacion_Fenologia: ActividadEstacionComponent;

  constructor(private dialogo: MatDialog) {
    this.ordenar_Fenologia()
  }

  ngOnInit() {
  }
  onChanges(posicion: number) {
    console.log("Cambios en:", posicion)

  }
  cambios_ActividadesEstacion(posicion: number) {
    console.log("Actividad en:", posicion)
    this.openDialogo_Actividades_Estacion(posicion)
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
  openDialogo_Actividades_Estacion(posicion:number): void {
    const dialogRef = this.dialogo.open(ActividadEstacionComponent, {
      width: '550px'
    });
    // dialogRef.componentInstance.actividadCambiosEstacion()
    var temp_A = dialogRef.componentInstance.actividad_A;
    console.log("Temporal A antes:", temp_A)
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log("cambio actividad  fenología...")
        temp_A = dialogRef.componentInstance.actividad_A;
        console.log("Temporal A despues:", temp_A,"Posicion:",posicion)

        //  this.datos_ActividadFenologia()
      }
    });
  }
}