import { Component } from '@angular/core';
import { ClientService } from '../../service/client.service';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { LayoutclientComponent } from '../layoutclient/layoutclient.component';

@Component({
  selector: 'app-mes-declarations',
  standalone: true,
  imports: [CommonModule,TableModule,LayoutclientComponent],
  templateUrl: './mes-declarations.component.html',
  styleUrl: './mes-declarations.component.css'
})
export class MesDeclarationsComponent {
  contribuable:any;
  declarations:any
    constructor(private clientservice:ClientService) { }

    ngOnInit() {
      this.getcontribuable();
    }
    getcontribuable() {
      const matricule = localStorage.getItem('contribuableMatricule');
      this.clientservice.getContribuableBymatricule(Number(matricule)).subscribe((data) => {
        this.contribuable = data;

        this.getLesDeclarationByContribuable(); // Call getObligation() after getting the contribuable data

      });
    }
    getLesDeclarationByContribuable(){
      if (!this.contribuable) {
        console.error("Contribuable is not defined.");
        return;
      }
      this.clientservice.getDeclarationByContribuable(this.contribuable.matriculeFiscale).subscribe(
        (data)=>{
          // Filtrer les déclarations avec un montant à payer > 0
          this.declarations = data.filter((declaration: any) => declaration.montantApayer && declaration.montantApayer > 0);
          console.log(this.declarations);
        }
      )
    }

  }

