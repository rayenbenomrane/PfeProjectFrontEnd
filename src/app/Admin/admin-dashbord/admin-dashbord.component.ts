import { Component } from '@angular/core';
import { AdminService } from '../../service/admin.service';
import { CommonModule } from '@angular/common';
import { Table, TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { Tag, TagModule } from 'primeng/tag';
import { SidebarModule } from 'primeng/sidebar';
import { AdminSideBarComponent } from '../admin-side-bar/admin-side-bar.component';
@Component({
  selector: 'app-admin-dashbord',
  standalone: true,
  imports: [CommonModule, TableModule, ButtonModule, TagModule, SidebarModule,AdminSideBarComponent],
  templateUrl: './admin-dashbord.component.html',
  styleUrl: './admin-dashbord.component.css'
})
export class AdminDashbordComponent {





  Inscription: any = [];
  inscription: any;
  constructor(private admineService: AdminService) {
    this.getAllInscription();
  }
  getAllInscription() {
    this.admineService.getAllInscription().subscribe((res) => {

      this.inscription = res
      console.log(this.inscription)
    })
  }
  accepterUtilisateur(inscription: any) {

    this.admineService.validerCompte(inscription).subscribe(() => console.log("utilisateur valider!!!"))


  }
  getSeverity(enabled: boolean): string {
    return enabled ? 'success' : 'danger';
  }
}
