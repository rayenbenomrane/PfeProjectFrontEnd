import { Component, OnInit } from '@angular/core';
import { StorageService } from '../../service/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-layout-responsable',
  standalone: true,
  imports: [],
  templateUrl: './layout-responsable.component.html',
  styleUrl: './layout-responsable.component.css'
})
export class LayoutResponsableComponent implements OnInit {
  constructor(private router: Router) { }
  ngOnInit(): void {
    const token = localStorage.getItem('token');

    if (!token) {
      // If no token, redirect to the error page
      this.router.navigate(['/error']);
    }
  }
  logout(): void {
    StorageService.clearFromLocalStorage();
  }
}
