import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogComponent } from './dialog/dialog.component';
import { UploadComponent } from './upload/upload.component';
import { MatButtonModule, MatDialogModule, MatListModule, MatProgressBarModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//  import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http';
import { UploadService } from './upload.service';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule, MatDialogModule, MatListModule, MatProgressBarModule,
    HttpClientModule, BrowserAnimationsModule,
  ],
  declarations: [DialogComponent, UploadComponent],
  exports: [UploadComponent],
  entryComponents: [DialogComponent],
  providers: [UploadService]
})
export class UploadModule { }
