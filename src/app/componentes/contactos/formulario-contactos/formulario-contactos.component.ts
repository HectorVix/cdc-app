import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ContactoService } from '../../../servicios/contacto/contacto.service';
import { FechaService } from '../../../servicios/fecha/fecha.service';
import { debounceTime } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ConfirmacionComponent } from '../../../componentes/dialogo/confirmacion/confirmacion.component';
import { Subject } from 'rxjs';
import { contacto_Modelo } from '../../../modelo/contacto/contacto-modelo';
//--------------tabla------------------------------------
import { contacto_FormGroup } from '../../../modelo/formGroup/contacto';
import { MatPaginator, MatSort, MatTableDataSource, MatSelectModule, MatDialog } from '@angular/material';
import { contacto_Dato } from '../../../modelo/tabla/contacto-dato';

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
    if (this.contactosForm.get('numident').value) {
      var contactoBase = this.setContacto(this.contactosForm.value);
      this.addContacto(contactoBase);
    }
    else
      this.changeSuccessMessage('El número de identificación es obligatorio para guardar.', 'warning');
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
      'contactosId': '',
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
    console.log('buscar:', a, b, c, d, e, f);
    this.contactoServicio.getContactos(a, b, c, d, e, f)
      .subscribe(
        data => {
          this.dataContacto = data;
          console.log(this.dataContacto);
          var k = 0;
          for (let val of this.dataContacto) {
            k = k + 1;
            this.lista_Contacto.push(crearContacto(k,
              val.contactosId,
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
      if (id == contactoBusqueda.contactosId) {
        base_contactoBusqueda = contactoBusqueda;
      }
    });
    return base_contactoBusqueda;
  }
  mostrar_Contacto_Busqueda(row: contacto_Dato) {
    this.crearForm_Contacto(this.getContacto_id(row.contactosId));
    this.tabPagina1();
    this.editar = false;

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
    if (this.contactosForm.get('numident').value)
      this.updateContacto(this.setContacto(this.contactosForm.value));
    else
      this.changeSuccessMessage('El número de identificación es obligatorio para editar.', 'warning');
  }
  nuevo() {
    this.editar = true;
    this.guardar = false;
    this.crearForm_Contacto(new contacto_Modelo());
    this.crearForm_Buscar();
    this.tabPagina1();
  }
}
function crearContacto(k: Number, contactosId: Number, numident, nombre, apellido1, apellido2): contacto_Dato {
  return {
    numero: k,
    contactosId: contactosId,
    numident: numident,
    nombre: nombre,
    apellido1: apellido1,
    apellido2: apellido2
  };
}
