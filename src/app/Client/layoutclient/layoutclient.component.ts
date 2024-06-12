import { Router } from '@angular/router';
import { ClientService } from './../../service/client.service';
import { WebSocketService } from './../../service/web-socket.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { StorageService } from '../../service/storage.service';
import { MenubarModule } from 'primeng/menubar';
import { MenuItem, MessageService } from 'primeng/api';
import { OverlayPanel, OverlayPanelModule } from 'primeng/overlaypanel';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { PasswordModule } from 'primeng/password';
import { FormsModule } from '@angular/forms';
import { Toast, ToastModule } from 'primeng/toast';
@Component({
  selector: 'app-layoutclient',
  standalone: true,
  imports: [CommonModule, MenubarModule, OverlayPanelModule, ToastModule, PasswordModule, ButtonModule, DialogModule, FormsModule],
  templateUrl: './layoutclient.component.html',
  styleUrl: './layoutclient.component.css'
})
export class LayoutclientComponent implements OnInit {
  changePasswordDialogVisible: boolean = false;
  spanpop!: boolean
  popup: boolean = false;
  lesnotifications: any;
  oldPassword!: string;
  newPassword!: string;
  confirmPassword!: string;
  objectuser: any; // Assuming objectuser is stored in localStorage
  idCompte: number;
  @ViewChild('op')
  op!: OverlayPanel;
  ngOnInit(): void {
    if (!StorageService.isClientLoggedIn()) {
      this.Router.navigate(['/error'])
    } else {
      // Retrieve the value of spanpop from localStorage when the component initializes
      const storedSpanpop = localStorage.getItem('spanpop');
      this.spanpop = storedSpanpop ? JSON.parse(storedSpanpop) : false;

      this.getnotification();
      const connexion = this.WebSocketService.connect();
      const id = localStorage.getItem("contribuableMatricule");
      connexion.connect({ userId: id }, () => {
        connexion.subscribe('/user/queue/notification', (data: any) => {
          // Add the new notification to the list
          const newNotification = JSON.parse(data.body);
          this.spanpop = true; // Set spanpop to true
          this.lesnotifications.unshift(newNotification);
          // Add new notification to the beginning of the array
          // Store the updated value of spanpop in localStorage
          localStorage.setItem('spanpop', JSON.stringify(true));
        });
      });
    }
  }
  sortNotificationsByDate(): void {
    this.lesnotifications.sort((a: { dateReponse: string; }, b: { dateReponse: string; }) => {
      const dateA = new Date(a.dateReponse.split('.')[0]);
      const dateB = new Date(b.dateReponse.split('.')[0]);
      return dateB.getTime() - dateA.getTime();
    });
  }

  constructor(private Router: Router, private WebSocketService: WebSocketService, private clientService: ClientService, private messageservice: MessageService) {
    const objectuserString = localStorage.getItem('user');
    this.objectuser = objectuserString ? JSON.parse(objectuserString) : null;
    this.idCompte = this.objectuser ? this.objectuser.id : null;
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
    localStorage.removeItem('spanpop');
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
  showChangePasswordDialog() {
    this.changePasswordDialogVisible = true;
  }

  hideChangePasswordDialog() {
    this.changePasswordDialogVisible = false;
  }

  handleChangePassword(): void {
    console.log("hello")
    if (this.newPassword !== this.confirmPassword) {
      this.messageservice.add({ severity: 'error', summary: 'Error', detail: 'Le nouveau mot de passe et la confirmation ne correspondent pas' });
      return;
    }

    const passwordData = {
      idCompte: this.idCompte,
      motDePass: this.newPassword,
      AncienMotDePass: this.oldPassword
    };
    console.log(passwordData)
    // console.log(passwordData)
    this.clientService.updatePassword(passwordData).subscribe(
      (response) => {
        this.messageservice.add({ severity: 'success', summary: 'Success', detail: 'Mot de passe mis à jour avec succès' });
        this.clearForm();
      },
      (error) => {
        this.messageservice.add({ severity: 'error', summary: 'Error', detail: 'Erreur lors de la mise à jour du mot de passe' });
        console.error('Error updating password:', error);
      }
    );
  }

  clearForm(): void {
    this.oldPassword = '';
    this.newPassword = '';
    this.confirmPassword = '';
  }
  redirect() {
    this.Router.navigate(['/client/mespaiements'])
  }
  logout(): void {
    StorageService.clearFromLocalStorage();
  }
}
