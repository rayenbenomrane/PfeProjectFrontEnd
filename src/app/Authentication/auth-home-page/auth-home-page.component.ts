import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-auth-home-page',
  standalone: true,
  imports: [ButtonModule,],
  templateUrl: './auth-home-page.component.html',
  styleUrl: './auth-home-page.component.css'
})
export class AuthHomePageComponent {

}
