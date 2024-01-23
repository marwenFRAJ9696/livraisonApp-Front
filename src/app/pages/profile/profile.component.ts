import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'app/services/admin.service';
import { TokenStorageService } from 'app/services/auth/TokenStorage.Service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profil : any= {};
  constructor(private tokenStorage : TokenStorageService , private adminService : AdminService, private router : Router) { }

  ngOnInit(): void {
    this.logOut();
    this.adminService.getClientAccountByEmail(this.tokenStorage.getUser()).subscribe(
      (data) => {
        this.profil =data;
        console.log(this.profil)
      }
    )
  }

  logOut(){
    if(this.tokenStorage.getUser() == null){
      this.tokenStorage.signOut(); 
      this.router.navigate(['/authentificate/signin']);  
    }
  }
}
