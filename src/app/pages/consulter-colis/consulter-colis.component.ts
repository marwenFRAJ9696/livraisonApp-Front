import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'app/models/product';
import { User } from 'app/models/user';
import { AdminService } from 'app/services/admin.service';
import { TokenStorageService } from 'app/services/auth/TokenStorage.Service';
import { PackageService } from 'app/services/package.service';
import { ProductService } from 'app/services/product.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { PdfService } from 'app/services/pdf.service';

@Component({
  selector: 'app-consulter-colis',
  templateUrl: './consulter-colis.component.html',
  styles: [`
  :host ::ng-deep .p-dialog .product-image {
      width: 150px;
      margin: 0 auto 2rem auto;
      display: block;
  }
`],
  styleUrls: ['./consulter-colis.component.scss']
})
export class ConsulterColisComponent implements OnInit {

  productDialog: boolean;

  products: any[];

  product: any;

  selectedProducts: Product[];

  submitted: boolean;
  package : any = null;
  role : any;
  users : User []= [];
  selectedUser : any;
  colis : any= {};
 user :any = {};
 priceOfLivraison : number = 0;
 priceTotal : number = 0;
 isHidden: boolean = true;

  constructor(private packageService : PackageService, private tokenStorage : TokenStorageService,
     private productService: ProductService, private messageService: MessageService, private confirmationService: ConfirmationService,
     private router : Router,private userService : AdminService, private pdfService : PdfService) { }

  ngOnInit() {
    this.logOut();
    this.userService.getAllClientAccount().subscribe((data)=> {
        this.users = data;
    })
    this.userService.getClientAccountByEmail(this.tokenStorage.getUser()).subscribe((data )=> {
        this.role = data.role;
        if(data.role ==="ADMIN"){
            this.packageService.getPackagesByDate().subscribe((data)=> {
                this.products =data;
              })
        }else {
            this.packageService.getpackagesByClient(this.tokenStorage.getUser()).subscribe((data)=> {
                this.products =data;
              })
        }
      
    })
      
  }
  onSelectChange(){
    console.log(this.selectedUser)
    if (this.selectedUser ) {
        console.log("Selected user email:", this.selectedUser);
  
        this.packageService.getpackagesByClient(this.selectedUser).subscribe((data) => {
          this.products = data;
        });
      }else {
        this.userService.getClientAccountByEmail(this.tokenStorage.getUser()).subscribe((data )=> {
            this.role = data.role;
            if(data.role ==="ADMIN"){
                this.packageService.getPackagesByDate().subscribe((data)=> {
                    this.products =data;
                  })
            }else {
                this.packageService.getpackagesByClient(this.tokenStorage.getUser()).subscribe((data)=> {
                    this.products =data;
                  })
            }
          
        })
      }
  }
  showPackageDetail(colis){
    this.package=colis;
    console.log(this.package)
  }
  openNew() {
      this.product = {};
      this.submitted = false;
      this.productDialog = true;
  }

  deleteSelectedProducts() {
      this.confirmationService.confirm({
          message: 'Are you sure you want to delete the selected products?',
          header: 'Confirm',
          icon: 'pi pi-exclamation-triangle',
          accept: () => {
              this.products = this.products.filter(val => !this.selectedProducts.includes(val));
              this.selectedProducts = null;
              this.messageService.add({severity:'success', summary: 'Successful', detail: 'Products Deleted', life: 3000});
          }
      });
  }
  getUserLabel(user: any): string {
    return user.firstName + ' ' + user.lastName;
  }
  editProduct(product: Product) {
      this.product = {...product};
      this.productDialog = true;
  }
  changeStatus(colis){
    this.packageService.changeStatus(colis.id,colis.status).subscribe(data => {
        for(let p of this.products){
            if(p.id === colis.id){
                p.status = data.status;
            }
        }
    })
  }
  logOut(){
    if(this.tokenStorage.getUser() == null){
      this.tokenStorage.signOut(); 
      this.router.navigate(['/authentificate/signin']);  
    }
  }
  deleteProduct(product: Product) {
      this.confirmationService.confirm({
          message: 'Are you sure you want to delete ' + product.name + '?',
          header: 'Confirm',
          icon: 'pi pi-exclamation-triangle',
          accept: () => {
              this.products = this.products.filter(val => val.id !== product.id);
              this.product = {};
              this.messageService.add({severity:'success', summary: 'Successful', detail: 'Product Deleted', life: 3000});
          }
      });
  }

  hideDialog() {
      this.productDialog = false;
      this.submitted = false;
  }
  
  saveProduct() {
      this.submitted = true;

      if (this.product.name.trim()) {
          if (this.product.id) {
              this.products[this.findIndexById(this.product.id)] = this.product;                
              this.messageService.add({severity:'success', summary: 'Successful', detail: 'Product Updated', life: 3000});
          }
          else {
              this.product.id = this.createId();
              this.product.image = 'product-placeholder.svg';
              this.products.push(this.product);
              this.messageService.add({severity:'success', summary: 'Successful', detail: 'Product Created', life: 3000});
          }

          this.products = [...this.products];
          this.productDialog = false;
          this.product = {};
      }
  }

  findIndexById(id: string): number {
      let index = -1;
      for (let i = 0; i < this.products.length; i++) {
          if (this.products[i].id === id) {
              index = i;
              break;
          }
      }

      return index;
  }

  createId(): string {
      let id = '';
      var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      for ( var i = 0; i < 5; i++ ) {
          id += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      return id;
  }
 // Fonction pour générer le PDF
 generatePDF(colis : any) {
    this.colis = colis;
    // this.userService.getClientAccountByEmail(this.colis.emailUser).subscribe(
    //     (data)=> {
    //         this.user = data;
    //         this.priceOfLivraison = this.priceOfLivraison + (data.priceOfDelivery * this.colis.packageNumber);
    //         this.priceTotal = this.priceTotal + this.priceOfLivraison + this.colis.priceNet;
    //         this.isHidden = false; // Affichez le contenu
    //         setTimeout(() => {
    //             this.captureAndSavePDF();
    //             this.priceTotal = 0;
    //             this.priceOfLivraison = 0;
    //           }, 2000);
    //     }
    // )
    this.pdfService.generatePDF(this.colis.id).subscribe((response: any) => {
      console.log(response)
      const contentDispositionHeader = response.headers.get('Content-Disposition');
      const filename = "bon-livraison.pdf";
  
      // Create a Blob from the response data
      const blob = new Blob([response.body], { type: 'application/pdf' });
  
      // Create a download link and trigger the download
      const downloadLink = document.createElement('a');
      const url = window.URL.createObjectURL(blob);
      downloadLink.href = url;
      downloadLink.download = filename;
      document.body.appendChild(downloadLink);
      downloadLink.click();
  
      // Clean up
      document.body.removeChild(downloadLink);
      window.URL.revokeObjectURL(url);
    });
  
  }
  captureAndSavePDF(){
      //wait 2 seconde 
      const element = document.getElementById('canvas'); // Replace 'canvas' with the ID of your HTML element
      if (element) {
        html2canvas(element).then((canvas) => {
          // Convert canvas to image data URL
          const imgData = canvas.toDataURL('image/png');
  
          // Create a new jsPDF instance
          const pdf = new jsPDF('p', 'mm', 'a4'); // Set units to millimeters for A4
          const imgProp = pdf.getImageProperties(imgData);
    
        if (window.innerWidth <= 767) {
          // Code à exécuter pour les appareils mobiles
          console.log("Vous êtes sur un appareil mobile.");
        
            // Calculate the height based on the A4 width and aspect ratio
        const width = pdf.internal.pageSize.getWidth();
        const height = pdf.internal.pageSize.getHeight();
          pdf.addImage(imgData, 'PNG', 0, 0, width, height); // Adjust the x, y, width, and height as needed

        }else {
          const width =pdf.internal.pageSize.getWidth()
          const height= (imgProp.height * width) /imgProp.width;
          pdf.addImage(imgData, 'PNG', 0, 0, width, height); // Adjust the x, y, width, and height as needed

        }
          // Save the PDF
          pdf.save('bon-de-livraison.pdf');
          this.isHidden = true; // Affichez le contenu

        });
      } else {
        console.error('Element with ID "canvas" not found.');
      }
  }
}