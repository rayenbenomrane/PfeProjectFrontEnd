import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../service/admin.service';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { AdminSideBarComponent } from '../admin-side-bar/admin-side-bar.component';

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
  constructor(private AdminService: AdminService) {

  }
  ngOnInit(): void {
    this.getAllContribuable();
  }
  getAllContribuable() {
    this.AdminService.getAllComptes().subscribe((res) => {

      this.lesAdmin = res.filter((compte: { userRole: string; }) => compte.userRole === 'Admin');
      console.log(this.lesAdmin)
    })
  }
}
