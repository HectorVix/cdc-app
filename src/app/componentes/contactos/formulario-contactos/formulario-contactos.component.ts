import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ContactoService } from '../../../servicios/contacto/contacto.service';
import { FechaService } from '../../../servicios/fecha/fecha.service';
import { debounceTime } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ConfirmacionComponent } from '../../../componentes/dialogo/confirmacion/confirmacion.component';
import { Subject } from 'rxjs';
import { contacto_Modelo } from '../../../modelo/contacto/contacto-modelo';
//--------------tabla------------------------------------
import { contacto_FormGroup } from '../../../modelo/formGroup/contacto';
import { MatPaginator, MatSort, MatTableDataSource, MatDialog } from '@angular/material';
import { contacto_Dato } from '../../../modelo/tabla/contacto-dato';
import { LocalDataSource } from 'ng2-smart-table';

@Component({
  selector: 'app-formulario-contactos',
  templateUrl: './formulario-contactos.component.html',
  styleUrls: ['./formulario-contactos.component.scss']
})
export class FormularioContactosComponent implements OnInit {
  contactosForm: FormGroup;
  buscar_Form: FormGroup;
  contactosFormPruebas: FormGroup;
  selected = new FormControl(0);
  loading: boolean;
  //alertas
  private _success = new Subject<string>();
  staticAlertClosed = false;
  successMessage: string;
  tipoAlert: string;
  //---------------------------------tabla
  displayedColumns: string[] = ['numero', 'numident', 'nombre', 'apellido1', 'apellido2'];
  dataSource: MatTableDataSource<contacto_Dato>;
  lista_Contacto: Array<contacto_Dato> = new Array();
  dataContacto: any;
  private paginator: MatPaginator;
  @ViewChild(MatPaginator) set matPaginator(mp: MatPaginator) {
    this.paginator = mp;
    this.setDataSourceAttributes();
  }
  @ViewChild(MatSort) sort: MatSort;
  //------------------------------------------
  editar = true;
  guardar = false;
  data_contacto_DataSource: LocalDataSource = new LocalDataSource();
  settings_contacto = {
    add: {
      addButtonContent: '<i class="fa  fa-plus prefix"></i> Nuevo',
      createButtonContent: '<i class="fa fa-check"></i> Crear',
      cancelButtonContent: ' <i class="fa fa-times"></i> Cancelar',
      confirmCreate: true,
    },
    edit: {
      editButtonContent: '<i class="fa fa-pencil"></i> Editar',
      saveButtonContent: '<i class="fa fa-check"></i> Guardar',
      cancelButtonContent: ' <i class="fa fa-times"></i> Cancelar',
      confirmSave: true,
    },
    delete: {
      deleteButtonContent: '<i class="fa fa-trash"></i> Borrar',
      confirmDelete: true,
    },
    columns: {
      codfuente: {
        title: 'CÓDIGO FUENTE',
        type: 'text',
        filter: true
      }
    }
  };

  constructor(private fb: FormBuilder, private fb2: FormBuilder,
    private contactoServicio: ContactoService,
    private fechaServicio: FechaService,
    private dialog: MatDialog) {
    this.crearForm_Contacto(new contacto_Modelo);
    this.crearForm_Buscar();
    this.dataSource = new MatTableDataSource(this.lista_Contacto);
  }

  ngOnInit() {
    setTimeout(() => this.staticAlertClosed = true, 20000);
    this._success.subscribe((message) => this.successMessage = message);
    this._success.pipe(
      debounceTime(10000)
    ).subscribe(() => this.successMessage = null);
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
  crearForm_Contacto(row: contacto_Modelo) {
    this.contactosForm = new contacto_FormGroup().getContaco_FormGrup(row);
  }
  tabPagina1() {
    this.selected.setValue(0);
  }
  tabPagina2() {
    this.selected.setValue(1);
  }
  openDialogo(): void {
    const dialogRef = this.dialog.open(ConfirmacionComponent, {
      width: '250px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result)
        this.guardarContacto();
    });
  }
  openDialogoEditar(): void {
    const dialogRef = this.dialog.open(ConfirmacionComponent, {
      width: '250px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result)
        this.editarContacto();
    });
  }
  guardarContacto() {
    if (this.contactosForm.get('numident').value && this.contactosForm.valid) {
      var contactoBase = this.setContacto(this.contactosForm.value);
      this.addContacto(contactoBase)
    }
    else
      this.changeSuccessMessage('No se pudo registrar el número de identificación es obligatorio ó valida que los campos estén correctos donde se te indica.', 'warning');
  }
  setContacto(contacto: contacto_Modelo): contacto_Modelo {
    contacto.actualizar = this.fechaServicio.toFormatoDateTime(this.contactosForm.get('actualizar').value);
    return contacto;
  }
  addContacto(contacto: contacto_Modelo): void {
    this.loading = true;
    var jwthelper = new JwtHelperService();
    var decodedToken = jwthelper.decodeToken(localStorage.getItem('userToken'));
    this.contactoServicio.addContacto(contacto, decodedToken.jti)
      .subscribe(
        resContacto => {
          this.loading = false;
          this.changeSuccessMessage(`Registro exitoso, numero de identificación:${resContacto.numident}.`, 'success');
        }, err => {
          this.loading = false;
          this.changeSuccessMessage(`Error no se pudo guardar:${contacto.numident}.`, 'primary');
        });
  }
  //mensajes
  public changeSuccessMessage(mensaje: string, tipo: string) {
    this.tipoAlert = tipo;
    this._success.next(mensaje);
  }

  crearForm_Buscar() {
    this.buscar_Form = this.fb.group({
      //  'contactosId': '',
      'numident': '',
      'nombreident': '',
      'nombre': '',
      'apellido1': '',
      'apellido2': '',
      'email': ''
    });
  }
  buscarContacto() {
    this.lista_Contacto = new Array();
    this.loading = true;
    var a = "¬";
    var b = "¬";
    var c = "¬";
    var d = "¬";
    var e = "¬";
    var f = "¬";
    if (this.buscar_Form.get('numident').value)
      a = this.buscar_Form.get('numident').value;
    if (this.buscar_Form.get('nombreident').value)
      b = this.buscar_Form.get('nombreident').value;
    if (this.buscar_Form.get('nombre').value)
      c = this.buscar_Form.get('nombre').value;
    if (this.buscar_Form.get('apellido1').value)
      d = this.buscar_Form.get('apellido1').value;
    if (this.buscar_Form.get('apellido2').value)
      e = this.buscar_Form.get('apellido2').value;
    if (this.buscar_Form.get('email').value)
      f = this.buscar_Form.get('email').value;
    this.contactoServicio.getContactos(a, b, c, d, e, f)
      .subscribe(
        data => {
          this.dataContacto = data;
          var k = 0;
          for (let val of this.dataContacto) {
            k = k + 1;
            this.lista_Contacto.push(crearContacto(k,
              val.contactoId,
              val.numident,
              val.nombre,
              val.apellido1,
              val.apellido2));
          }
          this.dataSource = new MatTableDataSource(this.lista_Contacto);
          this.loading = false;
        }, err => {
          this.loading = false;
          this.changeSuccessMessage('No se encontro información.', 'warning');
        });
  }
  getContacto_id(id: Number): contacto_Modelo {
    var base_contactoBusqueda = new contacto_Modelo();
    this.dataContacto.forEach(dataContacto => {
      var contactoBusqueda: contacto_Modelo = dataContacto;
      if (id == contactoBusqueda.contactoId) {
        base_contactoBusqueda = contactoBusqueda;
        this.editar = false;
      }
    });
    return base_contactoBusqueda;
  }
  mostrar_Contacto_Busqueda(row: contacto_Dato) {
    this.crearForm_Contacto(this.getContacto_id(row.contactoId));
    this.tabPagina1();
    this.guardar = true;
  }
  updateContacto(contacto: contacto_Modelo): void {
    this.loading = true;
    var jwthelper = new JwtHelperService();
    var decodedToken = jwthelper.decodeToken(localStorage.getItem('userToken'));
    this.contactoServicio.updateContacto(contacto, decodedToken.jti)
      .subscribe(
        resContacto => {
          this.loading = false;
          this.changeSuccessMessage(`Editado exitoso, número de identificación:${resContacto.numident}.`, 'success');
          this.lista_Contacto = new Array();
          this.dataSource = new MatTableDataSource(this.lista_Contacto);
        }, err => {
          this.loading = false;
          this.changeSuccessMessage('Error no se pudo editar, el número de identificación debe ser valido', 'primary');
        });
  }
  editarContacto() {
    if (this.contactosForm.get('numident').value && this.contactosForm.valid)
      this.updateContacto(this.setContacto(this.contactosForm.value));
    else
      this.changeSuccessMessage('Valida que los campos estén correctos donde se te indica.', 'primary');
  }
  nuevo() {
    this.editar = true;
    this.guardar = false;
    this.crearForm_Contacto(new contacto_Modelo());
    this.crearForm_Buscar();
    this.tabPagina1();
  }
  onCreateConfirm(event): void {
    if (this.editar) { // se esta guardando un nuevo registro
      this.validarCodFuente(event);
    }
    else // se esta editando un registro
    {

    }
  }
  onUpdateConfirm(event): void {
    if (this.editar) { //nuevo
      event.confirm.resolve(event.newData);
    }
    else { //editar uno existente

    }
  }
  onDeleteConfirm(event): void {
    if (window.confirm('¿Estás seguro de querer borrar?')) {
      if (this.editar) { //nuevo
        event.confirm.resolve(event.newData);
      } else { //editar uno existente

      }

    } else {
      event.confirm.reject();
    }
  }
  validarCodFuente(event) {
    if (event.newData.codfuente) {
      this.contactoServicio.validarCodfuente(event.newData.codfuente)
        .subscribe(
          resContacto => {
            console.log("Se econtro codfuente");
            event.confirm.resolve(event.newData);
          }, err => {
            if (err.status === 404)
              this.changeSuccessMessage('No existe el CODFUENTE, por favor ingresa un código valido.', 'primary');
            else
              this.changeSuccessMessage('No se pudo validar, comprueba que este disponible el servicio.', 'primary');
          });
    }
    else {
      this.changeSuccessMessage('No se ha ingresado un  CÓDIGO DE LA FUENTE, por favor ingresa uno valido.', 'warning');
    }
  }
  /**
   * Lleva el control de los errores al validar los 24 campos
   * Página 1
   * Identificadores
   */
  get input_numident() { return this.contactosForm.get('numident'); }
  get input_nombreident() { return this.contactosForm.get('nombreident'); }
  get input_titulo() { return this.contactosForm.get('titulo'); }
  get input_nombre() { return this.contactosForm.get('nombre'); }
  get input_apellido1() { return this.contactosForm.get('apellido1'); }
  get input_apellido2() { return this.contactosForm.get('apellido2'); }
  get input_sufijo() { return this.contactosForm.get('sufijo'); }
  get input_posicion() { return this.contactosForm.get('posicion'); }
  get input_institucion() { return this.contactosForm.get('institucion'); }
  // Localizadores
  get input_email() { return this.contactosForm.get('email'); }
  get input_dir1() { return this.contactosForm.get('dir1'); }
  get input_dir2() { return this.contactosForm.get('dir2'); }
  get input_dir3() { return this.contactosForm.get('dir3'); }
  get input_pais() { return this.contactosForm.get('pais'); }
  get input_ciudad() { return this.contactosForm.get('ciudad'); }
  get input_subnacion() { return this.contactosForm.get('subnacion'); }
  get input_codpostal() { return this.contactosForm.get('codpostal'); }
  get input_masident() { return this.contactosForm.get('masident'); }
  get input_smsa() { return this.contactosForm.get('smsa'); }
  // Tipos de Contacto
  get input_tipocont() { return this.contactosForm.get('tipocont'); }
  // Actividades con el Contacto
  get input_activcont() { return this.contactosForm.get('activcont'); }
  // Descripción
  get input_resumen() { return this.contactosForm.get('resumen'); }
  // Documentación y Mantenimiento
  get input_coddirp() { return this.contactosForm.get('coddirp'); }
  get input_actualizar() { return this.contactosForm.get('actualizar'); }
}
function crearContacto(k: Number, contactoId: Number, numident, nombre, apellido1, apellido2): contacto_Dato {
  return {
    numero: k,
    contactoId: contactoId,
    numident: numident,
    nombre: nombre,
    apellido1: apellido1,
    apellido2: apellido2
  };
}
