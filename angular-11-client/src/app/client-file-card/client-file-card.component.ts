import { Component, Input, SimpleChanges, OnChanges } from '@angular/core';
import { ClientDataService } from '../_services/client-data.service';
import { ClientFile } from '../models/client-file.model'; // Ensure this path is correct

@Component({
  selector: 'app-client-file-card',
  templateUrl: './client-file-card.component.html',
  styleUrls: ['./client-file-card.component.css']
})
export class ClientFileCardComponent implements OnChanges {
  @Input() clientData: ClientFile = {}; // Default to an empty object

  constructor(private clientDataService: ClientDataService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['clientData']) {
      this.saveDataToCache();
    }
  }

  saveData(): void {
    // Ensure typePersonne is set to "Physique" if not already specified
    this.clientData.typePersonne = this.clientData.typePersonne || "Physique";

    this.clientDataService.saveClientData(this.clientData).subscribe({
      next: (response) => {
        console.log('Data saved successfully', response);
        localStorage.removeItem('clientData'); // Consider when and why you're clearing this
      },
      error: (error) => {
        console.error('Failed to save data', error);
      }
    });
  }

  private saveDataToCache(): void {
    localStorage.setItem('clientData', JSON.stringify(this.clientData));
  }
}
