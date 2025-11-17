import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Word } from '../word';
import { VocubularyService } from '../vocubulary.service';

@Component({
  selector: 'app-vocabularylist',
  imports: [CommonModule,FormsModule],
  templateUrl: './vocabularylist.component.html',
  styleUrl: './vocabularylist.component.css'
})
export class VocabularylistComponent implements OnInit {
  vocabularyList = [
    { word: 'Eloquent', meaning: 'Fluent or persuasive in speaking or writing.' },
    { word: 'Meticulous', meaning: 'Showing great attention to detail; very careful and precise.' },
    { word: 'Pragmatic', meaning: 'Dealing with things sensibly and realistically.' }
  ];
  
   words:Word[]=[]
    searchQuery:string=''
    categories=["Noun","Verb","Adjective","Idiom"];
 constructor(private vocabularySer:VocubularyService){}
    ngOnInit(): void {
      this.loadWords()
  }
  loadWords(){
      this.vocabularySer.getWords().subscribe(data=>this.words=data)
  }
}
