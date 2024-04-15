import { Component } from '@angular/core';
import { AuthServiceService } from '../../service/auth-service.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { StorageService } from '../../service/storage.service';
import { Route, Router } from '@angular/router';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule, CardModule, ButtonModule, DividerModule, InputTextModule, PasswordModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  formData = {
    email: '',
    password: ''
  };
  constructor(private authserve: AuthServiceService, private router: Router) { }
  ngOnInit(): void {

  }


  onSubmit() {
    console.log(this.formData);
    this.authserve.login(this.formData).subscribe((data) => {
      console.log(data);
      if (data.userId != null) {
        const user = {
          id: data.userId,
          role: data.userRole
        }
        StorageService.saveToken(data.jwt);
        StorageService.saveUser(user);

        // Redirect based on user role
        if (user.role === 'Admin') {
          // Redirect to admin dashboard
          this.router.navigate(['/dashbord']);
        } else if (user.role === 'Client') {
          // Redirect to home page
          this.router.navigate(['/home']);
        } else {
          console.log("Unknown user role");
          // Handle unknown user role, maybe redirect to an error page
        }

      } else {
        console.log("erreur de storage");
      }
    })
  }
  gotosignup() {
    this.router.navigate(['/signup'])
  }

}
