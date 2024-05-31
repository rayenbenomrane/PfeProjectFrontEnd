import { Component } from '@angular/core';
import { AuthServiceService } from '../../service/auth-service.service';
import { CommonModule, formatDate } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { StorageService } from '../../service/storage.service';
import { Route, Router } from '@angular/router';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { DialogModule } from 'primeng/dialog';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule, DialogModule, CardModule, ButtonModule, DividerModule, InputTextModule, PasswordModule, ToastModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  errorMessage: string = '';
  formData = {
    email: '',
    password: ''
  };
  displayForgotPassword: boolean = false;
  forgotPasswordEmail: string = '';
  constructor(private authserve: AuthServiceService, private router: Router, private messageService: MessageService) { }
  ngOnInit(): void {
    //console.log(this.formData)
  }


  onSubmit() {
    this.authserve.login(this.formData).subscribe(
      (data: any) => {
        if (data.userId != null) {
          const user = {
            id: data.userId,
            role: data.userRole
          };
          StorageService.saveToken(data.jwt);
          StorageService.saveUser(user);

          // Redirect based on user role
          let redirectPath = '';
          switch (user.role) {
            case 'Admin':
              this.messageService.add({ key: 'step1', severity: 'success', summary: 'Connecte', detail: 'Welcome Admin' });
              redirectPath = '/admin/dashboard';
              break;
            case 'Client':
              this.messageService.add({ key: 'step1', severity: 'success', summary: 'Connecte', detail: 'Welcome Client' });
              redirectPath = '/client/homepage';
              break;
            case 'Responsable':
              this.messageService.add({ key: 'step1', severity: 'success', summary: 'Connecte', detail: 'Welcome Responsable' });
              redirectPath = '/responsable/tous-les-reclamations';
              break;
            default:
              console.log('Error saving user data');
              // Handle error saving user data, maybe display an error message
              return;
          }

          setTimeout(() => {
            this.router.navigate([redirectPath]);
          }, 1500);
        }
      },
      (errorResponse: HttpErrorResponse) => {
        // Handle error responses from the server
        let errorMessage = '';
        switch (errorResponse.status) {
          case 401:
            errorMessage = 'Incorrect username or password';
            break;
          case 403:
            errorMessage = 'Account is disabled';
            break;
          case 404:
            errorMessage = 'User not found';
            break;
          default:
            errorMessage = 'An unexpected error occurred';
            break;
        }
        // Display error message
        this.messageService.add({ key: 'step1', severity: 'error', summary: 'Error', detail: errorMessage });
      }
    );
  }


  gotosignup() {
    this.router.navigate(['/signup'])
  }
  showForgotPasswordDialog() {
    this.displayForgotPassword = true;
  }

    sendForgotPasswordEmail() {
      if (!this.forgotPasswordEmail) {
        this.messageService.add({key: 'step1',severity:'error', summary: 'Error', detail: 'Veuillez entrer une adresse email valide'});
        return;
      }

      this.authserve.sendOublierPassword(this.forgotPasswordEmail).subscribe(
        (response: any) => {


          this.displayForgotPassword = false;
          this.messageService.add({key: 'step1',severity:'success', summary: 'Success', detail: 'Un email a été envoyé'});
        },
        (error) => {
          this.messageService.add({key: 'step1',severity:'error', summary: 'Error', detail: 'email introuvable'});
        }
      );
    }
}
