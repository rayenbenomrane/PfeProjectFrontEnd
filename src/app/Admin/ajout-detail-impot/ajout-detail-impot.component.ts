import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { AdminSideBarComponent } from '../admin-side-bar/admin-side-bar.component';

@Component({
  selector: 'app-ajout-detail-impot',
  standalone: true,
  imports: [CardModule, CommonModule, FormsModule, ButtonModule, InputTextModule, DropdownModule, ToastModule, AdminSideBarComponent],
  templateUrl: './ajout-detail-impot.component.html',
  styleUrl: './ajout-detail-impot.component.css'
})
export class AjoutDetailImpotComponent {

}
