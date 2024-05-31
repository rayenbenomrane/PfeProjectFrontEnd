import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';
import { LayoutclientComponent } from '../layoutclient/layoutclient.component';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { ClientService } from '../../service/client.service';

@Component({
  selector: 'app-mes-reclamations',
  standalone: true,
  imports: [CommonModule, TableModule, LayoutclientComponent, ButtonModule, TagModule],
  templateUrl: './mes-reclamations.component.html',
  styleUrl: './mes-reclamations.component.css'
})
export class MesReclamationsComponent {
  showActionsColumn: boolean = true;
  lesreclamations: any
  contribuable: any
  constructor(private clientservice: ClientService) { }

  ngOnInit() {
    this.getcontribuable()
  }
  getcontribuable() {
    const matricule = localStorage.getItem('contribuableMatricule');
    this.clientservice.getContribuableBymatricule(Number(matricule)).subscribe((data) => {
      this.contribuable = data;

      this.getreclamations(); // Call getObligation() after getting the contribuable data

    });
  }
  getreclamations() {

    if (!this.contribuable) {
      console.error("Contribuable is not defined.");
      return;
    }

    this.clientservice.LesreclamationsByContribuable(this.contribuable.matriculeFiscale).subscribe((data) => {
      this.lesreclamations = data;
      console.log(this.lesreclamations);
    });
  }
  refuserReclamation(id: number) {
    this.clientservice.refusreclamation(id).subscribe()
    this.ngOnInit()
  }
  accepterReclamation(id: number) {
    this.clientservice.acceptreclamation(id).subscribe()
    this.ngOnInit()
  }

  getSeverity(etat: string): string {
    switch (etat) {
      case 'EN_ATTENTE':
        return 'info';
      case 'EN_COURS':
        return 'warning';
      case 'RESOLUE':
        return 'success';
      case 'REFUSEE':
        return 'danger';
      default:
        return 'info';
    }
  }
}
