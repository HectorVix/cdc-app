import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-caracterizacion',
  templateUrl: './caracterizacion.component.html',
  styleUrls: ['./caracterizacion.component.scss']
})
export class CaracterizacionComponent implements OnInit {
  areaBotanica: Boolean = false;
  areaZoologia: Boolean = false;

  constructor() {
    this.seleccionar_Area();
  }

  ngOnInit() {
  }
  seleccionar_Area() {
    var jwthelper = new JwtHelperService();
    var decodedToken = jwthelper.decodeToken(localStorage.getItem('userToken'));
    switch (decodedToken.sub) {
      case "Admin":
        this.areaBotanica = true;
        this.areaZoologia = true;
        break;
      case "Botanica":
        this.areaBotanica = true;
        this.areaZoologia = false;
        break;
      case "Zoologia":
        this.areaZoologia = true;
        this.areaBotanica = false;
        break;
    }
  }

}
