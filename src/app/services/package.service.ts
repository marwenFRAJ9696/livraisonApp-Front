import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Package } from './model/package';

const AUTH_API = 'http://localhost:8080/api/v1/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' 
})
};
@Injectable({
  providedIn: 'root'
})
export class PackageService {
  constructor(private http: HttpClient) { }

  createPackage(colis : Package): Observable<any> {
    return this.http.post(AUTH_API + 'packages/addPackage', colis, httpOptions);
    // return this.http.post(AUTH_API + 'index', httpOptions);
  }

  getpackagesByClient(email): Observable<any> {
    return this.http.get(AUTH_API + 'packages/'+email, httpOptions);
    // return this.http.post(AUTH_API + 'index', httpOptions);
  }
  changeStatus(id,status): Observable<any> {
    return this.http.post(AUTH_API + 'packages/changeStatus/'+id+'?status='+status, httpOptions);
    // return this.http.post(AUTH_API + 'index', httpOptions);
  }
}
