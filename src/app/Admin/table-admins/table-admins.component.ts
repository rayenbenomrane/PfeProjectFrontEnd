import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../service/admin.service';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { AdminSideBarComponent } from '../admin-side-bar/admin-side-bar.component';
import { Router } from '@angular/router';
import { StorageService } from '../../service/storage.service';

@Component({
  selector: 'app-table-admins',
  standalone: true,
  imports: [CommonModule, CardModule, AdminSideBarComponent],
  templateUrl: './table-admins.component.html',
  styleUrl: './table-admins.component.css'
})
export class TableAdminsComponent implements OnInit {
  [x: string]: any;
  lesAdmin: any = [];
  constructor(private AdminService: AdminService, private router: Router) {

  }
  ngOnInit(): void {
    if (!StorageService.isAdminLoggedIn()) {
      this.router.navigate(['/error'])
    }else{
      this.getAllContribuable();
    }


  }
  getAllContribuable() {
    this.AdminService.getAllComptes().subscribe((res) => {

      this.lesAdmin = res.filter((compte: { userRole: string; }) => compte.userRole === 'Admin');
      console.log(this.lesAdmin)
    })
  }
}
