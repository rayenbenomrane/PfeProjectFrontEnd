import { AdminService } from './../../service/admin.service';
import { Component, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';
import { Table, TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { Tag, TagModule } from 'primeng/tag';
import { SidebarModule } from 'primeng/sidebar';
import { AdminSideBarComponent } from '../admin-side-bar/admin-side-bar.component';
import { StorageService } from '../../service/storage.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-admin-dashbord',
  standalone: true,
  imports: [CommonModule, TableModule, ButtonModule, TagModule, SidebarModule, AdminSideBarComponent],
  templateUrl: './admin-dashbord.component.html',
  styleUrl: './admin-dashbord.component.css'
})
export class AdminDashbordComponent implements OnInit {





  Inscription: any = [];
  inscription: any = [];
  comptes: any = [];
  constructor(private admineService: AdminService, private router: Router) {

  }
  ngOnInit(): void {
    this.getAllComptes();
    this.getAllInscription();
    if (!StorageService.isAdminLoggedIn()) {
      this.router.navigate(['/error'])
    }

  }
  getAllInscription() {
    this.admineService.getAllInscription().subscribe((res) => {
      console.log(res);
      this.inscription = res.filter((inscription: { email: string }) =>
        !this.comptes.find((compte: { email: string }) => compte.email === inscription.email)
      );
    });

  }
  accepterUtilisateur(inscription: any) {

    this.admineService.validerCompte(inscription).subscribe(() => console.log("utilisateur valider!!!"))


  }
  getSeverity(enabled: boolean): string {
    return enabled ? 'success' : 'danger';
  }
  getAllComptes() {
    this.admineService.getAllComptes().subscribe((res) => {
      console.log(res);
      this.comptes = res.filter((compte: { userRole: string; }) => compte.userRole !== 'Admin');
      console.log("lescomptes:", this.comptes);

      this.getAllInscription();
    });
  }
}
