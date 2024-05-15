import { InputNumberModule } from 'primeng/inputnumber';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
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



  lesobligations: any
  contribuable: any
  obligation: any;
  lestypes: any
  type: any;
  date: any;
  displayPopup: any;
  hashMapEntries: Map<string, any> = new Map();
  constructor(private clientservice: ClientService, private messageService: MessageService) {

  }


  ngOnInit(): void {
    this.getcontribuable();
  }

  getcontribuable() {
    const matricule = localStorage.getItem('contribuableMatricule');
    this.clientservice.getContribuableBymatricule(Number(matricule)).subscribe((data) => {
      this.contribuable = data;
      // console.log(this.contribuable);
      this.getObligation(); // Call getObligation() after getting the contribuable data
      this.lestypeDeclaration()
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
    // Extract month and year from the selected date
    if (!this.date || !this.obligation || !this.type) {
      // If any value is null, display a toast message
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Please fill in all fields.' });
      return; // Stop further execution of the function
    }
    const moisEffet = this.date.getMonth() + 1; // Adding 1 because months are zero-based
    const anneeEffet = this.date.getFullYear();

    // Create an object with the extracted attributes and other predefined attributes
    const declarationObject = {
      moisEffet: moisEffet,
      anneeEffet: anneeEffet,
      idObligation: this.obligation.idObligation,
      type: this.type
    };

    // Now you can use the declarationObject for further processing, such as sending it to a service
    this.clientservice.saveDeclaration(declarationObject).subscribe(
      (data: any) => { // Add type assertion here
        this.hashMapEntries = data;
        console.log(data);
        this.displayPopup = true;
      },
      (error) => {
        console.error('Error saving declaration:', error);
      }
    );
  }
  parseEntryKey(key: string): any {
    const libelleIndex = key.indexOf('libelle=');
    if (libelleIndex === -1) {
      return ''; // Return an empty string if 'libelle=' is not found
    }
    const startIndex = libelleIndex + 'libelle='.length;
    const endIndex = key.indexOf(',', startIndex);
    if (endIndex === -1) {
      return ''; // Return an empty string if ',' is not found after 'libelle='
    }
    return key.substring(startIndex, endIndex);

  }
  submit1() {
    //console.log(this.hashMapEntries);
    const updateRequests = [];

    for (const [key, value] of Object.entries(this.hashMapEntries)) {
      const declarationDto = {
        iddetailDeclaration: value.iddetailDeclaration, // Use the correct property names
        valeur: value.valeur
      };
      //console.log(declarationDto)
      updateRequests.push(this.clientservice.updateDetailDeclaration(declarationDto));
    }

    forkJoin(updateRequests).subscribe(
      responses => {
        console.log('All updates successful', responses);
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
      const detailImpot = key.split(',')[3].split('=')[1].trim(); // Extracting naturerebrique
      const entryValue = value as { iddetailDeclaration: number, valeur: string }; // Type assertion
      const valeur = parseFloat(entryValue.valeur); // Assuming 'valeur' contains the numeric value
      if (detailImpot === 'REVENUS') {
        revenus.push(value);
        sumRevenus += valeur;
      } else if (detailImpot === 'PERTE') {
        perte.push(value);
        sumPerte += valeur;
      }
    }
    console.log(this.obligation.impot.libelle)
    this.clientservice.getFormulaByLibelle(this.obligation.impot.libelle).subscribe((data) => console.log(data))
    values['r'] = sumRevenus;
    values['p'] = sumPerte;
    //console.log(values)





    const formule = ""
    const calculateRequest = {
      "formula": formule,
      "values": values

    }
    // this.clientservice.calculateEquation(calculateRequest).subscribe((data) => console.log(data))

  }
}
