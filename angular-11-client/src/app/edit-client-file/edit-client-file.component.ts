import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientFileService} from '../_services/client-file.service';
import { ClientFile } from '../models/client-file.model'; // Adjust the path as necessary


@Component({
  selector: 'app-edit-client-file',
  templateUrl: './edit-client-file.component.html',
  styleUrls: ['./edit-client-file.component.css']
})
export class EditClientFileComponent implements OnInit {
  id!: number;
  clientFile: ClientFile = {};

  constructor(private activatedRoute: ActivatedRoute,
              private clientFileService: ClientFileService,
              private router: Router
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.id = +params['id'];
      if (this.id) {
        this.clientFileService.getClientFileById(this.id).subscribe(data => {
          this.clientFile = data;
        }, error => console.error(error));
      }
    });
  }
  saveClientFile() {
    if (this.clientFile.typePersonne === undefined) {
      this.clientFile.typePersonne = "Physique"; // Default value if not specified
    }

    this.clientFileService.updateClientFile(this.id, this.clientFile).subscribe({
      next: (data) => {
        console.log('Client file updated successfully');
        this.router.navigate(['/client-files']); // Adjust the navigation route as necessary
      },
      error: (error) => console.error(error)
    });
  }

  // Implement methods to handle form submission, data fetching, etc.
}
