import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomePageComponent} from  './componentes/home-page/home-page.component';
import {LoginPageComponent} from './componentes/login-page/login-page.component';
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
import { ResumenComponent } from './componentes/resumen/resumen.component';
import { PerfilComponent } from './componentes/perfil/perfil.component';
import { EstadisticaComponent } from './componentes/estadistica/estadistica.component';
import { AyudaComponent } from './componentes/ayuda/ayuda.component';
import { AuthGuard } from './auth/auth.guard';

export const routes: Routes = [
{path: 'home',component: HomePageComponent,canActivate:[AuthGuard]},
{path: 'fuente', component: FuenteComponent,canActivate:[AuthGuard]},
{path: 'login', component: LoginPageComponent},
{path: 'jerarquizacion', component: JerarquizacionComponent,canActivate:[AuthGuard]},
{path: 'rastreoElemento', component: RastreoElementoComponent,canActivate:[AuthGuard]},
{path: 'resumen', component: ResumenComponent,canActivate:[AuthGuard]},
{path: 'localizacionElemento', component: LocalizacionElementoComponent,canActivate:[AuthGuard]},
{path: 'sitios', component: SitiosComponent,canActivate:[AuthGuard]},
{path: 'areasManejadas', component: AreasManejadasComponent,canActivate:[AuthGuard]},
{path: 'contactos', component: ContactosComponent,canActivate:[AuthGuard]},
{path: 'estadistica', component: EstadisticaComponent,canActivate:[AuthGuard]},
{path: 'perfil', component: PerfilComponent,canActivate:[AuthGuard]},
{path: 'ayuda', component: AyudaComponent,canActivate:[AuthGuard]},
//{path: '**', component: NotFoundPageComponent},
 
{ path : '', redirectTo:'/login', pathMatch : 'full'}

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
