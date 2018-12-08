import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { UsuarioService } from '../../servicios/usuario.service';
import { elemento_Modelo } from '../../modelo/jerarquizacion/elemento-modelo';
import { elemento_Datos } from '../../modelo/tablas/elemento-datos';  //tipo1

@Component({
  selector: 'app-tabla-busqueda',
  templateUrl: './tabla-busqueda.component.html',
  styleUrls: ['./tabla-busqueda.component.scss']
})
export class TablaBusquedaComponent implements OnInit {
  displayedColumns: string[] = ['numero','codigo', 'fecha', 'nombrecomun', 'nombrecientifico', 'usuario'];
  dataSource: MatTableDataSource<elemento_Datos>;
  elementos: Array<elemento_Datos> = new Array();
  dataElementos: any;
  private paginator: MatPaginator;
  k: number;
  @ViewChild(MatPaginator) set matPaginator(mp: MatPaginator) {
    this.paginator = mp;
    this.setDataSourceAttributes();
  }
  @ViewChild(MatSort) sort: MatSort
  constructor(private usuarioService: UsuarioService) {
    this.dataSource = new MatTableDataSource(this.elementos);
  }

  ngOnInit() {
    this.dataSource.sort = this.sort;
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
  setBusquedaElemento(codigo: String, nombrecomun: String, nombrecientifico: String) {
    console.log(' tabla codigo:', codigo);
    console.log(' tabla nombrecomun:', nombrecomun);
    console.log(' tabla nobrecientifico:', nombrecientifico);
    this.usuarioService.getElementos(codigo, nombrecomun, nombrecientifico)
    .subscribe(
      data => {
        this.dataElementos = data;
        console.log(this.dataElementos);
        for (let elementoVal of this.dataElementos) {
          console.log(elementoVal.codigo);
          console.log(elementoVal.usuariousuarioid.nombre);
          this.k=this.k+1;
          this.elementos.push(crearElemento(this.k,elementoVal, elementoVal.usuariousuarioid.nombre, elementoVal.usuariousuarioid.apellido));
        }
        this.dataSource = new MatTableDataSource(this.elementos, );
      }, err => {
       // this.changeSuccessMessage('No se encontro información.', 'warning ');
      });
}
}
function crearElemento(k:number,elemento: elemento_Modelo, nombre: String, apellido: String): elemento_Datos {
  var usuario = nombre.concat(" " + apellido.toString());
  console.log(elemento.fecha);
  return {
    numero:k,
    codigo: elemento.codigo,
    nombrecomun: elemento.nombrecomun,
    nombrecientifico: elemento.nombrecientifico,
    comentario: elemento.comentario,
    fecha: elemento.fecha,
    usuario: usuario
   
    
  }
}