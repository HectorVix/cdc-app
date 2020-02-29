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
  }
  cambios_ActividadesEstacion(posicion: number) {
    this.openDialogo_Actividades_Estacion(posicion)
  }
  ordenar_Fenologia() {
    var cont = 0;
    for (let i = 0; i < this.modelo_Fenologia.length; i++) {
      var modeloAux = new fenologia_Modelo();
      modeloAux.posicion = i
      modeloAux.id = "fenologia" + i
      this.modelo_Fenologia[i] = modeloAux
    }

  }
  openDialogo_Actividades_Estacion(posicion: number): void {

    const dialogRef = this.dialogo.open(ActividadEstacionComponent, {
      width: '550px'
    });
    var valoresCampo = this.modelo_Fenologia[posicion].valores
    var contador_Campo = 0;
    if (valoresCampo) {
      for (let x = 0; x < valoresCampo.length; x++) {
        if (valoresCampo[x] != ',') {
          dialogRef.componentInstance.valor_Campo[contador_Campo].valor = parseInt(valoresCampo[x])
          contador_Campo = contador_Campo + 1
        }
      }
    }

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        var cadena = '' + this.asignar_Estado(dialogRef.componentInstance.valor_Campo[0].valor)
        for (let i = 0; i < 20; i++) {
          if (i >= 1)
            cadena = cadena + ',' + this.asignar_Estado(dialogRef.componentInstance.valor_Campo[i].valor)
        }
        this.actualizar_Campo_Estacion(cadena, posicion)
      }
    });
  }

  //Para mejor control de los campos 
  asignar_Estado(cadena: number) {
    if (cadena == 1)
      return 1
    else
      return 0
  }
  actualizar_Campo_Estacion(cadena: string, i: number) {
    this.modelo_Fenologia[i].valores = cadena
  }
  nuevo() {
    this.modelo_Fenologia = new Array(96)
    this.ordenar_Fenologia()
  }
  mostrar_Datos_Fenologia(val: string) {
    var datosFenologia: any = JSON.parse(val)
    for (let i = 0; i < 96; i++) {
      var modeloFenologia = new fenologia_Modelo()
      modeloFenologia = datosFenologia[i]
      this.modelo_Fenologia[i].valores = modeloFenologia.valores
    }
  }
}