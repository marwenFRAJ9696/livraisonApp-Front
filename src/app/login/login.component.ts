import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'app/models/user';
import { TokenStorageService } from 'app/services/auth/TokenStorage.Service';
import { LoginService } from 'app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  user: User;
  form: any = {};
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  isLoading = false;
  constructor(private loginService : LoginService,private tokenStorage : TokenStorageService, private route: Router) { }

  ngOnInit(): void {
    this.user = new User();
  }

  onSubmit(): void {
    console.log(this.form)
    this.user.email = this.form.email;
    this.loginService.login(this.form).subscribe(
        data => {
          console.log(data)
          this.tokenStorage.saveToken(data.token);
          this.tokenStorage.saveUser(this.user.email);
          this.isLoginFailed = false;
          this.isLoggedIn = true;
          this.goToHome();

        });
        // ,
        // err => {
        //   this.errorMessage = err;
        //   this.isLoginFailed = true;
        //   console.log(err)
        //   // this.messageService.add({severity:'error', summary: 'Error', detail: 'Signin Failed ! may be your account is not yet activated'})

        // }
        
  }
  goToHome(): void {
    this.route.navigate(['/view-colis']);
  }
}
