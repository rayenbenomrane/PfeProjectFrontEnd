import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StorageService } from './storage.service';
const BASIC_URL = "http://localhost:8095";
@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }

  createAuthorizationHeader(): HttpHeaders {
    let authHeaders: HttpHeaders = new HttpHeaders();
    const token = StorageService.getToken(); // Call the getToken() method to retrieve the token
    if (token) {
      return authHeaders.set('Authorization', 'Bearer ' + token); // Note the space after 'Bearer'
    } else {
      // Handle case where token is not available
      console.error('Token not found in local storage');
      return authHeaders;
    }
  }
  validerCompte(UserDto: any) {
    return this.http.post(BASIC_URL + "/api/admin/valider", UserDto, {
      headers: this.createAuthorizationHeader()
    })
  }

  getAllInscription(): Observable<any> {
    return this.http.get(BASIC_URL + "/api/admin/Inscription", {
      headers: this.createAuthorizationHeader()
    })
  }
  getAllComptes(): Observable<any> {
    return this.http.get(BASIC_URL + "/api/admin/lescompte", {
      headers: this.createAuthorizationHeader()
    })
  }
}
