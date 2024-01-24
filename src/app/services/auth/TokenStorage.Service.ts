import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  TOKEN_KEY = 'auth-token';
  USER_KEY = 'auth-user';
  constructor() { }

  signOut(): void {
    window.sessionStorage.clear();
  }

  public saveToken(token: string): void {
    window.sessionStorage.removeItem(this.TOKEN_KEY);
    window.sessionStorage.setItem(this.TOKEN_KEY, token);
  }

  public getToken(): string {
    return  window.sessionStorage.getItem(this.TOKEN_KEY);
  }

  public saveUser(user): void {
    window.sessionStorage.removeItem(this.USER_KEY);
    window.sessionStorage.setItem(this.USER_KEY, JSON.stringify(user));
  }

  public getUser(): any {
    console.log(window.sessionStorage)
    return JSON.parse(window.sessionStorage.getItem(this.USER_KEY));
  }

  
}
