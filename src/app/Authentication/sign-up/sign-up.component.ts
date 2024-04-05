import { Contribuable } from './../../../Models/Contribuable';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthServiceService } from '../../service/auth-service.service';
import { HttpClientModule } from '@angular/common/http';
import { TypeIdentifiant } from '../../enums/TypeIdentifiant.enum';

import { StepsModule } from 'primeng/steps';
import { FieldsetModule } from 'primeng/fieldset';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { CalendarModule } from 'primeng/calendar';
import { NgxCaptchaModule } from 'ngx-captcha';

import { ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule, StepsModule,
    FieldsetModule,
    ButtonModule, CardModule, CalendarModule, ReactiveFormsModule, NgxCaptchaModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent implements OnInit {
  siteKey: string;
  lesinscriptions: any = []
  activeIndex = 2;
  valid: boolean = false;
  date!: Date | null;
  date2!: Date | null;
  submitted: boolean = false;
  contribuable: any
  typeIdentifiants = Object.values(TypeIdentifiant).filter(value => typeof value === 'string');
  selectedType: TypeIdentifiant | null = null;
  inputValue: string = '';
  items = [
    { label: ' contribuable ' },
    { label: 'Step 2' },
    { label: 'Step 3' },
    { label: 'Step 4' }

  ];

  selectType(type: string | TypeIdentifiant) {
    this.selectedType = type as TypeIdentifiant;
  }


  clearInput() {
    this.inputValue = '';
  }
  formData = {
    email: '',
    password: '',
    nom: '',
    prenom: '',
    numeroFiscal: '',
    poste: '',
    typeIdentifiant: this.selectType,
    valeurIdentifiant: '',
    numerodequittance: '',


  };
  constructor(private authserve: AuthServiceService) { this.siteKey = '6Lf62rApAAAAANTrndxnTO0Npv3pBj5uJgQY2nba' }
  ngOnInit(): void {


  }


  onSubmit() {
    this.authserve.getContribuableByMatriculeFiscale(Number(this.formData.numeroFiscal)).subscribe((data) => {
      this.contribuable = data;

      const signupRequest = {
        email: this.formData.email,
        password: this.formData.password,
        nom: this.formData.nom,
        prenom: this.formData.prenom,
        numeroFiscal: this.formData.numeroFiscal,
        poste: this.formData.poste,
        typeIdentifiant: this.selectedType,
        valueIdentifiant: this.inputValue,
        contribuable: this.contribuable
      };

      this.authserve.register(signupRequest).subscribe(response => {
        console.log('User registered successfully:', response);

      }, error => {
        console.error('Error occurred during registration:', error);

      });
    }, (error: any) => {
      console.error('Error occurred while fetching contribuable:', error);

    });
  }



  nextStep() {

    this.submitted = true;

    if (this.validateForm()) {
      this.authserve.getAllInscription().subscribe((inscriptionList) => {
        this.lesinscriptions = inscriptionList;

        this.authserve.getContribuableByMatriculeFiscale(Number(this.formData.numeroFiscal)).subscribe(
          (data) => {
            this.contribuable = data;

            // Check if the contribuable already exists in the list
            const contribuableExists = this.lesinscriptions.some((inscription: any) => {
              return inscription.contribuable.idContribuable === this.contribuable.idContribuable;
            });

            if (contribuableExists) {
              alert("Contribuable has already done the sign up");
              return; // Exit the function early if the contribuable exists
            }

            const contribuableDate = new Date(this.contribuable.dateDeMatriculation);
            const contribuableDateOnly = new Date(contribuableDate.getFullYear(), contribuableDate.getMonth(), contribuableDate.getDate());

            // Convert this.date to Date object if it's not null
            let currentDateOnly: Date | null = null;
            if (this.date) {
              const currentDate = new Date(this.date);
              currentDateOnly = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
            }

            console.log("Contribuable Date:", contribuableDate);
            console.log("Current Date:", currentDateOnly);

            // Compare the dates if currentDate is not null
            if (currentDateOnly && contribuableDateOnly.getTime() === currentDateOnly.getTime()) {
              alert("Contribuable found");
              this.activeIndex++;
              this.submitted = false; // Proceed to the next step if the contribuable is found
            } else {
              console.log(this.contribuable);
              console.log(this.contribuable.dateDeMatriculation);
              console.log(this.date);
              alert("Contribuable not found");
            }
          },
          (error) => {
            console.error("Error fetching contribuable:", error);
            alert("An error occurred while fetching the contribuable");
          }
        );
      });
    }

  }

  validateForm(): boolean {
    if (!this.formData.numeroFiscal) {
      return false;
    }
    if (!this.date) {
      return false;
    }
    if (this.valid) {
      return false;
    }
    return true;
  }
  handleSuccess(event: any) {
    this.valid = true;
    console.log(this.valid);// Set the valid flag to true when the recaptcha is successfully validated
  }

  // Function to handle recaptcha error
  handleError() {
    this.valid = false; // Set the valid flag to false when there's an error with recaptcha validation
  }

  prevStep() {
    this.activeIndex--;
  }

  submit() {
    // Submit logic
  }







}
