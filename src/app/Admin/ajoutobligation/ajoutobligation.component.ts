import { CommonModule } from '@angular/common';
import { AdminService } from './../../service/admin.service';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-ajoutobligation',
  standalone: true,
  imports: [DialogModule, BrowserModule,
    FormsModule,
    CommonModule,
    DropdownModule,
    InputTextModule,
    CalendarModule,
    ButtonModule],
  templateUrl: './ajoutobligation.component.html',
  styleUrl: './ajoutobligation.component.css'
})
export class AjoutobligationComponent implements OnInit {

  lesimpots: any

  constructor(private adminservice: AdminService) { }
  ngOnInit(): void {
    // throw new Error('Method not implemented.');
    this.getAllimpots()
  }
  getAllimpots() {
    this.adminservice.getAllimpots().subscribe((data) => { this.lesimpots = data, console.log(data) })
  }
  onSubmit() {

  }

}
