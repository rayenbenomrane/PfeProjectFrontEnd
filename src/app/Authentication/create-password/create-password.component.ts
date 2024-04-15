import { AuthServiceService } from './../../service/auth-service.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FieldsetModule } from 'primeng/fieldset';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { CommonModule, formatDate } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PasswordModule } from 'primeng/password';

@Component({
  selector: 'app-create-password',
  standalone: true,
  imports: [ButtonModule, CardModule, FieldsetModule, CommonModule, FormsModule, HttpClientModule, PasswordModule],
  templateUrl: './create-password.component.html',
  styleUrl: './create-password.component.css'
})
export class CreatePasswordComponent implements OnInit {
  verificationCode!: string
  inscription: any
  formatDate = {
    password: '',
    password1: ''
  }
  value: any;

  constructor(private route: ActivatedRoute, private authserv: AuthServiceService) { }

  ngOnInit(): void {
    // Retrieve the 'code' parameter from the URL
    this.route.params.subscribe(params => {
      this.verificationCode = params['code'];
      console.log('Verification code:', this.verificationCode);
      this.verifyCode(this.verificationCode)
      // Now you can use this.verificationCode as needed
    });
  }
  verifyCode(code: string): void {
    this.authserv.verifyCode(code).subscribe(
      response => {
        console.log('Verification response:', response);
        this.inscription = response.inscription

        // Handle response based on your requirements
      },
      error => {
        console.error('Error occurred:', error);
        // Handle error
      }
    );
  }
  submit(): void {
    // Check if passwords match
    if (this.formatDate.password !== this.formatDate.password1) {

      console.error('Passwords do not match');
      return;
    }


    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

    // Check if the password meets the regex pattern
    if (!passwordRegex.test(this.formatDate.password)) {

      console.error('Password does not meet requirements');
      return;
    }
    const passwordDto = {
      password: this.formatDate.password,
      inscription: this.inscription
    };
    console.log(passwordDto);
    this.authserv.createpassword(passwordDto).subscribe(
      (response) => {
        console.log('Password saved successfully:', response);

      },
      (error) => {
        console.error('Error saving password:', error);

      }
    );



  }
}


