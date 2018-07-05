import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomePageComponent} from  './componentes/home-page/home-page.component';
import {LoginPageComponent} from './componentes/login-page/login-page.component';
import {RegisterPageComponent} from  './componentes/register-page/register-page.component';
import {PrivadoPageComponent} from './componentes/privado-page/privado-page.component';
import {NotFoundPageComponent} from './componentes/not-found-page/not-found-page.component';
import { FormularioResumenFuenteComponent } from './componentes/Fuentes/formulario-resumen-fuente/formulario-resumen-fuente.component';
import { JerarquizacionComponent } from './componentes/jerarquizacion/jerarquizacion.component';
import { FormularioJerarquizacionComponent } from './componentes/jerarquizacion/formulario-jerarquizacion/formulario-jerarquizacion.component';
import { EditarJerarquizacionComponent } from './componentes/jerarquizacion/editar-jerarquizacion/editar-jerarquizacion.component'


const routes: Routes = [
{path: 'home',component: HomePageComponent},

{path: 'formResumenFuente', component: FormularioResumenFuenteComponent},
{path: 'login', component: LoginPageComponent},
{path: 'register', component: RegisterPageComponent},
{path: 'privado', component: PrivadoPageComponent},
{path: 'jerarquizacion', component: JerarquizacionComponent},
{
  path: 'formulariojerarquizacion', component: JerarquizacionComponent,
  children: [{ path: '', component: FormularioJerarquizacionComponent }]
},
{
  path: 'editarjerarquizacion', component: JerarquizacionComponent,
  children: [{ path: '', component: EditarJerarquizacionComponent }]
},

{path: '**', component: NotFoundPageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
