import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
const BASIC_URL = "http://localhost:8095";
@Injectable({
  providedIn: 'root'
})
export class ClientService {

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
  getContribuableById(id: number) {
    const url = `${BASIC_URL}/api/client/contribuable/${id}`;
    return this.http.get<any>(url, { headers: this.createAuthorizationHeader() });
  }
}
