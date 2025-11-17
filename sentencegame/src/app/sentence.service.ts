import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SentenceService {

  private sentenceApi='https://navidp-alpha.onrender.com/api/sentences'
  constructor(private http:HttpClient) { }
  getRandomSentence(): Observable<any> {
    return this.http.get(`${this.sentenceApi}/random`);
  }

  checkAnswer(id: number, answer: string): Observable<boolean> {
    return this.http.post<boolean>(`${this.sentenceApi}/check`, { id, answer });
  }
  addSentence(sentence: any): Observable<any> {
    return this.http.post(`${this.sentenceApi}`, sentence);
  }
}
