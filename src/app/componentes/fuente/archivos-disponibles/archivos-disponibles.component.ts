import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatSelectModule } from '@angular/material';
import { archivo_Dato } from '../../../modelo/tabla/archivo-dato'

@Component({
  selector: 'app-archivos-disponibles',
  templateUrl: './archivos-disponibles.component.html',
  styleUrls: ['./archivos-disponibles.component.scss']
})
export class ArchivosDisponiblesComponent implements OnInit {
  //---------------------------------tabla
  displayedColumns: string[] = ['numero', 'nombre', 'codigoFuente'];
  dataSource: MatTableDataSource<archivo_Dato>;
  lista_Archivos: Array<archivo_Dato> = new Array();
  dataArchivos: any;
  private paginator: MatPaginator;
  @ViewChild(MatPaginator) set matPaginator(mp1: MatPaginator) {
    this.paginator = mp1;
    this.setDataSourceAttributes();
  }
  @ViewChild(MatSort) sort: MatSort;
  //------------------------------------------
  constructor() {
    this.dataSource = new MatTableDataSource(this.lista_Archivos);
  }

  ngOnInit() {
  }
  setDataSourceAttributes() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    if (this.paginator && this.sort) {
      this.applyFilter('');
    }
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  public buscarArchivos() {
    console.log('ok buscando archivos');
    this.lista_Archivos.push(crearArchivos(1, 1, 'ok', 'ok2'));
    this.dataSource = new MatTableDataSource(this.lista_Archivos);
  }
}

function crearArchivos(k: Number, archivoId: Number, nombre: String, codigoFuente): archivo_Dato {
  return {
    numero: k,
    archivoId: archivoId,
    nombre: nombre,
    codigoFuente: codigoFuente
  };
}