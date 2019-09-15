import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FooterComponent } from './footer/footer.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { BrowserModule } from '@angular/platform-browser';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
@NgModule({
  declarations: [
    FooterComponent,
    NavMenuComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    NgbModule,
    BrowserModule,
    MDBBootstrapModule.forRoot(),

  ],
  exports: [
    NavMenuComponent,
    FooterComponent
  ],
})
export class CoreModule { }
