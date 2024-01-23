import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'app/services/admin.service';
import { TokenStorageService } from 'app/services/auth/TokenStorage.Service';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css']
})
export class AddClientComponent implements OnInit {
  form : any ={};
  genres : any[] =[
    "Homme","Femme"
  ]
  constructor(private adminService: AdminService, private tokenStorage : TokenStorageService, private router : Router) { }

  ngOnInit(): void {
    this.logOut();
  }

  onSubmit(): void {
    this.adminService.createClientAccount(this.form).subscribe(
        data => {
          console.log(data)
          this.form ={};
        });
      }
  logOut(){
        if(this.tokenStorage.getUser() == null){
          this.tokenStorage.signOut(); 
          this.router.navigate(['/authentificate/signin']);  
        }
      }
}
