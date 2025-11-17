import { Component, OnInit } from '@angular/core';
import { WebsocketService } from '../websocket.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-mainscene',
  imports: [FormsModule,CommonModule],
  templateUrl: './mainscene.component.html',
  styleUrl: './mainscene.component.css'
})
export class MainsceneComponent  implements OnInit {
  playerName = '';
  choice = '';
  result = '';
  moves:string[] = [];

  constructor(public ws: WebsocketService) {}

  ngOnInit() {
    this.ws.result$.subscribe(res => {
      this.moves = [res.player1Move, res.player2Move];
      this.result = res.result;
    });
    this.ws.connect();
  }

  sendChoice(choice: string) {
    this.choice = choice;
    this.ws.sendMove(this.playerName, choice);
  }
}