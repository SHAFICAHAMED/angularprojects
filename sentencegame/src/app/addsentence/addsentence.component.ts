import { Component } from '@angular/core';
import { SentenceService } from '../sentence.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-addsentence',
  imports: [CommonModule,FormsModule],
  templateUrl: './addsentence.component.html',
  styleUrl: './addsentence.component.css'
})
export class AddsentenceComponent {
  sentenceText = '';
  answer = '';
  message = '';

  constructor(private sentenceService: SentenceService) {}

  addSentence() {
    if (!this.sentenceText.includes('____')) {
      this.message = '⚠️ Your sentence must contain "____" for the blank!';
      return;
    }

    const newSentence = { sentence: this.sentenceText, answer: this.answer };
    this.sentenceService.addSentence(newSentence).subscribe(
      () => {
        this.message = '✅ Sentence added successfully!';
        this.sentenceText = '';
        this.answer = '';
      },
      () => {
        this.message = '❌ Failed to add sentence. Try again!';
      }
    );
  }
}