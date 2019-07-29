import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-confirmacion',
  templateUrl: './confirmacion.component.html',
  styleUrls: ['./confirmacion.component.scss']
})
export class ConfirmacionComponent {

  constructor(public dialogRef: MatDialogRef<ConfirmacionComponent>) { }

}
