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
import { DialogModule } from 'primeng/dialog';
@Component({
  selector: 'app-ajout-detail-impot',
  standalone: true,
  imports: [CardModule, InputNumberModule, RadioButtonModule, CommonModule, FormsModule, ButtonModule, InputTextModule, DropdownModule, ToastModule, AdminSideBarComponent, DialogModule],
  templateUrl: './ajout-detail-impot.component.html',
  styleUrl: './ajout-detail-impot.component.css'
})
export class AjoutDetailImpotComponent implements OnInit {
  typeDetailKeys = Object.keys(TypeDetail);
  NatureRebriqueKeys = Object.keys(NatureRebrique)
  selectedType: any;
  selectedType1: any;
  trueValue: boolean = false;
  libelle!: string
  value!: number
  typeimpot: any
  value1!: number;
  isCalculable: boolean = false;
  displayDialog: boolean = false;
  selectedDetail: any;
  formula: string = '';
  selectedOperation: any;
  lesDetails: any[] = []
  selectedDetails: string[] = [];
  selectedOperations: string[] = [];
  formulaElements: string[] = [];

  openDialog() {
    if (this.isCalculable) {
      this.displayDialog = true;
    }
  }

  closeDialog() {

    this.displayDialog = false;
  }



  constructor(private router: ActivatedRoute, private adminservice: AdminService, private messageService: MessageService, private router1: Router) { }

  ngOnInit(): void {
    this.getlibelle()
    this.getdetail()
  }


  operationOptions: any[] = [
    { label: 'Addition', value: ' + ' },
    { label: 'Subtraction', value: ' - ' },
    { label: 'Multiplication', value: ' * ' },
    { label: 'Division', value: ' / ' },
    { label: 'Max', value: 'max(' },
    { label: 'Min', value: 'min(' }
  ];;
  getlibelle() {
    this.router.params.subscribe(params => {
      // Retrieve the impot object using the libelle parameter
      this.libelle = params['libelle'];
      //console.log("C'est le paramètre libelle:", libelle);
      this.adminservice.gettypeimpot(this.libelle).subscribe((data) => { this.typeimpot = data, console.log(data) })
    });
  }
  submit() {

    if (!this.selectedType || this.trueValue === null || this.libelle === null || this.value === null || this.typeimpot === null) {
      // Add the class to elements or perform any other action
      this.messageService.add({ key: 'step1', severity: 'error', summary: 'error', detail: "Un ou plusieur champs sont null" });

    } else {
      // All fields are not null, proceed with the submission
      console.log("All fields are not null. Proceeding with submission.");
      const detail = {
        libelle: this.value,
        typeDetail: this.selectedType,

        ordre: this.value1,
        obligatoire: this.trueValue,
        typeImpot: this.typeimpot,
        calculable: this.isCalculable
      };
      this.adminservice.savedetailImpot(detail).subscribe((data) => {
        this.messageService.add({ key: 'step1', severity: 'success', summary: 'valide', detail: "detail Ajouté" });
        setTimeout(() => {
          this.router1.navigate(['/admin/detail-impot', this.libelle]);
        }, 1500);

      })
    }

  }

  getdetail() {
    this.adminservice.getImpotDetails(this.libelle).subscribe((data) => {
      this.lesDetails = data;
      console.log(data)
    })
  }
  onDetailChange(event: any) {
    const selectedDetail = event.value.libelle;
    if (selectedDetail) {
      this.selectedDetails.push(selectedDetail);
      this.formulaElements.push(selectedDetail);

      this.updateFormula();
      // Refresh the dropdown by setting selectedDetail to null
      this.selectedDetail = null;
      this.lesDetails = [];
      this.getdetail();

    }
  }

  onOperationChange(event: any) {
    const selectedOperation = event.value.value;
    if (selectedOperation) {
      this.selectedOperations.push(selectedOperation);
      this.formulaElements.push(selectedOperation);
      this.selectedOperation = null; // Reset the selected operation after adding
      this.updateFormula();
    }
  }

  updateFormula() {
    // Concatenate formula elements to form the formula
    this.formula = this.formulaElements.join(' ');
  }







}
