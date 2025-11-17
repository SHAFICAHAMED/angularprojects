import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  fishCaught = 0;
  totalScore = 0;
  isFishing = false;
  timer: any;
  timeLeft = 30; // seconds

  fishArray = [
    { name: 'Small Fish', points: 10, size: 'small' },
    { name: 'Medium Fish', points: 20, size: 'medium' },
    { name: 'Large Fish', points: 50, size: 'large' }
  ];

  constructor() { }

  ngOnInit(): void {
    this.startGame();
  }

  startGame() {
    this.timeLeft = 30;
    this.fishCaught = 0;
    this.totalScore = 0;
    this.isFishing = false;
    this.timer = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        clearInterval(this.timer);
        alert('Game Over! Your score: ' + this.totalScore);
      }
    }, 1000);
  }

  castLine() {
    this.isFishing = true;
    const fishCaught = this.fishArray[Math.floor(Math.random() * this.fishArray.length)];
    setTimeout(() => {
      this.isFishing = false;
      this.fishCaught++;
      this.totalScore += fishCaught.points;
    }, 1000); // Delay to simulate reel-in time
  }
}