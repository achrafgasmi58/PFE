import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientFileService} from '../_services/client-file.service';

@Component({
  selector: 'app-edit-client-file',
  templateUrl: './edit-client-file.component.html',
  styleUrls: ['./edit-client-file.component.css']
})
export class EditClientFileComponent implements OnInit {
  id!: number;
  clientFile: any = {};

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
    this.clientFileService.updateClientFile(this.id, this.clientFile).subscribe(data => {
      console.log('Client file updated successfully');
      this.router.navigate(['/client-files']); // Navigate back to the list or dashboard
    }, error => console.error(error));
  }

  // Implement methods to handle form submission, data fetching, etc.
}
