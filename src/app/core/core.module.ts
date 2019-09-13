import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { FooterComponent } from './footer/footer.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import {
  MatButtonModule, MatCheckboxModule, MatDialogModule, MatListModule, MatProgressBarModule,
  MatSelectModule, MatFormFieldModule, MatInputModule, MatTableModule, MatPaginatorModule, MatGridListModule, MAT_DIALOG_DEFAULT_OPTIONS,
  MatDatepickerModule, MatNativeDateModule, MatTabsModule, MatMenuModule, MatToolbarModule, MatSidenavModule, MatIconModule
} from '@angular/material';
import { LayoutModule } from '@angular/cdk/layout';
@NgModule({
  declarations: [
    FooterComponent,
    NavMenuComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    NgbModule,
    MatButtonModule, MatCheckboxModule, MatSelectModule, MatFormFieldModule, MatInputModule,
    MatTableModule, MatPaginatorModule, MatDialogModule, MatListModule, MatProgressBarModule,
    MatGridListModule, MatDatepickerModule, MatNativeDateModule, MatTabsModule,
    LayoutModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,

  ],
  exports: [
    NavMenuComponent,
    FooterComponent
  ],
})
export class CoreModule { }
