import { Component } from '@angular/core';
import { ClientService } from '../../service/client.service';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { LayoutclientComponent } from '../layoutclient/layoutclient.component';

@Component({
  selector: 'app-mes-obligations',
  standalone: true,
  imports: [CommonModule,TableModule,LayoutclientComponent],
  templateUrl: './mes-obligations.component.html',
  styleUrl: './mes-obligations.component.css'
})
export class MesObligationsComponent {

  lesobligations: any
  contribuable: any



  constructor(private clientservice: ClientService) { }

  ngOnInit() {
    this.getcontribuable();

  }
  getcontribuable() {
    const matricule = localStorage.getItem('contribuableMatricule');
    this.clientservice.getContribuableBymatricule(Number(matricule)).subscribe((data) => {
      this.contribuable = data;

      this.getObligation(); // Call getObligation() after getting the contribuable data

    });
  }

  getObligation() {
    if (!this.contribuable) {
      console.error("Contribuable is not defined.");
      return;
    }

    this.clientservice.getObligationById(this.contribuable.idContribuable).subscribe((data) => {
      this.lesobligations = data;
      console.log(this.lesobligations);
    });
  }

}
