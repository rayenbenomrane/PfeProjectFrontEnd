import { Injectable } from '@angular/core';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
@Injectable({
  providedIn: 'root'
})
export class WebSocketService {

  webSocketEndPoint: string = 'http://localhost:8095/ws';

  stompClient: any;

  constructor() { }

  connect() {
    let ws = new SockJS(this.webSocketEndPoint);
    this.stompClient = Stomp.over(ws);
    return this.stompClient;
  }

  _disconnect() {
    if (this.stompClient !== null) {
      this.stompClient.disconnect();
    }
  }


}
