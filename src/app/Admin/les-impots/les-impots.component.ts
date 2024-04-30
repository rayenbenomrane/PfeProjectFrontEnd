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
import { Route, Router } from '@angular/router';


@Component({
  selector: 'app-les-impots',
  standalone: true,
  imports: [CardModule, TableModule, CommonModule, FormsModule, ButtonModule, InputTextModule, DropdownModule, ToastModule, AdminSideBarComponent],
  templateUrl: './les-impots.component.html',
  styleUrl: './les-impots.component.css'
})
export class LesImpotsComponent implements OnInit {
  lesimpots: any
  constructor(private admineservice: AdminService, private router: Router) { }

  ngOnInit(): void {
    //throw new Error('Method not implemented.');
    this.getAllimpots()
  }

  getAllimpots() {
    this.admineservice.getAllimpots().subscribe((data) => this.lesimpots = data)
  }
  submit() {
    this.router.navigate(["/admin/ajoutlesimpots"])
  }

}
