import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import { ClientFileService} from '../_services/client-file.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-board-admin',
  templateUrl: './board-admin.component.html',
  styleUrls: ['./board-admin.component.css']
})
export class BoardAdminComponent implements OnInit {
  content?: string;
  clientFiles: any;

  constructor(private userService: UserService, private clientFileService: ClientFileService, private router: Router) { }


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

}
