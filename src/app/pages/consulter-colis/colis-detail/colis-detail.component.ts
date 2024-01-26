import { Component, Input, OnInit } from '@angular/core';
import { AdminService } from 'app/services/admin.service';
import { TokenStorageService } from 'app/services/auth/TokenStorage.Service';

@Component({
  selector: 'app-colis-detail',
  templateUrl: './colis-detail.component.html',
  styleUrls: ['./colis-detail.component.css']
})
export class ColisDetailComponent implements OnInit {
  @Input() colis : any = null;
   user : any = {};
   priceOfLivraison : number = 0;
   priceTotal : number = 0;
  
  constructor(private adminService : AdminService) { }

  ngOnInit(): void {
    console.log("je suis la " +this.colis)
    this.adminService.getClientAccountByEmail(this.colis.emailUser).subscribe(data => {
      console.log(data)
      this.priceOfLivraison = this.priceOfLivraison + (data.priceOfDelivery * this.colis.packageNumber);
      this.priceTotal = this.priceTotal + this.priceOfLivraison + this.colis.priceNet;
    })
  } 

}
