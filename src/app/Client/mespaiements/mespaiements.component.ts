import { Table, TableModule } from 'primeng/table';
import { LayoutclientComponent } from '../layoutclient/layoutclient.component';
import { ClientService } from './../../service/client.service';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { ButtonModule } from 'primeng/button';
import jsPDF from 'jspdf';


@Component({
  selector: 'app-mespaiements',
  standalone: true,
  imports: [LayoutclientComponent, TableModule, CommonModule, ButtonModule],
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
    this.ClientService.getPaiementsByMatriculeFiscale(num).subscribe(
      (paiements: any[]) => {
        this.ClientService.getDeclarationByContribuable(num).subscribe(
          (declarations: any[]) => {
            paiements.forEach((paiement: any) => {
              const correspondingDeclaration = declarations.find((declaration: any) => declaration.someIdentifier === paiement.someIdentifier);
              if (correspondingDeclaration) {
                paiement.declaration = correspondingDeclaration;
                this.mespaiement.push(paiement);
              } else {
                this.mespaiement = [];
              }
            });
          },
          (error: HttpErrorResponse) => {
            if (error.status === 403) {
              // Handle 403 error (Forbidden) here
              //console.error('Forbidden error occurred:', error.statusText);
              // Display a message or perform some action to inform the user
              this.mespaiement = []
              console.log(this.mespaiement)
            } else {
              console.error('An unexpected error occurred:', error.message);
            }
          }
        );
      },
      (error: HttpErrorResponse) => {
        if (error.status === 403) {
          // Handle 403 error (Forbidden) here
          //console.error('Forbidden error occurred:', error.statusText);
          // Display a message or perform some action to inform the user
          this.mespaiement = []
          console.log(this.mespaiement)
        } else {
          console.error('An unexpected error occurred:', error.message);
        }
      }
    );
  }
  generatepdf(paiement: any) {
    const doc = new jsPDF();


    // Styling
    const fontSize = 12;
    const lineHeight = 1.5;
    const marginLeft = 15;
    const marginTop = 20;

    // Header
    doc.setFontSize(fontSize + 4);

    doc.setFontSize(fontSize);

    // Information
    const infoStartY = marginTop + 2 * lineHeight;
    const infoLineHeight = fontSize * lineHeight;

    doc.text('ID Paiement: ' + paiement.idPaiment, marginLeft, infoStartY);
    doc.text('Numéro de Transaction: ' + paiement.numeroTransaction, marginLeft, infoStartY + infoLineHeight);
    doc.text('Date de Paiement: ' + new Date(paiement.datePaiement).toLocaleDateString(), marginLeft, infoStartY + 2 * infoLineHeight);
    doc.text('ID Déclaration: ' + paiement.declaration.idDeclaration, marginLeft, infoStartY + 3 * infoLineHeight);
    doc.text('Montant payé: ' + paiement.declaration.montantaCalculer + ' Tnd', marginLeft, infoStartY + 4 * infoLineHeight)
    doc.text('Impôt: ' + paiement.declaration.obligation.impot.libelle, marginLeft, infoStartY + 5 * infoLineHeight);

    doc.setTextColor(255);


    doc.save('recu.pdf')
  }
}

