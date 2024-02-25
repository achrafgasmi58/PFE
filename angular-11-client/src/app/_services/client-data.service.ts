// In your Angular service file

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ClientFile } from '../models/client-file.model';
import {Observable} from 'rxjs'; // Adjust the import path as needed


@Injectable({
  providedIn: 'root'
})
export class ClientDataService {
  private apiUrl = 'http://localhost:8080/api'; // Replace with your actual API URL

  constructor(private http: HttpClient) {}

  saveClientData(clientData: ClientFile): Observable<any> {
    return this.http.post(`${this.apiUrl}/client-files/`, clientData);
  }

}
