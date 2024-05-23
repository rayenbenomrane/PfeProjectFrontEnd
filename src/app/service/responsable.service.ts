import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
const BASIC_URL = "http://localhost:8095";
@Injectable({
  providedIn: 'root'
})
export class ResponsableService {

  constructor(private http: HttpClient) { }
  createAuthorizationHeader(): HttpHeaders {
    let authHeaders: HttpHeaders = new HttpHeaders();
    const token = StorageService.getToken();
    if (token) {
      return authHeaders.set('Authorization', 'Bearer ' + token);
    } else {

      console.error('Token not found in local storage');
      return authHeaders;
    }
  }
  getReclamations() {
    return this.http.get(BASIC_URL + "/api/Responsable/lesreclamations", {
      headers: this.createAuthorizationHeader()
    })
  }
  updateSolution(solution: any) {
    return this.http.put(BASIC_URL + "/api/Responsable/updatereclamation", solution, {
      headers: this.createAuthorizationHeader()
    })
  }
  getdetail(iddecalaration: number) {
    const url = `${BASIC_URL}/api/Responsable/lesdetailsdeclaration?declaration=${iddecalaration}`;
    return this.http.get<any>(url, {
      headers: this.createAuthorizationHeader()
    });
  }

}
