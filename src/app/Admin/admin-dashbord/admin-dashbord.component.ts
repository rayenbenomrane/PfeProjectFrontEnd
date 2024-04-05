import { Component } from '@angular/core';
import { AdminService } from '../../service/admin.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-dashbord',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-dashbord.component.html',
  styleUrl: './admin-dashbord.component.css'
})
export class AdminDashbordComponent {





  Inscription: any = [];
  inscription: any;
  constructor(private admineService: AdminService) {
    this.getAllInscription();
  }
  getAllInscription() {
    this.admineService.getAllInscription().subscribe((res) => {

      this.inscription = res
      console.log(this.inscription)
    })
  }
  accepterUtilisateur(inscription: any) {
    inscription.NonLocked = true;
    this.admineService.validerCompte(inscription).subscribe(() => console.log("utilisateur valider!!!"))


  }
}
