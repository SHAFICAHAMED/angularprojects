// game.component.ts
import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GameService } from '../game.service';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css'],
})
export class GameComponent implements OnInit {
  username: string = '';
  puzzle = { lines: [] };
  leaderboard: any = {};
  message: string = '';
  private gameService: GameService = inject(GameService);

  ngOnInit(): void {
    this.gameService.listenForPuzzle().subscribe((puzzle) => {
      this.puzzle = puzzle;
    });

    this.gameService.listenForLeaderboard().subscribe((leaderboard) => {
      this.leaderboard = leaderboard;
    });

    this.gameService.listenForMessages().subscribe((message) => {
      this.message = message;
    });
  }

  // Join the game with username
  joinGame(): void {
    if (this.username) {
      this.gameService.joinGame(this.username);
    }
  }

  // Submit the answer
  submitAnswer(answer: string): void {
    this.gameService.submitAnswer(answer);
  }
}
