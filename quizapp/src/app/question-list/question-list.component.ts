import { Component } from '@angular/core';
import { Question, QuizService } from '../quiz.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-question-list',
  standalone: true, 
  imports: [CommonModule,FormsModule],
  templateUrl: './question-list.component.html',
  styleUrl: './question-list.component.css'
})
export class QuestionListComponent {
  questions: Question[] = [];

  constructor(private quizService: QuizService, private router: Router) {}

  ngOnInit(): void {
    if (!sessionStorage.getItem('loggedIn')) {
      this.router.navigate(['/login']);
    } else {
      this.loadQuestions();
    }
  }

  loadQuestions() {
    this.quizService.getQuestions().subscribe(
      (data) => (this.questions = data),
      (error) => console.error('Error fetching questions:', error)
    );
  }
}