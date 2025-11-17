import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-test-typing',
  imports: [CommonModule,FormsModule],
  templateUrl: './test-typing.component.html',
  styleUrl: './test-typing.component.css'
})
export class TestTypingComponent {
  sentences: string[] = [
    'The quick brown fox jumps over the lazy dog.',
    'Angular makes building web applications fun.',
    'Type this sentence as fast as you can.'
  ];
  
  currentSentence = '';
  userInput = '';
  startTime: number | null = null;
  elapsedTime = 0;
  wpm = 0;
  isTestComplete = false;

  constructor() {
    this.setRandomSentence();
  }

  setRandomSentence() {
    const randomIndex = Math.floor(Math.random() * this.sentences.length);
    this.currentSentence = this.sentences[randomIndex];
    this.resetTest();
  }

  onInputChange() {
    if (!this.startTime) {
      this.startTime = Date.now();
    }

    if (this.userInput === this.currentSentence) {
      this.calculateWPM();
      this.isTestComplete = true;
    }
  }

  calculateWPM() {
    if (this.startTime) {
      this.elapsedTime = (Date.now() - this.startTime) / 1000 / 60; // Time in minutes
      const words = this.currentSentence.trim().split(/\s+/).length;
      this.wpm = Math.round(words / this.elapsedTime);
    }
  }

  getCharacterClass(index: number) {
    if (!this.userInput[index]) return '';
    return this.userInput[index] === this.currentSentence[index] ? 'correct' : 'incorrect';
  }

  resetTest() {
    this.userInput = '';
    this.startTime = null;
    this.elapsedTime = 0;
    this.wpm = 0;
    this.isTestComplete = false;
  }
}