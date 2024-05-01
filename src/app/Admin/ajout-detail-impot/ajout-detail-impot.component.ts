import { NatureRebrique } from './../../enums/natureRebrique.enum';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { AdminSideBarComponent } from '../admin-side-bar/admin-side-bar.component';
import { TypeDetail } from '../../enums/typeDetail.enum';
import { RadioButtonModule } from 'primeng/radiobutton';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from '../../service/admin.service';
import { InputNumberModule } from 'primeng/inputnumber';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-ajout-detail-impot',
  standalone: true,
  imports: [CardModule, InputNumberModule, RadioButtonModule, CommonModule, FormsModule, ButtonModule, InputTextModule, DropdownModule, ToastModule, AdminSideBarComponent],
  templateUrl: './ajout-detail-impot.component.html',
  styleUrl: './ajout-detail-impot.component.css'
})
export class AjoutDetailImpotComponent implements OnInit {
  value1!: number;



  constructor(private router: ActivatedRoute, private adminservice: AdminService, private messageService: MessageService, private router1: Router) { }

  ngOnInit(): void {
    this.getlibelle()
  }
  typeDetailKeys = Object.keys(TypeDetail);
  NatureRebriqueKeys = Object.keys(NatureRebrique)
  selectedType: any;
  selectedType1: any;
  trueValue: boolean = false;
  libelle!: string
  value!: number
  typeimpot: any
  getlibelle() {
    this.router.params.subscribe(params => {
      // Retrieve the impot object using the libelle parameter
      this.libelle = params['libelle'];
      //console.log("C'est le paramètre libelle:", libelle);
      this.adminservice.gettypeimpot(this.libelle).subscribe((data) => { this.typeimpot = data, console.log(data) })
    });
  }
  submit() {

    if (!this.selectedType || !this.selectedType1 || this.trueValue === null || this.libelle === null || this.value === null || this.typeimpot === null) {
      // Add the class to elements or perform any other action
      this.messageService.add({ key: 'step1', severity: 'error', summary: 'error', detail: "Un ou plusieur champs sont null" });

    } else {
      // All fields are not null, proceed with the submission
      console.log("All fields are not null. Proceeding with submission.");
      const detail = {
        libelle: this.value,
        typeDetail: this.selectedType,
        naturerebrique: this.selectedType1,
        ordre: this.value1,
        obligatoire: this.trueValue,
        typeImpot: this.typeimpot
      };
      this.adminservice.savedetailImpot(detail).subscribe((data) => {
        this.messageService.add({ key: 'step1', severity: 'success', summary: 'valide', detail: "detail Ajouté" });
        setTimeout(() => {
          this.router1.navigate(['/admin/detail-impot', this.libelle]);
        }, 1500);

      })
    }

  }




}
