import { Component, OnInit, ViewChild, ElementRef, Renderer2, AfterViewInit } from '@angular/core';
import { OcrService } from '../_services/ocr-service.service'; // Ensure this path is correct
import { HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';


// Add right after your imports
interface ClientData {
  numeroCIN?: string;
  nom?: string;
  prenom?: string;
  prenomDuPere?: string;
  prenomDeLaMere?: string;
  nomDeLaMere?: string;
  dateDeNaissance?: string;
  lieuDeNaissance?: string;
  profession?: string;
  adresse?: string;
  dateDeCreation?: string;
}
@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.css']
})
export class TableListComponent implements AfterViewInit {
  @ViewChild('imageCanvas') imageCanvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('croppedImageCanvas') croppedImageCanvas!: ElementRef<HTMLCanvasElement>;
  private ctx!: CanvasRenderingContext2D;
  private croppedCtx!: CanvasRenderingContext2D;
  selectedFile: File | null = null;
  private img = new Image();
  private rect = { startX: 0, startY: 0, w: 100, h: 100, isDragging: false };
  private dragStartLocation = { x: 0, y: 0 };
  private croppedImage: Blob | null = null;
  ocrResults: any[] = [];
  imageSrc: SafeUrl | null = null;
  selectedDocumentType: string = '';
  documentTypeFields: { [key: string]: string[] } = {
    'CIN_Front': ['None', 'Numero CIN', 'Nom', 'Prénom', 'Prénom du père', 'Date de naissance', 'Lieu de naissance'],
    'CIN_Back': ['None', 'Nom de la mère', 'Prénom de la mère', 'Profession', 'Adresse', 'Date de creation'],
    // Add other document types and their fields here
  };
  currentFields: string[] = [];
  clientData: ClientData = {};

  constructor(private ocrService: OcrService, private renderer: Renderer2, private sanitizer: DomSanitizer) { }


  ngAfterViewInit(): void {
    this.ctx = this.imageCanvas.nativeElement.getContext('2d')!;
    this.croppedCtx = this.croppedImageCanvas.nativeElement.getContext('2d')!;
  }

  onFileChanged(event: any): void {
    this.selectedFile = event.target.files[0];
    if (this.selectedFile) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.img.onload = () => {
          // tslint:disable-next-line:no-non-null-assertion
          this.ctx = this.imageCanvas.nativeElement.getContext('2d')!;
          this.imageCanvas.nativeElement.width = this.img.width; // Set canvas width to image width
          this.imageCanvas.nativeElement.height = this.img.height; // Set canvas height to image height
          this.ctx.drawImage(this.img, 0, 0, this.img.width, this.img.height);
        };
        // tslint:disable-next-line:no-non-null-assertion
        this.img.src = e.target!.result as string;
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }

  // New method to update fields based on document type
  onDocumentTypeSelected(): void {
    // Update currentFields based on selected document type
    this.currentFields = this.documentTypeFields[this.selectedDocumentType] || [];
    // Reset the ocrResults to clear previous fields
    this.ocrResults = this.ocrResults.map(result => ({
      ...result,
      selectedField: '' // Reset the selected field
    }));
  }

  onSubmit(): void {
    if (!this.croppedImage) {
      alert('Please select and crop an image first.');
      return;
    }
    const formData = new FormData();
    formData.append('image', this.croppedImage, 'cropped.png');
    formData.append('documentType', this.selectedDocumentType);
    this.ocrService.submitCroppedImage(formData).subscribe(
      (data: any) => {
        this.ocrResults = data.ocr_results.map((result: any) => ({
          ...result,
          selectedField: this.currentFields[0] // Set a default selected field if needed
        }));
      },
      (error: any) => {
        console.error('There was an error processing the image', error);
      }
    );
  }



// Method to construct the clientData object and populate it with OCR results
  constructClientData(): void {
    // Attempt to retrieve existing data from localStorage
    let existingData = JSON.parse(localStorage.getItem('clientData') || '{}');

    // Map each selectedField to its corresponding data property
    this.ocrResults.forEach(result => {
      const fieldName = this.getFieldName(result.selectedField);
      if (fieldName) {
        existingData[fieldName] = result.extracted_text;
      }
    });

    // Update the local storage and clientData with the new values
    localStorage.setItem('clientData', JSON.stringify(existingData));
    this.clientData = { ...existingData };
  }

// Helper method to map the selected field to the property name
  getFieldName(selectedField: string): string | null {
    // Map the field names to the clientData property names
    const fieldMap: { [key: string]: string } = {
      'Numero CIN': 'numeroCIN',
      'Nom': 'nom',
      'Prénom': 'prenom',
      'Prénom du père': 'prenomDuPere',
      'Prénom de la mère': 'prenomDeLaMere',
      'Nom de la mère': 'nomDeLaMere',
      'Date de naissance': 'dateDeNaissance',
      'Lieu de naissance': 'lieuDeNaissance',
      'Profession': 'profession',
      'Adresse': 'adresse',
      'Date de creation': 'dateDeCreation',
      // ... other mappings
    };

    return fieldMap[selectedField] || null;
  }


  onDocumentTypeChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    this.selectedDocumentType = selectElement.value;
    this.onDocumentTypeSelected();
  }

  // Add a method to handle field selection in the table
  onFieldSelected(result: any, event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    result.selectedField = selectElement.value;
  }

  // tslint:disable-next-line:typedef
  handleMouseDown(event: MouseEvent) {
    const rect = this.imageCanvas.nativeElement.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    // Check if the click is within the bounds of the rectangle
    this.dragStartLocation = { x, y };
    this.rect.isDragging = true; // Start dragging
  }

  // tslint:disable-next-line:typedef
  handleMouseMove(event: MouseEvent) {
    if (!this.rect.isDragging) { return; }
    const rect = this.imageCanvas.nativeElement.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    // Update rectangle's width and height based on mouse movement
    this.rect.w = Math.abs(x - this.dragStartLocation.x);
    this.rect.h = Math.abs(y - this.dragStartLocation.y);
    this.rect.startX = Math.min(x, this.dragStartLocation.x);
    this.rect.startY = Math.min(y, this.dragStartLocation.y);
    this.draw(); // Redraw the canvas with updated rectangle
  }

  // tslint:disable-next-line:typedef
  handleMouseUp(event: MouseEvent) {
    this.rect.isDragging = false; // Stop dragging
  }

  // tslint:disable-next-line:typedef
  handleMouseLeave(event: MouseEvent) {
    // Optional: Handle case when the mouse leaves the canvas
    this.rect.isDragging = false;
  }

  // tslint:disable-next-line:typedef
  draw() {
    this.ctx.clearRect(0, 0, this.imageCanvas.nativeElement.width, this.imageCanvas.nativeElement.height); // Clear canvas
    this.ctx.drawImage(this.img, 0, 0, this.img.width, this.img.height); // Redraw image
    // Draw the rectangle
    this.ctx.beginPath();
    this.ctx.strokeStyle = 'yellow';
    this.ctx.rect(this.rect.startX, this.rect.startY, this.rect.w, this.rect.h);
    this.ctx.stroke();
  }

  // tslint:disable-next-line:typedef
  cropImage() {
    // Ensure there's a selected area to crop
    if (this.rect.w === 0 || this.rect.h === 0) {
      alert('Please select an area to crop.');
      return;
    }

    // Create a temporary canvas to draw the cropped area
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      console.error('Failed to get canvas context');
      return;
    }

    canvas.width = this.rect.w;
    canvas.height = this.rect.h;

    // Draw the cropped area of the image onto the temporary canvas
    ctx.drawImage(
      this.img,
      this.rect.startX, // Source X
      this.rect.startY, // Source Y
      this.rect.w, // Source Width
      this.rect.h, // Source Height
      0, // Destination X
      0, // Destination Y
      this.rect.w, // Destination Width
      this.rect.h // Destination Height
    );

    canvas.toBlob(blob => {
      this.croppedImage = blob;
      if (!blob) {
        console.error('Failed to create blob from canvas');
        return;
      }
      const unsafeImgURL = URL.createObjectURL(blob);
      this.imageSrc = this.sanitizer.bypassSecurityTrustUrl(unsafeImgURL); // Sanitize the URL
    }, 'image/png');
  }
}
