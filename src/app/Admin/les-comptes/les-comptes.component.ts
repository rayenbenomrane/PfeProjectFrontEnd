import { Inscription } from './../../../Models/Inscription';
import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../service/admin.service';
import { Table, TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { Tag, TagModule } from 'primeng/tag';
import { SidebarModule } from 'primeng/sidebar';
import { AdminSideBarComponent } from '../admin-side-bar/admin-side-bar.component';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-les-comptes',
  standalone: true,
  imports: [CommonModule, TableModule, ButtonModule, TagModule, SidebarModule, AdminSideBarComponent],
  templateUrl: './les-comptes.component.html',
  styleUrl: './les-comptes.component.css'
})
export class LesComptesComponent implements OnInit {




  getSeverity(enabled: boolean): string {
    return enabled ? 'success' : 'danger';
  }
  ngOnInit(): void {
    this.getAllCompte();
  }
  lesComptes: any = []
  constructor(private adminService: AdminService) {

  }
  getAllCompte() {
    this.adminService.getAllComptes().subscribe((res) => {

      this.lesComptes = res.filter((compte: { userRole: string; }) => compte.userRole === 'Client');
      console.log(this.lesComptes)
    })
  }
  bloqueCompte(compte: any) {
    this.adminService.bloqueCompte(compte).subscribe(response => {
      console.log(response);
      this.ngOnInit();
    }, error => {
      console.error(error);
    });

  }
  debloqueCompte(compte: any) {
    this.adminService.debloqueCompte(compte).subscribe(response => {
      console.log(response);
      this.ngOnInit();
    }, error => {
      console.error(error);
    });

  }
}
