import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CheckClientService {
  private apiUrl = 'http://127.0.0.1:5001/data/filter'; // URL de votre API
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) { }

  filterData(prenom: string | undefined, nom: string | undefined, dateDeNaissance: string | undefined, typePersonne: string | undefined): Observable<any[]> {
    const payload = {
      Prenom: prenom,
      Nom: nom,
      Date_de_naissance: dateDeNaissance,
      Type_de_personne: typePersonne
    };
    return this.http.post<any[]>(this.apiUrl, payload, { headers: this.headers });
  }
}
