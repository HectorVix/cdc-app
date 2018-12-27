import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { UsuarioService } from '../../../servicios/usuario.service';
import { debounceTime } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ConfirmacionComponent } from '../../../componentes/dialogo/confirmacion/confirmacion.component';
import { MatPaginator, MatSort, MatTableDataSource, MatSelectModule, MatDialog } from '@angular/material';
import { Subject } from 'rxjs';
import { contacto_Modelo } from '../../../modelo/contacto/contacto-modelo';

@Component({
  selector: 'app-formulario-contactos',
  templateUrl: './formulario-contactos.component.html',
  styleUrls: ['./formulario-contactos.component.scss']
})
export class FormularioContactosComponent implements OnInit {
  contactosForm: FormGroup;
  selected = new FormControl(0);
  loading: boolean;
  //alertas
  private _success = new Subject<string>();
  staticAlertClosed = false;
  successMessage: string;
  tipoAlert: string;

  constructor(private fb: FormBuilder, private fb2: FormBuilder, private usuarioService: UsuarioService,
    private dialog: MatDialog) {
    this.crearForm_contactos();
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
  crearForm_contactos() {
    this.contactosForm = this.fb.group({
      //identificadores
      'numident': ['', Validators.required],
      'nombreident': '',
      'titulo': '',
      'nombre': '',
      'apellido1': '',
      'apellido2': '',
      'sufijo': '',
      'posicion': '',
      'institucion': '',
      //localizadores
      'email': '',
      'dir1': '',
      'dir2': '',
      'dir3': '',
      'pais': '',
      'ciudad': '',
      'subnacion': '',
      'codpostal': '',
      'masident': '',
      'smsa': '',
      'teleftrabajo': '', //*number
      'telefhogar': '',   //*number
      //tipos de contactos
      'tipocont': '',
      //actividades con el contacto
      'activcont': '',
      //descripción
      'resumen': '',
      //documentación y mantenimiento
      'coddirp': '',
      'actualizar': ''//*date

    });
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
    var contactoBase = new contacto_Modelo;
    contactoBase.numident= 'paso1';
    this.addContacto(contactoBase);
  }
  setContacto(contacto: contacto_Modelo): contacto_Modelo {
    //c.fecha = this.usuarioService.toFormato(this.elementoForm.get('fecha').value);
    return contacto;
  }
  addContacto(contacto: contacto_Modelo): void {
    this.loading = true;
    var jwthelper = new JwtHelperService();
    var decodedToken = jwthelper.decodeToken(localStorage.getItem('userToken'));
    this.usuarioService.addContacto(contacto, decodedToken.jti)
      .subscribe(
        resContacto => {
          this.loading = false;
          this.changeSuccessMessage(`Registro exitoso, numero de identificación:${resContacto.numident}.`, 'success');

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
}
