// game.service.ts
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io, Socket } from 'socket.io-client';
import { environment } from '../environment';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private socket: Socket;

  constructor() {
    this.socket = io(environment.apiUrl);
  }

  joinGame(username: string): void {
    this.socket.emit('join', username);
  }

  submitAnswer(answer: string): void {
    this.socket.emit('submit', { answer });
  }

  listenForPuzzle(): Observable<any> {
    return new Observable((observer) => {
      this.socket.on('puzzle', (puzzle) => {
        observer.next(puzzle);
      });
    });
  }

  listenForLeaderboard(): Observable<any> {
    return new Observable((observer) => {
      this.socket.on('leaderboard', (leaderboard) => {
        observer.next(leaderboard);
      });
    });
  }

  listenForMessages(): Observable<any> {
    return new Observable((observer) => {
      this.socket.on('message', (message) => {
        observer.next(message);
      });
    });
  }
}
