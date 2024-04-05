import { Injectable } from '@angular/core';

const USER = "user";
const TOKEN = "token";


@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  static saveToken(token: string): void {
    window.localStorage.removeItem(TOKEN);
    window.localStorage.setItem(TOKEN, token);

  }
  static saveUser(user: any): void {
    window.localStorage.removeItem(USER);
    window.localStorage.setItem(USER, JSON.stringify(user));

  }
  static getuser() {
    const userString = window.localStorage.getItem('USER'); // Assuming 'USER' is the key
    const user = userString ? JSON.parse(userString) : null;
    return user;
  }
  static getToken() {
    return window.localStorage.getItem(TOKEN);
  }
  static getUserRole(): string {
    const user = this.getuser();
    if (user == null) return "";
    return user.role;
  }
  static isAdminLoggedIn(): boolean {
    if (this.getToken() == null) return false;
    const role: string = this.getUserRole();
    return role == "Admin";
  }
  static isClientLoggedIn(): boolean {
    if (this.getToken() == null) return false;
    const role: string = this.getUserRole();
    return role == "Client";
  }
}
