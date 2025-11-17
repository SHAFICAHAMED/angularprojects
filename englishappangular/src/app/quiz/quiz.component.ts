import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Quetion } from '../quetion';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-quiz',
  imports: [CommonModule,FormsModule],
  templateUrl: './quiz.component.html',
  styleUrl: './quiz.component.css'
})
export class QuizComponent implements OnInit {
  questions: Quetion[] = [];
  selectedAnswers: { [key: number]: string } = {};
  score: number = 0;
  quizCompleted = false;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get<Quetion[]>('http://localhost:8080/api/quiz/questions').subscribe(
      (data) => {
        this.questions = data;
      },
      (error) => console.error('Error fetching questions:', error)
    );
  }

  submitQuiz() {
    this.score = this.questions.filter(q => this.selectedAnswers[q.id] === q.correctAnswer).length;
    this.quizCompleted = true;
  }
}