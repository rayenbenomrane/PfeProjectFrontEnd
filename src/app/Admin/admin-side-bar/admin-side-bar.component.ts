import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { SidebarModule } from 'primeng/sidebar';
import { Dialog, DialogModule } from 'primeng/dialog';
import { PasswordModule } from 'primeng/password';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-admin-side-bar',
  standalone: true,
  imports: [CommonModule, ButtonModule, SidebarModule, DialogModule, PasswordModule, FormsModule],
  templateUrl: './admin-side-bar.component.html',
  styleUrl: './admin-side-bar.component.css'
})
export class AdminSideBarComponent implements OnInit {
  [x: string]: any;
  newpassword!: string
  confirmpassword!: string

  ngOnInit() {
  }

  display: boolean = false;

  showDialog() {
    this.display = true;
  }


}
