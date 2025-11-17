import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SentenceService } from '../sentence.service';

@Component({
  selector: 'app-sentence',
  imports: [CommonModule,FormsModule],
  templateUrl: './sentence.component.html',
  styleUrl: './sentence.component.css'
})
export class SentenceComponent {
  sentence: any = null;
  userAnswer = '';
  feedback = '';
  wordHistory:number[]=[]
  score=0
  // wronganswer=0
  constructor(private sentenceService: SentenceService) {}

  ngOnInit() {
    this.loadSentence();
  }

  loadSentence() {
    this.sentenceService.getRandomSentence().subscribe(data => {
      if(!(this.wordHistory.includes(data.id))){
      this.sentence = data;
      this.userAnswer = '';
      this.feedback = '';
    }
      this.wordHistory.push(data)
      console.log(this.wordHistory,(this.wordHistory.includes(data.id,this.wordHistory.length)))
    });
  }

  submitAnswer() {
    if (!this.sentence) return;

    this.sentenceService.checkAnswer(this.sentence.id, this.userAnswer).subscribe(isCorrect => {
      this.feedback = isCorrect ? '✅ Correct!' : '❌ Try again!';
      if (isCorrect) {
        this.loadSentence()
        this.score++;
      }
      else{
        // this.wronganswer++;
      }

    });
  }
}