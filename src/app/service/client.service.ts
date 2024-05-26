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
  savereclamation(reclamation: any) {
    const headers: HttpHeaders = this.createAuthorizationHeader();
    return this.http.post(`${BASIC_URL}/api/client/savereclamation`, reclamation, { headers });
  }
  saveDeclaration(declarationdto: any) {
    const headers: HttpHeaders = this.createAuthorizationHeader();
    return this.http.post(`${BASIC_URL}/api/client/declaration`, declarationdto, { headers });
  }
  getObligationById(id: number) {
    const url = `${BASIC_URL}/api/client/obligationContribuable/${id}`;
    return this.http.get<any>(url, { headers: this.createAuthorizationHeader() });
  }
  getContribuableBymatricule(matricule: number) {
    return this.http.get(`${BASIC_URL}/api/client/contribuableMatricule?matriculeFiscale=${matricule}`, { headers: this.createAuthorizationHeader() })
  }
  gettypeDeclaration() {
    const url = `${BASIC_URL}/api/client/typedeclaration`;
    return this.http.get<any>(url, { headers: this.createAuthorizationHeader() });
  }
  updateDetailDeclaration(declarationdto: any) {
    const url = `${BASIC_URL}/api/client/update`;
    const headers: HttpHeaders = this.createAuthorizationHeader();
    return this.http.put(url, declarationdto, { headers });
  }
  calculateEquation(calculateRequest: any) {
    const url = `${BASIC_URL}/api/client/calculate`;
    const headers: HttpHeaders = this.createAuthorizationHeader();
    return this.http.post(url, calculateRequest, { headers });

  }
  getFormulaByLibelle(libelle: string) {
    const url = `${BASIC_URL}/api/client/formuledeCalcul?libelle=${libelle}`;
    return this.http.get<any>(url, {
      headers: this.createAuthorizationHeader()
    });
  }
  updateMontantDeclaration(declarationdto: any) {
    const url = `${BASIC_URL}/api/client/updateMontant`;
    const headers: HttpHeaders = this.createAuthorizationHeader();
    return this.http.put(url, declarationdto, { headers });
  }
  getDeclarationByContribuable(matriculeFiscale: any) {
    const url = `${BASIC_URL}/api/client/declarationbycontribuable?matriculeFiscale=${matriculeFiscale}`;
    return this.http.get<any>(url, {
      headers: this.createAuthorizationHeader()
    });
  }
  initPaiement(paymentRequest: any) {
    const url = `${BASIC_URL}/api/client/init`;
    const headers: HttpHeaders = this.createAuthorizationHeader();
    return this.http.post(url, paymentRequest, { headers });
  }
  getCompteByid(idcompte: any) {
    const url = `${BASIC_URL}/api/client/getCompte?idcompte=${idcompte}`;
    return this.http.get<any>(url, {
      headers: this.createAuthorizationHeader()
    });
  }
  savePaiement(paymentRequest: any) {
    const url = `${BASIC_URL}/api/client/savePaiement`;
    const headers: HttpHeaders = this.createAuthorizationHeader();
    return this.http.post(url, paymentRequest, { headers });
  }
  getNotification(matricule: number) {
    const url = `${BASIC_URL}/api/client/notification?matricule=${matricule}`;
    const headers: HttpHeaders = this.createAuthorizationHeader();
    return this.http.get(url, { headers })
  }
}
