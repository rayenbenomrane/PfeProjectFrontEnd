import { Component } from '@angular/core';
import { StorageService } from '../../service/storage.service';

@Component({
  selector: 'app-layout-responsable',
  standalone: true,
  imports: [],
  templateUrl: './layout-responsable.component.html',
  styleUrl: './layout-responsable.component.css'
})
export class LayoutResponsableComponent {
  logout(): void {
    StorageService.clearFromLocalStorage();
  }
}
