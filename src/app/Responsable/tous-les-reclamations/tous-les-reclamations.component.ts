import { TableModule } from 'primeng/table';
import { LayoutResponsableComponent } from '../layout-responsable/layout-responsable.component';
import { ResponsableService } from './../../service/responsable.service';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { TagModule } from 'primeng/tag';

@Component({
  selector: 'app-tous-les-reclamations',
  standalone: true,
  imports: [LayoutResponsableComponent, TagModule, TableModule, CommonModule, ButtonModule, DialogModule, InputTextModule, FormsModule, CalendarModule, DropdownModule],
  templateUrl: './tous-les-reclamations.component.html',
  styleUrl: './tous-les-reclamations.component.css'
})
export class TousLesReclamationsComponent implements OnInit {
  showFilterMenu: boolean = false;
  selectedFilter: string | null = null;
  placeholderText: string = "Recherche Global";
  filteredReclamations: any[] = [];

  dateOptions = [
    { label: 'Personnalisé', value: 'custom' },
    { label: 'Aujourd\'hui', value: 'today' },
    { label: 'Cette semaine', value: 'thisWeek' },
    { label: 'Ce mois-ci', value: 'thisMonth' },
    { label: 'Cette année', value: 'thisYear' }

  ];
  selectedDateFilter: string = '';
  customDate!: Date;
  lesreclamations: any
  displayContribuableDialog: boolean = false;
  displayDeclarationDialog: boolean = false;
  displayDialog: boolean = false;
  selectedReclamation: any;
  lesdetails: any[] = [];
  typedetail: string = '';
  solution: string = '';

  constructor(private responsableService: ResponsableService) { }

  ngOnInit(): void {
    this.getAllreclamation();
  }

  getAllreclamation() {
    this.responsableService.getReclamations().subscribe((data) => {
      this.lesreclamations = data;
      this.filteredReclamations = this.lesreclamations;
    });
  }

  hasDeclarations(): boolean {
    return this.lesreclamations && this.lesreclamations.some((reclamation: { declaration: any; }) => reclamation.declaration);
  }

  onDateFilterChange(event: any) {
    const filter = event.value;
    if (filter === 'custom' && this.customDate) {
      this.applyCustomDateFilter();
    } else {
      this.applyDateFilter(filter);
    }
  }

  applyDateFilter(filter: string) {
    const now = new Date();
    this.filteredReclamations = this.lesreclamations.filter((reclamation: { dateReclamation: string | number | Date; }) => {
      const date = new Date(reclamation.dateReclamation);
      switch (filter) {
        case 'today':
          return this.isSameDay(date, now);
        case 'thisWeek':
          return this.isSameWeek(date, now);
        case 'thisMonth':
          return this.isSameMonth(date, now);
        case 'thisYear':
          return this.isSameYear(date, now);
        default:
          return true;
      }
    });
  }

  applyCustomDateFilter() {
    const selectedDate = new Date(this.customDate);
    this.filteredReclamations = this.lesreclamations.filter((reclamation: { dateReclamation: string | number | Date; }) => {
      const date = new Date(reclamation.dateReclamation);
      return this.isSameDay(date, selectedDate);
    });
  }

  isSameDay(date1: Date, date2: Date): boolean {
    return date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear();
  }

  isSameWeek(date1: Date, date2: Date): boolean {
    const startOfWeek = this.getStartOfWeek(date2);
    const endOfWeek = this.getEndOfWeek(date2);
    return date1 >= startOfWeek && date1 <= endOfWeek;
  }

  isSameMonth(date1: Date, date2: Date): boolean {
    return date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear();
  }

  isSameYear(date1: Date, date2: Date): boolean {
    return date1.getFullYear() === date2.getFullYear();
  }

  getStartOfWeek(date: Date): Date {
    const start = new Date(date);
    start.setDate(date.getDate() - date.getDay());
    return start;
  }

  getEndOfWeek(date: Date): Date {
    const end = new Date(date);
    end.setDate(date.getDate() + (6 - date.getDay()));
    return end;
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
      };
      this.responsableService.updateSolution(solutiondto).subscribe(() => {
        this.displayDialog = false;
      });
    }
  }

  showContribuableDialog(reclamation: any) {
    this.selectedReclamation = reclamation;
    this.displayContribuableDialog = true;
  }

  showDeclarationDialog(reclamation: any) {
    this.selectedReclamation = reclamation;
    this.responsableService.getdetail(reclamation.declaration.idDeclaration).subscribe((data) => {
      this.lesdetails = data;
      if (this.lesdetails.length > 0) {
        this.typedetail = this.lesdetails[0].declaration.type.libelle;
      }
      this.displayDeclarationDialog = true;
    });
  }

  updatereclamation(reclamation: any) {
    this.selectedReclamation = reclamation;
    if (this.selectedReclamation) {
      const solutiondto = {
        idReclamation: this.selectedReclamation.idReclamation,
        etat: 'REFUSEE'
      };
      this.responsableService.updateSolution(solutiondto).subscribe(() => {
        this.ngOnInit();
      });
      this.ngOnInit();
    }
  }
  getInputValue(event: any): string {
    return (event.target as HTMLInputElement).value;
  }
  getSeverity(etat: string): string {
    switch (etat) {
      case 'EN_ATTENTE':
        return 'info'; // or any other severity for 'EN_ATTENTE' state
      case 'EN_COURS':
        return 'warning'; // or any other severity for 'EN_COURS' state
      case 'RESOLUE':
        return 'success'; // or any other severity for 'RESOLUE' state
      case 'REFUSEE':
        return 'danger'; // or any other severity for 'REFUSEE' state
      default:
        return 'info'; // Default to 'info' severity if state is not recognized
    }
  }
}
