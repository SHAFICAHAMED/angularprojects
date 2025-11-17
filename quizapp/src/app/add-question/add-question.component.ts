import { Component } from '@angular/core';
import { Question, QuizService } from '../quiz.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-question',
  imports: [CommonModule,FormsModule],
  templateUrl: './add-question.component.html',
  styleUrl: './add-question.component.css'
})
export class AddQuestionComponent {
  newQuestion: Question = {
    text: '',
    answer: ''
  };

  constructor(private quizService: QuizService) { }

  addQuestion() {
    if (this.newQuestion.text && this.newQuestion.answer) {
      this.quizService.addQuestion(this.newQuestion).subscribe(
        () => {
          alert('Question added successfully!');
          this.newQuestion = { text: '', answer: '' };
        },
        (error) => {
          console.error('Error adding question:', error);
        }
      );
    } else {
      alert('Please fill all fields.');
    }
  }
}
