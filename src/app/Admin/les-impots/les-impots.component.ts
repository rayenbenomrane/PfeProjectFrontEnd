import { MessageService } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { AdminSideBarComponent } from '../admin-side-bar/admin-side-bar.component';
import { AdminService } from '../../service/admin.service';
import { TableModule } from 'primeng/table';
import { Route, Router, RouterModule } from '@angular/router';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { DialogModule } from 'primeng/dialog';

@Component({
  selector: 'app-les-impots',
  standalone: true,
  imports: [CardModule, RouterModule, DialogModule, TableModule, IconFieldModule, InputIconModule, CommonModule, FormsModule, ButtonModule, InputTextModule, DropdownModule, ToastModule, AdminSideBarComponent],
  templateUrl: './les-impots.component.html',
  styleUrl: './les-impots.component.css'
})
export class LesImpotsComponent implements OnInit {
  lesimpots: any
  displayUpdateDialog: boolean = false;
  selectedImpot: any = {};
  periode: any
  lesPeriodes: any[] = [
    { label: 'TRIMESTRE', value: 'TRIMESTRE' },
    { label: 'SEMESTRE', value: 'SEMESTRE' },
    { label: 'MENSUELLE', value: 'MENSUELLE' },
    { label: 'ANNUELLE', value: 'ANNUELLE' }
  ];
  constructor(private admineservice: AdminService, private router: Router, private messageservice: MessageService) { }

  ngOnInit(): void {
    //throw new Error('Method not implemented.');
    this.getAllimpots()
  }

  getAllimpots() {
    this.admineservice.getAllimpots().subscribe((data) => { this.lesimpots = data, console.log(data) })
  }
  submit() {
    this.router.navigate(["/admin/ajoutlesimpots"])
  }
  getInputValue(event: any): string {
    return (event.target as HTMLInputElement).value;
  }
  update(event: any, impot: any) {
    event.stopPropagation();
    this.selectedImpot = { ...impot };
    this.displayUpdateDialog = true;
    this.periode = this.selectedImpot.periodicite
    console.log(this.selectedImpot)
  }
  updateImpot() {

    if (typeof this.selectedImpot.periodicite.value !== 'undefined') {
      this.selectedImpot.periodicite = this.selectedImpot.periodicite.value;
    } else this.selectedImpot.periodicite = this.periode



    console.log(this.selectedImpot)
    this.admineservice.updateImpot(this.selectedImpot).subscribe(
      (response) => {
        this.messageservice.add({ severity: 'success', summary: 'Succès', detail: 'Impot mis à jour avec succès.' });
        this.displayUpdateDialog = false;
        // Refresh the list of impots if needed
        this.ngOnInit();
      },
      (error) => {
        this.messageservice.add({
          severity: 'error', summary: 'Erreur', detail: "Impossible de mettre à jour l'impot."
        });
      }
    );
  }
}


