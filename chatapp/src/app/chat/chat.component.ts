// import { CommonModule } from '@angular/common';
// import { Component, OnInit } from '@angular/core';
// import { FormsModule } from '@angular/forms';
// import * as SockJS from 'sockjs-client';
// import { Client, IMessage } from '@stomp/stompjs';
// import { ChatMessage } from '../chatmessage';

// import { CommonModule } from '@angular/common';
// import { Component, OnInit } from '@angular/core';
// import { FormsModule } from '@angular/forms';
// import SockJS from 'sockjs-client'; // ✅ FIXED: use default import
// import { Client, IMessage } from '@stomp/stompjs';
// import { ChatMessage } from '../chatmessage';

// @Component({
//   selector: 'app-chat',
//   standalone: true,
//   imports: [FormsModule, CommonModule],
//   templateUrl: './chat.component.html',
//   styleUrls: ['./chat.component.css']
// })
// export class ChatComponent implements OnInit {
//   private stompClient!: Client;
//   connected: boolean = false;
//   message: string = '';
//   username: string = '';
//   messages: ChatMessage[] = [];

//   ngOnInit(): void {
//     this.connect();
//   }

//   connect(): void {
//     const socket = new SockJS('https://chat-beta-73oy.onrender.com/chat');
//     this.stompClient = new Client({
//       webSocketFactory: () => socket,
//       reconnectDelay: 5000,
//       debug: (str) => console.log(str),
//     });

//     this.stompClient.onConnect = () => {
//       this.connected = true;
//       this.stompClient.subscribe('/topic/messages', (msg: IMessage) => {
//         if (msg.body) {
//           const message: ChatMessage = JSON.parse(msg.body);
//           this.messages.push(message);
//         }
//       });
//     };

//     this.stompClient.activate(); // ✅ Start the connection
//   }

//   sendMessage(): void {
//     if (this.connected && this.message && this.username) {
//       const msg: ChatMessage = {
//         sender: this.username,
//         content: this.message,
//       };
//       this.stompClient.publish({
//         destination: '/app/message',
//         body: JSON.stringify(msg),
//       });
//       this.message = '';
//     } else if (!this.connected) {
//       console.warn('STOMP connection is not ready.');
//     }
//   }
// }


//modifications

import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import SockJS from 'sockjs-client'; // ✅ FIXED: use default import
import { Client, IMessage } from '@stomp/stompjs';
import { ChatMessage } from '../chatmessage';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  private stompClient!: Client;
  connected: boolean = false;
  message: string = '';
  username: string = '';
  messages: ChatMessage[] = [];
  typingMsg: string = '';
  typingTimeout: any;


  ngOnInit(): void {
    this.connect();
  }

connect(): void {
  const socket = new SockJS('http://localhost:8080/chat');
  this.stompClient = new Client({
    webSocketFactory: () => socket,
    reconnectDelay: 5000,
    debug: (str) => console.log(str),
  });

  this.stompClient.onConnect = () => {
    this.connected = true;

    // ✅ Messages subscription
    this.stompClient.subscribe('/topic/messages', (msg: IMessage) => {
      if (msg.body) {
        const message: ChatMessage = JSON.parse(msg.body);
        this.messages.push(message);
      }
    });

    // ✅ Typing subscription (moved inside onConnect)
    this.stompClient.subscribe('/topic/typing', (msg: IMessage) => {
      const typingData: ChatMessage = JSON.parse(msg.body);
      if (typingData.sender !== this.username) {
        this.typingMsg = `${typingData.sender} is typing...`;
        clearTimeout(this.typingTimeout);
        this.typingTimeout = setTimeout(() => {
          this.typingMsg = '';
        }, 3000);
      }
    });
  };


  this.stompClient.activate(); // ✅ Start connection
}


  sendMessage(): void {
    if (this.connected && this.message && this.username) {
      const msg: ChatMessage = {
        sender: this.username,
        content: this.message,
      };
      this.stompClient.publish({
        destination: '/app/message',
        body: JSON.stringify(msg),
      });
      this.message = '';
    } else if (!this.connected) {
      console.warn('STOMP connection is not ready.');
    }
  }
  onTyping(): void {
    //  console.log("Sending typing event ✅ ✅");
  if (!this.username) return;

  const typingMsg: ChatMessage = {
    sender: this.username,
    content: '',
    type: 'TYPING'
  };
  console.log("Sending typing event ✅ ✅", typingMsg+"✅ ✅");

  this.stompClient.publish({
    destination: '/app/typing',
    body: JSON.stringify(typingMsg)
  });
}


}
