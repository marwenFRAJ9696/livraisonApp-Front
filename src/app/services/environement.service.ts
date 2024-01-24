import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment as devEnvironment } from 'environments/environment';
import { environment as prodEnvironment } from 'environments/environment.prod';



@Injectable({
  providedIn: 'root'
})
export class EnvironmentLoaderService {
  getEnvironment() {
    return process.env.NODE_ENV === 'production' ? prodEnvironment : devEnvironment;
  }

}
