import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Response } from "@angular/http";
import { Observable , of } from 'rxjs';
import {UsuarioModelo} from '../modelo/usuario-modelo';

import { catchError, map, tap } from 'rxjs/operators';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  readonly rootUrl = 'http://localhost:8080/cdc/rs';
  data : any;

  constructor(private http: HttpClient) { }

  

  userAuthentication(userName, password) {
    
    var data = "username=" + userName + "&password=" + password + "&grant_type=password";
    var reqHeader = new HttpHeaders({ 'Content-Type': 'application/x-www-urlencoded','No-Auth':'True' });
   
    const req  =this.http.post(this.rootUrl + '/us/token', { headers: reqHeader })
      .subscribe(
        res => {
          console.log(res);
        },
        err => {
          console.log("Error occured");
        }
      );
  }

  getUsuarioDatos(){
    console.log('getUs');
    return this.http.get('http://192.168.1.2:8080/cdc/rs/us/') ;
    /*.subscribe(data => {
      this.data = data;
      console.log(this.data);
  
    });*/
  
   }
   addUsuario (us: UsuarioModelo): Observable<UsuarioModelo> {
    return this.http.post<UsuarioModelo>(this.rootUrl + '/us/reg', us, httpOptions).pipe(
      tap((us: UsuarioModelo) => console.log(`added us w/ nombre=${us.nombre}`)),
      catchError(this.handleError<UsuarioModelo>('addUsuario'))
    );
  }
 
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
     console.error(error); 

      return of(result as T);
    };
  }

   }

