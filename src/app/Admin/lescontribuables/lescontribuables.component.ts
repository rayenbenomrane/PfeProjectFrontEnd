import { CommonModule } from '@angular/common';
import { AdminService } from './../../service/admin.service';
import { Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { SidebarModule } from 'primeng/sidebar';
import { AdminSideBarComponent } from '../admin-side-bar/admin-side-bar.component';
import { StorageService } from '../../service/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lescontribuables',
  standalone: true,
  imports: [CommonModule, TableModule, ButtonModule, TagModule, SidebarModule, AdminSideBarComponent],
  templateUrl: './lescontribuables.component.html',
  styleUrl: './lescontribuables.component.css'
})
export class LescontribuablesComponent implements OnInit {
  lesContribuables: any = []

  constructor(private AdminService: AdminService, private router: Router) {

  }

  ngOnInit(): void {
    if (!StorageService.isAdminLoggedIn()) {
      this.router.navigate(['/error'])
    }else{ this.getAllContribuable();}


  }
  getAllContribuable() {
    this.AdminService.getAllContribuables().subscribe((res) => {

      this.lesContribuables = res;
      console.log(this.lesContribuables)
    })
  }


}
