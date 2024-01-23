import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'app/services/admin.service';
import { TokenStorageService } from 'app/services/auth/TokenStorage.Service';
import { Package } from 'app/services/model/package';
import { PackageService } from 'app/services/package.service';

@Component({
  selector: 'app-add-colis',
  templateUrl: './add-colis.component.html',
  styleUrls: ['./add-colis.component.css']
})
export class AddColisComponent implements OnInit {
  private package : Package ;
  form : any ={};
  ville : any[] = [];
  priceOfDelivery : number =0; 
  price : number =0; 
  totalPrice : number=0 ; 
  constructor(private tokenStorage : TokenStorageService, private packageService : PackageService,
     private adminService : AdminService,private router : Router) { }

  ngOnInit(): void {
    this.logOut();
    this.package = new Package();
    let user =this.tokenStorage.getUser();
    console.log("mail user " +user);
    this.adminService.getClientAccountByEmail(user).subscribe(
      (data) => {
        this.priceOfDelivery = data.priceOfDelivery 
      }
    )
  }
  calculateSum(){
    this.price = this.form.priceNet;
   
    this.totalPrice =  parseFloat(this.priceOfDelivery.toString()) + parseFloat(this.price.toString());
  }
  onSubmit(){
    this.package.fullName = this.form.fullName;
    this.package.articleNumber = this.form.articleNumber
    this.package.packageNumber = this.form.packageNumber
    this.package.telNumber = this.form.telNumber
    this.package.priceNet = this.form.priceNet
    this.package.comment = this.form.comment
    this.package.deliveryType = this.form.deliveryType
    this.package.designation = this.form.designation
    this.package.governorate = this.form.governorate
    this.package.city = this.form.city
    this.package.isPackageCanBeOpen = this.form.isPackageCanBeOpen;
    this.package.paymentMode = this.form.paymentMode
    this.package.fullAddress = this.form.fullAddress
    this.package.emailUser =this.tokenStorage.getUser()
    console.log(this.package)
    this.packageService.createPackage(this.package).subscribe(
      (data) => {
        console.log(data)
      this.form = {};
      }
    )

  }
  onSelectChange(event: any): void {
    // Access the selected value using event.target.value
    const selectedValue = event.target.value;
    if(selectedValue ===''){
      this.ville =[];
    }
    for(let gov of this.Governorats){
      if(gov.name === selectedValue){
          this.ville=gov.child;
      }
    }
    // Your logic based on the selected value goes here
    console.log('Selected value:', selectedValue);
    console.log(this.ville);
  }
  logOut(){
    if(this.tokenStorage.getUser() == null){
      this.tokenStorage.signOut(); 
      this.router.navigate(['/authentificate/signin']);  
    }
  }

  paymentModes = [
    { key:"CASH",name :"Espèce seulement" },
    { key:"CHEQUE",name :"Chèque seulement" },
    { key:"CASH_OR_CHEQUE",name :"Espèce ou Chèque" }
  ]
  deliveryTypes = [
    { key:"RAPID",name :"Rapide (moins de 24 heures)" },
    { key:"NORMAL",name :"Normal (entre 48 heures et 72 heures)" }
  ]
  Governorats  = [
    {name :"Tunis", child : [ {name :"Ain zaghouan"},{name :"Bab bhar"},{name :"Bab souika"},{name :"Carthage"},{name :"Cite El Khadhra"}
    ,{name :"El Hariria"},{name :"El Kabaria"},{name :"El Kram"},{name :"El Menzah"},{name :"El Omarane"},{name :"El Omarane Superieur"}
    ,{name :"El Ouerdia"},{name :"Essijoumi"},{name :"Ezzouhour"},{name :"jbel jelloud"},{name :"La goulette"},{name :"La Marsa"}  ]},
    {name :"Ben Arous" , child : [ {name :"Ben Arous"},{name :"Bou mhel"},{name :"El Mourouj"},{name :"Ezzahra"},{name :"Fouchana"}
    ,{name :"Hamem Chatt"},{name :"Hamem Lif"},{name :"Megrine"},{name :"Mohamdia"},{name :"Morneg"},{name :"Nouvelle Medina"}
    ,{name :"Rades"} ]},
    {name :"Ariana", child : [ {name :"Ariana Ville"},{name :"Ettadhamen"},{name :"Kalaat landalous"},{name :"La Soukra"},{name :"Mnihla"}
    ,{name :"Raoued"},{name :"Sidi Thabet"} ]},
    {name :"Béja"},
    {name :"Kef"},
    {name :"Jendouba"},
    {name :"Monastir"},
    {name :"Gabes"},
    {name :"Gafsa"},
    {name :"Kairouan"},
    {name :"Kasserine"},
    {name :"Mahdia"},
    {name :"Médenine"},
    {name :"Nabeul"},
    {name :"Sfax"},
    {name :"Sidi bouzid"},
    {name :"Silana"},
    {name :"Sousse"},
    {name :"Tatouine"},
    {name :"Tozuer"},
    {name :"Zaghouan"},
  ]
}
