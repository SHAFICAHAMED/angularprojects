import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SentenceComponent } from "./sentence/sentence.component";
import { AddsentenceComponent } from "./addsentence/addsentence.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SentenceComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'sentencegame';
}
