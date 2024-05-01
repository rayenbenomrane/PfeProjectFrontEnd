import { AdminService } from './../../service/admin.service';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { SidebarModule } from 'primeng/sidebar';
import { AdminSideBarComponent } from '../admin-side-bar/admin-side-bar.component';
import { Router } from '@angular/router';
@Component({
  selector: 'app-ajout-impot',
  standalone: true,
  imports: [CardModule, CommonModule, FormsModule, ButtonModule, InputTextModule, DropdownModule, ToastModule, AdminSideBarComponent],
  templateUrl: './ajout-impot.component.html',
  styleUrl: './ajout-impot.component.css'
})
export class AjoutImpotComponent implements OnInit {
  constructor(private AdminService: AdminService, private messageService: MessageService, private router: Router) {

  }

  ngOnInit(): void {
    this.allPeriodes()
  }

  titreImpot: string = ''
  lesPeriodes: any = []
  periode1: any
  valide: any

  allPeriodes() {
    this.AdminService.getAllPeriodes().subscribe((data) => { this.lesPeriodes = data })
  }
  submit() {
    const inputElement = document.querySelector('input[type="text"]');
    const dropdownElement = document.querySelector('p-dropdown');

    // Validate input element
    let isInputValid = true;
    if (inputElement) {
      if (!this.titreImpot) {
        inputElement.classList.add('ng-dirty', 'ng-invalid');
        isInputValid = false;
      } else {
        inputElement.classList.remove('ng-dirty', 'ng-invalid');
      }
    }

    // Validate dropdown element
    let isDropdownValid = true;
    if (dropdownElement) {
      if (!this.periode1) {
        dropdownElement.classList.add('ng-dirty', 'ng-invalid');
        isDropdownValid = false;
      } else {
        dropdownElement.classList.remove('ng-dirty', 'ng-invalid');
      }
    }

    // Save impot DTO if both input and dropdown are valid
    if (isInputValid && isDropdownValid) {
      const impotDto = {
        libelle: this.titreImpot,
        periodicite: this.periode1
      };
      this.AdminService.gettypeimpot(impotDto.libelle).subscribe((data) => this.valide = data)
      if (typeof this.valide !== 'undefined') {
        this.AdminService.saveImpot(impotDto).subscribe(() => {
          this.messageService.add({ key: 'step1', severity: 'success', summary: 'Validé', detail: "Impot Ajouté Avec Success" });

          setTimeout(() => {
            this.router.navigate(['/admin/lesimpots']);
          }, 1500);


        });

      } else {
        this.messageService.add({ key: 'step1', severity: 'error', summary: 'Invalid', detail: "Impot deja trouvé" });
      }


    }

  }
  annuler() {
    this.titreImpot = ''
    this.periode1 = ''
    this.messageService.add({ key: 'step1', severity: 'error', summary: 'Annulé', detail: "Annulation D'operation" });

  }

}
