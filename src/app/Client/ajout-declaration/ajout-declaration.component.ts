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
  constructor(private clientservice: ClientService, private messageService: MessageService) {

  }


  ngOnInit(): void {
    this.getcontribuable();

    //this.getFormule();
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
    this.clientservice.gettypeDeclaration().subscribe((data) => { this.lestypes = data })
  }
  submit() {

    if (!this.date || !this.obligation || !this.type) {

      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Please fill in all fields.' });
      return;
    }
    const moisEffet = this.date.getMonth() + 1;
    const anneeEffet = this.date.getFullYear();

    const type1 = {
      idTypeDeclaration: this.type.idTypeDeclaration,
      libelle: this.type.type
    }


    const declarationObject = {
      moisEffet: moisEffet,
      anneeEffet: anneeEffet,
      idObligation: this.obligation.idObligation,
      type: type1
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
        console.log(this.hashMapEntries);

        this.displayPopup = true;
      },
      (error) => {

        if (error.status === 400 && error.error === 'declaration deja existante!') {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Declaration deja existante.' });
        } else {
          console.error('Error saving declaration:', error);
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Problem de creation de declaration.' });
        }
      }
    );
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
