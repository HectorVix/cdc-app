import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { elemento_Modelo } from '../../../modelo/jerarquizacion/elemento-modelo';
import { GaleriaService } from '../../../servicios/galeria/galeria.service';
import { ElementoService } from '../../../servicios/elemento/elemento.service';
import { FechaService } from '../../../servicios/fecha/fecha.service';
import { debounceTime } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { ControlErrorStateMatcher } from '../../../modelo/error/error-state-matcher';
import { Subject } from 'rxjs';
import { MatPaginator, MatSort, MatTableDataSource, MatSelectModule, MatDialog } from '@angular/material';
import { DISABLED } from '@angular/forms/src/model';
import { GaleriaComponent } from '../../../componentes/galeria/galeria.component';
import { ConfirmacionComponent } from '../../../componentes/dialogo/confirmacion/confirmacion.component';
import { foto_Modelo } from '../../../modelo/fotoDatos/foto-datos';
import { ElementoDato } from '../../../modelo/tabla/elemento-dato';

@Component({
  selector: 'app-elemento',
  templateUrl: './elemento.component.html',
  styleUrls: ['./elemento.component.scss']
})


export class ElementoComponent implements OnInit {
  //dateElemento: NgbDateStruct;
  elementoForm: FormGroup;
  buscarForm: FormGroup;
  //alertas
  private _success = new Subject<string>();
  staticAlertClosed = false;
  successMessage: string;
  tipoAlert: string;
  matcher = new ControlErrorStateMatcher();
  //---------------------------------tabla
  k: number;
  displayedColumns: string[] = ['numero', 'codigo', 'nombrecomun', 'nombrecientifico'];
  dataSource: MatTableDataSource<ElementoDato>;
  elementos: Array<ElementoDato> = new Array();
  dataElementos: any;
  private paginator: MatPaginator;
  @ViewChild(MatPaginator) set matPaginator(mp: MatPaginator) {
    this.paginator = mp;
    this.setDataSourceAttributes();
  }
  @ViewChild(MatSort) sort: MatSort;
  //------------------------------------------
  //componente galeria
  @ViewChild(GaleriaComponent)
  private galeria: GaleriaComponent;
  loading: boolean;
  selected = new FormControl(0);
  //segun el caso
  editar = true;
  guardar = false;
  codigoElemento = false;
  //lista fotos
  data_resFoto: any;
  tam_Inicial_ListaFotos = 0;
  fotoId_Lista = [];
  constructor(private fb: FormBuilder, private fb2: FormBuilder,
    private elementoServicio: ElementoService,
    private galeriaServicio: GaleriaService,
    private fechaServicio: FechaService,
    private dialog: MatDialog) {
    this.crearForm_Elemento();
    this.crearForm_Buscar();
    this.dataSource = new MatTableDataSource(this.elementos);
  }
  ngOnInit() {
    setTimeout(() => this.staticAlertClosed = true, 20000);
    this._success.subscribe((message) => this.successMessage = message);
    this._success.pipe(
      debounceTime(10000)
    ).subscribe(() => this.successMessage = null);
    this.dataSource.paginator = this.paginator;
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
  setElementoBuscado(row) {
    this.elementoForm = this.fb.group({
      'elementoId': row.elmendoId,
      'codigo': row.codigo,
      'nombrecomun': row.nombrecomun,
      'nombrecientifico': row.nombrecientifico,
      'comentario': row.comentario,
      'fecha': this.fechaServicio.getFecha(row.fecha),
    });
    this.selected.setValue(0);
    this.galeria.nuevo();
    this.getFoto_Datos(row.elmendoId);
    this.editar = false;
    this.guardar = true;
  }

  getFoto_Datos(elementoId: String) {
    const date = new Date().valueOf();
    this.galeriaServicio.getDatosFotos(elementoId, 1).subscribe(
      resFoto => {
        this.data_resFoto = resFoto;
        this.tam_Inicial_ListaFotos = this.data_resFoto.length;//tamaño inicial de la lista de fotos guardadas
        for (let fotoVal of this.data_resFoto) {
          var fotoModelo = new foto_Modelo();
          fotoModelo = fotoVal;
          this.fotoId_Lista.push(fotoModelo.fotoId);
          if (fotoModelo.posicion == 0)
            this.galeria.mostrarDatosInicio(fotoModelo.descripcion, fotoModelo.comentario, fotoModelo.autor, this.fechaServicio.getFecha(fotoModelo.fecha));
          this.galeria.agregarImagenBusqueda(fotoModelo);
        }
      });
  }
  crearForm_Elemento() {
    this.elementoForm = this.fb.group({
      'codigo': ['', Validators.required],
      'nombrecomun': '',
      'nombrecientifico': '',
      'comentario': '',
      'fecha': null,
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
    this.elementos = new Array();
    this.dataSource = new MatTableDataSource(this.elementos);
    if (this.elementoForm.get('codigo').value) {
      if (this.elementoForm.get('fecha').value) {
        var elementoBase = this.setElemento(this.elementoForm.value);
        this.addElemento(this.elementoForm.value);
      }
      else
        this.changeSuccessMessage('La fecha es obligatoria', 'primary');
    }
    else
      this.changeSuccessMessage('El código del elemento es obligatorio', 'primary');

  }
  editarElemento() {
    if (this.elementoForm.get('codigo').value) {
      if (this.elementoForm.get('fecha').value) {
        var elementoBase = this.setElemento(this.elementoForm.value);
        this.updateElemento(this.elementoForm.value);
      } else
        this.changeSuccessMessage('La fecha es obligatoria.', 'primary');
    }
    else
      this.changeSuccessMessage('El código del elemento es obligatorio.', 'primary');
  }
  setElemento(elemento): elemento_Modelo {
    elemento.fecha = this.fechaServicio.toFormatoDateTime(elemento.fecha);
    return elemento;
  }
  updateElemento(elemento: elemento_Modelo): void {
    this.loading = true;
    var jwthelper = new JwtHelperService();
    var decodedToken = jwthelper.decodeToken(localStorage.getItem('userToken'));
    this.elementoServicio.editarElemento(elemento, decodedToken.jti)
      .subscribe(
        resElemento => {
          //  if (this.galeria.archivos.size > 0 && this.tam_Inicial_ListaFotos >= 1 || this.galeria.archivos.size == 0 && this.tam_Inicial_ListaFotos >= 1) {

          this.galeriaServicio.update_FotoId_Lista(
            this.galeria.archivos,
            this.galeria.datosFotografias,
            elemento.elementoId,
            this.fotoId_Lista,
            this.tam_Inicial_ListaFotos,
            this.galeria.getTam_final_ListaFotos(), 1);
          this.loading = false;
          this.changeSuccessMessage(`Editado exitoso ,codigo del elemento:${resElemento.codigo}.`, 'success');
          this.elementos = new Array();
          this.dataSource = new MatTableDataSource(this.elementos);
          this.editar = true;
        }, err => {
          this.loading = false;
          this.changeSuccessMessage('Error  no se pudo editar', 'primary');
        });
  }
  addElemento(elemento: elemento_Modelo): void {
    this.loading = true;
    var jwthelper = new JwtHelperService();
    var decodedToken = jwthelper.decodeToken(localStorage.getItem('userToken'));
    this.elementoServicio.addElemento(elemento, decodedToken.jti)
      .subscribe(
        resElemento => {
          if (this.galeria.archivos.size > 0) {
            var elemento_id = resElemento.elementoId;
            this.galeriaServicio.cargarFotos(this.galeria.archivos, this.galeria.datosFotografias, elemento_id, 1);
          }
          else {
            this.loading = false;
          }
          this.loading = false;
          this.changeSuccessMessage(`Registro exitoso ,codigo del elemento:${resElemento.codigo}.`, 'success');

        }, err => {
          this.loading = false;
          this.changeSuccessMessage('Error  no se pudo guardar, los codigos de elementos son únicos no se pueden repetir', 'primary');
        });
  }
  //mensajes
  public changeSuccessMessage(mensaje: string, tipo: string) {
    this.tipoAlert = tipo;
    this._success.next(mensaje);
  }
  //Buscar
  buscarElemento() {
    this.elementos = new Array();
    this.fotoId_Lista = [];
    this.galeria.nuevo();
    this.loading = true;
    //variables necesarias para recuperarse de errores 
    var codigo = "¬";
    var nombrecomun = "¬";
    var nombrecientifico = "¬";
    this.elementos = new Array();
    this.k = 0;
    if (this.buscarForm.get('codigo').value)
      codigo = this.buscarForm.get('codigo').value;
    if (this.buscarForm.get('nombrecomun').value)
      nombrecomun = this.buscarForm.get('nombrecomun').value;
    if (this.buscarForm.get('nombrecientifico').value)
      nombrecientifico = this.buscarForm.get('nombrecientifico').value;
    this.elementoServicio.getElementos(codigo, nombrecomun, nombrecientifico)
      .subscribe(
        data => {
          this.dataElementos = data;
          for (let elementoVal of this.dataElementos) {
            this.k = this.k + 1;
            this.elementos.push(crearElemento(this.k, elementoVal));
          }
          this.dataSource = new MatTableDataSource(this.elementos);
          this.loading = false;
        }, err => {
          this.loading = false;
          this.changeSuccessMessage('No se encontro información.', 'warning');
        });
  }

  openDialogo(): void {
    const dialogRef = this.dialog.open(ConfirmacionComponent, {
      width: '250px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result)
        this.guardarElemento();
    });
  }
  openDialogoEditar(): void {
    const dialogRef = this.dialog.open(ConfirmacionComponent, {
      width: '250px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result)
        this.editarElemento();
    });
  }
  nuevo() {
    this.editar = true;
    this.guardar = false;
    this.crearForm_Elemento();
    this.crearForm_Buscar();
    this.galeria.nuevo();
    this.elementos = new Array();
    this.dataElementos = [];
    this.tam_Inicial_ListaFotos = 0;
    this.loading = false;
    this.fotoId_Lista = [];
  }
}
function crearElemento(k: Number, elemento: elemento_Modelo): ElementoDato {
  return {
    numero: k,
    elmendoId: elemento.elementoId,
    codigo: elemento.codigo,
    nombrecomun: elemento.nombrecomun,
    nombrecientifico: elemento.nombrecientifico,
    comentario: elemento.comentario,
    fecha: elemento.fecha
  };
}