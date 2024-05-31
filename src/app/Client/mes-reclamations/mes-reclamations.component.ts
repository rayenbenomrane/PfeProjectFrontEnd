import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';
import { LayoutclientComponent } from '../layoutclient/layoutclient.component';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { ClientService } from '../../service/client.service';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-mes-reclamations',
  standalone: true,
  imports: [CommonModule, TableModule, FormsModule, InputTextModule, LayoutclientComponent, ButtonModule, TagModule, CalendarModule, DropdownModule],
  templateUrl: './mes-reclamations.component.html',
  styleUrl: './mes-reclamations.component.css'
})
export class MesReclamationsComponent {
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
  showActionsColumn: boolean = true;
  lesreclamations: any
  contribuable: any
  constructor(private clientservice: ClientService) { }

  ngOnInit() {
    this.getcontribuable()
  }
  getcontribuable() {
    const matricule = localStorage.getItem('contribuableMatricule');
    this.clientservice.getContribuableBymatricule(Number(matricule)).subscribe((data) => {
      this.contribuable = data;

      this.getreclamations(); // Call getObligation() after getting the contribuable data

    });
  }
  getreclamations() {

    if (!this.contribuable) {
      console.error("Contribuable is not defined.");
      return;
    }

    this.clientservice.LesreclamationsByContribuable(this.contribuable.matriculeFiscale).subscribe((data) => {
      this.lesreclamations = data;
      this.filteredReclamations = this.lesreclamations
      console.log(this.lesreclamations);
    });
  }
  refuserReclamation(id: number) {
    this.clientservice.refusreclamation(id).subscribe()
    this.ngOnInit()
  }
  accepterReclamation(id: number) {
    this.clientservice.acceptreclamation(id).subscribe()
    this.ngOnInit()
  }

  getSeverity(etat: string): string {
    switch (etat) {
      case 'EN_ATTENTE':
        return 'info';
      case 'EN_COURS':
        return 'warning';
      case 'RESOLUE':
        return 'success';
      case 'REFUSEE':
        return 'danger';
      default:
        return 'info';
    }
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
  getInputValue(event: any): string {
    return (event.target as HTMLInputElement).value;
  }
}
