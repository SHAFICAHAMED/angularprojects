import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Question {
  id?: number;
  text: string;
  answer: string;
}

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  private apiServerUrl = 'http://localhost:8080/api/quizzes';

  constructor(private http: HttpClient) { }

  getQuestions(): Observable<Question[]> {
    return this.http.get<Question[]>(`${this.apiServerUrl}`);
  }

  addQuestion(question: Question): Observable<Question> {
    return this.http.post<Question>(`${this.apiServerUrl}/questions`, question);
  }
}