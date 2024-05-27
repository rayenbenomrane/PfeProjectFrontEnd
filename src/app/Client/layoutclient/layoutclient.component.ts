import { ClientService } from './../../service/client.service';
import { WebSocketService } from './../../service/web-socket.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { StorageService } from '../../service/storage.service';
import { MenubarModule } from 'primeng/menubar';
import { MenuItem } from 'primeng/api';
import { OverlayPanel, OverlayPanelModule } from 'primeng/overlaypanel';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
@Component({
  selector: 'app-layoutclient',
  standalone: true,
  imports: [CommonModule, MenubarModule, OverlayPanelModule, ButtonModule],
  templateUrl: './layoutclient.component.html',
  styleUrl: './layoutclient.component.css'
})
export class LayoutclientComponent implements OnInit {
  spanpop: boolean = false;
  popup: boolean = false;
  lesnotifications: any;
  @ViewChild('op')
  op!: OverlayPanel;
  ngOnInit(): void {
    this.getnotification();
    const connexion = this.WebSocketService.connect();
    const id = localStorage.getItem("contribuableMatricule");
    connexion.connect({ userId: id }, () => {
      connexion.subscribe('/user/queue/notification', (data: any) => {
        // Add the new notification to the list
        //console.log(data);

        const newNotification = JSON.parse(data.body);
        this.spanpop = true
        this.lesnotifications.unshift(newNotification);
        // Add new notification to the beginning of the array

      });
    });
  }
  sortNotificationsByDate(): void {
    this.lesnotifications.sort((a: { dateReponse: string; }, b: { dateReponse: string; }) => {
      const dateA = new Date(a.dateReponse.split('.')[0]); // Extract date part and convert to Date object
      const dateB = new Date(b.dateReponse.split('.')[0]); // Extract date part and convert to Date object
      return dateB.getTime() - dateA.getTime(); // Sort in descending order by date
    });
  }

  constructor(private WebSocketService: WebSocketService, private clientService: ClientService) {

  }

  getnotification(): void {
    const id = Number(localStorage.getItem("contribuableMatricule"));
    this.clientService.getNotification(id).subscribe(
      (data: any) => {
        this.lesnotifications = data.filter((notification: { deleted: boolean; }) => !notification.deleted);
        this.sortNotificationsByDate();
        //console.log(this.lesnotifications);
      },
      (error) => {
        // Handle error
      }
    );
  }

  toggleBellAndSpan(event: any): void {
    // Your existing op.toggle($event) functionality
    this.op.toggle(event);

    // Set spanpop to false
    this.spanpop = false;
  }
  markAsRead(notification: any, index: number): void {
    this.clientService.updateNotification(notification.idNotification).subscribe(
      () => {
        // Update the 'checked' property locally
        this.lesnotifications[index].checked = true;
      },
      (error) => {
        // Handle error
      }
    );
  }

  deleteNotification(id: number) {

    this.clientService.updatedeleted(id).subscribe(() => {
      this.lesnotifications = this.lesnotifications.filter((notification: { idNotification: number; }) => notification.idNotification !== id);
    }, error => {
      // Handle error if needed
    });
  }

  logout(): void {
    StorageService.clearFromLocalStorage();
  }
}
