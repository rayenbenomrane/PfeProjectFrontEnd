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
  expectingDetail: boolean = true;
  openDialog() {
    if (this.isCalculable) {
      this.displayDialog = true;
    }
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
      this.adminservice.gettypeimpot(this.libelle).subscribe((data) => { this.typeimpot = data })
    });
  }
  submit() {
    if (!this.selectedType || this.trueValue === null || this.libelle === null || this.value === null || this.typeimpot === null) {
      // One or more fields are null
      this.messageService.add({ key: 'step1', severity: 'error', summary: 'error', detail: "Un ou plusieur champs sont null" });
    } else if (this.isCalculable && this.formula === '') {
      // Calculable is true and formula is null
      this.messageService.add({ key: 'step1', severity: 'error', summary: 'error', detail: "Formule est requis car calculable est vrai" });
    } else {
      // All fields are valid, proceed with the submission
      const detail = {
        libelle: this.value,
        typeDetail: this.selectedType,
        formule: this.formula,
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
      });
    }
  }


  getdetail() {
    this.adminservice.getImpotDetails(this.libelle).subscribe((data) => {
      this.lesDetails = data;
      // console.log(data)
    })
  }
  onDetailChange(event: any) {

    const selectedDetail = event.value.libelle;
    if (!this.expectingDetail) {
      this.lesDetails = [];
      this.getdetail();

      this.selectedDetail = null;
      this.messageService.add({ key: 'step1', severity: 'error', summary: 'error', detail: "erreur de creation de formule" });

      return;
    }


    if (selectedDetail) {
      this.selectedDetails.push(selectedDetail);
      this.formulaElements.push(selectedDetail);
      this.updateFormula();
      this.selectedDetail = null;
      this.lesDetails = [];
      this.getdetail();
      this.expectingDetail = false; // Next should be an operation
    }
  }

  onOperationChange(event: any) {
    if (this.expectingDetail) {
      console.error('Expected a detail, not an operation');
      return;
    }

    const selectedOperation = event.value.value;
    if (selectedOperation) {
      this.selectedOperations.push(selectedOperation);
      this.formulaElements.push(selectedOperation);
      this.updateFormula();
      this.selectedOperation = null;
      this.expectingDetail = true; // Next should be a detail
      this.lesDetails = [];
      this.getdetail();
    }
  }

  updateFormula() {
    // Concatenate formula elements to form the formula
    this.formula = this.formulaElements.join(' ');
  }


  close() {
    this.expectingDetail = true
    this.formulaElements.length = 0;

    this.formula = ''
  }
  closeDialog() {
    if (this.formulaElements.length === 0) {
      console.log("The formula is empty.");
      return;
    }
    const lastElement = this.formulaElements[this.formulaElements.length - 1];
    const isLastElementOperation = this.operationOptions.some(op => op.value === lastElement);
    if (isLastElementOperation) {
      console.log("The last element is an operation.");
      // Show an alert or handle the case where the last element is an operation
      alert("The last element cannot be an operation. Please add a detail.");
    } else {

      this.displayDialog = true
    }
  }



}
