import { Component } from '@angular/core';
import { ClientService } from '../../service/client.service';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { LayoutclientComponent } from '../layoutclient/layoutclient.component';
import { ButtonModule } from 'primeng/button';
import { Dialog, DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { StorageService } from '../../service/storage.service';
import { Route, Router } from '@angular/router';
import { TagModule } from 'primeng/tag';

@Component({
  selector: 'app-mes-declarations',
  standalone: true,
  imports: [CommonModule, TableModule, LayoutclientComponent, ButtonModule, DialogModule, ConfirmDialogModule, TagModule],
  templateUrl: './mes-declarations.component.html',
  styleUrl: './mes-declarations.component.css'
})
export class MesDeclarationsComponent {

  static readonly receiverWalletId: string = "664b1199a58e585682a8ada8";
  compte: any
  contribuable: any;
  declarations: any
  displayDialog: boolean = false;
  selectedObligation: any = null;
  confirmationVisible: boolean = false;
  payment: any

  constructor(private clientservice: ClientService, private router: Router) { }

  ngOnInit() {
    this.getcontribuable();
    this.getuser()
  }
  getcontribuable() {
    const matricule = localStorage.getItem('contribuableMatricule');
    this.clientservice.getContribuableBymatricule(Number(matricule)).subscribe((data) => {
      this.contribuable = data;

      this.getLesDeclarationByContribuable(); // Call getObligation() after getting the contribuable data

    });
  }
  getLesDeclarationByContribuable() {
    if (!this.contribuable) {
      console.error("Contribuable is not defined.");
      return;
    }
    this.clientservice.getDeclarationByContribuable(this.contribuable.matriculeFiscale).subscribe(
      (data) => {
        // Filtrer les déclarations avec un montant à payer > 0
        console.log(data)
        this.declarations = data/*.filter((declaration: any) => declaration.montantaCalculer
          && declaration.montantaCalculer
          > 0);*/
        console.log(this.declarations);
      }
    )
  }
  showDialog(obligation: any) {
    this.selectedObligation = obligation;
    this.displayDialog = true;
  }
  showDialog1(obligation: any) {
    this.selectedObligation = obligation;
    this.confirmationVisible = true;
  }
  getuser() {
    const compte = StorageService.getUser();
    const id = compte.id;
    this.clientservice.getCompteByid(id).subscribe((data) => this.compte = data)

  }
  submit(declaration: any) {
    const baseUrl = window.location.origin;
    const successUrl = `${baseUrl}/client/paiement?idDeclaration=${declaration.idDeclaration}`;
    const failUrl = `${baseUrl}/client/paimenterror`
    const paymentRequest = {
      "receiverWalletId": MesDeclarationsComponent.receiverWalletId,
      "token": "TND",
      "amount": declaration.montantaCalculer * 10,
      "type": "immediate",
      "description": "payment description",
      "acceptedPaymentMethods": [
        "wallet",
        "bank_card",
        "e-DINAR"
      ],
      "lifespan": 30,
      "checkoutForm": false,
      "addPaymentFeesToAmount": true,
      "firstName": this.compte.firstName,
      "lastName": this.compte.lastName,
      "phoneNumber": "",
      "email": this.compte.Email,
      "orderId": "1234657",
      "webhook": "https://merchant.tech/api/notification_payment",
      "silentWebhook": true,
      "successUrl": successUrl,
      "failUrl": failUrl,
      "theme": "light"
    };
    this.clientservice.initPaiement(paymentRequest).subscribe((data: any) => {

      this.payment = data;

      // Extract the payUrl from the response
      const payUrl = data.payUrl;

      // Navigate to the payUrl
      window.location.href = payUrl;
    });
  }
  poursuivreDeclaration(obligation: any) {
    this.clientservice.setSelectedDeclaration(obligation);
    this.router.navigate(['/client/ajout-declaration']);
  }

}
