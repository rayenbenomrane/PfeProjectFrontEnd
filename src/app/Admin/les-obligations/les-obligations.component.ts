import { ActivatedRoute, Route, Router, RouterModule } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../service/client.service';
import { AdminService } from '../../service/admin.service';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { AdminSideBarComponent } from '../admin-side-bar/admin-side-bar.component';
import { ToastModule } from 'primeng/toast';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-les-obligations',
  standalone: true,
  imports: [CardModule, RouterModule, TableModule, CommonModule, FormsModule, ButtonModule, InputTextModule, DropdownModule, ToastModule, DialogModule, AdminSideBarComponent],
  templateUrl: './les-obligations.component.html',
  styleUrl: './les-obligations.component.css'
})
export class LesObligationsComponent implements OnInit {
  lesobligations: any
  contribuable: any
  matricule: any
  matriculefiscale: any = 0


  constructor(private adminservice: AdminService, private router: ActivatedRoute) { }

  ngOnInit() {
    this.getlibelle()

  }
  getlibelle() {
    this.router.params.subscribe(params => {
      // Retrieve the impot object using the libelle parameter
      this.matricule = params['matricule'];
      //console.log("C'est le paramètre libelle:", libelle);
      //this.adminservice.getContribuableById(this.matricule)
      //console.log("hedhi lamtricule", this.matricule)
      this.adminservice.getContribuableBymatricule(this.matricule).subscribe((data) => { this.contribuable = data, this.getObligation() })
    });
  }
  getObligation() {

    console.log(this.contribuable)
    if (!this.contribuable) {
      console.error("Contribuable is not defined.");
      return;
    }

    this.adminservice.getObligationById(this.contribuable.idContribuable).subscribe((data) => {
      this.lesobligations = data;
      console.log(this.lesobligations);
    });
  }
}
