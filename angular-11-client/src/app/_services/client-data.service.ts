// In your Angular service file

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ClientDataService {
  private apiUrl = 'http://localhost:8080/api'; // Replace with your actual API URL

  constructor(private http: HttpClient) {}

  saveClientData(clientData: any) {
    return this.http.post(`${this.apiUrl}/client-files/`, clientData);
  }
}
