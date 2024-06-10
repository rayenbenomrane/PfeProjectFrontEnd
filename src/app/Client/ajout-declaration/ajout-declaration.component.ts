import { InputNumberModule } from 'primeng/inputnumber';
import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DropdownModule } from 'primeng/dropdown';
import { InputText, InputTextModule } from 'primeng/inputtext';
import { ClientService } from '../../service/client.service';

import { CalendarModule } from 'primeng/calendar';
import { ToastModule } from 'primeng/toast';
import { LayoutclientComponent } from '../layoutclient/layoutclient.component';
import { MessageService } from 'primeng/api';
import { DialogModule } from 'primeng/dialog';
import { forkJoin } from 'rxjs';
import { PasswordModule } from 'primeng/password';

@Component({
  selector: 'app-ajout-declaration',
  standalone: true,
  imports: [InputNumberModule, FormsModule, CommonModule, CardModule, ButtonModule, DropdownModule, InputTextModule, CalendarModule, ToastModule, LayoutclientComponent, DialogModule],
  templateUrl: './ajout-declaration.component.html',
  styleUrl: './ajout-declaration.component.css'
})
export class AjoutDeclarationComponent implements OnInit {
  showDialog: boolean = false;

  @ViewChild('dialog', { static: false }) dialog!: ElementRef;
  Lestrimestre: any[] = [
    { label: 'TRIMESTRE 1', value: '1' },
    { label: 'TRIMESTRE 2', value: '4' },
    { label: 'TRIMESTRE 3', value: '7' },
    { label: 'TRIMESTRE 4', value: '10' }
  ];
  LesSemestre: any[] = [
    { label: 'SEMESTRE 1', value: '1' },
    { label: 'SEMESTRE 2', value: '7' }
  ];
  periodeSelectionnee: string = '';
  afficherDropdown: boolean = true;
  typeimpot: any
  moisEffet: any
  anneeEffet: any
  idObligation: any
  lesobligations: any
  contribuable: any
  obligation: any;
  lestypes: any
  type: any;
  date: any;
  displayPopup: any;
  hashMapEntries: Map<string, any> = new Map<string, any>();
  iddeclaration: any
  formule: any
  formule1: string = ''
  result!: number
  nonCalculableEntries: { [key: string]: any } = {}
  date1: any;

  constructor(private clientservice: ClientService, private messageService: MessageService) {

  }


  ngOnInit(): void {
    this.getcontribuable();
    this.getSelectedDeclaration()
    //this.getFormule();
  }
  checkPeriodicite(impot: any): string {
    return impot.typeImpot.periodicite;
  }
  checkAndSetPeriodicite(event: any) {
    const impotSelectionne = event.value;
    this.periodeSelectionnee = this.checkPeriodicite(impotSelectionne);
    console.log(this.periodeSelectionnee)
  }
  getSelectedDeclaration() {
    const selectedDeclaration = this.clientservice.getSelectedDeclaration();
    if (selectedDeclaration) {
      this.afficherDropdown = false
      this.populateForm(selectedDeclaration);


      this.typeimpot = selectedDeclaration.obligation.impot.libelle
      console.log('imotttt', this.typeimpot)
      console.log('selelellelele', selectedDeclaration)
    }
  }
  populateForm(declaration: any) {
    this.obligation = declaration.obligationFiscale;
    console.log(this.obligation)
    this.type = declaration.type;
    this.moisEffet = declaration.moisEffet;
    this.anneeEffet = declaration.anneEffet;
    this.date = new Date(this.anneeEffet, this.moisEffet);
    this.periodeSelectionnee = declaration.obligationFiscale.typeImpot.periodicite;
  }

  toggleDialog(event: MouseEvent) {
    this.showDialog = !this.showDialog;
  }
  getcontribuable() {
    const matricule = localStorage.getItem('contribuableMatricule');
    this.clientservice.getContribuableBymatricule(Number(matricule)).subscribe((data) => {
      this.contribuable = data;
      // console.log(this.contribuable);
      this.getObligation();
      this.lestypeDeclaration();

    });
  }

  getObligation() {
    if (!this.contribuable) {
      console.error("Contribuable is not defined.");
      return;
    }

    this.clientservice.getObligationById(this.contribuable.idContribuable).subscribe((data) => {
      this.lesobligations = data;
      //console.log(this.lesobligations);
    });
  }
  lestypeDeclaration() {
    if (!this.contribuable) {
      console.error("Contribuable is not defined.");
      return;
    }
    this.clientservice.gettypeDeclaration().subscribe((data) => {
      this.lestypes = data.map((type: any) => ({ label: type, value: type })),
        console.log(this.lestypes)
    })
  }
  getMois() {
    if (this.periodeSelectionnee == "ANNUELLE") {
      return 1;
    } else if (this.periodeSelectionnee == "MENSUELLE") {
      return this.date.getMonth() + 1
    } else {
      return this.date;
    }
  }

  getAnnee() {
    if (this.periodeSelectionnee == "ANNUELLE") {
      return this.date.getFullYear();
    } else if (this.periodeSelectionnee == "MENSUELLE") {
      return this.date.getFullYear()
    } else {
      return this.date1.getFullYear();
    }
  }
  submit() {
    if (this.periodeSelectionnee == "ANNUELLE" || this.periodeSelectionnee == "MENSUELLE") {


      if (!this.date || !this.obligation || !this.type) {

        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Please fill in all fields.' });
        return;
      }
    } else {
      if (!this.date || !this.date1 || !this.obligation || !this.type) {

        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Please fill in all fields.' });
        return;
      }
    }


    if (this.afficherDropdown == false) {
      this.idObligation = this.obligation.idObligationFiscale;
      const complementaireType = this.lestypes.find((type: any) => type.value === 'COMPLEMENTAIRE');
      if (complementaireType) {
        this.type = complementaireType;
        console.log(this.type)
      }
    } else {
      this.idObligation = this.obligation.idObligation;
      this.moisEffet = this.getMois();
      this.anneeEffet = this.getAnnee();
      const dateActuelle = new Date();
      const dateEffet = new Date(this.anneeEffet, this.moisEffet - 1);
      if (dateEffet > dateActuelle) {
        this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'La date d\'effet dépasse la date actuelle.' })
        return;
      }
    }

    const declarationObject = {
      moisEffet: this.moisEffet,
      anneeEffet: this.anneeEffet,
      idObligation: this.idObligation,
      type: this.type.value
    };
    console.log(declarationObject)

    this.clientservice.saveDeclaration(declarationObject).subscribe(
      (data: any) => {

        const entriesArray = Object.entries(data).sort((a, b) => {
          const ordreA = this.extractOrdreFromKey(a[0]);
          const ordreB = this.extractOrdreFromKey(b[0]);
          // console.log("ordre", ordreA)
          return ordreA - ordreB;
        });



        this.hashMapEntries = new Map(entriesArray);
        //this.getFormule()
        //console.log(this.hashMapEntries);

        this.displayPopup = true;

      },
      (error) => {
        console.error('Error saving declaration:', error);
        this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Vérifiez votre déclaration. ' })
      }
    );
    this.afficherDropdown = true
  }
  extractCalculable(key: string): boolean {
    const calculableIndex = key.indexOf('calculable=true');
    return calculableIndex !== -1;
  }

  extractOrdreFromKey(key: string): number {
    const ordreMatch = key.match(/ordre=(\d+)/);
    return ordreMatch ? parseInt(ordreMatch[1], 10) : Number.MAX_SAFE_INTEGER;
  }
  keepOriginalOrder = (a: any, b: any): number => {
    return 0;
  }

  parseEntryKey(key: string): any {
    const libelleIndex = key.indexOf('libelle=');
    if (libelleIndex === -1) {
      return '';
    }
    let libelle = '';
    const startIndex = libelleIndex + 'libelle='.length;
    const endIndex = key.indexOf(',', startIndex);
    if (endIndex === -1) {
      libelle = key.substring(startIndex);
    } else {
      libelle = key.substring(startIndex, endIndex);
    }

    const obligatoireIndex = key.indexOf('obligatoire=true');
    if (obligatoireIndex !== -1) {
      libelle += ' *';
    }



    return libelle;
  }
  identifyNonCalculableEntries() {
    console.log("Identifying non-calculable entries...");
    this.hashMapEntries.forEach((value, key) => {
      if (key.includes('calculable=false')) {
        let libelle = this.extractLibelle(key);
        this.nonCalculableEntries[libelle] = value.valeur;
      }
    });
    console.log("Non-calculable entries identified:", this.nonCalculableEntries);
  }
  extractLibelle(key: string): string {
    let start = key.indexOf('libelle=') + 8;
    let end = key.indexOf(', typeDetail');
    return key.substring(start, end);
  }
  calculateValues() {

    this.identifyNonCalculableEntries()
    this.hashMapEntries.forEach((value, key) => {
      //console.log("hello");
      if (key.includes('calculable=true')) {

        let formula = `{${this.extractFormula(key)}}`; // Add {} around the formula
        let values = this.nonCalculableEntries;
        // console.log(formula);
        //console.log(values);
        this.clientservice.calculateEquation({ formula, values }).subscribe(
          (result: any) => {
            //console.log(result);
            this.hashMapEntries.set(key, { ...value, valeur: result });
            this.updateDetailDeclaration(value, result)
          },
          (error) => {
            console.error('Error calculating value', error);
          }
        );
      } else { this.updateDetailDeclaration(value, value.valeur) }

    });

    console.log("Finished calculateValues.");
  }
  updateDetailDeclaration(value: any, result: any) {
    const detailDeclarationDto = {
      iddetailDeclaration: value.iddetailDeclaration,
      valeur: result,
      iddeclaration: value.iddeclaration,
      naturerebrique: value.naturerebrique
    };
    this.clientservice.updateDetailDeclaration(detailDeclarationDto).subscribe((data) => console.log("succeful update"))

  }
  extractFormula(key: string): string {
    let start = key.indexOf('formule=') + 8;
    let end = key.indexOf(', ordre');
    return key.substring(start, end);
  }

}
