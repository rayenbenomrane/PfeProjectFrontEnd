import { CommonModule } from '@angular/common';
import { AdminService } from './../../service/admin.service';
import { Component, OnInit } from '@angular/core';
import { AdminSideBarComponent } from '../admin-side-bar/admin-side-bar.component';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-admin-home-page',
  standalone: true,
  imports: [CommonModule, AdminSideBarComponent, CardModule,],
  templateUrl: './admin-home-page.component.html',
  styleUrl: './admin-home-page.component.css'
})
export class AdminHomePageComponent implements OnInit {
  lesContribuables: any = []
  Inscription: any = [];
  inscription: any = [];
  comptes: any = [];
  totalInscriptions: any;
  totalContribuables: any;
  totalAccounts: any;
  constructor(private AdminService: AdminService) {

  }
  getAllInscription() {
    this.AdminService.getAllInscription().subscribe((res) => {
      console.log(res);
      this.inscription = res.filter((inscription: { email: string }) =>
        !this.comptes.find((compte: { email: string }) => compte.email === inscription.email)
      );
      this.totalInscriptions = this.inscription.length;
    });

  }

  ngOnInit(): void {
    this.getAllContribuable();
    this.getAllInscription();
    this.getAllComptes()
  }
  getAllContribuable() {
    this.AdminService.getAllContribuables().subscribe((res) => {

      this.lesContribuables = res;
      console.log(this.lesContribuables)
      this.totalContribuables = this.lesContribuables.length;
    })
  }
  getAllComptes() {
    this.AdminService.getAllComptes().subscribe((res) => {
      console.log(res);
      this.totalAccounts = res.length
      this.comptes = res.filter((compte: { userRole: string; }) => compte.userRole !== 'Admin');
      console.log("lescomptes:", this.comptes);

      this.getAllInscription();
    });
  }
}
