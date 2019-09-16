import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
// import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { elemento_Modelo } from '../../../modelo/jerarquizacion/elemento-modelo';
import { GaleriaService } from '../../../servicios/galeria/galeria.service';
import { ElementoService } from '../../../servicios/elemento/elemento.service';
import { FechaService } from '../../../servicios/fecha/fecha.service';
import { debounceTime } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
// import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { ControlErrorStateMatcher } from '../../../modelo/error/error-state-matcher';
import { Subject } from 'rxjs';
import { MatPaginator, MatSort, MatTableDataSource, MatDialog } from '@angular/material';
// import { DISABLED } from '@angular/forms/src/model';
import { GaleriaComponent } from '../../../componentes/galeria/galeria.component';
import { ConfirmacionComponent } from '../../../componentes/dialogo/confirmacion/confirmacion.component';
import { foto_Modelo } from '../../../modelo/fotoDatos/foto-datos';
import { ElementoDato } from '../../../modelo/tabla/elemento-dato';
import { elemento_FormGroup } from '../../../modelo/formGroup/elemento';
import { criterio_elemento } from '../../../modelo/select/overview-elemento';

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
  displayedColumns: string[] = ['numero', 'codigoe', 'nombrecomunn', 'nombren'];
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
  //select 
  criterio_elemento = new criterio_elemento();
  criterio_clase = this.criterio_elemento.clase;
  criterio_tipo_comunidad = this.criterio_elemento.tipo_comunidad;



  constructor(private fb: FormBuilder,
    private elementoServicio: ElementoService,
    private galeriaServicio: GaleriaService,
    private fechaServicio: FechaService,
    private dialog: MatDialog) {
    this.crearForm_Elemento(new elemento_Modelo);
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
  mostrar_Elemento_Buscado(row: ElementoDato) {
    this.crearForm_Elemento(this.getElemento_id(row.elementoId));
    this.selected.setValue(0);
    this.galeria.nuevo();
    this.getFoto_Datos(row.elementoId);
    this.editar = false;
    this.guardar = true;
  }
  getElemento_id(id: Number): elemento_Modelo {
    var elementoBusqueda = new elemento_Modelo();
    this.dataElementos.forEach(dataElemento => {
      var elemento_Busqueda_Aux = new elemento_Modelo();// necesario dado que si reutiliza conserva la primera asignación
      elemento_Busqueda_Aux = dataElemento;
      if (id == elemento_Busqueda_Aux.elementoId) {
        elementoBusqueda = elemento_Busqueda_Aux;
        this.editar = false;
      }
    });
    return elementoBusqueda;

  }

  getFoto_Datos(elementoId: Number) {
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
  crearForm_Elemento(row: elemento_Modelo) {
    this.elementoForm = new elemento_FormGroup().getElemento_FormGrup(row);
  }
  crearForm_Buscar() {
    this.buscarForm = this.fb.group({
      'codigoe': '',
      'nombrecomunn': '',
      'nombren': '',
      'clase': '',
      'comunidad': ''
    });
  }
  onSubmit() {
  }

  guardarElemento() {
    this.elementos = new Array();
    this.dataSource = new MatTableDataSource(this.elementos);
    if (this.elementoForm.get('codigoe').value && this.elementoForm.valid) {
      var elementoBase = this.setElemento(this.elementoForm.value);
      this.addElemento(elementoBase);
    }
    else
      this.changeSuccessMessage('El CODIGOE del elemento es obligatorio ó valida que los campos esten correctos donde se te indica..', 'primary');

  }
  editarElemento() {
    if (this.elementoForm.get('codigoe').value && this.elementoForm.valid) {
      var elementoBase = this.setElemento(this.elementoForm.value);
      this.updateElemento(elementoBase);
    }
    else
      this.changeSuccessMessage('Valida que los campos esten correctos donde se te indica..', 'primary');
  }
  setElemento(elemento): elemento_Modelo {
    return elemento;
  }
  updateElemento(elemento: elemento_Modelo): void {
    this.loading = true;
    var jwthelper = new JwtHelperService();
    var decodedToken = jwthelper.decodeToken(localStorage.getItem('userToken'));
    this.elementoServicio.editarElemento(elemento, decodedToken.jti)
      .subscribe(
        resElemento => {
          this.galeriaServicio.update_FotoId_Lista(
            this.galeria.archivos,
            this.galeria.datosFotografias,
            elemento.elementoId,
            this.fotoId_Lista,
            this.tam_Inicial_ListaFotos,
            this.galeria.getTam_final_ListaFotos(), 1);
          this.loading = false;
          this.changeSuccessMessage(`Editado exitoso ,códigoe del elemento:${resElemento.codigoe}.`, 'success');
          this.elementos = new Array();
          this.dataSource = new MatTableDataSource(this.elementos);
          this.editar = false;
        }, err => {
          this.loading = false;
          this.changeSuccessMessage('Error  no se pudo editar, comprueba que esté disponible el servicio.', 'primary');
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
          this.changeSuccessMessage(`Registro exitoso ,codigoe del elemento:${resElemento.codigoe}.`, 'success');

        }, err => {
          this.loading = false;
          this.changeSuccessMessage('Error  no se pudo guardar, los CODIGOE de elementos son únicos no se pueden repetir ó comprueba que esté disponible el servicio.', 'primary');
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
    this.tam_Inicial_ListaFotos = 0;
    this.loading = true;
    this.k = 0;
    //variables necesarias para recuperarse de errores 
    var codigoe = "¬";
    var nombrecomunn = "¬";
    var nombren = "¬";
    var clase = "¬";
    var comunidad = "¬";
    this.elementos = new Array();
    this.k = 0;
    if (this.buscarForm.get('codigoe').value)
      codigoe = this.buscarForm.get('codigoe').value;
    if (this.buscarForm.get('nombrecomunn').value)
      nombrecomunn = this.buscarForm.get('nombrecomunn').value;
    if (this.buscarForm.get('nombren').value)
      nombren = this.buscarForm.get('nombren').value;
    if (this.buscarForm.get('clase').value)
      clase = this.buscarForm.get('clase').value;
    if (this.buscarForm.get('comunidad').value)
      comunidad = this.buscarForm.get('comunidad').value;
    this.elementoServicio.getElementos(codigoe, nombrecomunn, nombren, clase, comunidad)
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
  buscar_Todos_Elementos() {
    this.elementos = new Array();
    this.fotoId_Lista = [];
    this.tam_Inicial_ListaFotos = 0;
    this.loading = true;
    this.k = 0;
    this.elementoServicio.All
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
    this.crearForm_Elemento(new elemento_Modelo);
    this.crearForm_Buscar();
    this.galeria.nuevo();
    this.elementos = new Array();
    this.dataElementos = [];
    this.tam_Inicial_ListaFotos = 0;
    this.loading = false;
    this.fotoId_Lista = [];
  }
  //lleva el control de los errores
  get input_codigoe() { return this.elementoForm.get('codigoe'); }
  get input_nombrecomunn() { return this.elementoForm.get('nombrecomunn'); }
  get input_nombren() { return this.elementoForm.get('nombren'); }
  get input_comentario() { return this.elementoForm.get('comentario'); }
  get input_fecha() { return this.elementoForm.get('fecha'); }

  //clasificación de comunidades
  get clasificacion_comunidad() {
    var val = false;
    if (this.elementoForm.get('clase').value == 'C')
      val = true;
    else
      val = false;
    return val;
  }
  //clasificación de comunidades buscardor
  get clasificacion_comunidad_Buscador() {
    var val = false;
    if (this.buscarForm.get('clase').value == 'C')
      val = true;
    else
      val = false;
    return val;
  }
}
function crearElemento(k: Number, elemento: elemento_Modelo): ElementoDato {
  return {
    numero: k,
    elementoId: elemento.elementoId,
    codigoe: elemento.codigoe,
    nombrecomunn: elemento.nombrecomunn,
    nombren: elemento.nombren
  };
}