import { CommonModule, DatePipe } from '@angular/common';
import { AdminService } from './../../service/admin.service';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';
import { AdminSideBarComponent } from '../admin-side-bar/admin-side-bar.component';
import { Toast, ToastModule } from 'primeng/toast';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-ajoutobligation',
  standalone: true,
  imports: [DialogModule,
    FormsModule,
    CommonModule,
    DropdownModule,
    InputTextModule,
    CalendarModule,
    ButtonModule,
    CardModule,
    AdminSideBarComponent, ToastModule],
  templateUrl: './ajoutobligation.component.html',
  styleUrl: './ajoutobligation.component.css'
})
export class AjoutobligationComponent implements OnInit {
  maxDate: Date = new Date();
  lesimpots: any;
  selectedimpot: any;
  dateDebut: any;
  datefin: any;
  matricule: any;
  contribuable: any;
  submitted: boolean = false;

  constructor(
    private adminservice: AdminService,
    private router: ActivatedRoute,
    private messageService: MessageService,
    private route: Router
  ) { }

  ngOnInit(): void {
    this.getAllimpots();
    this.getlibelle();
  }

  getlibelle() {
    this.router.params.subscribe(params => {
      this.matricule = params['matricule'];
      this.adminservice.getContribuableBymatricule(this.matricule).subscribe((data) => {
        this.contribuable = data;
      });
    });
  }

  getAllimpots() {
    this.adminservice.getAllimpots().subscribe((data) => {
      this.lesimpots = data;
      console.log(data);
    });
  }

  onSubmit() {
    this.submitted = true;

    if (!this.dateDebut || !this.datefin || !this.selectedimpot) {
      this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Tous les champs sont requis.' });
      return;
    }
    const dateDebut = new Date(this.dateDebut);
    const dateFin = new Date(this.datefin);

    // Calculate the difference in years between dateDebut and dateFin
    const diffInYears = dateFin.getFullYear() - dateDebut.getFullYear();

    // Check if the difference is less than 3 years
    if (diffInYears < 3) {
      this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'La différence entre la date de début et la date de fin doit être d\'au moins 3 ans.' });
      return;
    }
    const obligation = {
      matricule: this.matricule,
      dateDebut: this.dateDebut,
      dateFin: this.datefin,
      impot: this.selectedimpot
    };
    console.log(obligation)

    this.adminservice.saveObligation(obligation).subscribe(
      response => {
        this.messageService.add({ severity: 'success', summary: 'Valide', detail: 'Obligation ajoutée' });
        this.route.navigate(['/admin/obligations', this.matricule])
      },
      error => {
        console.error('Erreur lors de la création de l\'obligation:', error);
        this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Problème lors de la création de l\'obligation' });
      }
    );
  }
}
