import { Table, TableModule } from 'primeng/table';
import { LayoutclientComponent } from '../layoutclient/layoutclient.component';
import { ClientService } from './../../service/client.service';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-mespaiements',
  standalone: true,
  imports: [LayoutclientComponent, TableModule, CommonModule],
  templateUrl: './mespaiements.component.html',
  styleUrl: './mespaiements.component.css'
})
export class MespaiementsComponent implements OnInit {
  mespaiement: any = []
  constructor(private ClientService: ClientService) {

  }
  ngOnInit(): void {
    // throw new Error('Method not implemented.');
    this.getMesPaiements()
  }
  getcontribuable(): number {

    const matricule = localStorage.getItem('contribuableMatricule');
    const numMatricule = Number(matricule)
    return numMatricule;
  }
  getMesPaiements() {
    const num = this.getcontribuable(); // Assuming this returns the matriculeFiscale
    this.ClientService.getPaiementsByMatriculeFiscale(num).subscribe((paiements: any[]) => {
      //console.log('Paiements:', paiements); // Log paiements received

      this.ClientService.getDeclarationByContribuable(num).subscribe((declarations: any[]) => {
        //console.log('Declarations:', declarations); // Log declarations received
        // Match each paiement with its corresponding declaration based on some identifier
        paiements.forEach((paiement: any) => {
          const correspondingDeclaration = declarations.find((declaration: any) => declaration.someIdentifier === paiement.someIdentifier);
          if (correspondingDeclaration) {
            paiement.declaration = correspondingDeclaration;
            this.mespaiement.push(paiement);
            console.log(this.mespaiement)
            // console.log('Matched paiement:', paiement, 'with declaration:', correspondingDeclaration); // Log matched paiement and declaration
          } else {
            //console.log('No matching declaration found for paiement:', paiement); // Log if no matching declaration is found
          }
        });
      });
    });
  }


}
