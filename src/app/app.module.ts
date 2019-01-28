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
import { UsuarioService } from './servicios/usuario/usuario.service';
import { FuenteService } from './servicios/fuente/fuente.service';
import { ElementoService } from './servicios/elemento/elemento.service';
import { JerarquizacionService } from './servicios/jerarquizacion/jerarquizacion.service';
import { RastreoService } from './servicios/rastreo/rastreo.service';
import { LocalizacionService } from './servicios/localizacion/localizacion.service';
import { CaracterizacionService } from './servicios/caracterizacion/caracterizacion.service';
import { SitioService } from './servicios/sitio/sitio.service';
import { AreaService } from './servicios/area/area.service';
import { ContactoService } from './servicios/contacto/contacto.service';
import { FechaService } from './servicios/fecha/fecha.service';
import { JerarquizacionComponent } from './componentes/jerarquizacion/jerarquizacion.component';
import { FormularioJerarquizacionElementoNacionalComponent } from './componentes/jerarquizacion/formulario-jerarquizacion-elemento-nacional/formulario-jerarquizacion-elemento-nacional.component';
import { RastreoElementoComponent } from './componentes/rastreo-elemento/rastreo-elemento.component';
import { FormularioReComponent } from './componentes/rastreo-elemento/formulario-re/formulario-re.component';
import { LocalizacionElementoComponent } from './componentes/localizacion-elemento/localizacion-elemento.component';
import { SitiosComponent } from './componentes/sitios/sitios.component';
import { AreasManejadasComponent } from './componentes/areas-manejadas/areas-manejadas.component';
import { FormularioLeComponent } from './componentes/localizacion-elemento/formulario-le/formulario-le.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { FuenteComponent } from './componentes/fuente/fuente.component';
import { RegistroSitioComponent } from './componentes/sitios/registro-sitio/registro-sitio.component';
import { FormularioAreasManejadasComponent } from './componentes/areas-manejadas/formulario-areas-manejadas/formulario-areas-manejadas.component';
import { ContactosComponent } from './componentes/contactos/contactos.component';
import { FormularioContactosComponent } from './componentes/contactos/formulario-contactos/formulario-contactos.component';
import { CaracterizacionComponent } from './componentes/caracterizacion/caracterizacion.component';
import { CaracterizacionPlantasNacionalComponent } from './componentes/caracterizacion/caracterizacion-plantas-nacional/caracterizacion-plantas-nacional.component';
import { CaracterizacionVertebradosNacionalComponent } from './componentes/caracterizacion/caracterizacion-vertebrados-nacional/caracterizacion-vertebrados-nacional.component';
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
  MatDatepickerModule, MatNativeDateModule, MatTabsModule, MatMenuModule
} from '@angular/material';
import 'hammerjs';
import 'mousetrap';
import { ModalGalleryModule } from 'angular-modal-gallery';
import { GaleriaComponent } from './componentes/galeria/galeria.component';
import { ConfirmacionComponent } from './componentes/dialogo/confirmacion/confirmacion.component';
import { Jerarquizacion } from './modelo/jerarquizacion/jerarquizacion-modelo';
import { ArchivosDisponiblesComponent } from './componentes/fuente/archivos-disponibles/archivos-disponibles.component';
// import {FlexLayoutModule} from '@angular/flex-layout';


@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    NavbarComponent,
    LoginPageComponent,
    NotFoundPageComponent,
    FormularioResumenFuenteComponent,
    JerarquizacionComponent,
    FormularioJerarquizacionElementoNacionalComponent,
    RastreoElementoComponent,
    FormularioReComponent,
    LocalizacionElementoComponent,
    SitiosComponent,
    AreasManejadasComponent,
    FormularioLeComponent,
    FuenteComponent,
    RegistroSitioComponent,
    FormularioAreasManejadasComponent,
    ContactosComponent,
    FormularioContactosComponent,
    CaracterizacionComponent,
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
    GaleriaComponent,
    ConfirmacionComponent,
    ArchivosDisponiblesComponent
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
    MatTableModule, MatPaginatorModule, MatDialogModule, MatListModule, MatProgressBarModule,
    MatGridListModule, MatDatepickerModule, MatNativeDateModule, MatTabsModule,
    ModalGalleryModule.forRoot(), MatMenuModule
  ],
  schemas: [NO_ERRORS_SCHEMA],
  providers: [
    UsuarioService,
    FuenteService,
    ElementoService,
    JerarquizacionService,
    RastreoService,
    LocalizacionService,
    CaracterizacionService,
    SitioService,
    AreaService,
    ContactoService,
    DatePipe,
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    {
      provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: { hasBackdrop: false }
    },

  ],
  entryComponents: [ConfirmacionComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
