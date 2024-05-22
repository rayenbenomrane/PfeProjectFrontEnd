import { ActivatedRoute } from '@angular/router';
import { ClientService } from './../../service/client.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-payment-success',
  standalone: true,
  imports: [],
  templateUrl: './payment-success.component.html',
  styleUrl: './payment-success.component.css'
})
export class PaymentSuccessComponent implements OnInit {


  paymentRef!: any
  idDeclaration!: number

  ngOnInit(): void {
    // throw new Error('Method not implemented.');
    this.getPaymentID();
    this.savePaiement();
  }
  constructor(private clientService: ClientService, private route: ActivatedRoute) { }




  getPaymentID() {
    this.route.queryParams.subscribe(params => {
      this.paymentRef = params['payment_ref'];
      this.idDeclaration = params['idDeclaration'];
      //console.log(this.paymentRef); // For debugging purposes
    });
  }


  savePaiement() {
    const paiementdto = {
      'numeroTransaction': this.paymentRef,
      'iddeclaration': this.idDeclaration

    }
    console.log(paiementdto)
    this.clientService.savePaiement(paiementdto).subscribe(
    );
  }
}
