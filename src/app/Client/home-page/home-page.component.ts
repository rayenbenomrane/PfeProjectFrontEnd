import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../service/client.service';
import { StorageService } from '../../service/storage.service';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { MenubarModule } from 'primeng/menubar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CommonModule, CardModule, MenubarModule],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent implements OnInit {
  isHovered: boolean = false;
  userid!: number
  contribuable: any
  constructor(private clientservice: ClientService, private router: Router) {

  }

  ngOnInit(): void {
    this.getcontribuable()
  }
  getcontribuable() {
    const userString = localStorage.getItem('user');
    if (userString) {

      const user = JSON.parse(userString);


      this.userid = user.id;
      this.clientservice.getContribuableById(this.userid).subscribe((data) => {
        this.contribuable = data;
        const dateMatriculation = new Date(this.contribuable.dateDeMatriculation);
        const day = dateMatriculation.getDate();
        const month = dateMatriculation.getMonth() + 1; // Months are zero-indexed, so add 1
        const year = dateMatriculation.getFullYear();
        this.contribuable.dateDeMatriculation = `${day}/${month}/${year}`;
        console.log(this.contribuable);
      });

      // Now you can use userId as needed
    } else {
      // Handle case where user object does not exist in local storage
      console.error('User object not found in local storage');
    }
  }
  logout(): void {

    StorageService.clearFromLocalStorage();



  }
  contribuablePage() {
    const contribuableMatricule = this.contribuable.matriculeFiscale;


    localStorage.setItem('contribuableMatricule', contribuableMatricule);
    this.router.navigate(['/client/ContribuablePage'])
  }


  onMouseEnter() {
    this.isHovered = true;
  }

  onMouseLeave() {
    this.isHovered = false;
  }
}
