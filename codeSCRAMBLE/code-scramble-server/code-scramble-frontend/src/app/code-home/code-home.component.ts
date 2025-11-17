import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';
import { io } from 'socket.io-client';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-code-home',
  standalone: true,
  imports: [FormsModule, CommonModule, DragDropModule],
  templateUrl: './code-home.component.html',
  styleUrl: './code-home.component.css'
})
export class CodeHomeComponent implements OnInit {
  questionId = '';
  codeBlocks: string[] = [];
  leaderboard: { [socketId: string]: { name: string; score: number } } = {};
  socket = io('');
  timer = 30;
  intervalId: any;
  roundActive: boolean = false;

  playerName = '';
  joined = false;
  roomId: string = '';
  roomCreatedMessage = '';

  ngOnInit(): void {
    this.socket = io('http://localhost:3000');
    console.log('Socket initialized');

    this.socket.on('newQuestion', (data) => {
      console.log('New question received:', data);
      this.codeBlocks = data.question;
      this.questionId = data.id;
      this.startRound();
    });

    this.socket.on('codeResult', (data) => {
      console.log('Code result received:', data);
      alert(data.message);
    });

    this.socket.on('leaderboardUpdate', (data) => {
      console.log('Leaderboard update received:', data);
      this.leaderboard = data;
    });

    this.socket.on('winner', (data) => {
      console.log('Winner announced:', data.id);
    });
  }

  startRound() {
    this.roundActive = true;
    this.timer = 30;
    console.log('Round started');

    this.intervalId = setInterval(() => {
      if (this.timer > 0) {
        this.timer--;
        console.log('Timer:', this.timer);
      } else {
        clearInterval(this.intervalId);
        this.roundActive = false;
        console.log('Time is up');
        alert('TIMES UP!!');
      }
    }, 1000);
  }

  drop(event: CdkDragDrop<string[]>) {
    console.log('Item dropped from', event.previousIndex, 'to', event.currentIndex);
    moveItemInArray(this.codeBlocks, event.previousIndex, event.currentIndex);
  }

  submitCode() {
    if (!this.roundActive) {
      console.log('Submit attempt after round ended');
      alert('Round over!');
      return;
    }

    const joinedCode = this.codeBlocks.join(' ');
    console.log('Submitting code:', joinedCode);

    this.socket.emit('submitCode', {
      code: joinedCode,
      questionId: this.questionId
    });

    this.socket.on('winner', (data) => {
      console.log('Winner response received in submitCode:', data.id);
    });

    clearInterval(this.intervalId);
    this.roundActive = false;
    console.log('Round manually ended by submit');
  }

  createRoom() {
    if (!this.playerName.trim()) {
      console.log('Create room failed: Name is missing');
      alert('Please enter your name');
      return;
    }

    if (!this.roomId.trim()) {
      this.roomId = Math.random().toString(36).substring(2, 8).toUpperCase();
      console.log('Generated room ID:', this.roomId);
    }

    this.socket.emit('createRoom', { roomId: this.roomId, name: this.playerName });
    this.joined = true;
    console.log('Room created and joined:', this.roomId, this.playerName);
  }

  joinRoom() {
    if (!this.playerName.trim() || !this.roomId.trim()) {
      console.log('Join room failed: Name or room ID is missing');
      alert('Please enter your name and room ID');
      return;
    }

    this.socket.emit('joinRoom', { roomId: this.roomId, name: this.playerName });
    this.joined = true;
    console.log('Joined room:', this.roomId, this.playerName);
  }
}
