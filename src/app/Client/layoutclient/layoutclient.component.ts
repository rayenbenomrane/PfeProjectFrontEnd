import { Component, OnInit } from '@angular/core';
import { StorageService } from '../../service/storage.service';
import { MenubarModule } from 'primeng/menubar';
import { MenuItem } from 'primeng/api';
@Component({
  selector: 'app-layoutclient',
  standalone: true,
  imports: [MenubarModule],
  templateUrl: './layoutclient.component.html',
  styleUrl: './layoutclient.component.css'
})
export class LayoutclientComponent implements OnInit {
  ngOnInit(): void {
    
  }





  logout(): void {
    StorageService.clearFromLocalStorage();
  }
}
