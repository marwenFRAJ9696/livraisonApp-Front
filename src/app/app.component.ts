import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from './services/auth/TokenStorage.Service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{
  
  constructor(private tokenStorage : TokenStorageService , private router : Router){}
  ngOnInit(): void {
    if(this.tokenStorage.getUser() == null){
      this.tokenStorage.signOut(); 
      this.router.navigate(['/authentificate/signin']);  
    }
  }
}
