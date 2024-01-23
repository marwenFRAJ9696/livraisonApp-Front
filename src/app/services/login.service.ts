import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


const AUTH_API = 'http://localhost:8080/api/v1/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' 
})
};
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  login(credentials): Observable<any> {
    console.log(credentials)
    return this.http.post(AUTH_API + 'auth/signin', {
      email: credentials.email,
      password: credentials.password
    }, httpOptions);
    // return this.http.post(AUTH_API + 'index', httpOptions);
  }}
