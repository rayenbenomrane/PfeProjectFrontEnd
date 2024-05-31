import { Component } from '@angular/core';
import { LayoutclientComponent } from '../layoutclient/layoutclient.component';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-contribuable-page',
  standalone: true,
  imports: [LayoutclientComponent, CardModule, ButtonModule],
  templateUrl: './contribuable-page.component.html',
  styleUrl: './contribuable-page.component.css'
})
export class ContribuablePageComponent {

}
