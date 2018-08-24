import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { elemento_Modelo } from '../../../modelo/elemento-modelo';
import { UsuarioService } from '../../../servicios/usuario.service';
import { debounceTime } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { UsuarioModelo } from '../../../modelo/usuario-modelo';
import { ControlErrorStateMatcher } from '../../../modelo/error-state-matcher';
import { Subject } from 'rxjs';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { DISABLED } from '@angular/forms/src/model';


export interface ElementoDato {
  codigo: string;
}

@Component({
  selector: 'app-elemento',
  templateUrl: './elemento.component.html',
  styleUrls: ['./elemento.component.scss']
})

export class ElementoComponent implements OnInit {

  jwthelper = new JwtHelperService();
  decodedToken = this.jwthelper.decodeToken(localStorage.getItem('userToken'));
  elementoForm: FormGroup;
  buscarForm: FormGroup;
  fecha: Date;
  fechaFormato: NgbDateStruct;
  private _success = new Subject<string>();
  staticAlertClosed = false;
  successMessage: string;
  tipoAlert: string;
  matcher = new ControlErrorStateMatcher();
  //tabla
  displayedColumns: string[] = ['codigo'];
  dataSource: MatTableDataSource<ElementoDato>;
  elementos: Array<ElementoDato> = new Array();
  dataElementos: any;
  //para pruebas
  data: any;
  private paginator: MatPaginator;
  @ViewChild(MatPaginator) set matPaginator(mp: MatPaginator) {
    this.paginator = mp;
    this.setDataSourceAttributes();
  }
  @ViewChild(MatSort) sort: MatSort

  constructor(private fb: FormBuilder, private fb2: FormBuilder, private usuarioService: UsuarioService) {
    this.crearForm_Elemento();
    this.crearForm_Buscar();
    this.dataSource = new MatTableDataSource(this.elementos);
  }
  setDataSourceAttributes() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    if (this.paginator && this.sort) {
      this.applyFilter('');
    }
  }
  mostrarElemento(row) {
    console.log(row.codigo);
  }
  ngOnInit() {
    setTimeout(() => this.staticAlertClosed = true, 20000);
    this._success.subscribe((message) => this.successMessage = message);
    this._success.pipe(
      debounceTime(5000)
    ).subscribe(() => this.successMessage = null);
    //this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  crearForm_Elemento() {
    this.elementoForm = this.fb.group({
      'codigo': ['', Validators.required],
      'nombrecomun': '',
      'nombrecientifico': '',
      'comentario': '',
      'fecha': '',
    });
  }
  crearForm_Buscar() {
    this.buscarForm = this.fb2.group({
      'codigo': '',
      'nombrecomun': '',
      'nombrecientifico': ''
    });
  }
  onSubmit() {
    console.log(this.decodedToken.jti);
    this.fechaFormato = this.elementoForm.get('fecha').value;
    this.fecha = this.usuarioService.toFormato(this.fechaFormato);
    this.addElemento(this.elementoForm.value);

  }
  addElemento(elemento: elemento_Modelo): void {
    elemento.fecha = this.fecha;
    //elemento.id_aux=decodedToken.jti;
    this.usuarioService.addElemento(elemento, this.decodedToken.jti)
      .subscribe(
        resElemento => {
          this.changeSuccessMessage(`Registro exitoso ,codigo del elemento:${resElemento.codigo}.`, 'success');
          this.crearForm_Elemento();
        }, err => {
          this.changeSuccessMessage('Error  no se pudo guardar', 'primary');
        });
  }
  public changeSuccessMessage(mensaje: string, tipo: string) {
    this.tipoAlert = tipo;
    this._success.next(mensaje);
  }
  //Buscar
  buscarElemento() {
    console.log(this.buscarForm.value);
    this.usuarioService.getElementos('alfa', 'null', 'null')
      .subscribe(
        data => {
          this.dataElementos = data;
          console.log(this.data);
          for (let elementoVal of this.dataElementos) {
            console.log(elementoVal.codigo);
            this.elementos.push(crearElemento(elementoVal.codigo));
          }
          this.dataSource = new MatTableDataSource(this.elementos);
        }, err => {
          this.changeSuccessMessage('No se pudo logiar, servidor no disponible.', 'warning ');
        });
  }
}
function crearElemento(codigo: String): ElementoDato {
  return {
    codigo: codigo.toString()
  };
}