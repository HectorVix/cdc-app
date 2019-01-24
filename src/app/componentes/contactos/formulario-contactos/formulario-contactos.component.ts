import { Component, OnInit } from '@angular/core';
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
//import { subnacional_Dato } from '../../../modelo/tabla/subnacional-dato';

@Component({
  selector: 'app-formulario-contactos',
  templateUrl: './formulario-contactos.component.html',
  styleUrls: ['./formulario-contactos.component.scss']
})
export class FormularioContactosComponent implements OnInit {
  contactosForm: FormGroup;
  contactosFormPruebas: FormGroup;
  selected = new FormControl(0);
  loading: boolean;
  //alertas
  private _success = new Subject<string>();
  staticAlertClosed = false;
  successMessage: string;
  tipoAlert: string;

  constructor(private fb: FormBuilder, private fb2: FormBuilder,
    private contactoServicio: ContactoService,
    private fechaServicio: FechaService,
    private dialog: MatDialog) {
    this.crearForm_Contacto(new contacto_Modelo);
  }

  ngOnInit() {
    setTimeout(() => this.staticAlertClosed = true, 20000);
    this._success.subscribe((message) => this.successMessage = message);
    this._success.pipe(
      debounceTime(10000)
    ).subscribe(() => this.successMessage = null);
    //this.dataSource.paginator = this.paginator;
    //this.dataSource.sort = this.sort;
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
  guardarContacto() {
    console.log('vamos bien xd3');
    var contactoBase = this.setContacto(this.contactosForm.value);
    this.addContacto(contactoBase);
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
}
