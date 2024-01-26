import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Package } from './model/package';
import { EnvironmentLoaderService } from './environement.service';

const AUTH_API = 'http://localhost:8080/api/v1/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' 
})
};
@Injectable({
  providedIn: 'root'
})
export class PackageService {
  constructor(private http: HttpClient, private environementService : EnvironmentLoaderService) { }

  createPackage(colis : Package): Observable<any> {
    return this.http.post(`${this.environementService.getEnvironment().api_url}` + 'packages/addPackage', colis, httpOptions);
    // return this.http.post(AUTH_API + 'index', httpOptions);
  }

  getpackagesByClient(email): Observable<any> {
    return this.http.get(`${this.environementService.getEnvironment().api_url}` +  'packages/'+email, httpOptions);
    // return this.http.post(AUTH_API + 'index', httpOptions);
  }
  changeStatus(id,status): Observable<any> {
    return this.http.post(`${this.environementService.getEnvironment().api_url}` +  'packages/changeStatus/'+id+'?status='+status, httpOptions);
    // return this.http.post(AUTH_API + 'index', httpOptions);
  }

  getPackagesByDate(): Observable<any> {
    return this.http.get(`${this.environementService.getEnvironment().api_url}` +  'packages/createdDate', httpOptions);
    // return this.http.post(AUTH_API + 'index', httpOptions);
  }
}
