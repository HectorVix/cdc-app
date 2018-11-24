import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  auth() {
    if (localStorage.getItem('userToken') != null) {
      return true;
    }
    else {
      return false;
    }
  }
}
