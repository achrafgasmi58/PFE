import { Component, OnInit } from '@angular/core';
import { ModelOcrService } from '../_services/model-ocr.service'; // Assurez-vous que le chemin d'accès est correct

@Component({
  selector: 'app-model-ocr',
  templateUrl: './model-ocr.component.html',
  styleUrls: ['./model-ocr.component.css']
})
export class ModelOcrComponent implements OnInit {
  results: any = null;
  imageSelected: boolean = false; // Pour gérer l'état du bouton
  selectedFile: File | null = null; // Pour stocker le fichier sélectionné


  // Corrigez la déclaration du service en utilisant la bonne syntaxe
  constructor(private modelOcrService: ModelOcrService) { }



  // Assurez-vous que la méthode uploadImage est typée correctement
  onFileSelect(event: any): void {
    this.selectedFile = event.target.files[0];
    this.imageSelected = !!this.selectedFile; // Active le bouton si un fichier est sélectionné
  }

  // Cette méthode est maintenant responsable de l'envoi de l'image
  uploadImage(): void {
    if (this.selectedFile) {
      const reader = new FileReader();

      reader.onload = () => {
        const imageData = reader.result;
        if (imageData) {
          this.modelOcrService.sendImageToPowerAutomate(imageData.toString())
            .subscribe(response => {
              console.log(response); // Traitement de la réponse ici
              this.results = response; // Stocker les résultats dans la variable
            }, error => {
              console.error(error); // Gestion des erreurs ici
            });
        } else {
          console.error('FileReader onload event returned null for result.');
        }
      };

      reader.onerror = (error) => {
        console.error('FileReader encountered an error: ', error);
      };

      reader.readAsDataURL(this.selectedFile); // pour base64
    }
  }

  ngOnInit(): void {
    // ...
  }
}

