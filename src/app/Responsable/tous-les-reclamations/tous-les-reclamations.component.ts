import { TableModule } from 'primeng/table';
import { LayoutResponsableComponent } from '../layout-responsable/layout-responsable.component';
import { ResponsableService } from './../../service/responsable.service';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-tous-les-reclamations',
  standalone: true,
  imports: [LayoutResponsableComponent, TableModule, CommonModule, ButtonModule, DialogModule, InputTextModule, FormsModule],
  templateUrl: './tous-les-reclamations.component.html',
  styleUrl: './tous-les-reclamations.component.css'
})
export class TousLesReclamationsComponent implements OnInit {

  lesreclamations: any
  displayContribuableDialog: boolean = false;
  displayDeclarationDialog: boolean = false;
  displayDialog: boolean = false;
  selectedReclamation: any
  lesdetails: any = []
  typedetail: string = ''
  solution: string = '';
  ngOnInit(): void {
    // throw new Error('Method not implemented.');
    this.getAllreclamation()
  }


  constructor(private responsableService: ResponsableService) {

  }


  getAllreclamation() {
    this.responsableService.getReclamations().subscribe((data) => {
      this.lesreclamations = data
      //console.log(this.lesreclamations)
    })
  }
  hasDeclarations(): boolean {
    return this.lesreclamations && this.lesreclamations.some((reclamation: { declaration: any; }) => reclamation.declaration);
  }
  openDialog(reclamation: any) {
    this.selectedReclamation = reclamation;
    this.displayDialog = true;
  }

  saveSolution() {
    if (this.selectedReclamation) {
      this.selectedReclamation.solution = this.solution;
      const solutiondto = {
        idReclamation: this.selectedReclamation.idReclamation,
        solution: this.solution
      }
      this.responsableService.updateSolution(solutiondto).subscribe((data) =>
        this.displayDialog = false
      )
    }


  }
  showContribuableDialog(reclamation: any) {
    this.selectedReclamation = reclamation;
    this.displayContribuableDialog = true;
  }
  showDeclarationDialog(reclamation: any) {
    //throw new Error('Method not implemented.');
    this.selectedReclamation = reclamation
    this.responsableService.getdetail(reclamation.declaration.idDeclaration).subscribe((data) => {
      this.lesdetails = data
      if (this.lesdetails.length > 0) {
        this.typedetail = this.lesdetails[0].declaration.type.libelle;
      }

      console.log(data)
    })
    this.displayDeclarationDialog = true
  }
  updatereclamation(reclamation: any) {
    this.selectedReclamation = reclamation;
    if (this.selectedReclamation) {

      const solutiondto = {
        idReclamation: this.selectedReclamation.idReclamation,
        etat: 'REFUSEE'
      }
      this.responsableService.updateSolution(solutiondto).subscribe((data) => this.ngOnInit());
    }

  }


}
