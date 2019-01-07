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
import { MatPaginator, MatSort, MatTableDataSource, MatSelectModule, MatDialog } from '@angular/material';
import { DISABLED } from '@angular/forms/src/model';
import { GaleriaComponent } from '../../../componentes/galeria/galeria.component';
import { ConfirmacionComponent } from '../../../componentes/dialogo/confirmacion/confirmacion.component';
import { TablaBusquedaComponent } from '../../../componentes/tabla-busqueda/tabla-busqueda.component';
import { foto_Modelo } from '../../../modelo/fotoDatos/foto-datos';

export interface ElementoDato {
  numero: number;
  elmendoId: Number;
  codigo: String;
  fecha: String;
  nombrecomun: String;
  nombrecientifico;
  comentario: String;
}

@Component({
  selector: 'app-elemento',
  templateUrl: './elemento.component.html',
  styleUrls: ['./elemento.component.scss']
})


export class ElementoComponent implements OnInit {
  dateElemento: NgbDateStruct;
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
  //lista fotos
  data_resFoto: any;
  tam_Inicial_ListaFotos = 0;
  fotoId_Lista = [];
  constructor(private fb: FormBuilder, private fb2: FormBuilder, private usuarioService: UsuarioService,
    private dialog: MatDialog) {
    this.crearForm_Elemento();
    this.crearForm_Buscar();
    this.dataSource = new MatTableDataSource(this.elementos);
  }
  ngOnInit() {
    setTimeout(() => this.staticAlertClosed = true, 20000);
    this._success.subscribe((message) => this.successMessage = message);
    this._success.pipe(
      debounceTime(5000)
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
    var date = row.fecha;
    let d = new Date();
    d = new Date(date);
    this.dateElemento = this.usuarioService.fromModel(d);
    this.elementoForm = this.fb.group({
      'elementoId': row.elmendoId,
      'codigo': row.codigo,
      'nombrecomun': row.nombrecomun,
      'nombrecientifico': row.nombrecientifico,
      'comentario': row.comentario,
      'fecha': this.dateElemento,
    });
    this.selected.setValue(0);
    this.galeria.nuevo();
    this.getFoto_Datos(row.elmendoId);
    this.editar = false;
    this.guardar = true;
  }

  getFoto_Datos(elementoId: String) {
    const date = new Date().valueOf();
    this.usuarioService.getDatosFotos(elementoId).subscribe(
      resFoto => {
        this.data_resFoto = resFoto;
        this.tam_Inicial_ListaFotos = this.data_resFoto.length;//tamaño inical de la lista de fotos guardadas
        for (let fotoVal of this.data_resFoto) {
          var foto = new foto_Modelo();
          foto = fotoVal;
          console.log('fotoId:', foto.fotoId);
          this.fotoId_Lista.push(foto.fotoId);
          if (foto.posicion == 0)
            this.galeria.mostrarDatosInicio(foto.descripcion, foto.comentario, foto.autor, foto.fecha);
          const nombreImagen = date + '.' + foto.nombre;
          const imageBlob = this.galeria.dataURItoBlob(foto.imagen);
          const imageFile = new File([imageBlob], nombreImagen, { type: 'image/jpeg' });
          this.galeria.agregarImagenBusqueda(imageFile, foto);
        }
      });
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
    if (this.elementoForm.get('codigo').value && this.elementoForm.get('fecha').value) {
      var elementoBase = this.setElemento(this.elementoForm.value);
      this.galeria.validarDatosFotos();
      if (this.galeria.imagenes.length > 0 && this.galeria.editado) {
        this.addElemento(this.elementoForm.value);
      }
      if (this.galeria.editado == false && this.galeria.imagenes.length == 0) {
        this.addElemento(this.elementoForm.value);
      }
      if (this.galeria.editado != true && this.galeria.datosFotografias.length >= 0) {

        if (this.galeria.imagenes.length == 0 && this.galeria.datosFotografias.length == 0) { }
        else
          this.changeSuccessMessage('Error  no se pudo guardar falta editar las fotos', 'primary');
      }
    }
    else {
      this.changeSuccessMessage('Error  no se pudo guardar, ingresa un codigo elemento valido y la fecha son obligatorios', 'primary');
    }
  }
  editarElemento() {
    if (this.elementoForm.get('codigo').value && this.elementoForm.get('fecha').value) {
      var elementoBase = this.setElemento(this.elementoForm.value);
      this.galeria.validarDatosFotos();
      console.log('editr:', this.galeria.editado);
      console.log('tam imagenes:', this.galeria.imagenes.length);
      if (this.galeria.imagenes.length > 0 && this.galeria.editado) {
        this.updateElemento(this.elementoForm.value);
      }
      if (this.galeria.editado == false && this.galeria.imagenes.length == 0) {
        this.updateElemento(this.elementoForm.value);
      }
      if (this.galeria.editado != true && this.galeria.datosFotografias.length >= 0) {

        if (this.galeria.imagenes.length == 0 && this.galeria.datosFotografias.length == 0) { }
        else
          this.changeSuccessMessage('Error  no se pudo editar falta editar las fotos', 'primary');
      }
    }
    else {
      this.changeSuccessMessage('Error  no se pudo guardar, ingresa un codigo elemento valido y la fecha son obligatorios', 'primary');
    }
  }
  setElemento(elemento): elemento_Modelo {
    elemento.fecha = this.usuarioService.toFormatoDateTime(elemento.fecha);
    return elemento;
  }
  updateElemento(elemento: elemento_Modelo): void {
    console.log('tam lista foto Id:', this.fotoId_Lista.length);
    for (let i = 0; i < this.fotoId_Lista.length; i++) {
      var fotoId = this.fotoId_Lista[i];
      console.log('Foto Id para actualizar:', fotoId);
    }
    this.loading = true;
    var jwthelper = new JwtHelperService();
    var decodedToken = jwthelper.decodeToken(localStorage.getItem('userToken'));
    this.usuarioService.editarElemento(elemento, decodedToken.jti)
      .subscribe(
        resElemento => {
          console.log('aki valida afuera');
          console.log('editr:', this.galeria.editado);
          console.log('tam imagenes:', this.galeria.imagenes.length);
          console.log('tam archivos:', this.galeria.archivos.size);
          if (this.galeria.archivos.size > 0 && this.galeria.editado) {
            console.log('aki valida');
            var elemento_id = resElemento.elementoId;
             this.usuarioService.update_FotoId_Lista(
               this.galeria.archivos,
               this.galeria.datosFotografias,
               elemento_id,
               this.fotoId_Lista,
               this.tam_Inicial_ListaFotos,
               this.galeria.getTam_final_ListaFotos());
          }
          else {
            this.loading = false;
          }
          this.loading = false;
          this.changeSuccessMessage(`Editado exitoso ,codigo del elemento:${resElemento.codigo}.`, 'success');

        }, err => {
          this.loading = false;
          this.changeSuccessMessage('Error  no se pudo editar, los codigo de elementos son unicos no se pueden repetir', 'primary');
        });
  }
  addElemento(elemento: elemento_Modelo): void {
    this.loading = true;
    var jwthelper = new JwtHelperService();
    var decodedToken = jwthelper.decodeToken(localStorage.getItem('userToken'));
    this.usuarioService.addElemento(elemento, decodedToken.jti)
      .subscribe(
        resElemento => {
          if (this.galeria.archivos.size > 0 && this.galeria.editado) {
            var elemento_id = resElemento.elementoId;
            this.usuarioService.cargarFotos(this.galeria.archivos, this.galeria.datosFotografias, elemento_id);
          }
          else {
            this.loading = false;
          }
          this.loading = false;
          this.changeSuccessMessage(`Registro exitoso ,codigo del elemento:${resElemento.codigo}.`, 'success');

        }, err => {
          this.loading = false;
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
    this.loading = true;
    //variables necesarias para recuperarse de errores contiente un caracter invisible
    var codigo = " ";
    var nombrecomun = " ";
    var nombrecientifico = " ";
    this.elementos = new Array();
    this.k = 0;
    if (this.buscarForm.get('codigo').value)
      codigo = this.buscarForm.get('codigo').value;
    if (this.buscarForm.get('nombrecomun').value)
      nombrecomun = this.buscarForm.get('nombrecomun').value;
    if (this.buscarForm.get('nombrecientifico').value)
      nombrecientifico = this.buscarForm.get('nombrecientifico').value;

    this.usuarioService.getElementos(codigo, nombrecomun, nombrecientifico)
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
          this.changeSuccessMessage('No se encontro información.', 'warning ');
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
  }
}
function crearElemento(k: number, elemento: elemento_Modelo): ElementoDato {
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