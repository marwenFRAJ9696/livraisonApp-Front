import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { EnvironmentLoaderService } from './environement.service';


const AUTH_API = environment.api_url;

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' 
})
};
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient, private environementService : EnvironmentLoaderService) { }

  login(credentials): Observable<any> {
    console.log(credentials)
    return this.http.post(`${this.environementService.getEnvironment().api_url}` + 'auth/signin', {
      email: credentials.email,
      password: credentials.password
    }, httpOptions);
    // return this.http.post(AUTH_API + 'index', httpOptions);
  }}
