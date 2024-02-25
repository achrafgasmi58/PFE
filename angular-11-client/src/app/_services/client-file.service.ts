

// client-file.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ClientFile } from '../models/client-file.model'; // Adjust the import path as needed


@Injectable({
  providedIn: 'root'
})
export class ClientFileService {
  private baseUrl = 'http://localhost:8080/api/client-files';

  constructor(private http: HttpClient) { }

  getAllClientFiles(): Observable<ClientFile[]> {
    return this.http.get<ClientFile[]>(`${this.baseUrl}/`);
  }


  getClientFileById(id: number): Observable<ClientFile> {
    return this.http.get<ClientFile>(`${this.baseUrl}/${id}`);
  }

  updateClientFile(id: number, value: ClientFile): Observable<Object> {
    return this.http.put(`${this.baseUrl}/${id}`, value);
  }
  deleteClientFile(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
