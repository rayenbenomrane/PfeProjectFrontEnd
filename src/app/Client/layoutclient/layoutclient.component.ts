import { ClientService } from './../../service/client.service';
import { WebSocketService } from './../../service/web-socket.service';
import { Component, OnInit } from '@angular/core';
import { StorageService } from '../../service/storage.service';
import { MenubarModule } from 'primeng/menubar';
import { MenuItem } from 'primeng/api';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-layoutclient',
  standalone: true,
  imports: [CommonModule, MenubarModule, OverlayPanelModule],
  templateUrl: './layoutclient.component.html',
  styleUrl: './layoutclient.component.css'
})
export class LayoutclientComponent implements OnInit {

  popup: boolean = false;
  lesnotifications: any;
  ngOnInit(): void {
    this.getnotification()
    const connexion = this.WebSocketService.connect();
    const id = localStorage.getItem("contribuableMatricule")
    connexion.connect({ userId: id }, () => {
      connexion.subscribe('/user/queue/notification', (data: any) => {
        // Add the new notification to the list
        console.log(data)
        this.lesnotifications.push(JSON.parse(data.body))

      });
    })
  }

  constructor(private WebSocketService: WebSocketService, private clientService: ClientService) {

  }

  getnotification() {
    const id = Number(localStorage.getItem("contribuableMatricule"))
    this.clientService.getNotification(id).subscribe((data) => {
      this.lesnotifications = data
    })

  }

  logout(): void {
    StorageService.clearFromLocalStorage();
  }
}
