import { Component, OnInit ,Input,Output,EventEmitter} from '@angular/core';

@Component({
  selector: 'app-privado-page',
  templateUrl: './privado-page.component.html',
  styleUrls: ['./privado-page.component.scss']
})
export class PrivadoPageComponent implements OnInit {
  saludo: string ="hola bit";
  @Output() valor = new String();
  
  constructor() { }

  ngOnInit() {
    this.valor=this.saludo;
    console.log("vamos");
  }
  Valor(){
    this.saludo="exito alfin";
    console.log("pasando");
  }
}
