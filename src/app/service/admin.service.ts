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
  bloqueCompte(compteDto: any): Observable<any> {
    return this.http.post<any>(BASIC_URL + '/api/admin/bloqueCompte', compteDto, {
      headers: this.createAuthorizationHeader()
    });
  }

  debloqueCompte(compteDto: any): Observable<any> {
    return this.http.post<any>(BASIC_URL + '/api/admin/debloqueCompte', compteDto, {
      headers: this.createAuthorizationHeader()
    });
  }
  getAllContribuables(): Observable<any> {
    return this.http.get(BASIC_URL + "/api/admin/lesContribuables", {
      headers: this.createAuthorizationHeader()
    })
  }
  changePassword(UserDto: any) {
    return this.http.post(BASIC_URL + "/api/admin/changepassword", UserDto, {
      headers: this.createAuthorizationHeader()
    })
  }
  saveImpot(impotDto: any) {
    return this.http.post(BASIC_URL + "/api/admin/typeImpot", impotDto, {
      headers: this.createAuthorizationHeader()
    })
  }
  getAllPeriodes(): Observable<any> {
    return this.http.get(BASIC_URL + "/api/admin/lesperiodes", {
      headers: this.createAuthorizationHeader()
    })
  }
  getAllimpots(): Observable<any> {
    return this.http.get(BASIC_URL + "/api/admin/lesimpots", {
      headers: this.createAuthorizationHeader()
    })
  }
  savedetailImpot(detailimpotDto: any) {
    return this.http.post(BASIC_URL + "/api/admin/detail", detailimpotDto, {
      headers: this.createAuthorizationHeader()
    })
  }
  getImpotDetails(libelle: string): Observable<any> {
    const url = BASIC_URL + `/api/admin/detailimpot?libelle=${libelle}`;
    return this.http.get<any>(url, { headers: this.createAuthorizationHeader() });
  }
  gettypeimpot(libelle: string): Observable<any> {
    const url = BASIC_URL + `/api/admin/typeimpot?libelle=${libelle}`;
    return this.http.get<any>(url, { headers: this.createAuthorizationHeader() });
  }
  saveformuleImpot(impotDto: any) {
    return this.http.put(BASIC_URL + "/api/admin/updateimpot", impotDto, {
      headers: this.createAuthorizationHeader()
    })
  }
  loadData(): Observable<any> {
    return this.http.get<any>('assets/forme-juridique.json');
  }
  loadpays(): Observable<any> {
    return this.http.get<any>('assets/pays.json');
  }
  loadactivité(): Observable<any> {
    return this.http.get<any>('assets/index.json');
  }
  savecontribuable(contribuable: any) {
    return this.http.post(BASIC_URL + "/api/admin/contribuable", contribuable, {
      headers: this.createAuthorizationHeader()
    })
  }
  getDeclarationByContribuable(matriculeFiscale: any) {
    const url = BASIC_URL + `/api/admin/declarationbycontribuable?matriculeFiscale=${matriculeFiscale}`;
    return this.http.get<any>(url, {
      headers: this.createAuthorizationHeader()
    });
  }
  updateImpot(impotDto: any) {
    return this.http.put(BASIC_URL + "/api/admin/updateimpot", impotDto, {
      headers: this.createAuthorizationHeader()
    })
  }
  getContribuableById(id: number) {
    const url = `${BASIC_URL}/api/admin/contribuable/${id}`;
    return this.http.get<any>(url, { headers: this.createAuthorizationHeader() });
  }
  getContribuableBymatricule(matricule: number) {
    return this.http.get(`${BASIC_URL}/api/client/contribuableMatricule?matriculeFiscale=${matricule}`, { headers: this.createAuthorizationHeader() })
  }
  getObligationById(id: number) {
    const url = `${BASIC_URL}/api/client/obligationContribuable/${id}`;
    return this.http.get<any>(url, { headers: this.createAuthorizationHeader() });
  }
}
