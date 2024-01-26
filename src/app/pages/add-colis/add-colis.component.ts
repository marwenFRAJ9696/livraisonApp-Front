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
  changePriceOfDelivery(){
    if(this.form.packageNumber != null){
      let user =this.tokenStorage.getUser();
      this.adminService.getClientAccountByEmail(user).subscribe(
        (data) => {
          this.priceOfDelivery = data.priceOfDelivery * this.form.packageNumber
        
        })
    }
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
    {name :"Béja", child : [ {name :"Amdoun"},{name :"Béja Nord"},{name :"Béja Sud"},{name :"Goubellat"},{name :"Mjez El Beb"}
    ,{name :"Nefza"},{name :"Teboursouk"},{name :"Testour"},{name :"Thibar"}]},
    {name :"Kef", child : [ {name :"El Ksour"},{name :"Jerissa"},{name :"Kalaa El Khasba"},{name :"Kalaat Sinane"},{name :"Le Kef Est"}
    ,{name :"Le Kef Ouest"},{name :"Le Sers"},{name :"Nebeur"},{name :"Sakiet Sidi Youssef"},{name :"Tajerouine"},{name :"Touiref"}]},
    {name :"Jendouba", child : [ {name :"Ain Draham"},{name :"Balta Bou Aouene"},{name :"Bou Salem"},{name :"Fernana"},{name :"Ghardimaou"}
    ,{name :"Jendouba"},{name :"Jendouba Nord"},{name :"Oued Mliz"},{name :"Tabarka"}]},
    {name :"Monastir", child : [ {name :"Bekalta"},{name :"Bembla"},{name :"Beni Hassen"},{name :"Jemmal"},{name :"Ksar Helal"}
    ,{name :"Ksibet El Mediouni"},{name :"Moknine"},{name :"Monastir"},{name :"Ouerdanine"},{name :"Sahline"},{name :"Sayada Lamta Bou Hajar"}
    ,{name :"Skanes"},{name :"Teboulba"}]},
    {name :"Gabès", child : [ {name :"El Hamma"},{name :"El Metouia"},{name :"Gabes Medina"},{name :"Gabes Ouest"},{name :"Gabes Sud"}
    ,{name :"Ghannouche"},{name :"Mareth"},{name :"Matmata"},{name :"Menzel Habib"},{name :"Nouvelle Matmata"}]},
    {name :"Gafsa", child : [ {name :"Belkhir"},{name :"El Guettar"},{name :"El Ksar"},{name :"El Mdhilla"},{name :"Gafsa Nord"}
    ,{name :"Gafsa Sud"},{name :"Metlaoui"},{name :"Moulares"},{name :"Redeyef"},{name :"Sidi Aich"},{name :"Sned"}]},
    {name :"Kairouan", child : [ {name :"Bou Hajla"},{name :"Chebika"},{name :"Cherarda"},{name :"El Ala"},{name :"Haffouz"}
    ,{name :"Hajeb El Ayoun"},{name :"Kairouan Nord"},{name :"Kairouan Sud"},{name :"Nasrallah"},{name :"Oueslatia"},{name :"Sbikha"}]},
    {name :"Kasserine", child : [ {name :"El Ayoun"},{name :"Ezzouhour"},{name :"Feriana"},{name :"Foussana"},{name :"Haidra"}
    ,{name :"Hassi El Frid"},{name :"Jediliane"},{name :"Kasserine Nord"},{name :"Kasserine Sud"},{name :"Mejel Bel Abbes"},{name :"Sbeitla"}
    ,{name :"Sbiba"},{name :"Thala"}]},
    {name :"Mahdia", child : [ {name :"Bou Merdes"},{name :"Chorbane"},{name :"El Jem"},{name :"Hbira"},{name :"Ksour Essaf"}
    ,{name :"La Chebba"},{name :"Mahdia"},{name :"Melloulech"},{name :"Ouled Chamakh"},{name :"Sidi Alouene"},{name :"Souassi"}]},
    {name :"Médenine", child : [ {name :"Ajim"},{name :"Ben Guerdane"},{name :"Beni Khedache"},{name :"Djerba - Houmet Essouk"},
    {name :"Djerba - Midoun"},{name :"Medenine Nord"},{name :"Medenine Sud"},{name :"Sidi Makhlouf"},{name :"Zarzis"}]},
    {name :"Nabeul", child : [ {name :"Beni Khalled"},{name :"Beni Khiar"},{name :"Bou Argoub"},{name :"Dar Chaabane Elfehri"},
    {name :"El Haouaria"},{name :"El Mida"},{name :"Grombalia"},{name :"Hammam El Ghezaz"},{name :"Hammamet"},{name :"Kelibia"}
    ,{name :"Korba"},{name :"Menzel Bouzelfa"},{name :"Menzel Temime"},{name :"Nabeul"},{name :"Soliman"},{name :"Takelsa"}]},
    {name :"Sfax", child : [ {name :"5 aout"},{name :"Agareb"},{name :"Beb bhar"},{name :"Bir Ali Ben Khelifa"},
    {name :"El Amra"},{name :"El Hencha"},{name :"El nasriya"},{name :"Esskhira"},{name :"Ghraiba"},{name :"Ghraiba route Gabes"}
    ,{name :"Ghraiba route tunis"},{name :"Jebeniana"},{name :"Kerkenah"},{name :"Mahras"},{name :"Manzel Chaker"},{name :"Markez Kammoun"}
    ,{name :"Poudrier"},{name :"Route el ein"},{name :"Route Gabes"},{name :"Route gremda"},{name :"Route kaied mohamed"}
    ,{name :"Route lafrane"},{name :"Route mahdia"},{name :"Route manzel chaker"},{name :"Route matar"},{name :"Route Mharza"}
    ,{name :"Route saltnia"},{name :"Route sidi mansour"},{name :"Route soukra"},{name :"Route tanyour"},{name :"Kerkenah"}
    ,{name :"Route tunis"},{name :"Sakiet Eddaier"},{name :"Sakiet Ezzit"}]},
    {name :"Sidi bouzid", child : [ {name :"Ben Oun"},{name :"Bir El Haffey"},{name :"Cebbala"},{name :"Jilma"},
    {name :"Maknassy"},{name :"Menzel Bouzaiene"},{name :"Mezzouna"},{name :"Ouled Haffouz"},{name :"Regueb"},{name :"Sidi Bouzid Est"}
    ,{name :"Sidi Bouzid Ouest"},{name :"Souk Jedid"}]},
    {name :"Silana", child : [ {name :"Bargou"},{name :"Bou Arada"},{name :"El Aroussa"},{name :"Gaafour"},
    {name :"Kesra"},{name :"Le Krib"},{name :"Makthar"},{name :"Rohia"},{name :"Sidi Bou Rouis"},{name :"Siliana Nord"}
    ,{name :"Siliana Sud"}]},
    {name :"Sousse", child : [ {name :"Akouda"},{name :"Bou Ficha"},{name :"Bouhcina"},{name :"Enfidha"},
    {name :"Hammam Sousse"},{name :"Hergla"},{name :"Kalaa El Kebira"},{name :"Kalaa Essghira"},{name :"Khezama"},{name :"Kondar"}
    ,{name :"Msaken"},{name :"Sidi Bou Ali"},{name :"Sidi El Heni"},{name :"Sousse Jaouhara"},{name :"Sousse Riadh"},{name :"Sousse Ville"}]},
    {name :"Tatouine", child : [ {name :"Bir Lahmar"},{name :"Dhehiba"},{name :"Ghomrassen"},{name :"Remada"},
    {name :"Smar"},{name :"Tataouine Nord"},{name :"Tataouine Sud"}]},
    {name :"Tozuer", child : [ {name :"Degueche"},{name :"Hezoua"},{name :"Nefta"},{name :"Tameghza"},
    {name :"Tozeur"}]},
    {name :"Zaghouan", child : [ {name :"Bir Mcherga"},{name :"El Fahs"},{name :"Ennadhour"},{name :"Hammam Zriba"},
    {name :"Saouef"},{name :"Zaghouan"}]},
  ]
}
