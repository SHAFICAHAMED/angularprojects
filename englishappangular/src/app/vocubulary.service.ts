import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Word } from './word';

@Injectable({
  providedIn: 'root'
})
export class VocubularyService {

  private wordapi="http://localhost:8080/words";
  private dictionaryApiUrl = 'https://api.dictionaryapi.dev/api/v2/entries/en/';

  constructor(private http:HttpClient) { }

  getWords():Observable<Word[]>{
    return this.http.get<Word[]>(this.wordapi)
  }
  addWord(word:Word):Observable<Word>{
    return this.http.post<Word>(this.wordapi,word);
  }
  deletWord(id:number):Observable<void>{
    return this.http.delete<void>(`${this.wordapi}/${id}`)
  }

  getMeaning(word:string):Observable<any>{
    return this.http.get<any>(`${this.dictionaryApiUrl}${word}`);
  }

}

