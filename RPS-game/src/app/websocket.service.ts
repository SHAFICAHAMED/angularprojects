import { Injectable } from '@angular/core';
import { Client, IMessage } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WebsocketService {
  private stompClient!: Client;
  private resultSubject = new Subject<any>();
  result$ = this.resultSubject.asObservable();

  connect(): void {
    const socket = new SockJS('http://localhost:8080/game');
    this.stompClient = new Client({
      webSocketFactory: () => socket,
      debug: (str) => console.log(str),
    });

    this.stompClient.onConnect = () => {
      this.stompClient.subscribe('/topic/result', (message: IMessage) => {
        const payload = JSON.parse(message.body);
        this.resultSubject.next(payload);
      });
    };

    this.stompClient.onStompError = (frame) => {
      console.error('STOMP error', frame.headers['message'], frame.body);
    };

    this.stompClient.activate();
  }

  sendMove(player: string, choice: string): void {
    if (this.stompClient && this.stompClient.connected) {
      this.stompClient.publish({
        destination: '/app/move',
        body: JSON.stringify({ player, choice }),
      });
    } else {
      console.warn('STOMP client is not connected.');
    }
  }
}
