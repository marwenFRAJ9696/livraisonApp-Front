import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'app/services/admin.service';
import { TokenStorageService } from 'app/services/auth/TokenStorage.Service';

@Component({
  selector: 'app-view-client',
  templateUrl: './view-client.component.html',
  styleUrls: ['./view-client.component.css']
})
export class ViewClientComponent implements OnInit {
  clientAccount : any[] = [];
  constructor(private adminService : AdminService, private tokenStorage : TokenStorageService , private router : Router) { }

  ngOnInit(): void {
    this.logOut();
    this.adminService.getAllClientAccount().subscribe(data => {
      console.log(data)
      this.clientAccount = data;
    })
  }

  logOut(){
    if(this.tokenStorage.getUser() == null){
      this.tokenStorage.signOut(); 
      this.router.navigate(['/authentificate/signin']);  
    }
  }

}
