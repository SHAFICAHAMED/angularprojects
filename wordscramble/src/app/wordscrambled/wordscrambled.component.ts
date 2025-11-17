import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-wordscrambled',
  imports: [CommonModule,FormsModule],
  templateUrl: './wordscrambled.component.html',
  styleUrl: './wordscrambled.component.css'
})
export class WordscrambledComponent {

  words = ['angular', 'typescript', 'component', 'service', 'template'];
  currentWord = '';
  scrambledWord = '';
  userGuess = '';
  resultMessage = '';

  constructor() {
    this.generateNewWord();
  }

  shuffle(word: string): string {
    return word
      .split('')
      .sort(() => Math.random() - 0.5)
      .join('');
  }

  generateNewWord() {
    this.userGuess = '';
    this.resultMessage = '';
    this.currentWord = this.words[Math.floor(Math.random() * this.words.length)];
    this.scrambledWord = this.shuffle(this.currentWord);
  }

  checkGuess() {
    if (this.userGuess.toLowerCase() === this.currentWord.toLowerCase()) {
      this.resultMessage = '🎉 Correct! New word loaded!';
      this.generateNewWord();
    } else {
      this.resultMessage = '❌ Try again!';
    }
  }
}