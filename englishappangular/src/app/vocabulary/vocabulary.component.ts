import { Component, OnInit } from '@angular/core';
import { Word } from '../word';
import { VocubularyService } from '../vocubulary.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FilterPipe } from '../pipes/filter.pipe';

@Component({
  selector: 'app-vocabulary',
  imports: [FormsModule,CommonModule,FilterPipe],
  templateUrl: './vocabulary.component.html',
  styleUrl: './vocabulary.component.css'
})
export class VocabularyComponent implements OnInit {
  newWord:Word={word:'',meaning:'',category:''}
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
  addWord() {
    if (!this.newWord.word) return;
    
    this.vocabularySer.getMeaning(this.newWord.word).subscribe(response => {
      if (response && response[0]) {
        this.newWord.meaning = response[0].meanings[0]?.definitions[0]?.definition || 'Meaning not found';
      }

      this.vocabularySer.addWord(this.newWord).subscribe(() => {
        this.loadWords();
        this.newWord = { word: '', meaning: '', category: '' };
      });
    });


  }
  deleteWord(id:number){
    this.vocabularySer.deletWord(id).subscribe(()=>this.loadWords())
  }
}
