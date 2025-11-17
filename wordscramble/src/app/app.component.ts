import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { WordscrambledComponent } from "./wordscrambled/wordscrambled.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, WordscrambledComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'wordscramble';
}
