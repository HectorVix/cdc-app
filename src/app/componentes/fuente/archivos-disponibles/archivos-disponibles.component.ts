import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatSelectModule } from '@angular/material';
import { archivo_Dato } from '../../../modelo/tabla/archivo-dato';
import { FuenteService } from '../../../servicios/fuente/fuente.service';

@Component({
  selector: 'app-archivos-disponibles',
  templateUrl: './archivos-disponibles.component.html',
  styleUrls: ['./archivos-disponibles.component.scss']
})
export class ArchivosDisponiblesComponent implements OnInit {
  //---------------------------------tabla
  displayedColumns: string[] = ['numero', 'nombre'];
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
  constructor(private fuenteServicio: FuenteService) {
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
  public buscarArchivos(fuenteId: Number) {
    this.lista_Archivos = new Array();
    this.fuenteServicio.getDatosArchivos(fuenteId)
      .subscribe(
        data => {
          this.dataArchivos = data;
          var k = 0;
          for (let val of this.dataArchivos) {
            k = k + 1;
            this.lista_Archivos.push(crearArchivos(k, val.archivoId, val.nombre, val.archivocdc));
          }
          this.dataSource = new MatTableDataSource(this.lista_Archivos);

        }, err => {
        });
  }
  descargarArchivo(row: archivo_Dato) {
    const imageBlob = this.dataURItoBlob(row.archivocdc);
    // funciona tanto para imagenes como para pdfs o cualquier tipo de documento , la clave esta que el nombre del archivo tenga el tipo
    const imageFile = new File([imageBlob], "" + row.nombre, { type: 'application/pdf' });
    var downloadURL = window.URL.createObjectURL(imageFile);
    var link = document.createElement('a');
    link.href = downloadURL;
    link.download = "" + row.nombre;// aca lo baja con el tipo correcto
    link.click();
  }
  dataURItoBlob(dataURI) {
    const byteString = atob(dataURI);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      int8Array[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([arrayBuffer], { type: 'application/pdf' });
    return blob;
  }
  nuevo() {
    this.lista_Archivos = new Array();
  }
}

function crearArchivos(k: Number, archivoId: Number, nombre: String, archivocdc): archivo_Dato {
  return {
    numero: k,
    archivoId: archivoId,
    nombre: nombre,
    archivocdc: archivocdc
  };
}