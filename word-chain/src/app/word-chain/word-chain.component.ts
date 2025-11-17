import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Import FormsModule for ngModel

@Component({
  selector: 'app-word-chain',
  standalone: true, // Mark the component as standalone
  imports: [CommonModule, FormsModule], // Import required modules
  templateUrl: './word-chain.component.html',
  styleUrls: ['./word-chain.component.css'],
})
export class WordChainComponent {
  currentWord: string = '';
  lastLetter: string = '';
  message: string = 'Start the game by entering a word!';
  gameStarted: boolean = false;

  startGame() {
    this.gameStarted = true;
    this.message = 'Game started! Enter a word.';
  }

  submitWord() {
    if (!this.currentWord) {
      this.message = 'Please enter a word.';
      return;
    }

    if (this.gameStarted && this.lastLetter && this.currentWord[0].toLowerCase() !== this.lastLetter.toLowerCase()) {
      this.message = `Your word must start with the letter "${this.lastLetter}".`;
      return;
    }

    this.lastLetter = this.currentWord[this.currentWord.length - 1];
    this.message = `Great! Next word must start with "${this.lastLetter}".`;
    this.currentWord = '';
  }

  resetGame() {
    this.currentWord = '';
    this.lastLetter = '';
    this.message = 'Game reset. Start again!';
    this.gameStarted = false;
  }
}