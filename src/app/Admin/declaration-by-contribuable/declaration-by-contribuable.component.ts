import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { AdminSideBarComponent } from '../admin-side-bar/admin-side-bar.component';
import { ToastModule } from 'primeng/toast';
import { TagModule } from 'primeng/tag';
import { MessageService } from 'primeng/api';
import { AdminService } from '../../service/admin.service';

@Component({
  selector: 'app-declaration-by-contribuable',
  standalone: true,
  imports: [DialogModule, TableModule, InputTextModule, ButtonModule, HttpClientModule, FormsModule, CommonModule, AdminSideBarComponent, ToastModule, TagModule],
  templateUrl: './declaration-by-contribuable.component.html',
  styleUrl: './declaration-by-contribuable.component.css'
})
export class DeclarationByContribuableComponent implements OnInit {
  matriculeFiscale: string = '';
  declarations: any;
  displayDialog: boolean = true;
  constructor(private messageService: MessageService, private adminService: AdminService) { }

  ngOnInit() {
  }
  getDeclarations() {
    if (!/^\d*$/.test(this.matriculeFiscale)) {
      this.messageService.add({ key: "step1", severity: 'error', summary: 'Erreur', detail: 'Veuillez entrer un matricule fiscale valide (nombre uniquement).' });
      return;
    }


    this.adminService.getDeclarationByContribuable(this.matriculeFiscale).subscribe(
      (data) => {
        if (data && data.length > 0) {
          this.declarations = data.filter((declaration: any) => declaration.montantaCalculer > 0);
          this.displayDialog = false;
        } else {
          this.messageService.add({ key: "step1", severity: 'error', summary: 'Erreur', detail: 'Matricule fiscale non trouvé.' });
        }
      },
      (error) => {
        this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Impossible de récupérer les déclarations.' });
      }
    );
  }
  getSeverity(paiement: boolean): string {
    return paiement ? 'success' : 'info'; // Utilisation de 'success' pour payé et 'info' pour pas encore payé
  }
  cancel() {
    this.matriculeFiscale = ''; // Réinitialiser la valeur de la matricule fiscale
    this.displayDialog = false; // Cacher la boîte de dialogue
    window.history.back();
  }
  openPopup() {

    this.matriculeFiscale = "";
    this.declarations = [];
    this.displayDialog = true;
  }
}
