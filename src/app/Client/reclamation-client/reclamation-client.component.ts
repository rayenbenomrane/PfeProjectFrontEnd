import { Component, OnInit } from '@angular/core';
import { InputText, InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthServiceService } from '../../service/auth-service.service';
import { ClientService } from '../../service/client.service';

@Component({
  selector: 'app-reclamation-client',
  standalone: true,
  imports: [CommonModule, FormsModule, InputTextModule, InputTextareaModule, ButtonModule],
  templateUrl: './reclamation-client.component.html',
  styleUrl: './reclamation-client.component.css'
})
export class ReclamationClientComponent implements OnInit {
  reclamationTitle!: string;
  reclamationDescription!: string;
  showRequiredError: boolean = false;
  contribuable: any
  constructor(private authservice: AuthServiceService, private clientservice: ClientService) {

  }

  ngOnInit(): void {

  }

  submitForm() {

    const contribuableMatricule = localStorage.getItem('contribuableMatricule');
    if (!this.reclamationTitle || !this.reclamationDescription) {
      this.showRequiredError = true;
    } else {
      this.authservice.getContribuableByMatriculeFiscale(Number(contribuableMatricule)).subscribe((data) => {
        this.contribuable = data;
        //console.log(this.contribuable)
        const reclamation: any = {

          titre: this.reclamationTitle,
          contenu: this.reclamationDescription,

          contribuable: this.contribuable
        };
        this.clientservice.savereclamation(reclamation).subscribe((data) => console.log(data))
      })
      // console.log("Form submitted successfully!");
      this.showRequiredError = false;
      // console.log("Contribuable Matricule:", contribuableMatricule);

    }
  }
}
