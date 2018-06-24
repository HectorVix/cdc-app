import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Response } from "@angular/http";
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  readonly rootUrl = 'http://localhost:8080/web/rs';
  data : any;
  constructor(private http: HttpClient) { }

  userAuthentication(userName, password) {
    var data = "username=" + userName + "&password=" + password + "&grant_type=password";
    var reqHeader = new HttpHeaders({ 'Content-Type': 'application/x-www-urlencoded','No-Auth':'True' });
    return this.http.post(this.rootUrl + '/us/token', data, { headers: reqHeader });
  }

  getUsuarioDatos(){
    console.log('getUs');
    return this.http.get('http://192.168.1.2:8080/web/rs/us/') ;
    /*.subscribe(data => {
      this.data = data;
      console.log(this.data);
  
    });*/
  
   }
   }

