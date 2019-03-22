import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.scss']
})
export class MapaComponent implements OnInit {

  lat: number = 15.5000000; lng: number = -90.2500000;

  constructor() { }

  ngOnInit() {
  }

}
