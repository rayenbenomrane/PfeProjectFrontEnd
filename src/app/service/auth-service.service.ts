import { Contribuable } from './../../Models/Contribuable';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const BASIC_URL = "http://localhost:8095";
@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor(private http: HttpClient) { }

  register(signupRequest: any): Observable<any> {
    return this.http.post(`${BASIC_URL}/api/auth/signup`, signupRequest);
  }
  login(loginRequest: any): Observable<any> {
    return this.http.post(`${BASIC_URL}/api/auth/login`, loginRequest);
  }
  getContribuableByMatriculeFiscale(matriculefiscale: number): Observable<any> {
    return this.http.get(`${BASIC_URL}/api/auth/contribuableMatricule?matriculeFiscale=${matriculefiscale}`)
  }
  getAllInscription(): Observable<any> {
    return this.http.get(BASIC_URL + "/api/auth/Inscription")
  }
  checkDeclaration(request: any): Observable<any> {
    const url = `${BASIC_URL}/api/auth/checkDeclaration`;
    return this.http.post<any>(url, request);
  }

}
