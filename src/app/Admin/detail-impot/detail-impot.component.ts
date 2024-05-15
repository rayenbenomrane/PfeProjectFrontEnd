import { CommonModule } from '@angular/common';
import { AdminService } from './../../service/admin.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { ToastModule } from 'primeng/toast';
import { AdminSideBarComponent } from '../admin-side-bar/admin-side-bar.component';
import { DialogModule } from 'primeng/dialog';

@Component({
  selector: 'app-detail-impot',
  standalone: true,
  imports: [CardModule, RouterModule, TableModule, CommonModule, FormsModule, ButtonModule, InputTextModule, DropdownModule, ToastModule, DialogModule, AdminSideBarComponent],
  templateUrl: './detail-impot.component.html',
  styleUrl: './detail-impot.component.css'
})
export class DetailImpotComponent implements OnInit {
  detail: any = []
  libelle!: string
  constructor(private AdminService: AdminService, private router: ActivatedRoute) {

  }

  ngOnInit(): void {
    //throw new Error('Method not implemented.');
    this.getlibelle()
  }

  getlibelle() {
    this.router.params.subscribe(params => {
      // Retrieve the impot object using the libelle parameter
      this.libelle = params['libelle'];
      //console.log("C'est le paramètre libelle:", libelle);
      this.AdminService.getImpotDetails(this.libelle).subscribe((data) => { this.detail = data })
    });
  }
  displayDialog: boolean = false;
  impotTitle: string = "";
  formula: string = "";

  showDialog() {
    this.displayDialog = true;

    this.impotTitle = this.libelle;
  }

  submitFormula() {
    // Regular expression pattern for a valid formula
    const formulaPattern = /^([a-zA-Z]+|\d+)\s*[\+\-\*\/]\s*([a-zA-Z]+|\d+)\s*(?:[\+\-\*\/]\s*([a-zA-Z]+|\d+)\s*)*$/;

    if (!formulaPattern.test(this.formula)) {
      // Formula format is invalid
      console.error('Invalid formula format:', this.formula);
      return;
    }

    // Wrap the formula with {}
    const wrappedFormula = `{${this.formula}}`;

    console.log('Wrapped formula:', wrappedFormula);
    const impotdto = {
      libelle: this.libelle,
      formule: wrappedFormula
    }
    console.log(impotdto)
    this.AdminService.saveformuleImpot(impotdto).subscribe((data) => console.log(data))
  }


}
