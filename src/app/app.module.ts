import { BrowserModule } from '@angular/platform-browser';
import { NgModule ,NO_ERRORS_SCHEMA  } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from  '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './componentes/home-page/home-page.component';
import { NavbarComponent } from './componentes/navbar/navbar.component';
import { RegisterPageComponent } from './componentes/register-page/register-page.component';
import { LoginPageComponent } from './componentes/login-page/login-page.component';
import { PrivadoPageComponent } from './componentes/privado-page/privado-page.component';
import { NotFoundPageComponent } from './componentes/not-found-page/not-found-page.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { FormularioResumenFuenteComponent } from './componentes/Fuentes/formulario-resumen-fuente/formulario-resumen-fuente.component';
import { UsuarioService} from './servicios/usuario.service';
import { JerarquizacionComponent } from './componentes/jerarquizacion/jerarquizacion.component';
import { FormularioJerarquizacionComponent } from './componentes/jerarquizacion/formulario-jerarquizacion/formulario-jerarquizacion.component';
import { EditarJerarquizacionComponent } from './componentes/jerarquizacion/editar-jerarquizacion/editar-jerarquizacion.component';
import { RastreoElementoComponent } from './componentes/rastreo-elemento/rastreo-elemento.component';
import { FormularioReComponent } from './componentes/rastreo-elemento/formulario-re/formulario-re.component';
import { EditarReComponent } from './componentes/rastreo-elemento/editar-re/editar-re.component';
import { LocalizacionElementoComponent } from './componentes/localizacion-elemento/localizacion-elemento.component';
import { SitiosComponent } from './componentes/sitios/sitios.component';
import { AreasManejadasComponent } from './componentes/areas-manejadas/areas-manejadas.component';
import { LotesComponent } from './componentes/lotes/lotes.component';
import { FormularioLeComponent } from './componentes/localizacion-elemento/formulario-le/formulario-le.component';
import { EditarLeComponent } from './componentes/localizacion-elemento/editar-le/editar-le.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    NavbarComponent,
    RegisterPageComponent,
    LoginPageComponent,
    PrivadoPageComponent,
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
    LotesComponent,
    FormularioLeComponent,
    EditarLeComponent
  

  ],
  imports: [
    BrowserModule,
    AppRoutingModule ,
    FormsModule ,
    MDBBootstrapModule.forRoot(),
    HttpClientModule,
    ReactiveFormsModule,
    NgbModule.forRoot()
  ],
  schemas: [ NO_ERRORS_SCHEMA ],
  providers: [UsuarioService,DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
