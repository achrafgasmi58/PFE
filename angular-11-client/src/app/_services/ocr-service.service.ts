import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OcrService {
  private apiUrl = 'http://localhost:5000/ocr'; // Your Flask API URL

  constructor(private http: HttpClient) { }

  // submitImage(imageFile: File): Observable<any> {
  //   const formData = new FormData();
  //   formData.append('image', imageFile);
  //   return this.http.post<any>(this.apiUrl, formData);
  // }

  submitCroppedImage(imageData: FormData): Observable<any> {
    return this.http.post(this.apiUrl, imageData);
  }

  submitImage(imageData: FormData): Observable<any> {
    return this.http.post('http://localhost:5000/ocr', imageData);
  }
}
