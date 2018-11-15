import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common'

import { routes } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './componentes/home-page/home-page.component';
import { NavbarComponent } from './componentes/navbar/navbar.component';
import { LoginPageComponent } from './componentes/login-page/login-page.component';
import { NotFoundPageComponent } from './componentes/not-found-page/not-found-page.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { FormularioResumenFuenteComponent } from './componentes/fuente/formulario-resumen-fuente/formulario-resumen-fuente.component';
import { UsuarioService } from './servicios/usuario.service';
import { JerarquizacionComponent } from './componentes/jerarquizacion/jerarquizacion.component';
import { FormularioJerarquizacionComponent } from './componentes/jerarquizacion/formulario-jerarquizacion/formulario-jerarquizacion.component';
import { EditarJerarquizacionComponent } from './componentes/jerarquizacion/editar-jerarquizacion/editar-jerarquizacion.component';
import { RastreoElementoComponent } from './componentes/rastreo-elemento/rastreo-elemento.component';
import { FormularioReComponent } from './componentes/rastreo-elemento/formulario-re/formulario-re.component';
import { EditarReComponent } from './componentes/rastreo-elemento/editar-re/editar-re.component';
import { LocalizacionElementoComponent } from './componentes/localizacion-elemento/localizacion-elemento.component';
import { SitiosComponent } from './componentes/sitios/sitios.component';
import { AreasManejadasComponent } from './componentes/areas-manejadas/areas-manejadas.component';
import { FormularioLeComponent } from './componentes/localizacion-elemento/formulario-le/formulario-le.component';
import { EditarLeComponent } from './componentes/localizacion-elemento/editar-le/editar-le.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { FuenteComponent } from './componentes/fuente/fuente.component';
import { RegistroSitioComponent } from './componentes/sitios/registro-sitio/registro-sitio.component';
import { FormularioAreasManejadasComponent } from './componentes/areas-manejadas/formulario-areas-manejadas/formulario-areas-manejadas.component';
import { ContactosComponent } from './componentes/contactos/contactos.component';
import { FormularioContactosComponent } from './componentes/contactos/formulario-contactos/formulario-contactos.component';
import { ResumenComponent } from './componentes/resumen/resumen.component';
import { CaracterizacionPlantasNacionalComponent } from './componentes/resumen/caracterizacion-plantas-nacional/caracterizacion-plantas-nacional.component';
import { CaracterizacionVertebradosNacionalComponent } from './componentes/resumen/caracterizacion-vertebrados-nacional/caracterizacion-vertebrados-nacional.component';
import { FormularioJerarquizacionElementoGlobalComponent } from './componentes/jerarquizacion/formulario-jerarquizacion-elemento-global/formulario-jerarquizacion-elemento-global.component';
import { FormularioJerarquizacionElementoSubnacionalComponent } from './componentes/jerarquizacion/formulario-jerarquizacion-elemento-subnacional/formulario-jerarquizacion-elemento-subnacional.component';
import { ProtocoloLeComponent } from './componentes/localizacion-elemento/protocolo-le/protocolo-le.component';
import { PerfilComponent } from './componentes/perfil/perfil.component';
import { EstadisticaComponent } from './componentes/estadistica/estadistica.component';
import { AyudaComponent } from './componentes/ayuda/ayuda.component';
import { ElementoComponent } from './componentes/jerarquizacion/elemento/elemento.component';
import { HomeCdcComponent } from './componentes/home-page/home-cdc/home-cdc.component';
import { AuthGuard } from './auth/auth.guard';
import { RouterModule, Router } from '@angular/router';
import { AuthInterceptor } from './auth/auth.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatButtonModule, MatCheckboxModule, MatDialogModule, MatListModule, MatProgressBarModule,
  MatSelectModule, MatFormFieldModule, MatInputModule, MatTableModule, MatPaginatorModule, MatGridListModule, MAT_DIALOG_DEFAULT_OPTIONS,
  MatDatepickerModule, MatNativeDateModule
} from '@angular/material';
import { BuscarRastreoElementoComponent } from './componentes/rastreo-elemento/buscar-rastreo-elemento/buscar-rastreo-elemento.component';
import { BuscarLocalizacionElementoComponent } from './componentes/localizacion-elemento/buscar-localizacion-elemento/buscar-localizacion-elemento.component';
import { BuscarProtocoloLeComponent } from './componentes/localizacion-elemento/buscar-protocolo-le/buscar-protocolo-le.component';
import { BuscarAreasManejadasComponent } from './componentes/areas-manejadas/buscar-areas-manejadas/buscar-areas-manejadas.component';
import { BuscarSitioComponent } from './componentes/sitios/buscar-sitio/buscar-sitio.component';
import { BuscarCaracterizacionPlantasNacionalComponent } from './componentes/resumen/buscar-caracterizacion-plantas-nacional/buscar-caracterizacion-plantas-nacional.component';
import { BuscarCaracterizacionVertebradosNacionalComponent } from './componentes/resumen/buscar-caracterizacion-vertebrados-nacional/buscar-caracterizacion-vertebrados-nacional.component';
import { BuscarContactosComponent } from './componentes/contactos/buscar-contactos/buscar-contactos.component';
import { BuscarFuenteComponent } from './componentes/fuente/buscar-fuente/buscar-fuente.component';
import { TablaBusquedaComponent } from './componentes/tabla-busqueda/tabla-busqueda.component';
import 'hammerjs';
import 'mousetrap';
import { ModalGalleryModule } from 'angular-modal-gallery';
import { GaleriaComponent } from './componentes/galeria/galeria.component';
import { ConfirmacionComponent } from './componentes/dialogo/confirmacion/confirmacion.component';
import { FotoDatosComponent } from './componentes/dialogo/foto-datos/foto-datos.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    NavbarComponent,
    LoginPageComponent,
    NotFoundPageComponent,
    FormularioResumenFuenteComponent,
    JerarquizacionComponent,
    FormularioJerarquizacionComponent,
    EditarJerarquizacionComponent,
    RastreoElementoComponent,
    FormularioReComponent,
    EditarReComponent,
    LocalizacionElementoComponent,
    SitiosComponent,
    AreasManejadasComponent,
    FormularioLeComponent,
    EditarLeComponent,
    FuenteComponent,
    RegistroSitioComponent,
    FormularioAreasManejadasComponent,
    ContactosComponent,
    FormularioContactosComponent,
    ResumenComponent,
    CaracterizacionPlantasNacionalComponent,
    CaracterizacionVertebradosNacionalComponent,
    FormularioJerarquizacionElementoGlobalComponent,
    FormularioJerarquizacionElementoSubnacionalComponent,
    ProtocoloLeComponent,
    PerfilComponent,
    EstadisticaComponent,
    AyudaComponent,
    ElementoComponent,
    HomeCdcComponent,
    BuscarRastreoElementoComponent,
    BuscarLocalizacionElementoComponent,
    BuscarProtocoloLeComponent,
    BuscarAreasManejadasComponent,
    BuscarSitioComponent,
    BuscarCaracterizacionPlantasNacionalComponent,
    BuscarCaracterizacionVertebradosNacionalComponent,
    BuscarContactosComponent,
    BuscarFuenteComponent,
    TablaBusquedaComponent,
    GaleriaComponent,
    ConfirmacionComponent,
    FotoDatosComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    FormsModule,
    MDBBootstrapModule.forRoot(),
    HttpClientModule,
    ReactiveFormsModule,
    NgbModule.forRoot(),
    Ng2SmartTableModule,
    BrowserAnimationsModule,
    MatButtonModule, MatCheckboxModule, MatSelectModule, MatFormFieldModule, MatInputModule,
    MatTableModule, MatPaginatorModule, MatDialogModule, MatListModule, MatProgressBarModule, MatGridListModule,MatDatepickerModule,MatNativeDateModule,
    ModalGalleryModule.forRoot()
  ],
  schemas: [NO_ERRORS_SCHEMA],
  providers: [UsuarioService, DatePipe, AuthGuard, {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }, 
  { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: { hasBackdrop: false } },
  
 ],
  entryComponents: [ConfirmacionComponent,FotoDatosComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
