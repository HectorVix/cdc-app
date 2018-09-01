import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';

export interface ElementoDato {
  numero: number;
  codigo: String;
  fecha: String;
  nombre: String;
  usuario: String;
  comentario: String;
}
const ELEMENT_DATA: ElementoDato[] = [
  {numero: 1, codigo: '3480372870101', fecha:'2018-30-1', nombre: 'Hector Vix1 ',usuario: 'HéctorVix1', comentario:''},
  {numero: 2, codigo: '3480372870102', fecha:'2018-30-1', nombre: 'Hector Vix2',usuario: 'HéctorVix2', comentario:''},
  {numero: 3, codigo: '3480372870103', fecha:'2018-30-1', nombre: 'Hector Vix3',usuario: 'HéctorVix3', comentario:''},
  {numero: 4, codigo: '3480372870104', fecha:'2018-30-1', nombre: 'Hector Vix4',usuario: 'HéctorVix4', comentario:''},
  {numero: 5, codigo: '3480372870105', fecha:'2018-30-1', nombre: 'Hector Vix5',usuario: 'HéctorVix5', comentario:''},
  {numero: 6, codigo: '3480372870106', fecha:'2018-30-1', nombre: 'Hector Vix6',usuario: 'HéctorVix6', comentario:''},
  {numero: 7, codigo: '3480372870107', fecha:'2018-30-1', nombre: 'Hector Vix7',usuario: 'HéctorVix7', comentario:''}
];
@Component({
  selector: 'app-tabla-busqueda',
  templateUrl: './tabla-busqueda.component.html',
  styleUrls: ['./tabla-busqueda.component.scss']
})
export class TablaBusquedaComponent implements OnInit {
  displayedColumns: string[] = ['numero', 'codigo', 'fecha', 'nombre', 'usuario'];
 /// dataSource: MatTableDataSource<ElementoDato>;
  dataSource =ELEMENT_DATA;
  elementos: Array<ElementoDato> = new Array();
  private paginator: MatPaginator;
  @ViewChild(MatPaginator) set matPaginator(mp: MatPaginator) {
    this.paginator = mp;
    this.setDataSourceAttributes();
  }
  @ViewChild(MatSort) sort: MatSort
  constructor() {
  // this.dataSource = new MatTableDataSource(this.elementos);
  }

  ngOnInit() {
   // this.dataSource.sort = this.sort;
  }
  setDataSourceAttributes() {
 //   this.dataSource.paginator = this.paginator;
//this.dataSource.sort = this.sort;
    if (this.paginator && this.sort) {
      this.applyFilter('');
    }
  }
  applyFilter(filterValue: string) {
//    this.dataSource.filter = filterValue.trim().toLowerCase();
   // if (this.dataSource.paginator) {
    //  this.dataSource.paginator.firstPage();
  // }

  }
}