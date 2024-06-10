import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AdminService } from '../../service/admin.service';
import { DropdownModule } from 'primeng/dropdown';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminSideBarComponent } from '../admin-side-bar/admin-side-bar.component';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { InputTextModule } from 'primeng/inputtext';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ajout-contribuable',
  standalone: true,
  imports: [DropdownModule, CommonModule, FormsModule, AdminSideBarComponent, InputTextModule,
    CalendarModule,
    DropdownModule,
    ButtonModule,
    ToastModule
  ],
  templateUrl: './ajout-contribuable.component.html',
  styleUrl: './ajout-contribuable.component.css'
})
export class AjoutContribuableComponent implements OnInit {
  maxDate: Date = new Date();
  lesformesjuridiques: any
  lespays: any
  lesactivite: any
  selectedFormeJuridique: any;
  selectedPays: any;
  selectedActivite: any;
  contribuable: any = {};
  constructor(private admineservice: AdminService, private messageservice: MessageService, private cd: ChangeDetectorRef, private router: Router) {

  }
  ngOnInit(): void {
    //throw new Error('Method not implemented.');
    this.lesformejuridique()
    this.getlesactivité()
    this.getlespays()
    // console.log(this.lesformesjuridiques)
  }
  ngAfterViewInit() {
    // Manually trigger change detection after view init
    this.cd.detectChanges();
  }
  lesformejuridique() {
    this.admineservice.loadData().subscribe((data) => this.lesformesjuridiques = data);
  }
  getlespays() {
    this.admineservice.loadpays().subscribe((data) => this.lespays = data);
  }
  getlesactivité() {
    this.admineservice.loadactivité().subscribe((data) => this.lesactivite = data);
  }
  onFormeJuridiqueChange(event: any) {
    this.contribuable.formeJuridique = event.value ? event.value.libelle : '';
  }

  onPaysChange(event: any) {
    this.contribuable.pays = event.value ? event.value.name_fr : '';
  }

  onActiviteChange(event: any) {
    this.contribuable.activite = event.value ? event.value.label : '';
  }
  onSubmit() {
    this.admineservice.savecontribuable(this.contribuable).subscribe(
      () => {
        this.messageservice.add({ key: 'step1', severity: 'success', summary: 'Success', detail: 'Un contribuable ajouté' });
        this.router.navigate(['admin/lescontribuables']);
      },
      (error) => {

        this.messageservice.add({ key: 'step1', severity: 'error', summary: 'Error', detail: 'Veuillez donner une differente matricule fiscale' });
      }
    );
  }

}
