import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { elemento_Modelo } from '../../../modelo/jerarquizacion/elemento-modelo';
import { UsuarioService } from '../../../servicios/usuario.service';
import { debounceTime } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { UsuarioModelo } from '../../../modelo/usuario/usuario-modelo';
import { ControlErrorStateMatcher } from '../../../modelo/error/error-state-matcher';
import { Subject } from 'rxjs';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { DISABLED } from '@angular/forms/src/model';
import { GaleriaComponent } from '../../../componentes/galeria/galeria.component';
import { MatSelectModule, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ConfirmacionComponent } from '../../../componentes/dialogo/confirmacion/confirmacion.component';

export interface ElementoDato {
  numero: number;
  codigo: String;
  fecha: Date;
  nombrecomun: String;
  nombrecientifico;
  usuario: String;
  comentario: String;
}


@Component({
  selector: 'app-elemento',
  templateUrl: './elemento.component.html',
  styleUrls: ['./elemento.component.scss']
})


export class ElementoComponent implements OnInit {
  dateElemento: NgbDateStruct;
  k: number;
  elementoForm: FormGroup;
  buscarForm: FormGroup;
  //alertas
  private _success = new Subject<string>();
  staticAlertClosed = false;
  successMessage: string;
  tipoAlert: string;
  matcher = new ControlErrorStateMatcher();
  //tabla
  displayedColumns: string[] = ['numero', 'codigo', 'fecha', 'nombrecomun', 'nombrecientifico', 'usuario'];
  dataSource: MatTableDataSource<ElementoDato>;
  elementos: Array<ElementoDato> = new Array();
  dataElementos: any;
  private paginator: MatPaginator;
  private estadoForm: boolean = true;
  //loading
  loading:boolean ;
  //para pruebas
  data: any;
  //componente galeria
  @ViewChild(GaleriaComponent)
  private galeria: GaleriaComponent;

  @ViewChild(MatPaginator) set matPaginator(mp: MatPaginator) {
    this.paginator = mp;
    this.setDataSourceAttributes();
  }
  @ViewChild(MatSort) sort: MatSort

  constructor(private fb: FormBuilder, private fb2: FormBuilder, private usuarioService: UsuarioService,
    public dialog: MatDialog) {
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
  setElementoBuscado(row) {
    var date = row.fecha;
    let d = new Date();
    d = new Date(date);
    this.dateElemento = this.usuarioService.fromModel(d);
    this.elementoForm = this.fb.group({
      'codigo': row.codigo,
      'nombrecomun': row.nombrecomun,
      'nombrecientifico': row.nombrecientifico,
      'comentario': row.comentario,
      'fecha': this.dateElemento,
    });
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


  }

  guardarElemento() {
    this.usuarioService.cargarFotos(this.galeria.archivos);
    this.loading=true;
    var elementoBase = this.setElemento(this.elementoForm.value);
    this.addElemento(this.elementoForm.value);
  }
  setElemento(elemento: elemento_Modelo): elemento_Modelo {
    elemento.fecha = this.usuarioService.toFormato(this.elementoForm.get('fecha').value);
    return elemento;
  }
  addElemento(elemento: elemento_Modelo): void {
    var jwthelper = new JwtHelperService();
    var decodedToken = jwthelper.decodeToken(localStorage.getItem('userToken'));
    this.usuarioService.addElemento(elemento, decodedToken.jti)
      .subscribe(
        resElemento => {
          this.loading=false;
          this.changeSuccessMessage(`Registro exitoso ,codigo del elemento:${resElemento.codigo}.`, 'success');
          this.crearForm_Elemento();
        }, err => {
          this.loading=false;
          this.changeSuccessMessage('Error  no se pudo guardar', 'primary');
        });
  }
  //mensajes
  public changeSuccessMessage(mensaje: string, tipo: string) {
    this.tipoAlert = tipo;
    this._success.next(mensaje);
  }
  //Buscar
  buscarElemento() {

    //variables necesarias para recuperarse de errores contiente un caracter invisible
    var codigo = " ";
    var nombrecomun = " ";
    var nombrecientifico = " ";
    this.elementos = new Array();
    this.k = 0;
    if (this.buscarForm.get('codigo').value != null)
      codigo = this.buscarForm.get('codigo').value
    if (this.buscarForm.get('nombrecomun').value != null)
      nombrecomun = this.buscarForm.get('nombrecomun').value
    if (this.buscarForm.get('nombrecientifico').value != null)
      nombrecientifico = this.buscarForm.get('nombrecientifico').value

    this.usuarioService.getElementos(codigo, nombrecomun, nombrecientifico)
      .subscribe(
        data => {
          this.dataElementos = data;
          for (let elementoVal of this.dataElementos) {
            this.k = this.k + 1;
            this.elementos.push(crearElemento(this.k, elementoVal, elementoVal.usuariousuarioid.nombre, elementoVal.usuariousuarioid.apellido));
          }
          this.dataSource = new MatTableDataSource(this.elementos, );
        }, err => {
          this.changeSuccessMessage('No se encontro información.', 'warning ');
        });
  }
  openDialogo(): void {
    const dialogRef = this.dialog.open(ConfirmacionComponent, {
      width: '250px',
       height: '250px'
    });

    dialogRef.afterClosed().subscribe(result => {
    if(result)
     this.guardarElemento();
    });
  }

}
function crearElemento(k: number, elemento: elemento_Modelo, nombre: String, apellido: String): ElementoDato {
  var usuario = '' + nombre + ' ' + apellido;
  return {
    numero: k,
    codigo: elemento.codigo,
    nombrecomun: elemento.nombrecomun,
    nombrecientifico: elemento.nombrecientifico,
    comentario: elemento.comentario,
    fecha: elemento.fecha,
    usuario: usuario
  };
}