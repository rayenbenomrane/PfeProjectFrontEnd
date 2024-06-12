import { Component, OnInit } from '@angular/core';
import { InputText, InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthServiceService } from '../../service/auth-service.service';
import { ClientService } from '../../service/client.service';
import { DropdownModule } from 'primeng/dropdown';
import { RadioButtonModule } from 'primeng/radiobutton';
import { LayoutclientComponent } from '../layoutclient/layoutclient.component';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-reclamation-client',
  standalone: true,
  imports: [CommonModule, FormsModule, ToastModule, InputTextModule, InputTextareaModule, ButtonModule, DropdownModule, RadioButtonModule, LayoutclientComponent],
  templateUrl: './reclamation-client.component.html',
  styleUrl: './reclamation-client.component.css'
})
export class ReclamationClientComponent implements OnInit {
  reclamationTitle!: string;
  reclamationDescription!: string;
  showRequiredError: boolean = false;
  contribuable: any
  declarations: any
  selectedDeclaration: any
  selectedChoice: string = 'no'; // Default choice is "No"

  constructor(private authservice: AuthServiceService, private clientservice: ClientService, private messageservice: MessageService) {

  }

  ngOnInit(): void {
    const contribuableMatricule = localStorage.getItem('contribuableMatricule');
    this.authservice.getContribuableByMatriculeFiscale(Number(contribuableMatricule)).subscribe((data) => {
      this.contribuable = data;
      this.clientservice.getDeclarationByContribuable(this.contribuable.matriculeFiscale).subscribe(
        (data) => {
          // Filtrer les déclarations avec un montant à payer > 0
          //console.log(data)
          this.declarations = data
          console.log(this.declarations);
        }
      )
    })
  }

  submitForm() {

    const contribuableMatricule = localStorage.getItem('contribuableMatricule');
    if (!this.reclamationTitle || !this.reclamationDescription) {
      this.showRequiredError = true;
    } else {
      this.authservice.getContribuableByMatriculeFiscale(Number(contribuableMatricule)).subscribe((data) => {
        this.contribuable = data;
        //console.log(this.contribuable)

        if (this.selectedDeclaration == null) {
          const reclamation: any = {

            titre: this.reclamationTitle,
            contenu: this.reclamationDescription,
            contribuable: this.contribuable


          }
          this.clientservice.savereclamation(reclamation).subscribe((data) => { console.log(data), this.messageservice.add({ severity: 'success', summary: 'Success', detail: 'Reclamation confirmé. ' }) })
        } else {
          const reclamation: any = {
            contribuable: this.contribuable,
            titre: this.reclamationTitle,
            contenu: this.reclamationDescription,
            idDeclaration: this.selectedDeclaration


          }
          //console.log(reclamation)
          this.clientservice.savereclamation(reclamation).subscribe((data) => {
            console.log(data),
              this.messageservice.add({ severity: 'success', summary: 'Success', detail: 'Reclamation confirmé. ' })
          })
        }


      })
      // console.log("Form submitted successfully!");
      this.showRequiredError = false;
      // console.log("Contribuable Matricule:", contribuableMatricule);

    }
  }
}
