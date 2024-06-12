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
import { MessageService } from 'primeng/api';

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
  lesDetails: any[] = []
  selectedDetails: string[] = [];
  selectedOperations: string[] = [];
  formulaElements: string[] = [];

  selectedDetail: any = null;
  selectedOperation: any = null;
  expectingDetail: boolean = true



  operationOptions: any[] = [
    { label: 'Addition', value: ' + ' },
    { label: 'Subtraction', value: ' - ' },
    { label: 'Multiplication', value: ' * ' },
    { label: 'Division', value: ' / ' },
    
  ];
  typeImpot: any;
  constructor(private AdminService: AdminService, private router: ActivatedRoute, private messageservice: MessageService) {

  }

  ngOnInit(): void {
    //throw new Error('Method not implemented.');
    this.getlibelle()
    this.getTypeimpot()
    this.getdetail()
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
  getTypeimpot() {
    this.AdminService.gettypeimpot(this.libelle).subscribe((data) => {
      this.typeImpot = data;
      console.log(this.typeImpot)
    }
    )
  }
  getdetail() {
    this.AdminService.getImpotDetails(this.libelle).subscribe((data) => {
      this.lesDetails = data;
      console.log(data)
    })
  }
  onDetailChange(event: any) {

    const selectedDetail = event.value.libelle;
    if (!this.expectingDetail) {
      this.lesDetails = [];
      this.getdetail();

      this.selectedDetail = null;
      console.error('Expected an operation, not a detail');

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
    this.formula = this.formulaElements.join(' ');
  }
  clearFormula() {
    this.expectingDetail = true
    this.formulaElements.length = 0;

    this.formula = ''
  }
  verif() {
    if (this.formulaElements.length === 0) {
      console.log("The formula is empty.");
      return;
    }
    const lastElement = this.formulaElements[this.formulaElements.length - 1];
    const isLastElementOperation = this.operationOptions.some(op => op.value === lastElement);
    if (isLastElementOperation) {
      console.log("The last element is an operation.");
      // Show an alert or handle the case where the last element is an operation
      this.messageservice.add({ severity: 'error', summary: 'Erreur', detail: "Le dernier élément ne peut pas être une opération. Veuillez ajouter un détail." });

    } else {
      // console.log("The last element is a detail.");

      // Proceed with your logic when the last element is a detail
      const updatedformule = {
        libelle: this.libelle,
        formule: this.formula
      }
      //console.log(updatedformule)
      this.AdminService.saveformuleImpot(updatedformule).subscribe((data) =>
        this.messageservice.add({ severity: 'success', summary: 'valide', detail: "formule Ajouté" }))
      this.displayDialog = false;
      this.ngOnInit()
      this.clearFormula()
    }
  }

}
