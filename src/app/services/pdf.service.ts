import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EnvironmentLoaderService } from './environement.service';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' 
})
};
@Injectable({
  providedIn: 'root'
})
export class PdfService {

  constructor(private http: HttpClient, private environementService : EnvironmentLoaderService) { }

  generatePDF(id): Observable<any> {
    return this.http.get(`${this.environementService.getEnvironment().api_url}` +  'pdf/download-pdf/'+id, {
      responseType: 'arraybuffer', // Set responseType to 'arraybuffer'
      observe: 'response'
    });
    // return this.http.post(AUTH_API + 'index', httpOptions);
  }
}
