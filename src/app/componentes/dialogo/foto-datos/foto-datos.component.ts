import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
@Component({
  selector: 'app-foto-datos',
  templateUrl: './foto-datos.component.html',
  styleUrls: ['./foto-datos.component.scss']
})
export class FotoDatosComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<FotoDatosComponent>) { }

  ngOnInit() {
    
  }

}
