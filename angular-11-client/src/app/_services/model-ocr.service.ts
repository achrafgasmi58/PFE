import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ModelOcrService {

  constructor(private http: HttpClient) {}

  sendImageToPowerAutomate(imageData: string) {
    const url = 'https://prod-252.westeurope.logic.azure.com:443/workflows/38b2e01d681d4f709be12a7bed8e7f8d/triggers/manual/paths/invoke?api-version=2016-06-01'; // Remplacez par votre URL de webhook Power Automate
    // Assurez-vous que le corps de la requête est correctement structuré
    return this.http.post(url, { image: imageData });
  }
}
