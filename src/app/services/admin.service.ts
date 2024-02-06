import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EnvironmentLoaderService } from './environement.service';



const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' 
})
};
@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient, private environementService : EnvironmentLoaderService) { }

  createClientAccount(account): Observable<any> {
    console.log(account)
    return this.http.post(`${this.environementService.getEnvironment().api_url}` + 'comptes/addClientAccount', account, httpOptions);
    // return this.http.post(AUTH_API + 'index', httpOptions);
  }

  getAllClientAccount(): Observable<any> {
    return this.http.get(`${this.environementService.getEnvironment().api_url}` + 'comptes', httpOptions);
    // return this.http.post(AUTH_API + 'index', httpOptions);
  }
  getClientAccountByEmail(email): Observable<any> {
    return this.http.get(`${this.environementService.getEnvironment().api_url}` + 'comptes/'+email, httpOptions);
    // return this.http.post(AUTH_API + 'index', httpOptions);
  }

  

}
