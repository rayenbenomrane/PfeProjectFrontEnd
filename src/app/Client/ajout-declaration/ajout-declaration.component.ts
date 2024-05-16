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
  hashMapEntries: Map<string, any> = new Map();
  iddeclaration: any
  formule: any

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


    const declarationObject = {
      moisEffet: moisEffet,
      anneeEffet: anneeEffet,
      idObligation: this.obligation.idObligation,
      type: this.type
    };


    this.clientservice.saveDeclaration(declarationObject).subscribe(
      (data: any) => {

        const entriesArray = Object.entries(data).sort((a, b) => {
          const ordreA = this.extractOrdreFromKey(a[0]);
          const ordreB = this.extractOrdreFromKey(b[0]);
          console.log("ordre", ordreA)
          return ordreA - ordreB;
        });



        this.hashMapEntries = new Map(entriesArray);
        this.getFormule()
        console.log(this.hashMapEntries);

        this.displayPopup = true;
      },
      (error) => {
        console.error('Error saving declaration:', error);
      }
    );
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

    const natureRebriqueIndex = key.indexOf('naturerebrique=');
    if (natureRebriqueIndex !== -1) {
      const natureStartIndex = natureRebriqueIndex + 'naturerebrique='.length;
      const natureEndIndex = key.indexOf(',', natureStartIndex);
      let natureRebrique = '';
      if (natureEndIndex === -1) {
        natureRebrique = key.substring(natureStartIndex);
      } else {
        natureRebrique = key.substring(natureStartIndex, natureEndIndex);
      }
      if (natureRebrique === 'REVENUS') {
        libelle += ' (r)';
      } else if (natureRebrique === 'PERTE') {
        libelle += ' (p)';
      }
    }

    return libelle;
  }
  submit1() {

    const updateRequests = [];

    for (const [key, value] of Object.entries(this.hashMapEntries)) {
      const declarationDto = {
        iddetailDeclaration: value.iddetailDeclaration,
        valeur: value.valeur
      };

      updateRequests.push(this.clientservice.updateDetailDeclaration(declarationDto));
    }

    forkJoin(updateRequests).subscribe(
      responses => {

        this.getDetailType(this.hashMapEntries);
      },
      error => {
        console.error('An error occurred during updates', error);
      }

    );
  }
  getDetailType(hashMapEntries: any) {
    let sumRevenus = 0;
    let sumPerte = 0;
    const revenus: any[] = [];
    const perte: any[] = [];
    const values: { [key: string]: number } = {};

    for (const [key, value] of Object.entries(hashMapEntries)) {
      const detailImpot = key.split(',')[3].split('=')[1].trim();
      const entryValue = value as any;
      const valeur = parseFloat(entryValue.valeur);
      this.iddeclaration = Number(entryValue.iddeclaration)
      if (detailImpot === 'REVENUS') {
        revenus.push(value);
        sumRevenus += valeur;
      } else if (detailImpot === 'PERTE') {
        perte.push(value);
        sumPerte += valeur;
      }
    }

    values['r'] = sumRevenus;
    values['p'] = sumPerte;

    this.clientservice.getFormulaByLibelle(this.obligation.impot.libelle).subscribe((data) => {

      const calculateRequest = {
        "formula": data.formule,
        "values": values
      };
      this.formule = data.formule


      this.clientservice.calculateEquation(calculateRequest).subscribe((result) => {
        const saveMontant = {
          "idDeclaration": this.iddeclaration,
          "montantApayer": result
        }
        this.clientservice.updateMontantDeclaration(saveMontant).subscribe((data) => console.log(data));
      });
    });
  }
  getFormule() {
    this.clientservice.getFormulaByLibelle(this.obligation.impot.libelle).subscribe((data) => {
      this.formule = data.formule;

    });
  }

}
