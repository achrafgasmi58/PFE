import { Component, Input, SimpleChanges, OnChanges } from '@angular/core';
import { ClientDataService } from '../_services/client-data.service';
@Component({
  selector: 'app-client-file-card',
  templateUrl: './client-file-card.component.html',
  styleUrls: ['./client-file-card.component.css']
})
export class ClientFileCardComponent implements OnChanges {
  private _clientData: any = {};

  constructor(private clientDataService: ClientDataService) {}

  @Input()
  set clientData(value: any) {
    this._clientData = value;
    this.saveDataToCache();
  }

  get clientData(): any {
    return this._clientData;
  }

  saveData() {
    this.clientDataService.saveClientData(this.clientData).subscribe({
      next: (response) => {
        console.log('Data saved successfully', response);
        localStorage.removeItem('clientData');
        // Handle successful save here, like showing a success message
      },
      error: (error) => {
        console.error('Failed to save data', error);
        // Handle errors here, like showing an error message
      }
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['clientData']) {
      this.loadDataFromCache(); // Load data from cache when input changes
    }
  }

  private saveDataToCache(): void {
    localStorage.setItem('clientData', JSON.stringify(this._clientData));
  }

  private loadDataFromCache(): void {
    const cachedData = localStorage.getItem('clientData');
    if (cachedData) {
      this._clientData = JSON.parse(cachedData);
    }
  }
}

