import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import { ClientFileService} from '../_services/client-file.service';
import { Router } from '@angular/router';
import { CheckClientService } from '../_services/check-client.service'; // Assurez-vous que le chemin d'importation est correct
import { ClientFile } from '../models/client-file.model';

@Component({
  selector: 'app-board-admin',
  templateUrl: './board-admin.component.html',
  styleUrls: ['./board-admin.component.css']
})
export class BoardAdminComponent implements OnInit {
  content?: string;
  clientFiles: ClientFile[] = [];
  verificationMessage: string = '';
  blacklistDetails: any[] = []; // Adjust the type as needed
  constructor(private userService: UserService, private clientFileService: ClientFileService, private router: Router, private checkClientService: CheckClientService) { }


  ngOnInit(): void {
    this.userService.getAdminBoard().subscribe(
      data => {
        this.content = data;
      },
      err => {
        this.content = JSON.parse(err.error).message;
      }
    );
    this.retrieveClientFiles();
  }

  retrieveClientFiles(): void {
    this.clientFileService.getAllClientFiles()
      .subscribe(
        data => {
          this.clientFiles = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  editFile(id: number): void {
    this.router.navigate(['/edit-client-file', id]);
  }

  deleteFile(id: number): void {
    this.clientFileService.deleteClientFile(id).subscribe({
      next: (response) => {
        console.log('File deleted successfully');
        this.retrieveClientFiles(); // Refresh the list
      },
      error: (error) => {
        console.error('Error deleting file', error);
      }
    });
  }
  // Méthode pour vérifier un client
  checkClient(clientFile: ClientFile): void {
    this.checkClientService.filterData(clientFile.prenom, clientFile.nom, clientFile.dateDeNaissance, clientFile.typePersonne)
      .subscribe({
        next: (response) => {
          if (response.length === 0) {
            this.verificationMessage = "La personne n'est pas blacklistée."; // Message for clean person
            this.blacklistDetails = []; // Clear details
          } else {
            this.verificationMessage = "Attention: la personne semble être blacklistée."; // Message for blacklisted person
            this.blacklistDetails = response; // Show details
          }
        },
        error: (error) => {
          console.error('Error during verification', error);
          this.verificationMessage = 'Erreur lors de la vérification.'; // Error message
          this.blacklistDetails = []; // Clear details on error
        }
      });
  }


}
