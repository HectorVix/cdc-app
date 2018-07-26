import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomePageComponent} from  './componentes/home-page/home-page.component';
import {LoginPageComponent} from './componentes/login-page/login-page.component';
import {RegisterPageComponent} from  './componentes/register-page/register-page.component';
import {PrivadoPageComponent} from './componentes/privado-page/privado-page.component';
import {NotFoundPageComponent} from './componentes/not-found-page/not-found-page.component';
import { FuenteComponent } from './componentes/fuente/fuente.component';
import { JerarquizacionComponent } from './componentes/jerarquizacion/jerarquizacion.component';
import { FormularioJerarquizacionComponent } from './componentes/jerarquizacion/formulario-jerarquizacion/formulario-jerarquizacion.component';
import { EditarJerarquizacionComponent } from './componentes/jerarquizacion/editar-jerarquizacion/editar-jerarquizacion.component'
import { RastreoElementoComponent } from './componentes/rastreo-elemento/rastreo-elemento.component';
import { LocalizacionElementoComponent } from './componentes/localizacion-elemento/localizacion-elemento.component';
import { SitiosComponent } from './componentes/sitios/sitios.component';
import { AreasManejadasComponent } from './componentes/areas-manejadas/areas-manejadas.component';
import { ContactosComponent } from './componentes/contactos/contactos.component';


const routes: Routes = [
{path: 'home',component: HomePageComponent},
{path: 'fuente', component: FuenteComponent},
{path: 'login', component: LoginPageComponent},
{path: 'register', component: RegisterPageComponent},
{path: 'privado', component: PrivadoPageComponent},
{path: 'jerarquizacion', component: JerarquizacionComponent},
{
  path: 'jerarquizacion', component: JerarquizacionComponent,
  children: [{ path: '', component: FormularioJerarquizacionComponent }]
},
{
  path: 'editarjerarquizacion', component: JerarquizacionComponent,
  children: [{ path: '', component: EditarJerarquizacionComponent }]
},
{path: 'rastreoElemento', component: RastreoElementoComponent},
{path: 'localizacionElemento', component: LocalizacionElementoComponent},
{path: 'sitios', component: SitiosComponent},
{path: 'areasManejadas', component: AreasManejadasComponent},
{path: 'contactos', component: ContactosComponent},

{path: '**', component: NotFoundPageComponent},


];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
