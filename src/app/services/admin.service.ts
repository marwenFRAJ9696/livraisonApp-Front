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
export class AdminService {
  constructor(private http: HttpClient) { }

  createClientAccount(account): Observable<any> {
    console.log(account)
    return this.http.post(AUTH_API + 'comptes/addClientAccount', account, httpOptions);
    // return this.http.post(AUTH_API + 'index', httpOptions);
  }

  getAllClientAccount(): Observable<any> {
    return this.http.get(AUTH_API + 'comptes', httpOptions);
    // return this.http.post(AUTH_API + 'index', httpOptions);
  }
  getClientAccountByEmail(email): Observable<any> {
    return this.http.get(AUTH_API + 'comptes/'+email, httpOptions);
    // return this.http.post(AUTH_API + 'index', httpOptions);
  }

}
