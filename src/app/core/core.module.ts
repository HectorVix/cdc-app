import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FooterComponent } from './footer/footer.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { BrowserModule } from '@angular/platform-browser';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatButtonModule, MatDialogModule,
  MatSelectModule, MatFormFieldModule
} from '@angular/material';

@NgModule({
  declarations: [
    FooterComponent,
    NavMenuComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    NgbModule.forRoot(),
    BrowserModule,
    MDBBootstrapModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule, MatDialogModule,
    MatSelectModule, MatFormFieldModule,

  ],
  exports: [
    NavMenuComponent,
    FooterComponent
  ],
})
export class CoreModule { }
